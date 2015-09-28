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
      places.create(db, places.createCallback);
    }
  },
  create: function(db, createCallback) {
    console.log('places.create');
    
    // Get the documents collection
    var collection = db.collection('places');

    // Create places
    var places = [
      {
        createdBy: "user1",
        coords: [44.962613, -92.718213],
        category: "Medical",
        
        name: "Hudson Hospitals & Clinics",
        street: "405 Stageline Rd",
        city: "Hudson",
        state: "WI",
        postal: "54016",
        
        website: "http://www.hudsonhospital.org/"
      },
      {
        createdBy: "user1",
        coords: [44.917862, -92.979873],
        category: "Medical",
        
        name: "Woodwinds Health Campus",
        street: "1925 Woodwinds Drive",
        city: "Woodbury",
        state: "MN",
        postal: "55125",
        
        website: "http://www.healtheast.org/woodwinds-health-campus/about/about.html"
      },
      {
        createdBy: "user1",
        coords: [44.955671, -93.094731],
        category: "Medical",
        
        name: "Regions Hospital",
        street: "640 Jackson Street",
        city: "St. Paul",
        state: "MN",
        postal: "55101",
        
        website: "https://www.regionshospital.com"
      },
      {
        createdBy: "user1",
        coords: [44.942301, -93.109320],
        category: "Medical",
        
        name: "Childrens Hospital & Clinics",
        street: "347 N Smith Ave",
        city: "St. Paul",
        state: "MN",
        postal: "55102",
        
        website: "http://www.childrensmn.org/"
      },
      {
        createdBy: "user1",
        coords: [44.942301, -93.109320],
        category: "Medical",
        
        name: "Roberts Medical Clinic",
        street: "503 Cherry Ln",
        city: "Roberts",
        state: "WI",
        postal: "54023",
        
        website: "http://www.healthybaldwin.org/"
      },
      {
        createdBy: "user1",
        coords: [44.971595, -92.374086],
        category: "Medical",
        
        name: "Baldwin Area Medical Center",
        street: "730 10th Ave",
        city: "Baldwin",
        state: "WI",
        postal: "54002",
        
        website: "http://www.healthybaldwin.org/"
      },
      {
        createdBy: "user1",
        coords: [45.108707, -92.545359],
        category: "Assisted Living",
        
        shortName: "Our House Senior Living",
        fullName: "Our House Senior Living",
        street: "1310 Circle Pine Dr",
        city: "New Richmond",
        state: "WI",
        postal: "54017",
        
        website: "http://ourhousesl.com/"
      }
    ];
    
    // Insert places
    console.log('Inserting places...');
    collection.insert(places, function (err, result) {
      if (err) {
        console.log('Error inserting places', err);
      } else {
        console.log("Success inserting", result.result.n, "into the 'places' collection.");
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
places.init();