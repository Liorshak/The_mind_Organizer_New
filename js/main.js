// class Bubble (id, text, done, hidden, type, priority)
let Bubble = class {
  constructor(id, text, done, hidden, type, priority) {
    this.id = id;
    this.text = text;
    this.done = done;
    this.hidden = hidden;
    this.type = type; // 0 = Bubble | 1 -ToDo | 2 - ToProcess | 3 - Deleted
    this.priority = priority;
  }
};
let bubblesList = [];
// will control the gragging . Must be global.
let isDown=false; 
let offset=[0,0];

// collect elements
let brainForm = document.getElementById("brainForm");
let inputItem = document.getElementById("inputItem");
let dragArea = document.getElementById("dragArea");
let toDos = document.getElementById("toDos");
let toProcess = document.getElementById("toProcess");

//initial listeners
brainForm.addEventListener("submit", createBubble);

// let ... document.get..
// part 2

// createBubble
function createBubble(event) {
  event.preventDefault();

  //validates it's not empty
  if (isEmpty(inputItem.value)) {
    return;
  }

  let newBubble = document.createElement("div");
  let newTxt = document.createTextNode(inputItem.value);
  // newTxt.classList.add("txtInBubble");
  newBubble.appendChild(newTxt);
  newBubble.setAttribute("id", bubblesList.length);
  //*********************** IMPROVING DRAGGING */
  // newBubble.addEventListener("dragstart", startDrag);
  // newBubble.addEventListener("dragend", endDrag);
  newBubble.style.position = "absolute";


  // create new object
  newObj = new Bubble(
    bubblesList.length,
    inputItem.value,
    false,
    false,
    0, // // 0 = Bubble | 1 -ToDo | 2 - ToProcess | 3 - Deleted
    1
  );

  bubblesList.push(newObj);

  //create del btn
  let delBtn = document.createElement("button");
  let delBtnTxt = document.createTextNode("x");
  delBtn.appendChild(delBtnTxt);
  delBtn.classList.add("delBtn");

  //need to make an input to get item priority

  //create check button
  let newCheck = document.createElement("input"); // creating input
  newCheck.setAttribute("type", "checkbox");
  newCheck.classList.add("checkInput");

  // ************** Radio Button
  // <input type="radio" id="html" name="fav_language" value="HTML">
  //   <label for="html">HTML</label><br>
  let divRadios = document.createElement("div");
  let divRadio1 = document.createElement("div");
  let divRadio2 = document.createElement("div");

  let radio1 = document.createElement("input");
  radio1.setAttribute("type", "radio");
  radio1.setAttribute("name", "kind" + newObj.id);
  radio1.setAttribute("id", newObj.id + "radioD");
  let labelForRadio1 = document.createElement("label");
  labelForRadio1.setAttribute("for", newObj.id + "radio");
  let txtForLabelRadio1 = document.createTextNode("D");
  labelForRadio1.appendChild(txtForLabelRadio1);
  radio1.addEventListener("change", bubbleToDo);

  divRadio1.appendChild(radio1);
  divRadio1.appendChild(labelForRadio1);

  let radio2 = document.createElement("input");
  radio2.setAttribute("type", "radio");
  radio2.setAttribute("name", "kind" + newObj.id);
  radio2.setAttribute("id", newObj.id + "radioT");
  let labelForRadio2 = document.createElement("label");
  labelForRadio2.setAttribute("for", newObj.id + "radioT");
  let txtForLabelRadio2 = document.createTextNode("T");
  labelForRadio2.appendChild(txtForLabelRadio2);
  radio2.addEventListener("change", bubbleToProcess);

  divRadio2.appendChild(radio2);
  divRadio2.appendChild(labelForRadio2);

  divRadios.appendChild(divRadio1);
  divRadios.appendChild(divRadio2);
  divRadios.classList.add("radios");

  //create radio button

  // make draggable true attribute
  // newBubble.setAttribute("draggable", "true");
  // newBubble.style.position = "absolute";
  //randomX = Math.floor(Math.random * 400);
  //randomY = Math.floor(Math.random * 700);

  //make style position x random
  // make style position y random

  /// here event listener del btn
  delBtn.addEventListener("click", removeBubble);
  /// here event listener check box btn
  newCheck.addEventListener("change", completeTask);
  /// here event listener radio btn

  /// here event listener item priority

  newBubble.appendChild(delBtn);
  newBubble.appendChild(newCheck);
  newBubble.appendChild(newTxt);
  newBubble.appendChild(divRadios);

  /// newBubble.appendChild (priority)
  //newBubble.appendChild (radio)

  newBubble.addEventListener("mousedown", bubbleMouseDown);
  document.addEventListener("mouseup", bubbleMouseUp);
  newBubble.addEventListener("mousemove", bubbleMouseMove);


  newBubble.classList.add("thought");
  dragArea.appendChild(newBubble);

  //recreate the element  for the to do list

  // to do list append child new bubble
  //newBubble.style.top = randomY + "px";
  //newBubble.style.left = randomX + "px";
  inputItem.value = "";




  
}

