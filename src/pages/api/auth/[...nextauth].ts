import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import firestore from '../../../services/firebase'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session) {
      const usersRef = firestore.collection('users');
      const snapshot = await usersRef.where('email', '==', session.user.email).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  

      let userId = ''
      
      snapshot.forEach(doc => userId = doc.id)

      return {
        ...session,
        userId
      }
    },
    async signIn(user, account, profile) {
        if (user) {
          const usersRef = firestore.collection('users');
          const snapshot = await usersRef.where('email', '==', user.email).get();

          if (snapshot.empty) {
            try {
              await usersRef.add(user)
              
            } catch (error) {
              console.log(error)
              return false
            }
            
          } 

          return true
        } else {
          return false
        }
      },
  }
})