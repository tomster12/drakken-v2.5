
import State from "./State";


export default class MenuState extends State {

  draw(): void {
    if (this.cv.in.keys.pressed[37]) {
      this.toPop = true;
    }

    this.cv.background("#59ac50");
    this.cv.textAlign(this.cv.CENTER);
    this.cv.text("Test State", this.cv.width * 0.5, this.cv.height * 0.5);
  }
}