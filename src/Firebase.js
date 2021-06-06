import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
 var firebaseConfig = {
		apiKey: 'AIzaSyDpFxK6AiNB8f8yftNVbwm8vdLPCmm73is',
		authDomain: 'joke-cce37.firebaseapp.com',
		projectId: 'joke-cce37',
		storageBucket: 'joke-cce37.appspot.com',
		messagingSenderId: '1094962918331',
		appId: '1:1094962918331:web:d1141beb19ecacf9bbca9e',
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const db = firebase.firestore();
export default db