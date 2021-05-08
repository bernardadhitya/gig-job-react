import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './env';

firebase.initializeApp(firebaseConfig);
const fireAuth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage().ref();

export const signUp = async (email, password, name) => {
  let userData = {};
  fireAuth.createUserWithEmailAndPassword(email, password)
    .then(async data => {
      userData = await createUser(data.uid, {name, email});
      console.log('SUCCESS SIGN UP');
    })
    .catch(error => console.log('FAILED SIGNUP'));
  return userData;
}

export const signIn = async (email, password) => {
  let userData = {};
  fireAuth.signInWithEmailAndPassword(email, password)
    .then(async () => {
      userData = await getUserByEmail(email);
      console.log('SUCCESS SIGN IN');
    })
    .catch(error => console.log('FAILED SIGNIN'))
  return userData;
}

export const signOut = async () => {
  fireAuth.signOut();
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

export const createUser = async (userId, userData) => {
  const user = await db.collection('users').doc(userId).set(userData);
  return user;
}

export const uploadImage = async (file, job) => {
  storage.child(`/${job.id}/${file.name}`).put(file);
}

export const createJobPost = async (jobData, image) => {
  const currentUser = await fetchCurrentUser();
  const job = await db.collection('jobs').add({
    ...jobData,
    provider: {
      id: currentUser.user_id,
      name: currentUser.name
    },
    status: 'ACTIVE-JOB'
  });
  console.log(job);
  await uploadImage(image, job);
}

export const getImageUrlByImageRef = async (imageRef) => {
  const response = await imageRef.getDownloadURL().then((url) => {
    return url;
  }).catch(function (error) {
    console.log(error)
  });
  return response;
}

export const getImageByJobId = async (jobId) => {
  const doc = await db.collection('jobs').doc(jobId).get();
  console.log(doc.data().filePath);
  if (doc.data().filePath === '') return '';
  const fpath = '/' + jobId + '/' + doc.data().filePath;
  const response = await storage.child(fpath).getDownloadURL().then((url) => {
    console.log(url);
    return url;
  }).catch(function (error) {
    return '';
  });
  return response;
}

export const getAllJobs = async () => {
  const getAllId = async () => {
    const responses = await db.collection('jobs').where('status', '==', 'ACTIVE-JOB').get();
    const data = responses.docs.map(doc => doc.id);
    return data;
  }
  const allId = await getAllId();
  const getAllPost = async (jobIds) => {
    return Promise.all(
      jobIds.map(async (jobId) => {
        const jobPost = await getJobById(jobId)
        const imageUrl = await getImageByJobId(jobId)
        return { ...jobPost, imageUrl };
      })
    );
  };
  const allJobs = await getAllPost(allId);
  return allJobs;
}

export const getJobsByUserId = async (userId) => {
  const getAllId = async () => {
    const responses = await db.collection('jobs').where('provider.id', '==', userId).get();
    const data = responses.docs.map(doc => doc.id);
    return data;
  }
  const allId = await getAllId();
  const getAllPost = async (jobIds) => {
    return Promise.all(
      jobIds.map(async (jobId) => {
        const jobPost = await getJobById(jobId)
        const imageUrl = await getImageByJobId(jobId)
        return { ...jobPost, imageUrl };
      })
    );
  };
  const allJobs = await getAllPost(allId);
  return allJobs;
}

export const getJobsByUserIdAndStatus = async (userId, status) => {
  const getAllId = async () => {
    const responses = await db.collection('jobs')
      .where('status', '==', status)
      .where('provider.id', '==', userId)
      .get();
    const data = responses.docs.map(doc => doc.id);
    return data;
  }
  const allId = await getAllId();
  const getAllPost = async (jobIds) => {
    return Promise.all(
      jobIds.map(async (jobId) => {
        const jobPost = await getJobById(jobId)
        const imageUrl = await getImageByJobId(jobId)
        return { ...jobPost, imageUrl };
      })
    );
  };
  const allJobs = await getAllPost(allId);
  return allJobs;
}

export const updateJobPost = async (jobId, data) => {
  const response = await db.collection('jobs').doc(jobId).update({status: data})
  return response;
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
      return { profile_id: responseId, ...responseData }
  });
  console.log(data);
  return data[0];
}

export const createOrUpdateProfile = async (profileData, userId) => {
  const profileExist = await getProfileByUserId(userId);
  let response;
  if(!!profileExist){
    response = await db.collection('profiles').doc(profileExist.profile_id).update(profileData);
  } else {
    response = await db.collection('profiles').add(profileData);
  }
  return response;
}

export const getJobProviderByJobId = async (jobId) => {
  const job = await getJobById(jobId);
  return job.provider;
}

export const createRequestPost = async (requestData) => {
  const currentUser = await fetchCurrentUser();
  const jobProvider = await getJobProviderByJobId(requestData.job_id);
  await db.collection('requests').add({
    ...requestData,
    requester: {
      id: currentUser.user_id,
      name: currentUser.name
    },
    provider: jobProvider,
    status: 'WAITING-CONFIRMATION'
  });
}

export const getRequestById = async (requestId) => {
  const response = await db.collection('requests').doc(requestId).get();
  const responseId = response.id;
  const responseData = response.data();
  return { request_id: responseId, ...responseData };
}

export const updateRequestStatusNextStage = async (requestId, status) => {
  const updatedStatus = {
    'WAITING-CONFIRMATION': 'WAITING-PAYMENT',
    'WAITING-PAYMENT': 'WAITING-PROGRESS',
    'WAITING-PROGRESS': 'IN-PROGRESS',
    'IN-PROGRESS': 'DONE',
  }
  await db.collection('requests').doc(requestId).update({ status: updatedStatus[status] })
}

export const updateRequestStatusToRejected = async (requestId) => {
  await db.collection('requests').doc(requestId).update({ status: 'REJECTED' })
}

export const getRequestsByStatus = async (user_id, status, role='business') => {
  const getAllRequestsAsBusiness = async () => {
    const response = await db.collection('requests')
    .where('requester.id', '==', user_id)
    .get();
    return response;
  }

  const getRequestsAsBusinessByStatus = async () => {
    const response = await db.collection('requests')
    .where('status', '==', status)
    .where('requester.id', '==', user_id)
    .get();
    return response;
  }

  const getAllRequestsAsService = async () => {
    const response = await db.collection('requests')
    .where('provider.id', '==', user_id)
    .get();
    return response;
  }

  const getRequestsAsServiceByStatus = async () => {
    const response = await db.collection('requests')
    .where('status', '==', status)
    .where('provider.id', '==', user_id)
    .get();
    return response;
  }

  const getAllIds = async () => {
    const data = status === 'ALL' ?
    (role === 'business' ? await getAllRequestsAsBusiness() : await getAllRequestsAsService()) :
    (role === 'business' ? await getRequestsAsBusinessByStatus() : await getRequestsAsServiceByStatus()); 

    const requests = data.docs.map(doc => {
      const responseId = doc.id;
      const responseData = doc.data();
      return { request_id: responseId, ...responseData }
    });

    const requestIds = requests.map(doc => ({request_id: doc.request_id, job_id: doc.job_id}));
    return requestIds
  }

  const allIds = await getAllIds();
  console.log(allIds);

  const getAllRequests = async (requestIds) => {
    return Promise.all(
      requestIds.map(async (requestId) => {
        const { request_id, job_id } = requestId;
        const request = await getRequestById(request_id);
        const imageUrl = await getImageByJobId(job_id);
        return { ...request, imageUrl };
      }));
  };
  const allRequests = await getAllRequests(allIds);
  return allRequests;
}