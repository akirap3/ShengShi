import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  addDoc,
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
  Timestamp,
  increment,
  limit,
  startAfter,
  GeoPoint,
} from 'firebase/firestore';

import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

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
export const storage = getStorage();

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
  imageSize,
  setIsLoading,
  history
) => {
  await setDoc(doc(db, 'users', uid), {
    displayName,
    email,
    alias: displayName,
    createdAt: Timestamp.now(),
    imageUrl:
      `${photoURL}${imageSize}` ||
      'https://firebasestorage.googleapis.com/v0/b/shengshi-8bc48.appspot.com/o/images%2Fusers%2FdefaultAvatar.png?alt=media&token=475cb8f7-dc3b-456e-b36e-fb66a8a06012',
    myPoints: 0,
    myPlace: '',
  });
  setIsLoading(false);
  history.push('/personal/list');
};

export const getCurrentUserData = (currentUser, setUserData) => {
  if (currentUser) {
    return onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
      setUserData({ ...doc.data(), id: doc.id });
    });
  }
};

export const logOut = () => {
  return signOut(auth);
};

export const handleDeleteMember = () => {
  deleteUser(auth.currentUser);
};

export const handleUpdateMember = async (
  checkFields,
  setIsLoading,
  currentUser,
  file,
  initialUserData,
  setDisplayName,
  setAlias,
  setPhone,
  setMyPlace,
  setAbout,
  setFile
) => {
  if (checkFields()) {
    setIsLoading(true);
    const docRef = doc(db, 'users', currentUser.uid);
    const fileRef = ref(storage, `images/users/${docRef.id}`);
    const metadata = {
      contentType: file.type,
    };
    const uplaodTask = await uploadBytes(fileRef, file, metadata);
    const imageUrl = await getDownloadURL(uplaodTask.ref);
    initialUserData.imageUrl = imageUrl || '';
    await updateDoc(docRef, initialUserData);
    setIsLoading(false);
    setDisplayName('');
    setAlias('');
    setPhone('');
    setMyPlace('');
    setAbout('');
    setFile(null);
  }
};

export const handleDeleteShare = async (
  setIsLoading,
  content,
  closeDelete,
  currentUser
) => {
  setIsLoading(true);
  const deleteImgFileRef = ref(storage, `images/shares/${content?.id}`);
  await deleteObject(deleteImgFileRef);
  await deleteDoc(doc(db, 'shares', content?.id));
  await updateDoc(doc(db, 'users', currentUser.uid), {
    myPoints: increment(-10),
  });

  handleDeleteBadge(currentUser.uid);
  setIsLoading(false);
  closeDelete();
};

