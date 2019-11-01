var child_col1_num = 0, child_col2_num = 0, child_col3_num = 0;
var child_col = {};
child_col['col1'] = 0;
child_col['col2'] = 0;
child_col['col3'] = 0;

var a, id_elem_drap;
var is_select = false;
var x_start_press, y_start_press, height_child, width_child;
var elem_drap;

var elem_move;
var is_create_element_drap = false;
var is_init_element_drap = false;
var x_offset, y_offset;

//Variable for addElement from user
var is_addElement = false;
function create_AddElem(col){
  var child = document.createElement("div");
  switch(col){
    case 'col1':{
      child.id = 'add1';
      break;
    }
    case 'col2':{
      child.id = 'add2';
      break;
    }
    case 'col3':{
      child.id = 'add3';
      break;
    }
  }
  child.style.order = 10;
  child.setAttribute('class','fa fa-plus add noselect');
  child.innerText = ' Thêm thẻ khác...';
  document.getElementById(col).appendChild(child);
  child.addEventListener('mousedown',add_child_callback, false);
}
function child_press(e){
  //e.target.innerHTML = 'Change';
  if(e.target.contentEditable == 'true'){     //Target is a context child
    id_elem_drap = e.target.parentElement.id;
    height_child = e.target.parentElement.clientHeight;
    width_child = e.target.parentElement.clientWidth;
  }
  else{
    height_child = e.target.clientHeight;
    width_child = e.target.clientWidth;
    id_elem_drap = e.target.id;
  }
  elem_drap = document.getElementById(id_elem_drap);

  if(e.which == 2){
    elem_delete(elem_drap);
  }
  else{
    is_select = true;

    x_start_press = e.x;
    console.log(x_start_press);

    y_start_press = e.y;
    x_offset = document.getElementById(id_elem_drap).offsetLeft - e.x - 10;
    y_offset = document.getElementById(id_elem_drap).offsetTop - e.y - 10;
    console.log(document.getElementById(id_elem_drap).offsetLeft);
  }
}
function add_child(col, index, content){
  var child = document.createElement("div");
  var childcontent = document.createElement("div");
  var childlogo = document.createElement("div");


  switch(col){
    case 'col1':
    {
      var parent = document.getElementById("col1");
      child.id = 'c1_' + child_col1_num;
      child.style.order = child_col[col];
      child_col1_num = child_col1_num + 1;
      break;
    }
    case 'col2':
    {
      var parent = document.getElementById("col2");
      child.id = 'c2_' + child_col2_num;
      child.style.order = child_col[col];
      child_col2_num = child_col2_num + 1;
      break;
    }
    case 'col3':
    {
      var parent = document.getElementById("col3");
      child.id = 'c3_' + child_col3_num;
      child.style.order = child_col[col];
      child_col3_num = child_col3_num + 1;
      break;
    }
  }
  add_element_firebase(col,child_col[col],content);

  child_col[col] = child_col[col] + 1;

  child.setAttribute('class','child noselect');
  //Content on Child
  childcontent.setAttribute('class','childcontent noselect');
  childcontent.setAttribute('contenteditable', 'true');
  childcontent.innerHTML = content;
  //Logo on Child
  childlogo.setAttribute('class','childlogo fa fa-edit');

  child.appendChild(childcontent);
  child.appendChild(childlogo);
  parent.appendChild(child);

  child.addEventListener('mousedown',child_press,false);


}
var child_textarea_add_temp;
function add_child_callback(e){
  if(is_addElement){
    is_addElement = false;
    create_AddElem(child_textarea_add_temp.parentElement.id);
    child_textarea_add_temp.parentElement.removeChild(child_textarea_add_temp);
  }
  parent = e.target.parentElement;
  e.target.parentElement.removeChild(e.target);

  child_textarea_add_temp = document.createElement("div");
  var childcontent = document.createElement("textarea");
  var childlogo = document.createElement("div");

  childcontent.setAttribute('class','childinput noselect');
  childcontent.autofocus = 'autofocus';
  childcontent.placeholder = 'Task';

  //childcontent.setAttribute('contenteditable', 'true');
  childcontent.id = 'textarea_input';

  childlogo.setAttribute('class','childinput_logo fa fa-close');

  child_textarea_add_temp.style.order = 10;
  child_textarea_add_temp.setAttribute('class','child noselect');
  child_textarea_add_temp.appendChild(childcontent);
  child_textarea_add_temp.appendChild(childlogo);

  parent.appendChild(child_textarea_add_temp);

  document.getElementById('textarea_input').focus();
  e.preventDefault();

  is_addElement = true;
  /*
  if(!is_select){
    var child = document.createElement("div");
    var childcontent = document.createElement("div");
    var childlogo = document.createElement("div");


    switch(e.target.parentElement.id){
      case 'col1':
      {
        var parent = document.getElementById("col1");
        child.id = 'c1_' + child_col1_num;
        child.style.order = child_col[e.target.parentElement.id];
        child_col1_num = child_col1_num + 1;
        break;
      }
      case 'col2':
      {
        var parent = document.getElementById("col2");
        child.id = 'c2_' + child_col2_num;
        child.style.order = child_col[e.target.parentElement.id];
        child_col2_num = child_col2_num + 1;
        break;
      }
      case 'col3':
      {
        var parent = document.getElementById("col3");
        child.id = 'c3_' + child_col3_num;
        child.style.order = child_col[e.target.parentElement.id];
        child_col3_num = child_col3_num + 1;
        break;
      }
    }
    child_col[e.target.parentElement.id] = child_col[e.target.parentElement.id] + 1;

    child.setAttribute('class','child noselect');
    //Content on Child
    childcontent.setAttribute('class','childcontent noselect');
    childcontent.setAttribute('contenteditable', 'true');
    childcontent.innerHTML = 'Task';
    //Logo on Child
    childlogo.setAttribute('class','childlogo fa fa-edit');

    child.appendChild(childcontent);
    child.appendChild(childlogo);
    parent.appendChild(child);

    child.addEventListener('mousedown',child_press,false);
  }
  */
}

