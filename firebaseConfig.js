import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const androidConfig = {
  apiKey: "AIzaSyDXaDkDdGlupAFyfXjWobHiBAvHS2Z76to",
  authDomain: "signlanguage-d1f52.firebaseapp.com",
  projectId: "signlanguage-d1f52",
  storageBucket: "signlanguage-d1f52.firebasestorage.app",
  messagingSenderId: "446221996238",
  appId: "1:446221996238:android:24f324c0a3c92a2947409f",
};

const iosConfig = {
  apiKey: "AIzaSyDXaDkDdGlupAFyfXjWobHiBAvHS2Z76to",
  authDomain: "signlanguage-d1f52.firebaseapp.com",
  projectId: "signlanguage-d1f52",
  storageBucket: "signlanguage-d1f52.firebasestorage.app",
  messagingSenderId: "446221996238",
  appId: "1:446221996238:ios:0815cffe23b5c96a47409f",
};

let firebaseConfig;

if (Platform.OS === 'android') {
  firebaseConfig = androidConfig;
} else if (Platform.OS === 'ios') {
  firebaseConfig = iosConfig;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
