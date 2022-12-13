// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, 
          signInWithRedirect, 
          signInWithPopup, 
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          GoogleAuthProvider,
          signOut,
          onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbsEU9H-WphV9AycjgDDXCHIvy9iO9X0I",
  authDomain: "crwn-clothing-db-cf48b.firebaseapp.com",
  projectId: "crwn-clothing-db-cf48b",
  storageBucket: "crwn-clothing-db-cf48b.appspot.com",
  messagingSenderId: "415447146164",
  appId: "1:415447146164:web:26ae3e26fc88321040c1e1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
        prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={} ) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);