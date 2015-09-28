GeoNode
=======

Setup
-----

* Install Mongodb on OSX: http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/

* Setup a node.js/Mongodb project: http://blog.modulus.io/mongodb-tutorial

Learnings
---------

### Mongo

* Mongo shell commands: http://docs.mongodb.org/manual/reference/mongo-shell/
* Building 2d sphere index: http://docs.mongodb.org/manual/tutorial/build-a-2dsphere-index/
* From http://stackoverflow.com/questions/25150590/mongoerror-cant-extract-geo-keys-from-object-with-type-point
* Mongo coords are "longitude, latitude".  We'll call these the mcoords
* Google coords are "latitude, longitude".  We'll call these the gcoords.

### Node

* Async db callbacks require callback close: http://stackoverflow.com/questions/26346089/mongodb-server-sockets-closed-no-fix-found

### Mongo-Node Driver

* Db Commands https://mongodb.github.io/node-mongodb-native/api-generated/db.html

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

### Users

* node create-users.js
* node query-users.js

### Places

* node create-places.js
* node query-places.js
