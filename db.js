var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://127.0.0.1:27017/userInfoData";

//creating a database called mydb
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created as userInfoData");
  db.close();
});

//creating a table or collection called customers
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  //Create a collection name "customers":
  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created as  users ");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

module.exports=MongoClient;
//inserting a record into collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   db.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     console.log(res);
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   //Insert 3 documents, with specified id values:
//   var myobj = [
//     { _id: 15, name: 'Chocolate Heaven'},
//     { _id: 144, name: 'Tasty Lemon'},
//     { _id: 148, name: 'Vanilla Dream'}
//   ];
//   db.collection("products").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     //Return the result object:
//     console.log(res);
//     db.close();
//   });
// });
