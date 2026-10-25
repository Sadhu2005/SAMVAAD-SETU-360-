import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

/** Browser Storage uploads need a bucket CORS policy. Off by default so voice/photo persist as data URLs. */
export function shouldUploadToFirebaseStorage(): boolean {
  return (
    import.meta.env.VITE_FIREBASE_STORAGE_UPLOADS === 'true' &&
    isFirebaseConfigured() &&
    Boolean(storage)
  );
}

export async function uploadTicketMedia(
  trackingId: string,
  kind: 'voice' | 'photo' | 'proof',
  dataUrl: string
): Promise<string> {
  if (shouldUploadToFirebaseStorage() && dataUrl.startsWith('data:')) {
    try {
      const path = `tickets/${trackingId}/${kind}-${Date.now()}`;
      const storageRef = ref(storage!, path);
      await uploadString(storageRef, dataUrl, 'data_url');
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.warn('Storage upload failed, using inline fallback:', err);
    }
  }
  return dataUrl;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
