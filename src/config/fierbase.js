import admin from 'firebase-admin';
import serviceAccount from '../../firebase-service.json' assert { type: "json" };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://turf-57de2-default-rtdb.firebaseio.com/"

});

export default admin;
