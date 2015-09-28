var places = {
  mongoUrl: null,
  mongodb: null,
  
  init: function() {
    console.log('places.init');
    
    // mongodb drivers
    places.mongodb = require('mongodb');

    // create client
    var MongoClient = places.mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    places.mongoUrl = 'mongodb://localhost:27017/geoevents';

    // connect
    MongoClient.connect(places.mongoUrl, places.connectCallback);
  },
  connectCallback: function(err, db) {
    console.log('places.initCallback');
    
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
      console.log('Connection established, places.mongoUrl[', places.mongoUrl, ']');
      places.query(db, places.queryCallback);
    }
  },
  query: function(db, queryCallback) {
    console.log('places.query');
    
    // Get the documents collection
    var collection = db.collection('places');
    
    // roberts warren fire association
    // 311 W Warren St
    // Roberts, WI 54023
    // 44.982747, -92.557717
    
    var gcoords = [44.982747, -92.557717];
    var mcoords = [gcoords[1], gcoords[0]];
    
    db.command({
      geoNear: 'places',
      near: {type:"Point", coordinates: mcoords},
      spherical: true
    }, function(err, docs){
      if (err) {
          console.log(err);
      } else {
        var radiansToKilometers = 6378.1;
        docs.results.forEach(function(doc) {
          var distInKm = doc.dis / 1000.0;
          var distInMi = 0.621371 * distInKm;
          console.log("Distance: " + distInMi + "mi (" + distInKm + "km), Name:" + doc.obj.name);
        });
        
        queryCallback(db);
      }
    });
  },
  queryCallback: function(db) {
    //Close connection
    db.close();
  }
};
places.init();