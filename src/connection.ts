import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert(
    JSON.parse(process.env.FIREBASE_CREDENTIALS as string) as ServiceAccount
  ),
});
const db = getFirestore();

export default db;
