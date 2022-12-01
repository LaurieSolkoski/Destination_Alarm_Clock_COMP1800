


var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            console.log(currentUser);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var getAlarmSound = userDoc.alarmSound;
                    var getVolumeRange = userDoc.volumeRange;
                    var getRadiusRange = userDoc.data().radius;
                    console.log(getRadiusRange);
                    document.getElementById("radiusRange").value = getRadiusRange;
                    document.getElementById("radiusRange").setAttribute("value", getRadiusRange);
                    console.log(document.getElementById("radiusRange").value);
                    document.getElementById("currentRadius").innerHTML = document.getElementById("radiusRange").value;

                    
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
        volumeRange: getVolumeRange,
        radius: getRadiusRange
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('settings').disabled = true;
}

document.getElementById("radiusRange").addEventListener("click", (e) => {
    document.getElementById("currentRadius").innerHTML = document.getElementById("radiusRange").value;    
});

document.getElementById("radiusRange").addEventListener("touchend", (e) => {
    document.getElementById("currentRadius").innerHTML = document.getElementById("radiusRange").value; 
    console.log("touched");   
});