
// Imports
import AssetManager from "../../managers/AssetManager";
import { Canvas } from "../../Canvas";
import Input from "../../utility/Input";
import State from "./State";
import BottomState from "./BottomState";


// Canvas interface
export class GameCanvas extends Canvas {

  states: State[];
}


// Canvas function
export function gameCanvasFunc(cv: GameCanvas) {

  cv.setup = function() {
    // Setup canvas
    cv.createCanvas(1000, 800);
    cv.textSize(25);
    cv.fill(255);
    cv.noStroke();
    cv.textFont(AssetManager.instance.getFont("main"));

    // Initialize variables
    cv.in = new Input(cv);
    cv.focused = false;
    cv.states = [];

    // Populate states
    cv.states.push(new BottomState(cv));
  }


  cv.draw = function() {
    // Check to make sure fully initialized
    if (cv.element != null) {
      cv.element.style.cursor = "default";

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
}