export const handleArchiveShare = async (
  setIsLoading,
  share,
  closeDelete,
  currentUser,
  userData
) => {
  share.toReceiveUserId.forEach(async (userId) => {
    await addDoc(collection(db, `users/${userId}/messages`), {
      createdAt: Timestamp.now(),
      messageContent: `${userData.displayName}已經將"${
        share.name
      }"封存，故您原預定${share.toReceiveInfo[userId].upcomingTimestamp
        .toDate()
        .toLocaleString()}將自動取消`,
      kind: 'archived',
    });
  });

  const docRef = doc(db, 'shares', share.id);
  await updateDoc(docRef, {
    isArchived: true,
    toReceiveInfo: {},
    toReceiveUserId: [],
  });

  if (share.receivedUserId.length === 0) handleDeleteBadge(currentUser.uid);
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

export const handleDeleteExchange = async (shareId, requesterId, qty) => {
  await updateDoc(doc(db, 'shares', shareId), {
    [`toReceiveInfo.${requesterId}`]: deleteField(),
    toReceiveUserId: arrayRemove(requesterId),
    bookedQuantities: increment(-qty),
  });
  return 'done';
};

export const handleDeleteCollected = async (
  setIsLoading,
  content,
  closeDelete
) => {
  setIsLoading(true);
  const docRef = doc(db, 'shares', content?.id);
  await updateDoc(docRef, {
    savedUserId: arrayRemove(auth.currentUser.uid),
  });
  setIsLoading(false);
  closeDelete();
};

export const handleConfirmation = async (
  isFieldsChecked,
  share,
  specificDateTime,
  setIsLoading,
  currentUser,
  reqQuantities,
  handleSpecificDateTime,
  openConfirmation,
  closeEditor
) => {
  if (isFieldsChecked(share, specificDateTime)) {
    setIsLoading(true);
    const docRef = doc(db, 'shares', share.id);
    await updateDoc(docRef, {
      toReceiveUserId: arrayUnion(currentUser.uid),
      [`toReceiveInfo.${currentUser.uid}`]: {
        quantities: Number(reqQuantities) || 1,
        upcomingTimestamp: Timestamp.fromDate(specificDateTime),
      },
      bookedQuantities: increment(Number(reqQuantities) || 1),
    });
    setIsLoading(false);
    handleSpecificDateTime(null);
    openConfirmation();
    closeEditor();
  }
};

export const handleDeleteDocument = async (currentUser, messageId) => {
  await deleteDoc(doc(db, `users/${currentUser.uid}/messages`, messageId));
};

export const observeUserChange = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const handleCollection = async (
  content,
  collectionName,
  currentUser
) => {
  const docRef = doc(db, collectionName, content.id);
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

export const getSpecificContents = (
  collectionName,
  field,
  operator,
  orederSeq,
  currentUser,
  setContents
) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where(field, operator, currentUser.uid),
      orderBy('createdAt', orederSeq)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const specificContents = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setContents(specificContents);
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

export const getSearchedOrderedContents = (
  collectionName,
  field,
  operator,
  keywords,
  setContents,
  lastPostSnapshotRef,
  isNext,
  articles
) => {
  const q = !isNext
    ? query(
        collection(db, collectionName),
        where(field, operator, keywords),
        orderBy('createdAt', 'desc'),
        limit(4)
      )
    : query(
        collection(db, collectionName),
        where(field, operator, keywords),
        orderBy('createdAt', 'desc'),
        limit(4),
        startAfter(lastPostSnapshotRef.current)
      );

  onSnapshot(q, (querySnapshot) => {
    const specificContents = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    lastPostSnapshotRef.current =
      querySnapshot.docs[querySnapshot.docs.length - 1];
    if (!isNext) {
      setContents(specificContents);
    } else {
      setContents([...articles, ...specificContents]);
    }
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

export const getCountsTwoFiltered = (
  collectionName,
  field,
  field2,
  operator,
  operator2,
  currentUser,
  value,
  setCount
) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where(field, operator, currentUser.uid),
      where(field2, operator2, value)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const count = querySnapshot.docs.length;
      setCount(count);
    });

    return unsubscribe;
  }
};

export const getCollectionCounts = (collectionName, setCount) => {
  const q = query(collection(db, collectionName));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const count = querySnapshot.docs.length;
    setCount(count);
  });

  return unsubscribe;
};

export const getSingleShare = async (docId) => {
  const docRef = doc(db, 'shares', docId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docId };
};

export const getListenedSingleContent = (collectionName, docId, setContent) => {
  const unsubscribe = onSnapshot(doc(db, collectionName, docId), (doc) => {
    if (doc._document) {
      setContent({ ...doc.data(), id: docId });
    } else {
      setContent(undefined);
    }
  });
  return unsubscribe;
};

export const getAllContents = (collectionName, setContents) => {
  const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const contents = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setContents(contents);
  });

  return unsubscribe;
};

export const getAllOrderedContents = (
  collectionName,
  field,
  setContents,
  lastPostSnapshotRef,
  isNext,
  OriContents
) => {
  const q = !isNext
    ? query(collection(db, collectionName), orderBy(field, 'desc'), limit(4))
    : query(
        collection(db, collectionName),
        orderBy(field, 'desc'),
        limit(4),
        startAfter(lastPostSnapshotRef.current)
      );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const contents = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    lastPostSnapshotRef.current =
      querySnapshot.docs[querySnapshot.docs.length - 1];
    if (!isNext) {
      setContents(contents);
    } else {
      setContents([...OriContents, ...contents]);
    }
  });

  return unsubscribe;
};

export const getAllOtherShares = (collectionName, setContents, currentUser) => {
  if (currentUser) {
    const q = query(
      collection(db, collectionName),
      where('postUser.id', '!=', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contents = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const NonzeroContents = contents.filter(
        (content) => content.quantities > 0
      );
      setContents(NonzeroContents);
    });

    return unsubscribe;
  }
};

export const getAllOrderedOtherShares = (
  collectionName,
  setContents,
  currentUser,
  lastPostSnapshotRef,
  isNext,
  oriContents
) => {
  if (currentUser) {
    const q = !isNext
      ? query(
          collection(db, collectionName),
          where('postUser.id', '!=', currentUser.uid),
          limit(4)
        )
      : query(
          collection(db, collectionName),
          where('postUser.id', '!=', currentUser.uid),
          limit(4),
          startAfter(lastPostSnapshotRef.current)
        );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contents = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      lastPostSnapshotRef.current =
        querySnapshot.docs[querySnapshot.docs.length - 1];

      const NonzeroContents = contents.filter(
        (content) => content.quantities > 0
      );
      if (!isNext) {
        setContents(NonzeroContents);
      } else {
        setContents([...oriContents, ...NonzeroContents]);
      }
    });

    return unsubscribe;
  }
};

