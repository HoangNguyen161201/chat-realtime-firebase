import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import { getAuth, connectAuthEmulator} from "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDViHaFu5UnumGvfHwgOLlgPCGUCNZ6FmU",
  authDomain: "chatrealtime-731ca.firebaseapp.com",
  projectId: "chatrealtime-731ca",
  storageBucket: "chatrealtime-731ca.appspot.com",
  messagingSenderId: "912197398007",
  appId: "1:912197398007:web:89d0f4eb026694be56d2f2",
  measurementId: "G-LDX51FGWSN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth(app)

// if (process.env.REACT_APP_USER === 'developer') {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export {app, analytics, db, auth}