function startDrag(event) {
  //event.preventDefault();
  //event.target.style.backgroundColor = "lightpink";
}

function endDrag(event) {
  let _x = event.clientX;
  let _y = event.clientY;
  event.target.style.left = _x + "px";
  event.target.style.top = _y + "px";
  event.target.style.position = "absolute";
}

function isEmpty(str) {
  if (str === "") {
    return true;
  } else {
    return false;
  }
}

function removeBubble(event) {
  let idDiv = event.target.parentNode.id;
  let index = bubblesList.findIndex((p) => p.id == idDiv);
  bubblesList[index]["hidden"] = true;
  event.target.parentNode.remove(); /// we need to think if we want to hide or remove the div and just collect the data
}

function completeTask(event) {
  let idDiv = event.target.parentNode.id;
  let index = bubblesList.findIndex((p) => p.id == idDiv);
  bubblesList[index]["done"] = event.target.checked;
  if (bubblesList[index]["done"]) {
    event.target.parentNode.classList.add("finished");
  } else {
    event.target.parentNode.classList.remove("finished");
  }
}

function findBubble(idToFind) {
  for (let bubble of bubblesList) {
    if (bubble.id == idToFind) {
      return bubble;
    }
  }
  return false;
}

function addToList(id, divList) {
  let obj = findBubble(id);
  let divEleToAdd = document.getElementById(divList);
  let divContainer = document.createElement("div");
  divContainer.setAttribute("objId", id);
  let txtNode = document.createTextNode(obj.text);
  divContainer.appendChild(txtNode);
  divEleToAdd.appendChild(divContainer);
}

function bubbleToDo(event) {
  let radioId = event.target.getAttribute("id");
  let objId = event.target.getAttribute("id").slice(0, radioId.length - 6);
  let bubble = findBubble(parseInt(objId));
  if (bubble.type != 0) {
    removeFromList("toProcessList", objId);
  }
  findBubble(parseInt(objId)).type = 1;
  addToList(objId, "toDosList"); //will add to ToDo list
}

function bubbleToProcess(event) {
  let radioId = event.target.getAttribute("id");
  let objId = event.target.getAttribute("id").slice(0, radioId.length - 6);
  let bubble = findBubble(parseInt(objId));
  if (bubble.type != 0) {
    removeFromList("toDosList", objId);
  }
  findBubble(parseInt(objId)).type = 2;
  addToList(objId, "toProcessList"); //will add to ToDo list
}

function removeFromList(listToDelete, objId) {
  let holderDiv = document.querySelector("#" + listToDelete);
  let divList = holderDiv.childNodes;
  findDivById(divList, objId).remove();
}

function findDivById(divCol, id) {
  for (let divEle of divCol) {
    if (divEle.getAttribute("objID") == id) {
      return divEle;
    }
  }
}

function bubbleMouseDown(event) {
  isDown = true;
  ele = event.target;
  if (!ele.classList.contains("thought")){
    ele = event.target.closest(".thought")
  }
  offset = [
    ele.offsetLeft - event.clientX,
    ele.offsetTop - event.clientY
  ];

}

function bubbleMouseUp(event) {
  isDown = false;
}

function bubbleMouseMove(event) {
  let ele = event.target;
  event.preventDefault();
  if (!ele.classList.contains("thought")) {
    ele = event.target.closest(".thought")
  }
  if (isDown) {
    let mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
    ele.style.left = (mousePosition.x + offset[0]) + 'px';
    ele.style.top = (mousePosition.y + offset[1]) + 'px';

  }

}
