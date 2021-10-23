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
let isDown = false;
let offset = [0, 0];
let draggedElement 

// collect elements
let brainForm = document.getElementById("brainForm");
let subjectForm = document.getElementById("subjectForm");
let inputItem = document.getElementById("inputItem");
let inputSubject = document.getElementById("inputSubject");
let dragArea = document.getElementById("dragArea");
let toDos = document.getElementById("toDos");
let toProcess = document.getElementById("toProcess");

let exportProcessBtn = document.getElementById("exportProcessBtn");
let exportToDoBtn = document.getElementById("exportToDoBtn");

//initial listeners
brainForm.addEventListener("submit", createBubble);
subjectForm.addEventListener("submit", maintainSubject);
exportProcessBtn.addEventListener("click", clickExportProcess);
exportToDoBtn.addEventListener("click", clickExportToDo);

let subjectFlag = false;
function maintainSubject(event) {
  event.preventDefault();
  if (!subjectFlag) {
    createSubject();
  } else {
    let mainSubject = document.getElementById("mainSubject");
    mainSubject.textContent = inputSubject.value;
  }
}

function createSubject() {
  let newSubject = document.createElement("div");
  let newSubTxt = document.createTextNode(inputSubject.value);
  newSubject.appendChild(newSubTxt);
  newSubject.setAttribute("id", "mainSubject");
  dragArea.insertBefore(newSubject, dragArea.firstChild);
  subjectFlag = true;
}
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

  //need to make an input to get item priority

  // ************** Radio Button
  // <input type="radio" id="html" name="fav_language" value="HTML">
  //   <label for="html">HTML</label><br>

  //create radio button

  // make draggable true attribute
  // newBubble.setAttribute("draggable", "true");
  // newBubble.style.position = "absolute";
  // randomX = Math.floor(Math.random * 400);
  // randomY = Math.floor(Math.random * 700);

  //make style position x random
  // make style position y random
  // newBubble.style.top = randomY + "px";
  // newBubble.style.left = randomX + "px";

  /// here event listener radio btn

  /// here event listener item priority

  addDelBtn(newBubble, "delBtn");
  addCheckBtn(newBubble, "checkInput");

  newBubble.appendChild(newTxt);

  addRadio(newBubble, "radios", newObj.id);
  /// newBubble.appendChild (priority)
  //newBubble.appendChild (radio)

  newBubble.addEventListener("mousedown", bubbleMouseDown);
  document.addEventListener("mouseup", bubbleMouseUp);
  newBubble.addEventListener("mousemove", bubbleMouseMove);

  newBubble.classList.add("thought");

  dragArea.appendChild(newBubble);

  //recreate the element  for the to do list

  // to do list append child new bubble

  inputItem.value = "";
}

function addRadio(location, styleType, id) {
  let divRadios = document.createElement("div");
  let divRadio1 = document.createElement("div");
  let divRadio2 = document.createElement("div");

  let radio1 = document.createElement("input");
  radio1.setAttribute("type", "radio");
  radio1.setAttribute("name", "kind" + id);
  radio1.setAttribute("id", id + "radioD");
  let labelForRadio1 = document.createElement("label");
  labelForRadio1.setAttribute("for", id + "radio");
  let txtForLabelRadio1 = document.createTextNode("D");
  labelForRadio1.appendChild(txtForLabelRadio1);
  radio1.addEventListener("change", bubbleToDo);

  divRadio1.appendChild(radio1);
  divRadio1.appendChild(labelForRadio1);

  let radio2 = document.createElement("input");
  radio2.setAttribute("type", "radio");
  radio2.setAttribute("name", "kind" + id);
  radio2.setAttribute("id", id + "radioT");
  let labelForRadio2 = document.createElement("label");
  labelForRadio2.setAttribute("for", id + "radioT");
  let txtForLabelRadio2 = document.createTextNode("T");
  labelForRadio2.appendChild(txtForLabelRadio2);
  radio2.addEventListener("change", bubbleToProcess);

  divRadio2.appendChild(radio2);
  divRadio2.appendChild(labelForRadio2);

  divRadios.appendChild(divRadio1);
  divRadios.appendChild(divRadio2);
  divRadios.classList.add(styleType);

  location.appendChild(divRadios);
}

function addDelBtn(location, styleType) {
  //create del btn
  let delBtn = document.createElement("button");
  let delBtnTxt = document.createTextNode("x");
  delBtn.appendChild(delBtnTxt);
  delBtn.classList.add(styleType);

  delBtn.addEventListener("click", removeBubble);
  location.appendChild(delBtn);
}

