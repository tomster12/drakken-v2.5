
// Imports
import Canvas from "../Canvas";
import Input from "../Input";


// Canvas interface
export interface ChatCanvas extends Canvas { }


// Canvas function
export function chatCanvasFunc(cv: ChatCanvas) {

  cv.setup = function() {
    cv.createCanvas(400, 800);
    cv.textSize(25);
    cv.fill(255);
    cv.noStroke();

    cv.in = new Input(cv);
    console.log("A chat canvas has been setup.");
  }


  cv.draw = function() {
    cv.background(60);
    cv.ellipse(cv.width * 0.75, cv.height * 0.5, 60, 60);

    cv.textAlign(cv.CENTER);
    cv.text(
      JSON.stringify(cv.in.keys.held).replace(/,/g, ",\n"),
      cv.width * 0.5, 50);
    cv.ellipse(cv.mouseX, cv.mouseY, 30, 30);
  }
}
