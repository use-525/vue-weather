import firebase from "firebase/app";
import "firebase/firestore";
import {
  ref,
  onUnmounted
} from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyBZsqxPtsI7l5fldoGD3FHqqIzBrAepTBU",
  authDomain: "vue-firebase-c9df9.firebaseapp.com",
  databaseURL: "https://vue-firebase-c9df9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-firebase-c9df9",
  storageBucket: "vue-firebase-c9df9.appspot.com",
  messagingSenderId: "1020636048290",
  appId: "1:1020636048290:web:c826c2f3df76e64158a0fb",
  measurementId: "G-QKR48DSKX4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const weatherCollection = db.collection("weather");

export const createweather = (weather) => {
  return weatherCollection.add(weather);
};

// export const getweather = async (id: string) => {
//   const weather = await weatherCollection.doc(id).get();
//   return weather.exists ? weather.data() : null;
// };

// export const updateweather = (
//   id: string,
//   weather: firebase.firestore.UpdateData
// ) => {
//   return weatherCollection.doc(id).update(weather);
// };

// export const deleteweather = (id: string) => {
//   return weatherCollection.doc(id).delete();
// };

export const useLoadweathers = async () => {
  const weathers = ref([]);
  const close = await weatherCollection.get();
  weathers.value = close.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  onUnmounted(close);
  return weathers;
};