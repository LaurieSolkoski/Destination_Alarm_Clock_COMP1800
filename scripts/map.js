   //----------------------------
    // Get radius from the slider
    //----------------------------
    var radius = document.getElementById("myRange").value;  //initial value
    document.getElementById("myRange").addEventListener("click", function () {
          radius = document.getElementById("myRange").value;
          //console.log(radius);
          document.getElementById("radius-goes-here").innerHTML = radius;
        
            radius.oninput = function(){
                output.innerHTML = radius.value;
                circle.setRadius(this.value);
                
            }
         
    })


    //--------------------------------------
// MAP:  get current geolocation
//---------------------------------------
navigator.geolocation.getCurrentPosition(onSuccess, onError);
var map; //for the map to be displayed
var marker; //for current location
var circle; //for destination location

    

    //------------------------
    // handle success case
    //------------------------
    function onSuccess(position) { //callback function
      const {
        latitude,
        longitude
      } = position.coords;

      //print helpful messages about current location
      message.classList.add('success');
      message.textContent = `Your location: (${latitude},${longitude})`;
      //set map to be around current location
      //set a marker at the current location
      map = L.map('map').setView([latitude, longitude], 13);
      marker = L.marker([latitude, longitude]).addTo(map);

      //put overlay on the map, give credit wher credit is due
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      //create a popup when a location is clicked
      //create a circle marker when a location is clicked
      var popup = L.popup();
      var location = new L.circle();

      //Create listener, and event handler for a click
      //"e" is the clicked location
      map.on('click', onMapClick);

      function onMapClick(e) {
        //assign content to popup message
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
        //remove old layers with old circles
        //create new circle around clicked location "e"
        //add it to the  map
        map.removeLayer(location);
        location = new L.circle(e.latlng, {
          fillColor: '#f03',
          radius: radius,
        });
        map.addLayer(location);
      }
    }



        // handle error case
        function onError() {
      message.classList.add('error');
      message.textContent = `Failed to get your location!`;
    }



    // add search bar and declare it as variable



    // add to firestore
    //-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeLocationData() {
    max = 100;
    //define a variable for the collection you want to create in Firestore to populate data
    var locationRef = db.document("searched_location");
    for (i = 1; i <= max; i++) {
        locationRef.add({ //add to database, autogen ID
            name: "searched location" + i,
            details: "Your most recent search: " + i,
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
   }
}

