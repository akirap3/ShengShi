import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

auth.languageCode = 'it';

export const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      alert(`You have signed up with ${userCredential.user.email}`);
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export const loginWithFB = () => {
  return signInWithPopup(auth, fbProvider);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// const handleDiffCredential = (error) => {
//   if (error.code === 'auth/account-exists-with-different-credential') {
//     const pendingCred = error.credential;
//     const email = error.email;
//     fetchSignInMethodsForEmail(auth, email).then((methods) => {
//       if (methods[0] === 'password') {
//         // need to promptUserForPassword() asynchronously
//         const password = promptUserForPassword();
//         signInWithEmailAndPassword(auth, email, password)
//           .then((result) => {
//             return result.user.linkWithCredential(pendingCred);
//           })
//           .then(() =>
//             console.log('successfully linked to the existing Firebase user.')
//           );
//         return;
//       }
//       const provider = getProviderForProviderId(methods[0]);
//       signInWithPopup(auth, provider).then((result) => {
//         result.user
//           .linkAndRetrieveDataWithCredential(pendingCred)
//           .then((usercred) => {
//             console.log('go to my website');
//           });
//       });
//     });
//   }
// };

export const logOut = () => {
  return signOut(auth);
};

const fetchAllDocs = async (collectionName) => {
  const arr = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => arr.push(doc.data()));
  return arr;
};

export const fetchRestaurants = async () => {
  return fetchAllDocs('restaurants');
};

export const fetchShares = async () => {
  return fetchAllDocs('shares');
};

export const fetchArticles = async () => {
  return fetchAllDocs('articles');
};

export const observeUserChange = (callback) => {
  onAuthStateChanged(auth, callback);
};
