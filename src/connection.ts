import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import ServiceAccountCredential from "./firebase/service-account.json";

initializeApp({
  credential: cert(ServiceAccountCredential as ServiceAccount),
});

const db = getFirestore();

export default db;
