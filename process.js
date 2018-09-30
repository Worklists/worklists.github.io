var child_col1_num = 0, child_col2_num = 0, child_col3_num = 0;
var a, id_elem_drap;
var is_select = false;
var x_start_press, y_start_press, height_child, width_child;
var elem_drap;
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
  console.log(height_child)

  elem_drap = document.getElementById(id_elem_drap);

  is_select = true;

  x_start_press = e.x;
  console.log(x_start_press);

  y_start_press = e.y;
  x_offset = document.getElementById(id_elem_drap).offsetLeft - e.x - 10;
  y_offset = document.getElementById(id_elem_drap).offsetTop - e.y - 10;
  console.log(document.getElementById(id_elem_drap).offsetLeft);
}

function add_child_callback(e){
  if(!is_select){
    var child = document.createElement("div");
    var childcontent = document.createElement("div");
    var childlogo = document.createElement("div");

    switch(e.target.parentElement.id){
      case 'col1':
      {
        var parent = document.getElementById("col1");
        child.id = 'c1_' + child_col1_num;
        child.style.order = child_col1_num;
        child_col1_num = child_col1_num + 1;
        break;
      }
      case 'col2':
      {
        var parent = document.getElementById("col2");
        child.id = 'c2_' + child_col2_num;
        child.style.order = child_col2_num;
        child_col2_num = child_col2_num + 1;
        break;
      }
      case 'col3':
      {
        var parent = document.getElementById("col3");
        child.id = 'c3_' + child_col3_num;
        child.style.order = child_col3_num;
        child_col3_num = child_col3_num + 1;
        break;
      }
    }

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
}
var elem_move;
var is_create_element_drap = false;
var is_init_element_drap = false;
var x_offset, y_offset;
function col1_move(e){
  //console.log(is_select)
  if((is_select)&&(e.x != x_start_press)&&(e.y != y_start_press)){
    if(!is_init_element_drap){
      switch (elem_drap.parentElement.id) {
        case 'col1':{
          col_drap_obj = document.getElementById('col1');
          break;
        }
        case 'col2':{
          col_drap_obj = document.getElementById('col2');
          break;
        }
        case 'col3':{
          col_drap_obj = document.getElementById('col3');
          break;
        }
      }

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
      if(!is_create_element_drap){
        document.body.appendChild(elem_move);
        is_create_element_drap = true;
      }
      elem_move.style.position = 'absolute';
      elem_move.style.left = e.x + x_offset + 'px';
      elem_move.style.top = e.y + y_offset + 'px';
      for(i = 2; i < col_drap_obj.childElementCount; i++){
        col_y_element[i] = col_drap_obj.children[i].offsetTop;
        col_height_element[i] = col_drap_obj.children[i].clientHeight;
        if(((elem_move.offsetTop - 10 + elem_move.clientHeight/2) > col_drap_obj.children[i].offsetTop)&&((elem_move.offsetTop - 10 + elem_move.clientHeight/2) < (col_drap_obj.children[i].offsetTop + col_drap_obj.children[i].clientHeight))){
          order_temp = col_drap_obj.children[i].style.order;
          col_drap_obj.children[i].style.order = document.getElementById(id_elem_drap).style.order;
          document.getElementById(id_elem_drap).style.order = order_temp;
          break;
        }
      }
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
    console.log('remove')
  }
  is_select = false;
  is_create_element_drap = false;
  is_init_element_drap = false;
}
$(document).ready(function() {
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


})