export const updateAfterExchanged = async (
  shareId,
  requesterId,
  qty,
  dateTime,
  currentUser
) => {
  await updateDoc(doc(db, 'users', currentUser.uid), {
    myPoints: increment(10),
  });

  await updateDoc(doc(db, 'users', requesterId), {
    myPoints: increment(10),
  });

  await updateDoc(doc(db, 'shares', shareId), {
    bookedQuantities: increment(-qty),
    quantities: increment(-qty),
    [`receivedInfo.${requesterId}`]: {
      quantities: qty,
      confirmedTimestamp: Timestamp.fromDate(dateTime),
    },
    receivedUserId: arrayUnion(requesterId),
    [`toReceiveInfo.${requesterId}`]: deleteField(),
    toReceiveUserId: arrayRemove(requesterId),
  });

  return 'done';
};

const badgeDocRefs = {
  badge1: doc(db, 'badges', '87LS0XYXT8nBbACyzZ5i'),
  badge2: doc(db, 'badges', 'loR5fESvH23BdVeaVse6'),
  badge3: doc(db, 'badges', 'SYgzpa1pCp8tCCjMTYNJ'),
  badge4: doc(db, 'badges', 'WffkQj2cNQr4fA2B0i7L'),
  badge5: doc(db, 'badges', '2bjwxx2RiLOBNVMdeF1S'),
  badge6: doc(db, 'badges', 'uMtENEnLpNfM9USZGzZR'),
  badge7: doc(db, 'badges', 'P14Kiv3vsBPXwKi7jP4F'),
  badge8: doc(db, 'badges', 'rkAbb7ljdCgOopdV9sCZ'),
  badge9: doc(db, 'badges', 'lYpT2XjS9yeqYwUD6riZ'),
};

export const handleAddBadge = async (currentUserUid) => {
  const currentUserDocRef = doc(db, 'users', currentUserUid);
  const userSnap = await getDoc(currentUserDocRef);
  const points = userSnap.data().myPoints;

  const addBadgeOwner = (docRef) => {
    updateDoc(docRef, {
      ownedBy: arrayUnion(currentUserUid),
    });
  };

  const sendMessage = (points, badgeName) => {
    addDoc(collection(db, `users/${currentUserUid}/messages`), {
      createdAt: Timestamp.now(),
      messageContent: `您的積點達到${points}，恭喜獲得${badgeName}`,
      kind: 'badge',
    });
  };

  const hasBadge = async (docRef) => {
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data().ownedBy.includes(currentUserUid);
  };

  if (points >= 10 && points < 30) {
    hasBadge(badgeDocRefs.badge1).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge1);
        sendMessage(10, '勳章1');
      }
    });
  } else if (points >= 30 && points < 50) {
    hasBadge(badgeDocRefs.badge2).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge2);
        sendMessage(30, '勳章2');
      }
    });
  } else if (points >= 50 && points < 100) {
    hasBadge(badgeDocRefs.badge3).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge3);
        sendMessage(50, '勳章3');
      }
    });
  } else if (points >= 100 && points < 150) {
    hasBadge(badgeDocRefs.badge4).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge4);
        sendMessage(100, '勳章4');
      }
    });
  } else if (points >= 150 && points < 180) {
    hasBadge(badgeDocRefs.badge5).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge5);
        sendMessage(150, '勳章5');
      }
    });
  } else if (points >= 180 && points < 200) {
    hasBadge(badgeDocRefs.badge6).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge6);
        sendMessage(180, '勳章6');
      }
    });
  } else if (points >= 200 && points < 300) {
    hasBadge(badgeDocRefs.badge7).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge7);
        sendMessage(200, '勳章7');
      }
    });
  } else if (points >= 300 && points < 500) {
    hasBadge(badgeDocRefs.badge8).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge8);
        sendMessage(300, '勳章8');
      }
    });
  } else if (points >= 500) {
    hasBadge(badgeDocRefs.badge9).then((result) => {
      if (!result) {
        addBadgeOwner(badgeDocRefs.badge9);
        sendMessage(500, '勳章9');
      }
    });
  }
};

