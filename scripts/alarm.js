const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var userCoor;
var destCoor = {lat: 0, lng: 0};

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
                            console.log("rad", triggerRadius);
                            function onLocationFound(e) {
                                const radius = e.accuracy / 2;
                        
                                const locationMarker = L.marker(e.latlng).addTo(map)
                                    .bindPopup(`You are within ${radius} meters from this point`).openPopup();
                        
                                const locationCircle = L.circle(e.latlng, radius).addTo(map);
                                userCoor = e.latlng;
                                destCoor = {lat : destLat, lng: destLng}
                                console.log(destCoor);
                                console.log(userCoor);
                                console.log("dest: ", destCoor); 
                                L.marker(destCoor).addTo(map);
                                console.log("rad pre circle", triggerRadius);
                                L.circle([destCoor.lat, destCoor.lng], {radius: triggerRadius}).addTo(map);
                                var dist = map.distance(userCoor, destCoor);
                                console.log(dist);
                                console.log(triggerRadius);
                                console.log(active);
                                console.log("trigger = ", (active && triggerRadius >= dist));
                                console.log("user", userCoor);
                                console.log("dest pre fit", destCoor);
                                let bounds = [userCoor, [destCoor.lat, destCoor.lng]];
                                console.log(bounds);
                                map.fitBounds(bounds);
                                if (active && triggerRadius >= dist) {
                                    console.log("Alarm is sounding.")
                                    document.getElementById("alarm-sound").play(); 
                                    active = false;
                                }
                        
                            } 
                            function onLocationError(e) {
                                alert(e.message);
                            }
                            map.on('locationfound', onLocationFound);
                            map.on('locationerror', onLocationError);
                        
                            map.locate({watch: true, enableHighAccuracy: true });
                            

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

    $("#confirm").click(function () {
        location.href = "main.html";
  
        console.log("clicked");
      });
  
      function onReady(callback) {
        var intervalId = window.setInterval(function () {
          if (document.getElementsByTagName("body")[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
          }
        }, 1000);
      }
  
      function setVisible(selector, visible) {
        document.querySelector(selector).style.display = visible
          ? "block"
          : "none";
      }
  
      onReady(function () {
        setVisible(".page", true);
        setVisible("#loading", false);
        setVisible(".utility", true);
      });



   