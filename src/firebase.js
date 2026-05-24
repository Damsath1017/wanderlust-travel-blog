import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Safe fallbacks to prevent Vite from crashing if keys are not configured yet
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key-for-development-purposes",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wanderlust-travel-blog.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wanderlust-travel-blog",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wanderlust-travel-blog.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Export a helper flag to check if authentication is active
export const isAuthReady = !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== "dummy-api-key-for-development-purposes");
