const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        console.log(currentUser);
        var userID = user.uid;
        console.log(userID);
        var currentAlarm = db.collection("users").doc(user.uid).collection("alarms").doc("alarm1");

           //go to the correct user document by referencing to the user uid
           //get the document for current user.
           currentUser.get()
               .then(userDoc => {
                   //get the data fields of the user
                   var triggerRadius = userDoc.data().radius;
                   console.log(triggerRadius);

                   currentAlarm.get()
                        .then(userAlarm => {
                            var active = userAlarm.data().active;
                            var destLng = userAlarm.data().lng;
                            var destLat = userAlarm.data().lat;
                            console.log(active);
                            console.log(triggerRadius);
                            function onLocationFound(e) {
                                const radius = e.accuracy / 2;
                        
                                const locationMarker = L.marker(e.latlng).addTo(map)
                                    .bindPopup(`You are within ${radius} meters from this point`).openPopup();
                        
                                const locationCircle = L.circle(e.latlng, radius).addTo(map);
                                var userCoor = e.latlng;
                                var destCoor = {lat : destLat, lng: destLng}
                                console.log(destCoor);
                                console.log(userCoor);
                                console.log(destCoor);
                                var dist = map.distance(userCoor, destCoor);
                                console.log(dist);
                                console.log(triggerRadius);
                                console.log(active);
                                if (active && triggerRadius >= dist) {
                                    console.log("Alarm is sounding.")
                                    turnOffAlarm(); 
                                }
                        
                            } 
                            function onLocationError(e) {
                                alert(e.message);
                            }
                            map.on('locationfound', onLocationFound);
                            map.on('locationerror', onLocationError);
                        
                            map.locate({ setView: true, maxZoom: 16, watch: true, enableHighAccuracy: true });
                        })
               })
    } else {
        console.log("Please sign in.")   
    }});

    function turnOffAlarm() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
        console.log("turnOffAlarm fxn accessed.")
        
        var currentAlarm = db.collection("users").doc(user.uid).collection("alarms").doc("alarm1");
    
        currentAlarm.update({
            active: false,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
    
     } else {} 
    })}


   