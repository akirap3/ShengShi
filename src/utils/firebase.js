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
  deleteUser,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  onSnapshot,
  query,
  where,
  deleteField,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';

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
  return createUserWithEmailAndPassword(auth, email, password);
};

export const handleSignUpWithEmail = async (initialUserData, uid) => {
  initialUserData.imageUrl =
    'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Fusers%2FdefaultAvatar.png?alt=media&token=475cb8f7-dc3b-456e-b36e-fb66a8a06012';
  await setDoc(doc(db, 'users', uid), initialUserData);
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

export const handleSignUpWithProvider = async (
  displayName,
  email,
  uid,
  photoURL,
  imageSize
) => {
  await setDoc(doc(db, 'users', uid), {
    displayName,
    email,
    alias: displayName,
    imageUrl:
      `${photoURL}${imageSize}` ||
      'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Fusers%2FdefaultAvatar.png?alt=media&token=475cb8f7-dc3b-456e-b36e-fb66a8a06012',
    myPoints: 0,
    myPlace: '',
  });
};

export const getCurrentUserData = (currentUser, setUserData) => {
  if (currentUser) {
    return onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      setUserData(doc.data());
    });
  }
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

export const handleDeleteMember = () => {
  deleteUser(auth.currentUser);
};

export const handleDeleteShare = async (setIsLoading, content, closeDelete) => {
  setIsLoading(true);
  const deleteImgFileRef = ref(getStorage(), `images/shares/${content?.id}`);
  await deleteObject(deleteImgFileRef);
  await deleteDoc(doc(getFirestore(), 'shares', content?.id));
  setIsLoading(false);
  closeDelete();
};

export const handleDeleteToReceive = async (
  setIsLoading,
  content,
  closeDelete
) => {
  setIsLoading(true);
  const docRef = doc(db, 'shares', content?.id);
  await updateDoc(docRef, {
    [`toReceiveInfo.${auth.currentUser.uid}`]: deleteField(),
    toReceiveUserId: arrayRemove(auth.currentUser.uid),
  });
  setIsLoading(false);
  closeDelete();
};

export const handleDeleteCollected = async (
  setIsLoading,
  content,
  closeDelete
) => {
  setIsLoading(true);
  const docRef = doc(getFirestore(), 'shares', content?.id);
  await updateDoc(docRef, {
    savedUserId: arrayRemove(auth.currentUser.uid),
  });
  setIsLoading(false);
  closeDelete();
};

const fetchAllDocs = async (collectionName) => {
  const arr = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
  return arr;
};

export const fetchArticles = async () => {
  return fetchAllDocs('articles');
};

export const observeUserChange = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const handleCollection = async (
  content,
  collectionName,
  currentUser
) => {
  const docRef = doc(getFirestore(), collectionName, content.id);
  if (content?.savedUserId?.includes(currentUser.uid)) {
    await updateDoc(docRef, {
      savedUserId: arrayRemove(currentUser.uid),
    });
  } else {
    await updateDoc(docRef, {
      savedUserId: arrayUnion(currentUser.uid),
    });
  }
};

export const getSpecificShares = (
  collectionName,
  field,
  operator,
  currentUser,
  setShares
) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where(field, operator, currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const specificShares = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setShares(specificShares);
    });

    return unsubscribe;
  }
};

export const getSpecificContents = (
  collectionName,
  field,
  operator,
  currentUser,
  setShares
) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where(field, operator, currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const specificShares = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setShares(specificShares);
    });

    return unsubscribe;
  }
};

export const getSearchedContents = (
  collectionName,
  field,
  operator,
  keywords,
  setContents
) => {
  const q = query(
    collection(db, collectionName),
    where(field, operator, keywords)
  );
  onSnapshot(q, (querySnapshot) => {
    const specificContents = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setContents(specificContents);
  });
};

export const getContentCounts = (
  collectionName,
  field,
  operator,
  currentUser,
  setCount
) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where(field, operator, currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const count = querySnapshot.docs.length;
      setCount(count);
    });

    return unsubscribe;
  }
};

export const getSingleShare = async (docId) => {
  const docRef = doc(db, 'shares', docId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docId };
};

export const getAllContents = (collectionName, setContents) => {
  const q = query(collection(db, collectionName));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const contents = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setContents(contents);
  });

  return unsubscribe;
};

export const getAllOtherShares = (collectionName, setContents, currentUser) => {
  console.log(currentUser);
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where('postUser.id', '!=', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contents = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setContents(contents);
    });

    return unsubscribe;
  }
};
