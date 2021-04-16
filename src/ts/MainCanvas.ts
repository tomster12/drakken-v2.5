
// Imports
import { Canvas } from "./Canvas";


// Canvas interface
export interface MainCanvas extends Canvas { }


// Canvas function
export function mainCanvasFunc(cv: MainCanvas) {

  cv.setup = function() {
    console.log("A canvas has been setup.");
    cv.createCanvas(800, 800);
  }


  cv.draw = function() {
    cv.background(60);
    cv.ellipse(cv.width * 0.5, cv.height * 0.5, 60, 60);
  }


  cv.keyPressed = function() {
    console.log("Pressed key: " + cv.keyCode);
  }
}
