/**
 * Firebase web client config from Vite env (never commit real keys).
 * Copy .env.example → .env and set VITE_FIREBASE_* values.
 */
export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  firestoreDatabaseId?: string;
}

export function readFirebaseClientConfig(): FirebaseClientConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();

  if (!apiKey || !projectId) {
    return null;
  }

  return {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() || `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim() || `${projectId}.firebasestorage.app`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim() || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim() || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim() || undefined,
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID?.trim() || undefined,
  };
}

export function isFirebaseConfigured(): boolean {
  return readFirebaseClientConfig() !== null;
}