export const handleDeleteBadge = async (currentUserUid) => {
  const currentUserDocRef = doc(db, 'users', currentUserUid);
  const userSnap = await getDoc(currentUserDocRef);
  const points = userSnap.data().myPoints;

  const deleteBadgeOwner = (docRef) => {
    updateDoc(docRef, {
      ownedBy: arrayRemove(currentUserUid),
    });
  };

  const sendMessage = (points, badgeName) => {
    addDoc(collection(db, `users/${currentUserUid}/messages`), {
      createdAt: Timestamp.now(),
      messageContent: `您的積點低於${points}，${badgeName}已被刪除`,
      kind: 'badge',
    });
  };

  const hasBadge = async (docRef) => {
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data().ownedBy.includes(currentUserUid);
  };

  if (points < 10) {
    hasBadge(badgeDocRefs.badge1).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge1);
        sendMessage(10, '勳章1');
      }
    });
  } else if (points >= 10 && points < 30) {
    hasBadge(badgeDocRefs.badge2).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge2);
        sendMessage(30, '勳章2');
      }
    });
  } else if (points >= 30 && points < 50) {
    hasBadge(badgeDocRefs.badge3).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge3);
        sendMessage(50, '勳章3');
      }
    });
  } else if (points >= 50 && points < 100) {
    hasBadge(badgeDocRefs.badge4).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge4);
        sendMessage(100, '勳章4');
      }
    });
  } else if (points >= 100 && points < 150) {
    hasBadge(badgeDocRefs.badge5).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge5);
        sendMessage(150, '勳章5');
      }
    });
  } else if (points >= 150 && points < 180) {
    hasBadge(badgeDocRefs.badge6).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge6);
        sendMessage(180, '勳章6');
      }
    });
  } else if (points >= 180 && points < 200) {
    hasBadge(badgeDocRefs.badge7).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge7);
        sendMessage(200, '勳章7');
      }
    });
  } else if (points >= 200 && points < 300) {
    hasBadge(badgeDocRefs.badge8).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge8);
        sendMessage(300, '勳章8');
      }
    });
  } else if (points >= 300 && points < 500) {
    hasBadge(badgeDocRefs.badge9).then((result) => {
      if (result) {
        deleteBadgeOwner(badgeDocRefs.badge9);
        sendMessage(500, '勳章9');
      }
    });
  }
};

export const onCommentSubmit = async (
  share,
  userData,
  replyComment,
  currentUser,
  setReplayComment,
  setErrorMessage,
  setShowErrorMessage
) => {
  if (replyComment) {
    await addDoc(collection(db, `shares/${share.id}/comments`), {
      createdAt: Timestamp.now(),
      commentContent: replyComment,
      author: {
        id: currentUser.uid,
        displayName: userData.displayName,
        imageUrl: userData.imageUrl,
      },
    });

    await addDoc(collection(db, `users/${share.postUser.id}/messages`), {
      createdAt: Timestamp.now(),
      messageContent: `${userData.displayName}在您的${share.name}勝食頁面上留言`,
      kind: 'comment',
    });

    setReplayComment('');
    setErrorMessage('');
    setShowErrorMessage(false);
  } else {
    setShowErrorMessage(true);
    setErrorMessage('留言不能是空白');
  }
};

export const handleConfirmCommentEdit = async (
  editedComment,
  share,
  comment,
  setEditedComment,
  setIsEdit,
  setErrorMessage,
  setShowErrorMessage
) => {
  if (editedComment) {
    await updateDoc(doc(db, `shares/${share.id}/comments`, `${comment.id}`), {
      commentContent: editedComment,
      createdAt: Timestamp.now(),
    });
    setEditedComment('');
    setIsEdit(false);
    setErrorMessage('');
    setShowErrorMessage(false);
  } else {
    setShowErrorMessage(true);
    setErrorMessage('留言不能是空白');
  }
};

export const handleDeleteComment = async (share, comment, userData) => {
  await deleteDoc(doc(db, `shares/${share.id}/comments`, `${comment.id}`));

  await addDoc(collection(db, `users/${share.postUser.id}/messages`), {
    createdAt: Timestamp.now(),
    messageContent: `${userData.displayName}在您的${share.name}勝食頁面上刪除留言`,
    kind: 'comment',
  });
};

export const handleConfirmShare = (
  shareId,
  requesterId,
  share,
  currentUser,
  setAlertMessage,
  openInfo
) => {
  updateAfterExchanged(
    shareId,
    requesterId,
    share?.toReceiveInfo[`${requesterId}`].quantities,
    new Date(),
    currentUser
  ).then(() => {
    handleAddBadge(currentUser.uid);
    handleAddBadge(requesterId);
    setAlertMessage('您已確認對方領取完勝食');
    openInfo();
  });
};