function col1_move(e){
  //console.log(is_select)
  if((is_select)&&(e.x != x_start_press)&&(e.y != y_start_press)){
    if(!is_init_element_drap){
      col_drap_obj = elem_drap.parentElement;

      is_init_element_drap = true;
      elem_move = document.createElement('div');
      //console.log('move')
      elem_move.innerHTML = document.getElementById(id_elem_drap).innerHTML;
      document.getElementById(id_elem_drap).innerText = '';
      document.getElementById(id_elem_drap).style.height = height_child - 20 +'px';
      document.getElementById(id_elem_drap).style.background = '#f4f4f4'
      elem_move.setAttribute('class','childdrap noselect');
      elem_move.style.height = height_child - 20 + 'px';
      elem_move.style.width = width_child - 20 + 'px';

      elem_move.style.left = e.x + x_offset + 'px';
      elem_move.style.top = e.y + y_offset + 'px';


      col_x_common = col_drap_obj.clientWidth;
      col_y_element = {};
      col_height_element = {};
    }
    else{
      col_drap_obj = elem_drap.parentElement;

      if(!is_create_element_drap){
        document.body.appendChild(elem_move);
        is_create_element_drap = true;
      }
      elem_move.style.position = 'absolute';
      elem_move.style.left = e.x + x_offset + 'px';
      elem_move.style.top = e.y + y_offset + 'px';

      x0 = (elem_move.offsetLeft - 10 + (elem_move.clientWidth/2));
      y0 = (elem_move.offsetTop - 10 + (elem_move.clientHeight/2));
      for(i = 1; i <= 3; i++){
        col_check = 'col' + i;
        col_obj = document.getElementById(col_check);
        //Check Element on Column ?
        if(( x0 > col_obj.offsetLeft)&&(x0 < (col_obj.offsetLeft + col_obj.clientWidth))){
          //Drap in difference column
          if(col_check !== col_drap_obj.id){
            if(col_obj.childElementCount == 2){
              var order_temp = elem_drap.style.order;

              /*
              delete_element_firebase(col_drap_obj.id, col_drap_obj.childElementCount - 3);
              col_drap_obj.removeChild(elem_drap);

              elem_drap.style.order = 0;
              col_obj.appendChild(elem_drap);
              add_element_firebase(col_obj.id, 0, elem_move.textContent);
              */


              //

              delete_element_firebase(col_drap_obj.id, col_drap_obj.childElementCount - 3);
              col_drap_obj.removeChild(elem_drap);

              elem_drap.style.order = 0;
              col_obj.appendChild(elem_drap);
              add_element_firebase(col_check, 0, elem_move.textContent);


              console.log('Elelemt Count' + col_drap_obj.childElementCount)
              for(k = 1; k < col_drap_obj.childElementCount; k++){
                if((col_drap_obj.children[k].style.order > order_temp)&&(col_drap_obj.children[k].style.order < 10)){
                  console.log('K' + k);

                  col_drap_obj.children[k].style.order = col_drap_obj.children[k].style.order - 1;
                  console.log('New Order ' + col_drap_obj.children[k].style.order);
                  add_element_firebase(col_drap_obj.id, col_drap_obj.children[k].style.order, col_drap_obj.children[k].textContent);
                }
              }
            }
            else{
              var index_change = 0;
              var order_temp = elem_drap.style.order;
              for(j = 1; j < (col_obj.childElementCount); j++){
                if(((elem_move.offsetTop - 10 + (elem_move.clientHeight/2)) > (col_obj.children[j].offsetTop))&&((elem_move.offsetTop - 10 + (elem_move.clientHeight/2)) < (col_obj.children[j].offsetTop + col_obj.children[j].clientHeight))&&(col_obj.children[j].style.order < 10)){
                  index_change = col_obj.children[j].style.order;
                  //console.log(index_change)
                }
              }

              for(j = 1; j < (col_obj.childElementCount); j++){
                if((col_obj.children[j].style.order >= index_change)&&(col_obj.children[j].style.order < 10)){
                  col_obj.children[j].style.order = +col_obj.children[j].style.order + 1;
                  add_element_firebase(col_obj.id, col_obj.children[j].style.order, col_obj.children[j].textContent);
                }
              }

              delete_element_firebase(col_drap_obj.id, col_drap_obj.childElementCount - 3);
              col_drap_obj.removeChild(elem_drap);

              elem_drap.style.order = index_change;
              col_obj.appendChild(elem_drap);
              add_element_firebase(col_obj.id, index_change, elem_move.textContent);

              for(j = 1; j < col_drap_obj.childElementCount; j++){
                if((col_drap_obj.children[j].style.order > order_temp)&&(col_drap_obj.children[j].style.order < 10)){
                  col_drap_obj.children[j].style.order = col_drap_obj.children[j].style.order - 1;
                  add_element_firebase(col_drap_obj.id, col_drap_obj.children[j].style.order, col_drap_obj.children[j].textContent);
                }
              }

              //col_order_soft(col_drap_obj);
            }
            child_col[col_check] = child_col[col_check] + 1;
            child_col[col_drap_obj.id] = child_col[col_drap_obj.id] - 1;
          }
          else {  //Drap in same column
            for(i = 1; i < (col_drap_obj.childElementCount); i++){
              col_y_element[i] = col_drap_obj.children[i].offsetTop;
              col_height_element[i] = col_drap_obj.children[i].clientHeight;
              if(((elem_move.offsetTop - 10 + elem_move.clientHeight/2) > col_drap_obj.children[i].offsetTop)&&((elem_move.offsetTop - 10 + elem_move.clientHeight/2) < (col_drap_obj.children[i].offsetTop + col_drap_obj.children[i].clientHeight))&&(col_drap_obj.children[i].style.order < 10)){
                if(col_drap_obj.children[i].style.order !== document.getElementById(id_elem_drap).style.order){
                  order_temp = col_drap_obj.children[i].style.order;
                  col_drap_obj.children[i].style.order = document.getElementById(id_elem_drap).style.order;
                  add_element_firebase(col_drap_obj.id, col_drap_obj.children[i].style.order, col_drap_obj.children[i].textContent);
                  document.getElementById(id_elem_drap).style.order = order_temp;
                  add_element_firebase(col_drap_obj.id, order_temp, elem_move.textContent);
                }

                break;
              }
            }
          }
          break;
        }
      }

      /*
      for(i = 1; i < (col_drap_obj.childElementCount - 1); i++){
        col_y_element[i] = col_drap_obj.children[i].offsetTop;
        col_height_element[i] = col_drap_obj.children[i].clientHeight;
        if(((elem_move.offsetTop - 10 + elem_move.clientHeight/2) > col_drap_obj.children[i].offsetTop)&&((elem_move.offsetTop - 10 + elem_move.clientHeight/2) < (col_drap_obj.children[i].offsetTop + col_drap_obj.children[i].clientHeight))){
          order_temp = col_drap_obj.children[i].style.order;
          col_drap_obj.children[i].style.order = document.getElementById(id_elem_drap).style.order;
          document.getElementById(id_elem_drap).style.order = order_temp;
          break;
        }
      }
      */
    }
  }
}
function col1_up(e){
  if(is_create_element_drap){
    //Chuyen text vao element
    document.getElementById(id_elem_drap).innerHTML = elem_move.innerHTML;

    //console.log(height_child);
    document.getElementById(id_elem_drap).style.height = '';
    //console.log(document.getElementById(id_elem_drap).clientHeight);

    document.getElementById(id_elem_drap).style.background = ''

    document.body.removeChild(elem_move);
    //console.log('remove')
  }

  is_select = false;
  is_create_element_drap = false;
  is_init_element_drap = false;
}
var is_press_col = false;
function press_col(e){
  is_press_col = true;
}
function press_window(e){
  if((is_addElement)&&(!is_press_col)){
    is_addElement = false;
    create_AddElem(child_textarea_add_temp.parentElement.id);
    child_textarea_add_temp.parentElement.removeChild(child_textarea_add_temp);
  }
  else{
    is_press_col = false;
  }
}
function col_order_soft(col){
  var child_index = {};
  var child_index_loss = 100;
  var max_child = 0;
  for(let i = 1; i < col.childElementCount; i++){
    if(col.children[i].style.order < 10){
      child_index[col.children[i].style.order] = 1;
      max_child = col.children[i].style.order;
    }
  }
  var child_index_loss;
  for(let i = 0; i < Object.getOwnPropertyNames(child_index).length; i++){
    if(child_index[i] === undefined){
      child_index_loss = i;
      break;
    }
  }

  if(child_index_loss !== 100){
    for(let i = 1; i < col.childElementCount; i++){
      if((col.children[i].style.order > child_index_loss)&&(col.children[i].style.order < 10)){
        col.children[i].style.order = col.children[i].style.order - 1;
        add_element_firebase(col.id, col.children[i].style.order, col.children[i].textContent)
        //console.log(col.children[i].style.order)
        //console.log(col.children[i].textContent)
      }
      child_index[col.children[i].style.order] = 1;
    }
  }
}
function elem_delete(elem_del){
  var parent_elem = elem_del.parentElement;
  //console.log(parent_elem.childElementCount - 1)
  delete_element_firebase(parent_elem.id, parent_elem.childElementCount - 3);

  parent_elem.removeChild(elem_del);
  col_order_soft(parent_elem);
  child_col[parent_elem.id] = child_col[parent_elem.id] - 1;
}

