GeoNode
=======

Setup
-----

* Install Mongodb on OSX: http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/

* Setup a node.js/Mongodb project: http://blog.modulus.io/mongodb-tutorial

References
---------

### Mongo

* Mongo shell commands: http://docs.mongodb.org/manual/reference/mongo-shell/
* Building 2d sphere index: http://docs.mongodb.org/manual/tutorial/build-a-2dsphere-index/
* From http://stackoverflow.com/questions/25150590/mongoerror-cant-extract-geo-keys-from-object-with-type-point
* Google coords are "latitude, longitude".  We'll call these the gcoords.  If you go to google maps your data will be in this ordering.
* Mongo coords are "longitude, latitude".  We'll call these the mcoords.  Queries and results are in these coordinates, which would not map well in Google Maps.
* If you do not prescribe everything, both data, and query using Point (2d spatial type), then it will returns distance results in radians, not meters: http://docs.mongodb.org/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/

### Node

* Async db callbacks require callback close: http://stackoverflow.com/questions/26346089/mongodb-server-sockets-closed-no-fix-found

### Mongo-Node Driver

* Db Commands https://mongodb.github.io/node-mongodb-native/api-generated/db.html
* npm install mongodb

### Request

* https://github.com/request/request
* npm install request

### Google

* Places API: https://developers.google.com/places/web-service/search
* Create API key, add to "config.js", not committed to git for security.

Commands
--------

### Mongo
* use geoevents
* coll = db.users
* coll.find()
* coll.remove([{login:"user0"},{login:"user1"}])

* coll = db.places
* coll.find()
* coll.remove({"createdBy":"user1"})
* coll.dropIndexes()
* coll.reIndex()

### Users

* node create-users.js
* node query-users.js

### Places

* node create-places.js
* node query-places.js
* node query-closest-places.js
* node query-google-places.js
