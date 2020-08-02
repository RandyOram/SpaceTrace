import app, { firestore } from 'firebase/app'
import auth from 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
        this.firestore = app.firestore();
    }

    /* Authentication */

    createUser = (email, password, name, phone, receiveSMS, receiveEmail, location) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
        .then(registeredUser => {
            this.firestore.collection("users")
            .add({
                uid: registeredUser.user.uid,
                mapTheme: "default",
                receiveEmail: "true",
                receiveSMS: "false",
                location: new firestore.GeoPoint(0.0,0.0)
            })
            return registeredUser
        })
    }

    signIn = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    resetPassword = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;