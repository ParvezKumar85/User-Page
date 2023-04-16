import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// Create a root reference
const firebaseConfig = {
  apiKey: "AIzaSyAESDz-0_lCVOa4PVNRvw7z4IPFgIHJRog",
  authDomain: "reactjs-final-assigment.firebaseapp.com",
  databaseURL: "https://reactjs-final-assigment-default-rtdb.firebaseio.com",
  projectId: "reactjs-final-assigment",
  storageBucket: "reactjs-final-assigment.appspot.com",
  messagingSenderId: "562714695714",
  appId: "1:562714695714:web:81a8365bf9e2c49ce8527b",
  measurementId: "G-263VX1BGP8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);

export default app
export { db, auth, storage }

// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore"
// const firebaseConfig = {
//   apiKey: "AIzaSyAwrDNHMYX4Vig0X2enw6T8bd_j_BLG-5M",
//   authDomain: "reactapp-fe611.firebaseapp.com",
//   databaseURL: "https://reactapp-fe611-default-rtdb.firebaseio.com",
//   projectId: "reactapp-fe611",
//   storageBucket: "reactapp-fe611.appspot.com",
//   messagingSenderId: "422302899242",
//   appId: "1:422302899242:web:d9b629a421e37f3723f753"
// };
// const app = initializeApp(firebaseConfig);
// const db= getFirestore(app)
// export default app