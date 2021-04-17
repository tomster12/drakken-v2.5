
// Imports
import { Canvas } from "./Canvas";


// Canvas interface
export interface ChatCanvas extends Canvas { }


// Canvas function
export function chatCanvasFunc(cv: ChatCanvas) {

  cv.setup = function() {
    console.log("A chat canvas has been setup.");
    cv.createCanvas(400, 800);
  }


  cv.draw = function() {
    cv.background(60);
    cv.ellipse(cv.width * 0.75, cv.height * 0.5, 60, 60);
  }


  cv.keyPressed = function() {
    console.log("Pressed key: " + cv.keyCode);
  }
}