function keypress_callback(e){
  //console.log(e.key);


  if((e.key == 'Enter')&&(is_addElement)){
    is_addElement = true;
    add_child(child_textarea_add_temp.parentElement.id,1,document.getElementById('textarea_input').value);
    document.getElementById('textarea_input').value = '';

    /*
    is_addElement = false;
    add_child(child_textarea_add_temp.parentElement.id,1,document.getElementById('textarea_input').value);
    create_AddElem(child_textarea_add_temp.parentElement.id);
    child_textarea_add_temp.parentElement.removeChild(child_textarea_add_temp);
    */
  }
  else {
  }
}

//Key Esc press Event
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
      is_addElement = false;
      //add_child(child_textarea_add_temp.parentElement.id,1,document.getElementById('textarea_input').value);
      create_AddElem(child_textarea_add_temp.parentElement.id);
      child_textarea_add_temp.parentElement.removeChild(child_textarea_add_temp);
    }
};

function login_init_page(){
  div_show = document.createElement('div');
  div_show.id = 'login_page';
  div_show.innerHTML = document.getElementById('container_login').innerHTML;
  document.body.appendChild(div_show);

  document.getElementById('btn_google_login').addEventListener('click', google_login);
}
var index_project = 0;
function dashboard_page_init(){
  let doc_project = firebase.firestore().collection(user_id).doc('project');
  doc_project.get()
  .then(function(doc) {
    //console.log(doc.data());
    a = doc.data();
    document.body.style.backgroundColor = '#00ddee'

    div_show = document.createElement('div');
    div_show.innerHTML = document.getElementById('container_dashboard').innerHTML;
    document.body.appendChild(div_show);

    document.getElementById('add_dassboard').addEventListener('mousedown', add_child_dashboard, false);
    console.log(Object.keys(a).length);
    for(let i = 0; i < Object.keys(a).length; i++){
      (function(){
        let child = document.createElement('div');
        child.className = 'child_dashboard noselect';
        child.innerText = a[i];
        console.log(a[i])
        child.style.order = index_project;
        child.id = index_project;
        document.getElementById('dashboard_element').appendChild(child);
        index_project = index_project + 1;
        child.addEventListener('mousedown', project_select, false);
      })();
    }
  })
  .catch(function(error) {
    //console.log("Error getting document:", error);
  });
}
function add_child_dashboard(){
  let child = document.createElement('div');
  child.className = 'child_dashboard noselect';
  child.innerText = 'Project';
  child.style.order = index_project;

  document.getElementById('dashboard_element').appendChild(child);
  index_project = index_project + 1;
}
function project_select(){
  
}
function content_init_page(){
  //Remove Page Login

  //Change Backgroud color
  document.body.style.backgroundColor = '#00ddee'

  div_show = document.createElement('div');
  div_show.innerHTML = document.getElementById('container_content').innerHTML;
  document.body.appendChild(div_show);

  //if(!is_uid){
    //IndexDB_Init();
  //}

  //getData_firebase();

  document.getElementById('add1').style.order = 10;
  document.getElementById('add2').style.order = 10;
  document.getElementById('add3').style.order = 10;
  //add_element_firebase('col2',1,'hsihi');
  //delete_element_firebase();

  document.getElementById('add1').addEventListener('mousedown',add_child_callback, false);
  document.getElementById('add2').addEventListener('mousedown',add_child_callback, false);
  document.getElementById('add3').addEventListener('mousedown',add_child_callback, false);

  //----------------------------------------------------------------------------
  document.getElementById('col1').addEventListener('mousemove',col1_move, false);
  window.addEventListener('mousemove',col1_move, false);

  //----------------------------------------------------------------------------
  //Mouse Up for drap element or none (col1, col2, col3)
  document.getElementById('col1').addEventListener('mouseup',col1_up, false);
  document.getElementById('col2').addEventListener('mouseup',col1_up, false);
  document.getElementById('col3').addEventListener('mouseup',col1_up, false);
  //Mouse Up for drap element or none in window
  window.addEventListener('mouseup',col1_up, false);

  document.getElementById('col1').addEventListener('mousedown',press_col, false);
  document.getElementById('col2').addEventListener('mousedown',press_col, false);
  document.getElementById('col3').addEventListener('mousedown',press_col, false);
  window.addEventListener('mousedown', press_window, false);
  //Keyboard Press Event
  document.addEventListener("keypress", keypress_callback, false);
}


