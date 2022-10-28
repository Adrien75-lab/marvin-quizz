import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCRLcA32n6KE-7B8kyVfUAImXmYzlopyrw",
    authDomain: "marvel-quizz-ff5aa.firebaseapp.com",
    projectId: "marvel-quizz-ff5aa",
    storageBucket: "marvel-quizz-ff5aa.appspot.com",
    messagingSenderId: "840741791916",
    appId: "1:840741791916:web:94cfccd7e5aaa5859c5709"
}

const app = initializeApp(config);
export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = uid => doc(firestore, `users/${uid}`);
