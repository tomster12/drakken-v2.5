
// Imports
import Canvas from "../Canvas";
import Input from "../Input";
import State from "./State";
import MenuState from "./MenuState";


// Canvas interface
export interface GameCanvas extends Canvas {

  states: State[];
}


// Canvas function
export function gameCanvasFunc(cv: GameCanvas) {

  cv.setup = function() {
    // Setup canvas
    cv.createCanvas(800, 800);
    cv.textSize(25);
    cv.fill(255);
    cv.noStroke();

    // Initialize variables
    cv.in = new Input(cv);
    cv.focused = false;
    cv.states = [];

    // Populate states
    cv.states.push(new MenuState(cv));
  }


  cv.draw = function() {
    // Check if there are states
    if (cv.states.length > 0) {

      // Get, then draw current state
      let currentState = cv.states[cv.states.length - 1];
      currentState.update();
      currentState.show();

      // Pop top state if requested
      if (currentState.toPop) cv.states.pop();
    }
  }
}
