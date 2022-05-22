import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDY8zWXpOBj2TRiHfxWB4ikV9zpGAXt5Hg",
  authDomain: "qwitter-4401e.firebaseapp.com",
  projectId: "qwitter-4401e",
  storageBucket: "qwitter-4401e.appspot.com",
  messagingSenderId: "412580583267",
  appId: "1:412580583267:web:857b7c4be980921a636556"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore()

export default db