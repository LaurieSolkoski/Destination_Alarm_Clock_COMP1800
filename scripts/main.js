$("#map").click(function () {
    location.href = "click.html";

    console.log("clicked");
  });

  //--------------------------------------
  // MAP:  get current geolocation
  //---------------------------------------
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  var map; //for the map to be displayed
  var marker1; //for current location
  var circle1; //for current circle(?)
  var marker2; //for destination location
  var circle2; //for destination circle
  var location1;
  var location2;
  var myradius; //for how big circle is

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
                myradius = userDoc.data().radius;
                console.log(myradius);
                document.getElementById("myRange").value = myradius;
                document.getElementById("myRange").setAttribute("value", myradius);
                console.log(document.getElementById("radius-goes-here").value);
                document.getElementById("radius-goes-here").innerHTML = document.getElementById("myRange").value;
            })}});



  //----------------------------
  // Get radius from the slider
  //----------------------------
  function getRadius() {
    console.log(myradius);
    document
      .getElementById("myRange")
      .addEventListener("click", function () {
        myradius = document.getElementById("myRange").value;
        console.log(myradius, "click");
        console.log(myradius);
        document.getElementById("radius-goes-here").innerHTML = myradius;
        dest.radius = myradius;
      });
      document
      .getElementById("myRange")
      .addEventListener("touchend", function () {
        myradius = document.getElementById("myRange").value;
        console.log(myradius, "click");
        console.log(myradius);
        document.getElementById("radius-goes-here").innerHTML = myradius;
        dest.radius = myradius;
      });
  }
  getRadius();

  //-----------------------------------------
  // handle success case of getCurrentPosition
  //-----------------------------------------
  function onSuccess(position) {
    //callback function
    const { latitude, longitude } = position.coords;

    //print helpful messages about current location
    message.classList.add("success");
    message.textContent = `Your location: (${latitude},${longitude})`;
    //set map to be around current location
    //set a marker at the current location
    map = L.map("map").setView([latitude, longitude], 13);
    marker = L.marker([latitude, longitude]).addTo(map);

    //addMapClickListener();
    addGeocoder();
  }

  var dest = { lat: 0, lng: 0, radius: 0 };

  function addMapClickListener() {
    var popup = L.popup();
    var location = new L.circle();
    //Create listener, and event handler for a click
    //"e" is the clicked location
    map.on("click", onMapClick);
    //Define the event hander below
    function onMapClick(e) {
      //create a popup when a location is clicked
      //create a circle marker when a location is clicked

      //assign content to popup message
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
      //remove old layers with circlemarker
      //create new circle around clicked location "e"
      //add it to the  map
      map.removeLayer(location);
      console.log(myradius);
      location = new L.circle(e.latlng, {
        fillColor: "#f03",
        radius: myradius,
      });
      map.addLayer(location);
    }
  }

  //-------------------------------------------
  // Add the Geocoder
  //-------------------------------------------
  function addGeocoder() {
    var myAPIKey = "afee0b090ae44bfdb1bbf7bd1d439bc0"; // Get an API Key on https://myprojects.geoapify.com
    var mapURL = L.Browser.retina
      ? `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}.png?apiKey={apiKey}`
      : `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}@2x.png?apiKey={apiKey}`;

    // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
    L.tileLayer(mapURL, {
      attribution:
        "Powered by Geoapify | © OpenMapTiles © OpenStreetMap contributors",
      apiKey: myAPIKey,
      mapStyle: "osm-carto", // More map styles on https://apidocs.geoapify.com/docs/maps/map-tiles/
      maxZoom: 20,
    }).addTo(map);

    // Add Geoapify Address Search control
    const addressSearchControl = L.control.addressSearch(myAPIKey, {
      position: "topright",
      resultCallback: (selectedAddress) => {
        console.log(selectedAddress);
        showSearchResult(selectedAddress);
      },
      suggestionsCallback: (suggestions) => {
        console.log(suggestions);
      },
    });
    map.addControl(addressSearchControl);
    L.control
      .zoom({
        position: "bottomright",
      })
      .addTo(map);
  }

  document.getElementById("confirm").addEventListener("click", (e) => {
    console.log("listener is listening.");
    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .collection("alarms")
          .doc("alarm1")
          .update({
            active: true,
            lat: dest.lat,
            lng: dest.lng,
          })
          .then(function () {
            db.collection("users")
              .doc(user.uid)
              .update({
                radius: dest.radius,
              })
              .then(function () {
                console.log("inside get");
                window.location.href = "./alarm.html";
              });
          });
      } else {
        // No user is signed in.
        console.log("No user is signed in");
      }
    });
  });

  //----------------------------------------------------------------
  //This function is called by addGeocoder after there is a result
  //----------------------------------------------------------------
  function showSearchResult(searchResult) {
    newlatlng = L.latLng(searchResult.lat, searchResult.lon);
    dest.lat = searchResult.lat;
    dest.lng = searchResult.lon;
    map.setView(newlatlng, 11);
    L.marker(newlatlng).addTo(map);
    var popup = L.popup();
    var location = new L.circle();
    //assign content to popup message
    popup
      .setLatLng(newlatlng)
      .setContent("Your searched location is:  " + newlatlng.toString())
      .openOn(map);
    //remove old layers with circlemarker
    //create new circle around clicked location "e"
    //add it to the  map
    map.removeLayer(location);
    console.log(myradius);
    location = new L.circle(newlatlng, {
      fillColor: "#f03",
      radius: myradius,
    });
    map.addLayer(location);
    console.log(dest.lat);
    console.log(dest.lng);
    console.log(dest.radius);
  }

  // handle error case for finding current position
  function onError() {
    message.classList.add("error");
    message.textContent = `Failed to get your location!`;
  }

  var grayscale = L.tileLayer(mapboxUrl, {
      id: "MapID",
      attribution: mapboxAttribution,
    }),
    streets = L.tileLayer(mapboxUrl, {
      id: "MapID",
      attribution: mapboxAttribution,
    });

  map.removeLayer(grayscale);
  map.addLayer(streets);

  var imageUrl =
      "https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
    imageBounds = [
      [40.712216, -74.22655],
      [40.773941, -74.12544],
    ];
  L.imageOverlay(imageUrl, imageBounds).addTo(map);