export const handleCancelShare = (
  shareId,
  requesterId,
  share,
  currentUser,
  setAlertMessage,
  openInfo
) => {
  handleDeleteExchange(
    shareId,
    requesterId,
    share?.toReceiveInfo[`${requesterId}`].quantities
  ).then(() => {
    handleDeleteBadge(currentUser.uid);
    handleDeleteBadge(requesterId);
    setAlertMessage('您已確認對方取消勝食');
    openInfo();
  });
};

export const handleEditSubmit = async (
  isOK,
  setIsLoaging,
  share,
  file,
  address,
  fromToDateTime,
  quantities,
  foodName,
  latLng,
  closeEditor,
  handleLatLng,
  handleAddress,
  setFile
) => {
  if (isOK()) {
    setIsLoaging(true);
    const docRef = doc(db, 'shares', share.id);
    const fileRef = ref(storage, `images/shares/${share.id}`);
    const metadata = {
      contentType: file.type,
    };
    const uplaodTask = await uploadBytes(fileRef, file, metadata);
    const imageUrl = await getDownloadURL(uplaodTask.ref);
    await updateDoc(docRef, {
      exchangePlace: address,
      fromTimeStamp: Timestamp.fromDate(fromToDateTime[0]),
      toTimeStamp: Timestamp.fromDate(fromToDateTime[1]),
      imageUrl,
      quantities: Number(quantities),
      name: foodName,
      createdAt: Timestamp.fromDate(new Date()),
      exchangeLocation: new GeoPoint(latLng[0], latLng[1]),
    });
    setIsLoaging(false);
    closeEditor();
    handleLatLng([]);
    handleAddress('');
    setFile(null);
  }
};

export const handleUpdateSubmit = async (
  isFieldsChecked,
  share,
  setIsLoading,
  currentUser,
  newQuantities,
  specificDateTime,
  handleSpecificDateTime,
  closeUpdate
) => {
  if (isFieldsChecked(share)) {
    setIsLoading(true);
    const docRef = doc(getFirestore(), 'shares', share.id);
    const updateQuantities = `toReceiveInfo.${currentUser.uid}.quantities`;
    const updateUpcomingTimestamp = `toReceiveInfo.${currentUser.uid}.upcomingTimestamp`;
    await updateDoc(docRef, {
      [updateQuantities]: newQuantities,
      [updateUpcomingTimestamp]: Timestamp.fromDate(specificDateTime),
    });
    setIsLoading(false);
    handleSpecificDateTime(null);
    closeUpdate();
  }
};

export const handleAddShareSubmit = async (
  isOK,
  setIsLoading,
  file,
  address,
  fromToDateTime,
  quantities,
  foodName,
  currentUser,
  userData,
  latLng,
  closeEditor,
  handleLatLng,
  handleAddress,
  handleFromToDateTime,
  setFile
) => {
  if (isOK()) {
    setIsLoading(true);
    const docRef = doc(collection(db, `shares`));
    const fileRef = ref(storage, `images/shares/${docRef.id}`);

    const metadata = {
      contentType: file.type,
    };

    const uplaodTask = await uploadBytes(fileRef, file, metadata);
    const imageUrl = await getDownloadURL(uplaodTask.ref);
    await setDoc(
      docRef,
      {
        exchangePlace: address,
        fromTimeStamp: Timestamp.fromDate(fromToDateTime[0]),
        toTimeStamp: Timestamp.fromDate(fromToDateTime[1]),
        imageUrl,
        quantities: Number(quantities),
        name: foodName,
        postUser: {
          id: currentUser.uid,
          displayName: userData.displayName,
        },
        rating: 5,
        createdAt: Timestamp.fromDate(new Date()),
        userLocation: userData.myPlace || '未提供',
        exchangeLocation: new GeoPoint(latLng[0], latLng[1]),
        receivedInfo: {},
        receivedUserId: [],
        toReceiveInfo: {},
        toReceiveUserId: [],
        savedUserId: [],
        bookedQuantities: 0,
        isArchived: false,
      },
      { merge: true }
    );

    await updateDoc(doc(getFirestore(), 'users', currentUser.uid), {
      myPoints: increment(10),
    });

    handleAddBadge(currentUser.uid);
    setIsLoading(false);
    closeEditor();
    handleLatLng([]);
    handleAddress('');
    handleFromToDateTime();
    setFile(null);
  }
};
