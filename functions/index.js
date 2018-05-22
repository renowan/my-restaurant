const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// firebase deploy --only functions:helloWorld
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getServerTime = functions.https.onRequest((request, response) => {
 const t = Date.now();
 response.set('Access-Control-Allow-Origin', '*');
 response.set('Access-Control-Allow-Methods', 'GET, POST');
 response.status(200).send({time: t});
});

exports.getAppInfo = functions.https.onRequest((request, response) => {
 const uid = request.query.uid;
 const t = Date.now();
 // const uid = admin.auth().UserInfo.uid
 // let query = admin.database().ref(`/users/${uid}`);
 // const user = admin.firestore.ref(`users/${uid}`)
 // console.log(user)
 response.set('Access-Control-Allow-Origin', '*');
 response.set('Access-Control-Allow-Methods', 'GET, POST');

 admin.firestore().ref(`/users/${uid}`).once('value').then((snapshot) => {
   console.log('snapshot', snapshot.val())
   return response.status(200).json({conten: snapshot.val()});
 }).catch((error) => {
   console.log(error)
 })
 // return query.get().then((snapshot) => {
 //   console.log('snapshot', snapshot)
 //   // let messages = [];
 //   // snapshot.forEach((childSnapshot) => {
 //   //   messages.push({key: childSnapshot.key, message: childSnapshot.val().message});
 //   // });
 //
 //   return response.status(200).json(snapshot.data());
 // }).catch((error) => {
 //   console.log('Error getting messages', error.message);
 //   response.sendStatus(500);
 // });

 // response.status(200).send({
 //   time: t,
 //   user
 // });
});
