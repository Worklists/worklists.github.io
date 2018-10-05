function add_element_firebase(col_, index_, text_){
  var db = firebase.firestore();
  var data = new Object;
  data[index_] = text_;
  console.log(data);

  db.collection("db").doc(col_).update({
    [index_]: text_
  });
}
function firebase_init(){
  var config = {
    apiKey: "AIzaSyC7elL3FYPlcVj7PvN9ecGpvVUVg6L1fKg",
    authDomain: "worklist-app.firebaseapp.com",
    databaseURL: "https://worklist-app.firebaseio.com",
    projectId: "worklist-app",
    storageBucket: "worklist-app.appspot.com",
    messagingSenderId: "740341135888"
  };
  firebase.initializeApp(config);

  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}
var test1;
var first_get = false;
function getData_firebase(){
  firebase.firestore().collection("db").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        test1 = doc.data();

        console.log(doc.data()[1])
        var index_get_data = 0;
        while(true){
          if(doc.data()[index_get_data] !== undefined){
            add_child(doc.id, index_get_data, doc.data()[index_get_data]);
          }
          else{
            break;
          }
          index_get_data = index_get_data + 1;
        }

        try {
          //add_child(doc.id, doc.data().value.index, doc.data().value.text)
        }
        catch(e){
        }
    });
  });
}
function delete_element_firebase(col, index){
  /*
  Xoa cot thu 2
  var db = firebase.firestore();
  db.collection("db").doc("col1").delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  */
  var db = firebase.firestore();
  var cityRef = db.collection('db').doc(col);
  // Remove the 'capital' field from the document
  var removeCapital = cityRef.update({
      [index]: firebase.firestore.FieldValue.delete()
  });
}
