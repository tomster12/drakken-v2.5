
import Theming from "../Theming";
import State from "./State";
import TestState from "./TestState";


export default class MenuState extends State {

  draw(): void {
    if (this.cv.in.keys.pressed[39]) {
      this.cv.states.push(new TestState(this.cv));
    }

    this.cv.background(Theming.MAIN_BACKGROUND);
    this.cv.textAlign(this.cv.CENTER);
    this.cv.text("Menu State", this.cv.width * 0.5, this.cv.height * 0.5);
  }
}