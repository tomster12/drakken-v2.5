
// Imports
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import Theming from "./../../utility/Theming";


export default class LoadingState extends State {

  constructor(cv: GameCanvas, toCall: () => Promise<void>, callback: () => void) {
    super(cv);

    // Call load function with functions
    this.load(toCall, callback);
  }


  update(): void { }


  show(): void {
    this.cv.background(Theming.BACKGROUND);

    // Text of current state
    this.cv.noStroke();
    this.cv.fill(Theming.DARK_TEXT);
    this.cv.textAlign(this.cv.CENTER);
    this.cv.textSize(55);
    this.cv.textAlign(this.cv.CENTER, this.cv.CENTER);
    this.cv.text("Loading...", this.cv.width * 0.5, this.cv.height * 0.5);
  }


  async load(toCall: () => Promise<void>, callback: () => void) {
    // Load and then callback
    await toCall();
    callback();
  }
}