function addCheckBtn(location, styleType) {
  //create check button
  let newCheck = document.createElement("input"); // creating input
  newCheck.setAttribute("type", "checkbox");
  newCheck.classList.add(styleType);
  newCheck.addEventListener("change", completeTask);
  location.appendChild(newCheck);
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
  let idDiv = event.target.parentNode.getAttribute("id");

  if (idDiv === null) {
    idDiv = event.target.parentNode.getAttribute("data-objid");
  }

  let index = bubblesList.findIndex((p) => p.id == idDiv);
  bubblesList[index]["hidden"] = true;
  let bubbleInDrag = document.getElementById(`${index}`);
  let bubbleInList = document.querySelector(`[data-objid="${index}"]`);
  bubbleInDrag.remove();
  bubbleInList.remove();
  //removing also from process and list
}

function completeTask(event) {
  let idDiv = event.target.parentNode.getAttribute("id");

  if (idDiv === null) {
    idDiv = event.target.parentNode.getAttribute("data-objid");
  }
  let index = bubblesList.findIndex((p) => p.id == idDiv);
  bubblesList[index]["done"] = event.target.checked;
  let bubbleInDrag = document.getElementById(`${index}`);
  let bubbleInList = document.querySelector(`[data-objid="${index}"]`);
  if (bubblesList[index]["done"]) {
    // event.target.parentNode.classList.add("finished");
    //also in process and list
    bubbleInDrag.classList.add("finished");
    bubbleInList.classList.add("finished");
  } else {
    // event.target.parentNode.classList.remove("finished");
    bubbleInDrag.classList.remove("finished");
    bubbleInList.classList.remove("finished");
  }
  //also in process and list
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
  divContainer.addEventListener('dragstart',dragStart);
  divContainer.addEventListener('dragenter', dragEnter);
  divContainer.addEventListener('dragover', dragOver);
  divContainer.addEventListener('dragleave', dragLeave);
  divContainer.addEventListener('dragend',dragEnd);
  divContainer.addEventListener('drop', dragDrop);
  divContainer.setAttribute("draggable", "true");
  divContainer.setAttribute("data-objid", id);
  let txtNode = document.createTextNode(obj.text);
  addDelBtn(divContainer, "delBtnList");
  addCheckBtn(divContainer, "checkInputList");
  divContainer.appendChild(txtNode);
  addRadio(divContainer, "radiosInList", id);
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
    if (divEle.getAttribute("data-objID") == id) {
      return divEle;
    }
  }
}

function bubbleMouseDown(event) {
  isDown = true;
  ele = event.target;
  if (!ele.classList.contains("thought")) {
    ele = event.target.closest(".thought");
  }
  offset = [ele.offsetLeft - event.clientX, ele.offsetTop - event.clientY];
}

function bubbleMouseUp(event) {
  isDown = false;
}

function bubbleMouseMove(event) {
  let ele = event.target;
  event.preventDefault();
  if (!ele.classList.contains("thought")) {
    ele = event.target.closest(".thought");
  }
  if (isDown) {
    let mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    ele.style.left = mousePosition.x + offset[0] + "px";
    ele.style.top = mousePosition.y + offset[1] + "px";
  }
}

function dragStart(event){
console.log("dragStart");
draggedElement = event.target;
event.target.classList.add("dragstart");
}

function dragEnter(event){
console.log("dragEnter");
event.target.classList.add("dragenter");
}

function dragLeave(event) {
console.log("dragLeave");
event.target.classList.remove("dragenter");
}

function dragOver(event) {
  event.preventDefault();
  console.log("dragOver");
}

function dragDrop(event) {

let dropZoneName = ((findBubble(event.target.getAttribute("data-objid")).type) == 1)? "toDosList" : "toProcessList";
let dropZone = document.getElementById(dropZoneName);
draggedElement.classList.remove("dragstart");
event.target.classList.remove("dragenter");
dropZone.insertBefore(draggedElement,event.target);
}

function dragEnd(event) {
  event.target.classList.remove("dragstart");

}

function exportToCsv(filename, rows) {
  let processRow = function (row) {
    let finalVal = '';
    for (let j = 0; j < row.length; j++) {
      let innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      };
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
        result = '"' + result + '"';
      if (j > 0)
        finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function clickExportProcess() {
  exportToCsv("export.csv",getBubbles(2))
}

function clickExportToDo() {
  exportToCsv("export.csv", getBubbles(1))
}

function getBubbles(typeWanted) {
  let arr=[["Item","Type"]];
  listWanted = (typeWanted == 1)? "toDosList" : "toProcessList";
  divsWanted = document.querySelector("#" + listWanted).childNodes;
  for (let divWanted of divsWanted) {
    let objIdWanted = divWanted.getAttribute("data-objid");
    let txt = findBubble(objIdWanted).text;
    if (txt) {arr.push([findBubble(objIdWanted).text, listWanted])}
  }
  return arr;
}