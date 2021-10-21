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
// general stuff
// collect elements
// let ... document.get..
// part 2
// add respective listners to initial elements
// createBubble
// part 3 - functions createBubble() -> creates a draggable div bubble
// sanity validations (text not empty for instance)-> checkBubble
// div > input with text / radio button ->
// delete (hidden=true) / done check box / priority input
