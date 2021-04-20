
// Imports
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import Theming from "../Theming";
import Vec2 from "../Vec2";
import { UIElement } from "../UI/UIElement";
import Button from "../UI/Button";

export default class RoomState extends State {

  // Declare variables
  UIElements: UIElement[];


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];

    // Populate UIElements
    this.UIElements.push(new Button({
      cv: this.cv,
      func: () => { this.toPop = true; },
      pos: new Vec2(this.cv.width * 0.5, this.cv.height - 100),
      size: new Vec2(250, 90),
      text: "Menu"
    }));
  }


  update(): void {
    // Update UIElements
    for (let button of this.UIElements) button.update();
  }


  show(): void {
    this.cv.background(Theming.BACKGROUND);

    // Text of current state
    this.cv.noStroke();
    this.cv.fill(0);
    this.cv.textAlign(this.cv.CENTER);
    this.cv.textSize(45);
    this.cv.text("Room State", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
