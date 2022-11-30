const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyD6YqulYoO8dikDWHSvJUtxfHL2Os0j9uo",
  authDomain: "trial-f8930.firebaseapp.com",
  databaseURL: "https://trial-f8930-default-rtdb.firebaseio.com",
  projectId: "trial-f8930",
  storageBucket: "trial-f8930.appspot.com",
  messagingSenderId: "679973073275",
  appId: "1:679973073275:web:c292d0f2e14ddb95104dde",
  measurementId: "G-PNKSDZZNXD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = database;
