import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { isFirebaseConfigured, readFirebaseClientConfig } from '../config/firebaseClientConfig';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured()) {
  const config = readFirebaseClientConfig()!;
  const { firestoreDatabaseId, ...firebaseAppConfig } = config;
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseAppConfig);
  db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
} else if (import.meta.env.DEV) {
  console.info(
    '[SamvaadSetu] Firebase not configured (set VITE_FIREBASE_* in .env). Using local case store only.'
  );
}

export { app, db };
export { isFirebaseConfigured };
