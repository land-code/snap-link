import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAr20WJmzg4hvNDP_CRsQCVfF1-Lo3Ub8w",
  authDomain: "launcher-8d84f.firebaseapp.com",
  databaseURL: "https://launcher-8d84f-default-rtdb.firebaseio.com",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "launcher-8d84f.appspot.com",
  messagingSenderId: "577943699248",
  appId: "1:577943699248:web:a35d35c033a72d0fd692f5",
  measurementId: "G-8SJ29DSQX6"
};

export const app = initializeApp(firebaseConfig);
