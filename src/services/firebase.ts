import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { isFirebaseConfigured, readFirebaseClientConfig } from '../config/firebaseClientConfig';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

if (isFirebaseConfigured()) {
  try {
    const config = readFirebaseClientConfig()!;
    const { firestoreDatabaseId, ...firebaseAppConfig } = config;
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseAppConfig);
    const dbId = firestoreDatabaseId?.trim();
    db = dbId && dbId !== '(default)' ? getFirestore(app, dbId) : getFirestore(app);
    storage = getStorage(app);
  } catch (err) {
    console.warn('Failed to initialize Firebase app:', err);
  }
} else {
  const isDev =
    (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') ||
    Boolean(import.meta.env?.DEV);
  if (isDev) {
    console.info(
      '[SamvaadSetu] Firebase not configured (set VITE_FIREBASE_* in .env). Using local case store only.'
    );
  }
}

export { app, db, storage };
export { isFirebaseConfigured };
