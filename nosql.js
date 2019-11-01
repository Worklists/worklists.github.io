function add_element_firebase(col_, index_, text_){
  var db = firebase.firestore();
  var data = new Object;
  data[index_] = text_;
  //console.log(data);

  db.collection(user_id).doc(col_)
  .update({
    [index_]: text_
  })
  .catch(function(err){
    db.collection(user_id).doc(col_)
    .set({
      [index_]: text_
    })
    //console.log(err);
  })
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
function firebase_exist(){
  firebase.firestore().collection(user_id).get()
  .then(function(querySnapshot) {
    //console.log('then')
    test1 = querySnapshot;
    //console.log(querySnapshot)
    if(test1.size === 0){
      //console.log('Firebase for User not Init')
      return false;
    }
    else{
      //console.log('Firebase for User have Init')
      return true;
    }
  })
  .catch(function(error){
    //console.log("Error getting document:", error);
  })
}
function getData_firebase(){
  //console.log(user_ids);

  firebase.firestore().collection(user_id).get()
  .then(function(querySnapshot) {
    //console.log('then')
    test1 = querySnapshot;
    //console.log(querySnapshot)
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        test1 = doc.data();

        //console.log(doc.data()[1])
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
    });
  })
  .catch(function(error) {
    //console.log("Error getting document:", error);
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
  var cityRef = db.collection(user_id).doc(col);
  // Remove the 'capital' field from the document
  var removeCapital = cityRef.update({
      [index]: firebase.firestore.FieldValue.delete()
  });
}
var as = new Promise(
  function (resolve, reject){
    //var doc_project = firebase.firestore().collection(user_id).doc('project');
    /*
    doc_project.get()
    .then(function(doc) {
      console.log(doc.data());
      a = doc.data();
      resolve();
    })
    .catch(function(error) {
      //console.log("Error getting document:", error);
      reject();
    });
    */
    resolve();
  }
)
