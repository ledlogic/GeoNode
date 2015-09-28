var places = {
  mongoUrl: null,
  
  init: function() {
    console.log('places.init');
    
    // mongodb drivers
    var mongodb = require('mongodb');

    // create client
    var MongoClient = mongodb.MongoClient;

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
    
    // Create cursor
    console.log('places.query - create cursor');
    var cursor = collection.find({});
    
    //We need to sort by age descending
    console.log('places.query - sort');
    cursor.sort({createdOn:-1});
    
    //Lets iterate on the result
    console.log('places.query - iterate');
    cursor.each(function (err, doc) {
      if (err) {
        console.log(err);
      } else if (doc == null) {
        queryCallback(db);
      } else {
        console.log('Fetched:', doc);
      }
    });
  },
  queryCallback: function(db) {
    //Close connection
    db.close();
  }
};
places.init();