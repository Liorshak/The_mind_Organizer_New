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
  if (isEmpty(inputItem.value)) {return} 

  let newBubble = document.createElement("div");
  newBubble.textContent = inputItem.value
  dragArea.appendChild(newBubble);


}

function isEmpty(str) {
  if (str === "") {return true}
  else {return false}
}



// part 3 - functions createBubble() -> creates a draggable div bubble
// sanity validations (text not empty for instance)-> checkBubble
// div > input with text / radio button ->
// delete (hidden=true) / done check box / priority input
