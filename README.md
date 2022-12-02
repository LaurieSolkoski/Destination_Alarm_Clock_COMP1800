## Destination Alarm Clock

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application is to give you the ability to set a location based alarm at a radius of choice, so that you can have an alarm that rings once you are at you destination rather than time amount of time you choose. 
* Hi, my name is Alex. I'm excited about this project because it is an opportunity to develop our own web app.
* Hi my name is Bardia. I'm excited about this project because I get to learn something new.
* Hi my name is Laurie :) I'm excited to start this project because I get to *maybe* use geospatial analysis, which I sorta like doing
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Leaflet API
* Geoapify API
	


## Content
Content of the project folder:

```
├── index.html              # the main landing page. It immediately takes the user to the Firebase login widget. Users must sign up/sign in in order to access DAC's application.


├── .gitignore              # contains the following files: firebaseAPI_DAC.js and firebaseAPI_BBY01.js. This is for the Firebase and Firestore API and is used in our login page.

├── alarm.html              # contains the contents of the page after an alarm has been set. It is also the page that the user is redirected to while travelling to their destination and hasn't yet reached the inner bounds of their radius, as well as when they DO reach the bounds of their entered radius. It is the point at which their alarm is triggerred. 

├── Analog-alarm-clock-bell-rings-short-sound-effect.mp3    # this is the file chosen for the alarm ringtone


├── alarmSettings.html      # the alarm settings page.

├── click.html              # the page containing DAC's first functionality, which is to click on the map in order to choose a destination and set radius value. This is pwered by the Leaflet API. This page doesn't contain the search box functionality. The user will have to click on the button "Search" to access the page where the search box is functional.

├── search_index.html       # this page contains the search box functionality and is powered by the Geoapify API. Major thanks and credits to Carly Orr for essentially handing over the code for this and for discovering Geoapify. This page was used mainly due to the possibility of us being able to modify and perform CSS on the search bar widget. 


├── myAccount.html          # This page was mainly a placeholder, but the Account Info section provides users the options to modify their account info.





It has the following subfolders and files:




```