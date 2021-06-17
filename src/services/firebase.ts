import admin from 'firebase-admin';
import firebaseAccountCredentials from './serviceAccount.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "YOUR_DB_URL"
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();