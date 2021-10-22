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
  newBubble.appendChild(newTxt);
  newBubble.setAttribute("id", bubblesList.length);
  newBubble.addEventListener("dragstart", startDrag);
  newBubble.addEventListener("dragend", endDrag);

  // create new object
  newObj = new Bubble(
    bubblesList.length,
    inputItem.value,
    false,
    false,
    "action",
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
  let radio = document.createElement("input");
  radio.setAttribute("type","radio");
  radio.setAttribute("id",newObj.id+"radio");
  let labelForRadio = document.createElement("label");
  labelForRadio.setAttribute("for",newObj.id+"radio");
  let txtForLabelRadio = document.createTextNode("To Do");
  labelForRadio.appendChild(txtForLabelRadio);
  radio.addEventListener("change",bubbleToDo)



  //create radio button

  // make draggable true attribute
  newBubble.setAttribute("draggable", "true");
  newBubble.style.position = "absolute";
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
  newBubble.appendChild(radio);
  newBubble.appendChild(labelForRadio);

  /// newBubble.appendChild (priority)
  //newBubble.appendChild (radio)

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
      return bubble
    }
  }     
  return false;
}

function addToToDo(id) {
  let obj = findBubble(id);
  console.log(obj);
  let divEleToAdd = document.getElementById("toDosList");
  let divContainer = document.createElement("div")
  let txtNode = document.createTextNode(obj.text);
  divContainer.appendChild(txtNode);
  divEleToAdd.appendChild(divContainer);
  obj.type=0;
  
}

function bubbleToDo(event) {
  let radioId = event.target.getAttribute("id");
  let objId = event.target.getAttribute("id").slice(0,radioId.length-5);
  addToToDo(objId);
}