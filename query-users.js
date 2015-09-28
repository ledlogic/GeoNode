var users = {
  mongoUrl: null,
  
  init: function() {
    console.log('users.init');
    
    // mongodb drivers
    var mongodb = require('mongodb');

    // create client
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    users.mongoUrl = 'mongodb://localhost:27017/geoevents';

    // connect
    MongoClient.connect(users.mongoUrl, users.connectCallback);
  },
  connectCallback: function(err, db) {
    console.log('users.initCallback');
    
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
      console.log('Connection established, users.mongoUrl[', users.mongoUrl, ']');
      users.query(db, users.queryCallback);
    }
  },
  query: function(db, queryCallback) {
    console.log('users.query');
    
    // Get the documents collection
    var collection = db.collection('users');
    
    // Create cursor
    console.log('users.query - create cursor');
    var cursor = collection.find({});
    
    //We need to sort by age descending
    console.log('users.query - sort');
    cursor.sort({createdOn:-1});
    
    //Lets iterate on the result
    console.log('users.query - iterate');
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
users.init();