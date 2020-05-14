import app from 'firebase/app'
import auth from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDrFINpmRYbewGwfGER3S3lsaqEmWpK1F4",
    authDomain: "space-trace-277015.firebaseapp.com",
    databaseURL: "https://space-trace-277015.firebaseio.com",
    projectId: "space-trace-277015",
    storageBucket: "space-trace-277015.appspot.com",
    messagingSenderId: "1043632187016",
    appId: "1:1043632187016:web:705059ad81a8bd1731e13d",
    measurementId: "G-BC4LEK6Y31"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
    }

    /* Authentication */

    createUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    signIn = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    resetPassword = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;