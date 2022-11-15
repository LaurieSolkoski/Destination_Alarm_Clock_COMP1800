const vibToggle = document.getElementById('flexSwitchCheckChecked');

const curUser = firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
    } else {
        console.log ("No user is signed in");
    }
})

function initSettings () {
    // read database for this user's setting values
    // assign those values to html
}

function changeSettings () {
    // read values in inputs
    // update database entries in given user's doc
}