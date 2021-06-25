import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import firebase from '../../../services/firebase'

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
    async signIn(user) {
        if (user) {
          const usersRef = firebase.collection('users');
          const snapshot = await usersRef.where('email', '==', user.email).get();

          if (snapshot.empty) {
            try {
              await usersRef.add(user)
              return true
            } catch (error) {
              console.error(error)
              return false
            }
            
          } 
         
        } else {
          return false
        }
      },
  }
})