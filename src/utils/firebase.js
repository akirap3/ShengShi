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
} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP__FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP__FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP__FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP__FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
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
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('You have logged in our website!!');
    })
    .catch((error) => {
      alert(error.message);
    });
};

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const loginWithProvider = (provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Hi, ${user.displayName}`);
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // console.log(user, accessToken);
    })
    .catch((error) => {
      alert(error.message);
      //   handleDiffCredential(error);
    });
};

export const loginWithFB = () => {
  loginWithProvider(fbProvider);
};

export const loginWithGoogle = () => {
  loginWithProvider(googleProvider);
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
  signOut(auth)
    .then(() => {
      console.log('Log out successfully!');
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const fetchRestaurants = async () => {
  const restaurantArr = [];
  const querySnapshot = await getDocs(collection(db, 'restaurants'));
  querySnapshot.forEach((doc) => restaurantArr.push(doc.data()));
  return restaurantArr;
};
