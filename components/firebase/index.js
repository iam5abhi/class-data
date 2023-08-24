import { initializeApp, getApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  updatePassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyAv5GouGRJdcpELS2A1m6fmpjzb93yhWf8",
      authDomain: "classdata-6a223.firebaseapp.com",
      projectId: "classdata-6a223",
      storageBucket: "classdata-6a223.appspot.com",
      messagingSenderId: "242255864037",
      appId: "1:242255864037:web:1279afd2c2e5fe7569340c",
      measurementId: "G-KDLXEFRJVX"
    };
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
     await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (event,name, email, password) => {
  event.preventDefault()
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name:name,
      authProvider: "local",
      email:user.email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const UpdatePassword = async (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword).then(() => {
    alert("Update Password Successfully")
    logout()
  }).catch((error) => {
    console.log(error,"error")
   alert("Something Want Wrong")
  });
  
}

const logout = () => {
   signOut(auth);
};

export {
  auth,
  db,
  UpdatePassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};