function google_login(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    // ...
    //console.log(user)
    user_id = user.uid;
    document.body.removeChild(document.getElementById('login_page'));
    content_init_page();
    getData_firebase();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    //console.log(errorCode)
  });
}

var db;
var request;
var user_id;
/*
function IndexDB_Init(){
  //prefixes of implementation that we want to test
  window.indexedDB = window.indexedDB || window.mozIndexedDB ||
  window.webkitIndexedDB || window.msIndexedDB;

  //prefixes of window.IDB objects
  window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
  window.msIDBKeyRange

  request = window.indexedDB.open("firebaseLocalStorageDb");
  request.onerror = function(event) {
     //console.log("error: ");
  };

  request.onsuccess = function(event) {
     db = request.result;
     //console.log("success: "+ db);
     readAll();
  };
}
*/
function IndexDB_Init(){
  //prefixes of implementation that we want to test
  window.indexedDB = window.indexedDB || window.mozIndexedDB ||
  window.webkitIndexedDB || window.msIndexedDB;

  //prefixes of window.IDB objects
  window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
  window.msIDBKeyRange

  request = window.indexedDB.open("firebaseLocalStorageDb");
  request.onerror = function(event) {
     //console.log("error: ");
  };

  request.onsuccess = function(event) {
     db = request.result;
     //console.log("success: "+ db);
     readAll();
  };
}

