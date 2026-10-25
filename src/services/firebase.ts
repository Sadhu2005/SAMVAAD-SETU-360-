import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFirebaseClientConfig } from '../config/firebaseClientConfig';

const config = getFirebaseClientConfig();

// Valid configuration requires a real API key and project ID (not fallback placeholders)
export const isFirebaseConfigured = Boolean(
  config.apiKey &&
  config.projectId &&
  config.apiKey !== 'demo-key'
);

let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config as any);
    const dbId = config.firestoreDatabaseId?.trim();
    dbInstance = (dbId && dbId !== '(default)')
      ? getFirestore(app, dbId)
      : getFirestore(app);
  } catch (e) {
    console.warn('Failed to initialize Firebase app:', e);
  }
}

export const db: Firestore | null = dbInstance;
export default db;
