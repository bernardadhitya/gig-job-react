import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './env';

firebase.initializeApp(firebaseConfig);
const fireAuth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage().ref();

export const signIn = async (email, password) => {
  let userData = {};
  fireAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      userData = getUserByEmail(email);
      console.log('SUCCESS SIGN IN');
    })
    .catch(error => console.log('FAILED SIGNIN'))
  return userData;
}

export const fetchCurrentUser = async () => {
  const isLoggedIn = fireAuth.currentUser;
  const userData = isLoggedIn ? await getUserByEmail(isLoggedIn.email) : null;
  return isLoggedIn ? userData[0] : userData;
}

export const getUserByEmail = async (email) => {
  const response = await db.collection('users').where("email", "==", email).get();
  const data = response.docs.map(doc => {
      const responseId = doc.id;
      const responseData = doc.data();
      return { user_id: responseId, ...responseData }
  });
  return data;
}

export const getAllJobs = async () => {
  const response = await db.collection('jobs').where('status', '==', 'ACTIVE-JOB').get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { job_id: responseId, ...responseData }
  });
  return data;
}

export const getJobsByUserId = async (userId) => {
  const response = await db.collection('jobs').where('provider.id', '==', userId).get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { job_id: responseId, ...responseData }
  });
  return data;
}

export const getJobsByUserIdAndStatus = async (userId, status) => {
  const response = await db.collection('jobs')
    .where('status', '==', status)
    .where('provider.id', '==', userId)
    .get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { job_id: responseId, ...responseData }
  });
  return data;
}

export const getJobsByCurrentUserId = async () => {
  const fetchedCurrentUser = await fetchCurrentUser();
  if (!fetchedCurrentUser) return [];
  const fetchedJobsByCurrentUser = await getJobsByUserId(fetchedCurrentUser.user_id);
  return fetchedJobsByCurrentUser;
}

export const getJobsByCurrentUserIdAndStatus = async (status) => {
  const fetchedCurrentUser = await fetchCurrentUser();
  if (!fetchedCurrentUser) return [];
  const fetchedJobsByCurrentUser = status === 'ALL' ?
    await getJobsByUserId(fetchedCurrentUser.user_id) :
    await getJobsByUserIdAndStatus(fetchedCurrentUser.user_id, status);
  return fetchedJobsByCurrentUser;
}

export const getUserById = async (userId) => {
  const response = await db.collection('users').doc(userId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { user_id: responseId, ...responseData };
}

export const getJobById = async (jobId) => {
  const response = await db.collection('jobs').doc(jobId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { job_id: responseId, ...responseData };
}

export const getProfileByUserId = async (userId) => {
  const response = await db.collection('profiles').where("user_id", "==", userId).get();
  const data = response.docs.map(doc => {
      const responseId = doc.id;
      const responseData = doc.data();
      return { user_id: responseId, ...responseData }
  });
  console.log(data);
  return data[0];
}

export const createRequestPost = async (requestData) => {
  const currentUser = await fetchCurrentUser();
  await db.collection('requests').add({
    ...requestData,
    requester: {
      id: currentUser.user_id,
      name: currentUser.name
    },
    status: 'WAITING-CONFIRMATION'
  });
}

export const getRequestsByStatus = async (user_id, status) => {
  const response = status === 'ALL' ?
    await db.collection('requests')
      .where('requester.id', '==', user_id)
      .get() :
    await db.collection('requests')
      .where('status', '==', status)
      .where('requester.id', '==', user_id)
      .get();
  const data = response.docs.map(doc => {
    const responseId = doc.id;
    const responseData = doc.data();
    return { request_id: responseId, ...responseData }
  });
  return data;
}

