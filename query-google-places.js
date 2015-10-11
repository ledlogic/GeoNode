var config = require('./config');

var googleMaps = {
  init: function() {
    console.log('googleMaps.init');
    
    // roberts warren fire association
    // 311 W Warren St
    // Roberts, WI 54023
    // 44.982747, -92.557717
    
    // Our House Senior Living
    // 310 Circle Pine Drive
    // New Richmond
    // 45.108600,%20-92.545349
    
    //var gcoords = [44.982747, -92.557717];
    var gcoords = [45.108600,-92.545349];
    
    
    // medical only
    // note: will not necessarily return assisted living: ZERO_RESULTS
    //var types = "dentist|doctor|health|hospital";
    
    // all types
    var types = "dentist|doctor|health|hospital|establishment|point_of_interest";
    
    var radius = 274.32; // in meters (1 football field)
    
    var queryParams = {
      gcoords: gcoords,
      types: types,
      radius: radius
    };
    googleMaps.query(queryParams);
  },
  query: function(queryParams) {
    // @see https://developers.google.com/places/web-service/search
    console.log('googleMaps.query');
    
    var gcoords = queryParams.gcoords;
    var location = gcoords[0] + "," + gcoords[1];
    
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
            + "&location=" + location
            + "&radius=" + queryParams.radius
            + "&types=" + queryParams.types
            //+ "&rankby=distance" causes INVALID_REQUEST
            + "&key=" + config.googleKey
    ;
    console.log("url[" + url + "]");
    
    // @see https://github.com/request/request
    var request = require('request');
    request(url, googleMaps.queryCallback);
  },
  queryCallback: function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
};
googleMaps.init();