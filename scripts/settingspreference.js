


var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var getAlarmSound = userDoc.value().alarmSound;
                    var getVolumeRange = userDoc.value().radiusRange;
                    var getRadiusRange = userDoc.value().volumeRange;

                    //if the data fields are not empty, then write them in to the form.
                    if (getAlarmSound != null) {
                        document.getElementById("alarmSound").value = 1;
                    }
                    if (getVolumeRange != null) {
                        document.getElementById("volumeRange").value = 50;
                    }
                    if (getRadiusRange != null) {
                        document.getElementById("radiusRange").value = 3;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('settings').disabled = false;
 }

 function saveUserInfo() {
    getAlarmSound = document.getElementById('alarmSound').value;       //get the value of the field with id="nameInput"
    getVolumeRange = document.getElementById('volumeRange').value;     //get the value of the field with id="schoolInput"
    getRadiusRange = document.getElementById('radiusRange').value;

    currentUser.update({
        alarmSound: getAlarmSound,
        radiusRange: getVolumeRange,
        volumeRange: getRadiusRange
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('settings').disabled = true;
}