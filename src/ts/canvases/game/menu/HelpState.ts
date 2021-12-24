
// Imports
import { GameCanvas } from "./../GameCanvas";
import State from "./../State";
import Theming from "./../../../utility/Theming";
import Vec2 from "./../../../utility/Vec2";
import { UIElement } from "./../../../UI/UIElement";
import { UIButton } from "./../../../UI/UIButton";


export default class HelpState extends State {

  // Declare variables
  UIElements: UIElement[];


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];

    // Populate UIElements
    this.UIElements.push(new UIButton({ cv: this.cv,
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
    this.cv.textSize(55);
    this.cv.textAlign(this.cv.CENTER, this.cv.CENTER);
    this.cv.text("Help", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
