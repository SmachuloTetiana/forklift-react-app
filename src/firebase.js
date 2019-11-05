import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBU-uaHiX-z-dUGe1ffkG30ljcJ-A4Re70",
    authDomain: "forklift-bb1ea.firebaseapp.com",
    databaseURL: "https://forklift-bb1ea.firebaseio.com",
    projectId: "forklift-bb1ea",
    storageBucket: "forklift-bb1ea.appspot.com",
    messagingSenderId: "1079247100131",
    appId: "1:1079247100131:web:0372e0741033be717b4dd6"
}

export const myFirebase = firebase.initializeApp(firebaseConfig );