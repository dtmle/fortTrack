This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

API calls are done using Google cloud functions. 
An API key is needed as well from https://fortnitetracker.com/site-api if attempting to implement this yourself.

To set up:
Download/clone repository, then type "npm install" in a terminal at the folder dirctory to install all dependencies.
CSS preprocessor was used for styling, though not neccessary. Easiest way is to install a plugin into your text-editor. I used "Live Sass Compiler" for VSCode.

For the API call, Firebase cloud functions was used. You can find the code for the functions under /src/api/firebaseCloud.ts
This will require setting up by creating a Firebase project, downloading Firebase package from npm, then deploying it to Firebase.
Look here for more info: https://firebase.google.com/docs/functions/get-started

To run the project, type "npm start" into the terminal.

See the work in progress here: https://dtmle.github.io/fortTrack/

