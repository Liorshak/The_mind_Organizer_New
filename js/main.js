// class Bubble (id, text, done, hidden, type, priority)
let Bubble = class {
  constructor(id, text, done, hidden, type, priority) {
    this.id = id;
    this.text = text;
    this.done = done;
    this.hidden = hidden;
    this.type = type;
    this.priority = priority;
  }
};
let bubblesList = [];

// collect elements
let brainForm = document.getElementById("brainForm");
let inputItem = document.getElementById("inputItem");
let dragArea = document.getElementById("dragArea");

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
  newBubble.addEventListener("dragend",endDrag);


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

  //need to make an input to get item priority

  //create check button
  let newCheck = document.createElement("input"); // creating input
  newCheck.setAttribute("type", "checkbox");
  //create radio button

  // make draggable true attribute
  newBubble.setAttribute("draggable", "true");
  newBubble.style.position = "absolute"
  //randomX = Math.floor(Math.random * 400);
  //randomY = Math.floor(Math.random * 700);

  //make style position x random
  // make style position y random

  /// here event lisiner del btn
  /// here event lisiner check box btn
  /// here event lisiner radio btn
  /// here event lisiner dragstart div (newBubble)
  /// here event listiner dragEnd div ( newBubble)
  /// here event listiner item priority

  newBubble.appendChild(delBtn);
  newBubble.appendChild(newCheck);
  newBubble.appendChild(newTxt);

  /// newBubble.appendChild (priority)
  //newBubble.appendChild (radio)

  dragArea.appendChild(newBubble);
  // to do list append child new bubble
  //newBubble.style.top = randomY + "px";
  //newBubble.style.left = randomX + "px";
}

function startDrag (event) {
  //event.preventDefault();
  //event.target.style.backgroundColor = "lightpink";
}

function endDrag (event) {
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

// part 3 - functions createBubble() -> creates a draggable div bubble
// sanity validations (text not empty for instance)-> checkBubble
// div > input with text / radio button ->
// delete (hidden=true) / done check box / priority input
