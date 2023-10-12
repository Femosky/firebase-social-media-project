// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAJ-BBwK9eIzADyqmfYukQgWgipUXgaE5s',
    authDomain: 'fir-project-pedrotech.firebaseapp.com',
    projectId: 'fir-project-pedrotech',
    storageBucket: 'fir-project-pedrotech.appspot.com',
    messagingSenderId: '634456126905',
    appId: '1:634456126905:web:782568e4fde3a1be08b268',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
