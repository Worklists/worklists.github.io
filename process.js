child_col1_num = 0;
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
function add_child_callback(){
  if(!is_select){
    console.log('a');
    var parent = document.getElementById("col1");
    var child = document.createElement("div");
    var childcontent = document.createElement("div");
    var childlogo = document.createElement("div");

    child.setAttribute('class','child noselect');
    //child.setAttribute('contenteditable', 'true');
    //child.innerHTML = "hihi";
    child.id = 'c1_' + child_col1_num;
    child.style.order = child_col1_num;

    childcontent.setAttribute('class','childcontent noselect');
    childcontent.setAttribute('contenteditable', 'true');
    childcontent.innerHTML = 'Task';

    childlogo.setAttribute('class','childlogo fa fa-edit');

    child.appendChild(childcontent);
    child.appendChild(childlogo);

    child_col1_num = child_col1_num + 1;
    parent.appendChild(child);
    child.addEventListener('mousedown',child_press,false);

    console.log(typeof(parent.clientHeight));
    //parent.style.height = (parent.clientHeight + 80) + 'px';
  }
}
var k = 10, elem_move;
var is_create_element_drap = false;
var x_offset, y_offset;
function col1_move(e){
  //console.log(is_select)
  if((is_select)&&(e.x != x_start_press)&&(e.y != y_start_press)){
    if(!is_create_element_drap){
      is_create_element_drap = true;

      elem_move = document.createElement('div');
      //console.log('move')
      elem_move.innerHTML = document.getElementById(id_elem_drap).innerHTML;
      document.getElementById(id_elem_drap).innerText = '';
      //console.log(height_child);
      document.getElementById(id_elem_drap).style.height = height_child - 20 +'px';
      //console.log(document.getElementById(id_elem_drap).clientHeight);

      document.getElementById(id_elem_drap).style.background = '#f4f4f4'

      //console.log(document.getElementById(id_elem_drap).style);
      //elem_move.style = document.getElementById(id_elem_drap).style;
      elem_move.setAttribute('class','childdrap noselect');
      elem_move.style.height = height_child - 20 + 'px';
      elem_move.style.width = width_child - 20 + 'px';
      document.body.appendChild(elem_move);
      //console.log('----------------------------')
      //console.log(document.getElementById(id_elem_drap).offsetLeft)

      //
      col1_obj = document.getElementById('col1');
      col1_x_common = col1_obj.clientWidth;
      col1_y_element = {};
      col1_height_element = {};
      /*
      for(i = 2; i < col1_obj.childElementCount; i++){
        col1_y_element[i] = col1_obj.children[i].offsetTop;
        col1_height_element[i] = col1_obj.children[i].clientHeight;
      }*/
    }
    else{
      elem_move.style.position = 'absolute';
      elem_move.style.left = e.x + x_offset + 'px';
      elem_move.style.top = e.y + y_offset + 'px';
      k = k + 1;


      for(i = 2; i < col1_obj.childElementCount; i++){
        col1_y_element[i] = col1_obj.children[i].offsetTop;
        col1_height_element[i] = col1_obj.children[i].clientHeight;
        console.log('-------------------------------------------------------')
        console.log(i)
        console.log(elem_move.offsetTop - 10)
        console.log(col1_obj.children[i].offsetTop)
        if(((elem_move.offsetTop - 10 + elem_move.clientHeight/2) > col1_obj.children[i].offsetTop)&&((elem_move.offsetTop - 10 + elem_move.clientHeight/2) < (col1_obj.children[i].offsetTop + col1_obj.children[i].clientHeight))){
          order_temp = col1_obj.children[i].style.order;
          col1_obj.children[i].style.order = document.getElementById(id_elem_drap).style.order;
          document.getElementById(id_elem_drap).style.order = order_temp;
          console.log('change');
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
}
$(document).ready(function() {
  document.getElementById('add1').addEventListener('mousedown',add_child_callback, false);
  document.getElementById('col1').addEventListener('mousemove',col1_move, false);

  document.getElementById('col1').addEventListener('mouseup',col1_up, false);
  window.addEventListener('mouseup',col1_up, false);

  window.addEventListener('mousemove',col1_move, false);
})
