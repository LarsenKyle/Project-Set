import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  const config = {};
  config.apiKey = process.env.apiKey;
  config.authDomain = process.env.authDomain;
  config.databaseURL = process.env.databaseURL;
  config.projectId = process.env.projectId;
  config.storageBucket = process.env.storageBucket;
  config.messagingSenderId = process.env.messagingSenderId;
  config.appId = process.env.appId;
  config.measurementId = process.env.measurementId;

  firebase.initializeApp(config);
  firebase.firestore();
}
const fireDb = firebase.firestore();
export { fireDb };
