// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      var user = authResult.user;
      var settings = authResult.settings;
      if (authResult.additionalUserInfo.isNewUser) {
        // creates default collections and docs for new users.         
        db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          alarmSound: "1",
          radius: "500",
          volumeRange: "3",
        }).then(function () {
          db.collection("users").doc(user.uid).collection("alarms").doc("alarm1").set({
            active: true,
            lat: 49,
            lng: -129
          });
          console.log("New user added to firestore");
          //re-direct to main.html after signup
        }).then(function () {
          window.location.assign("main.html");
        })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
        db.collection("users").doc(user.uid).collection("settings").add({
          alarmSound: settings.alarmSound,
          radiusRange: settings.radiusRange,
          volumeRange: settings.volumeRange,
        }).then(function () {
          console.log("New settings added to firestore");
          window.location.assign("main.html");       //re-direct to main.html after signup
        })
          .catch(function (error) {
            console.log("Error adding new settings: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: "./main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);