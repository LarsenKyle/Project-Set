import firebase from "firebase/app";
import "firebase/firestore";
if (!firebase.apps.length) {
  const config = process.env.firebaseKey;
  firebase.initializeApp(config);
  firebase.firestore();
}
const fireDb = firebase.firestore();
export { fireDb };
