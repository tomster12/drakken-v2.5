
// Imports
import AssetManager from "../../managers/AssetManager";
import { Canvas } from "../../Canvas";
import Input from "../../utility/Input";


// Canvas interface
export interface HistoryCanvas extends Canvas { }


// Canvas function
export function historyCanvasFunc(cv: HistoryCanvas) {

  cv.setup = function() {
    // Setup canvas
    cv.createCanvas(400, 800);
    cv.textSize(25);
    cv.fill(255);
    cv.noStroke();
    cv.textFont(AssetManager.instance.getFont("main"));

    // Initialize variables
    cv.in = new Input(cv);
    cv.focused = false;
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
  }
}
