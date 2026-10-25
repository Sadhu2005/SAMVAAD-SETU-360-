/**
 * Firebase web client config from Vite env (never commit real keys).
 * Copy .env.example → .env and set VITE_FIREBASE_* values.
 * Safe on Node (tsx server.ts): import.meta.env is undefined, so process.env is used.
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

function env(name: string): string | undefined {
  try {
    const viteVal = import.meta.env?.[name];
    if (typeof viteVal === 'string' && viteVal.trim()) return viteVal.trim();
  } catch {
    // import.meta.env is unavailable outside Vite
  }
  if (typeof process !== 'undefined' && process.env) {
    const nodeVal = process.env[name];
    if (typeof nodeVal === 'string' && nodeVal.trim()) return nodeVal.trim();
  }
  return undefined;
}

export function readFirebaseClientConfig(): FirebaseClientConfig | null {
  const apiKey = env('VITE_FIREBASE_API_KEY');
  const projectId = env('VITE_FIREBASE_PROJECT_ID');

  if (!apiKey || !projectId) {
    return null;
  }

  return {
    apiKey,
    authDomain: env('VITE_FIREBASE_AUTH_DOMAIN') || `${projectId}.firebaseapp.com`,
    projectId,
    storageBucket: env('VITE_FIREBASE_STORAGE_BUCKET') || `${projectId}.firebasestorage.app`,
    messagingSenderId: env('VITE_FIREBASE_MESSAGING_SENDER_ID') || '',
    appId: env('VITE_FIREBASE_APP_ID') || '',
    measurementId: env('VITE_FIREBASE_MEASUREMENT_ID') || undefined,
    firestoreDatabaseId: env('VITE_FIREBASE_FIRESTORE_DATABASE_ID') || undefined,
  };
}

export function isFirebaseConfigured(): boolean {
  return readFirebaseClientConfig() !== null;
}
