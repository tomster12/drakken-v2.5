
// Imports
import * as p5 from "p5";
import Canvas from "../Canvas";
import Input from "../Input";
import testImg from "./test.jpg";


// Canvas interface
export interface HistoryCanvas extends Canvas {
  testImg: p5.Image;
}


// Canvas function
export function historyCanvasFunc(cv: HistoryCanvas) {

  cv.setup = function() {
    // Setup canvas
    cv.createCanvas(400, 800);
    cv.textSize(25);
    cv.fill(255);
    cv.noStroke();

    // Initialize variables
    cv.in = new Input(cv);
    cv.focused = false;
    cv.testImg = cv.loadImage(testImg);
  }


  cv.draw = function() {
    cv.background(60);

    // Positional indicator ellipse
    cv.ellipse(cv.width * 0.25, cv.height * 0.5, 60, 60);

    // Current keys / mouse
    cv.textAlign(cv.CENTER);
    cv.text(
      JSON.stringify(cv.in.keys.held).replace(/,/g, ",\n"),
      cv.width * 0.5, 50);
    cv.ellipse(cv.mouseX, cv.mouseY, 30, 30);

    // Test image
    cv.image(cv.testImg, 20, cv.height - 100, 80, 80);
  }
}
