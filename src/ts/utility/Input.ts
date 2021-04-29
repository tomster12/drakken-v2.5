
// imports
import Canvas from "../Canvas";


// Storage for keys / mouse booleans
type InputStorage = {
  pressed: { [name: number]: boolean },
  held: { [name: number]: boolean }
}


export default class Input {

  // Declare variables
  keys: InputStorage;
  mouse: InputStorage;


  constructor(cv: Canvas) {
    // Initialize keys / mouse objects
    this.keys = { pressed: {}, held: {} };
    this.mouse = { pressed: {}, held: {} };
    let scope = this;

    // Attach listeners onto key pressed / released
    let kp = cv.keyPressed || (() => {});
    let kr = cv.keyReleased || (() => {});
    cv.keyPressed = () => { scope.keys.pressed[cv.keyCode] = true; scope.keys.held[cv.keyCode] = true; kp(); };
    cv.keyReleased = () => { scope.keys.held[cv.keyCode] = false; kr(); };

    // Attach listeners onto mouse pressed / released
    let mp = cv.mousePressed || (() => {});
    let mr = cv.mouseReleased || (() => {});
    cv.mousePressed = () => { scope.mouse.pressed[cv.mouseButton] = true; scope.mouse.held[cv.mouseButton] = true; mp(); };
    cv.mouseReleased = () => { scope.mouse.held[cv.mouseButton] = false; mr(); };

    // Attach listeners onto end of draw
    let d = cv.draw || (() => {});
    cv.draw = () => { d(); scope.keys.pressed = {}; scope.mouse.pressed = {}; }
  }
}
