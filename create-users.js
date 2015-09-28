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
      users.create(db, users.createCallback);
    }
  },
  create: function(db, createCallback) {
    console.log('users.create');
    
    // Get the documents collection
    var collection = db.collection('users');

    // Create users
    var user0 = {login: 'user0', name: 'geonode admin', roles: ['admin', 'user']};
    var user1 = {login: 'user1', name: 'geonode user1', roles: ['user']};

    // Insert users
    console.log('Inserting users...');
    collection.insert([user0, user1], function (err, result) {
      if (err) {
        console.log('Error inserting users', err);
      } else {
        console.log("Success inserting", result.result.n, "into the 'users' collection.");
        console.log("results", result);
      }
      
      createCallback(db);
    });
  },
  createCallback: function(db) {
    //Close connection
    db.close();
  }
};
users.init();