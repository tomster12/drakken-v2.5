
// Imports
import { Canvas } from "./Canvas";


// Canvas interface
export interface HistoryCanvas extends Canvas { }


// Canvas function
export function historyCanvasFunc(cv: HistoryCanvas) {

  cv.setup = function() {
    console.log("A history canvas has been setup.");
    cv.createCanvas(400, 800);
  }


  cv.draw = function() {
    cv.background(60);
    cv.ellipse(cv.width * 0.25, cv.height * 0.5, 60, 60);
  }


  cv.keyPressed = function() {
    console.log("Pressed key: " + cv.keyCode);
  }
}