var is_uid = false;
var is_content_init = false;
function readAll() {
   var objectStore = db.transaction("firebaseLocalStorage").objectStore("firebaseLocalStorage");
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
         //alert("Name for id " + cursor.key + " is " + cursor.value.name + ",Age: " + cursor.value.age + ", Email: " + cursor.value.email);
         //console.log(cursor.key + 'hihi ' + cursor.value.value.uid)
         var array = cursor.key.split(':');
         user_id = cursor.value.value.uid;
         //console.log(user_id);
         cursor.continue();
         is_uid = true;
         //getData_firebase();
      } else {
         //alert("No more entries!");
         //console.log('No UserID');
      }
      if(!is_content_init){
        if(is_uid){
          //content_init_page();
          //setTimeout(getData_firebase, 2000);
          dashboard_page_init();
        }
        else{
          //login_init_page();
        }
        is_content_init = true;
      }
   };
}
/*
function readAll() {
   var objectStore = db.transaction("firebaseLocalStorage").objectStore("firebaseLocalStorage");
   objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
         //alert("Name for id " + cursor.key + " is " + cursor.value.name + ",Age: " + cursor.value.age + ", Email: " + cursor.value.email);
         //console.log(cursor.key + 'hihi ' + cursor.value.value.uid)
         var array = cursor.key.split(':');
         user_id = cursor.value.value.uid;
         //console.log(user_id);
         cursor.continue();
         is_uid = true;
         getData_firebase();
      } else {
         //alert("No more entries!");
         //console.log('No UserID');
      }
      if(!is_content_init){
        if(is_uid){
          content_init_page();
          //setTimeout(getData_firebase, 2000);
        }
        else{
          login_init_page();
        }
        is_content_init = true;
      }
   };
}
*/

$(document).ready(function() {
  firebase_init();
  IndexDB_Init();
})
