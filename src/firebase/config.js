import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDG4-1lfHHX4WJ9liXo3f1y0X_YBoOHUWk",
  authDomain: "cryptocurrency-price-tra-11106.firebaseapp.com",
  projectId: "cryptocurrency-price-tra-11106",
  storageBucket: "cryptocurrency-price-tra-11106.firebasestorage.app",
  messagingSenderId: "274450362896",
  appId: "1:274450362896:web:496fdb1f042268ee7d1095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
      favorites: [],
      createdAt: new Date().toISOString()
    });
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Favorites functions
export const addToFavorites = async (userId, crypto) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: arrayUnion({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        image: crypto.image,
        addedAt: new Date().toISOString()
      })
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const removeFromFavorites = async (userId, cryptoId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const currentFavorites = userDoc.data()?.favorites || [];
    const favoriteToRemove = currentFavorites.find(fav => fav.id === cryptoId);
    
    if (favoriteToRemove) {
      await updateDoc(userRef, {
        favorites: arrayRemove(favoriteToRemove)
      });
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getFavorites = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return { success: true, favorites: userDoc.data()?.favorites || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};