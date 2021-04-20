
// Imports
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import Theming from "../Theming";
import Vec2 from "../Vec2";
import { UIElement } from "../UI/UIElement";
import Button from "../UI/Button";
import Checkbox from "../UI/Checkbox";
import Slider from "../UI/Slider";
import Textbox from "../UI/Textbox";
import TextInput from "../UI/TextInput";



export default class SettingsState extends State {

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

    this.UIElements.push(new Textbox({
      cv: this.cv,
      pos: new Vec2(50, this.cv.height * 0.5 - 220),
      size: new Vec2(380, 110),
      align: this.cv.CORNER,
      text: "This is a test of a longer sentence with multiple spaces used standardly and checking whether it splits the text correctly.",
      textSize: 25
    }));
    this.UIElements.push(new Slider({
      cv: this.cv,
      pos: new Vec2(this.cv.width * 0.5 + 220, this.cv.height * 0.5 - 185),
      length: 220,
      barSize: 10,
      nobSize: 20,
      align: this.cv.CENTER,
      range: [30, 150]
    }));

    this.UIElements.push(new Textbox({
      cv: this.cv,
      pos: new Vec2(50, this.cv.height * 0.5 - 60),
      size: new Vec2(520, 80),
      align: this.cv.CORNER,
      text: "This is a test of a longer sentence with multiple spaces used standardly and checking whether it splits the text correctly.",
      textSize: 25
    }));
    this.UIElements.push(new Checkbox({
      cv: this.cv,
      pos: new Vec2(this.cv.width * 0.5 + 265, this.cv.height * 0.5 - 25),
      size: 35,
    }));

    this.UIElements.push(new Textbox({
      cv: this.cv,
      pos: new Vec2(50, this.cv.height * 0.5 + 100),
      size: new Vec2(390, 80),
      align: this.cv.CORNER,
      text: "This is a test of a longer sentence with multiple spaces used standardly and checking whether it splits the text correctly.",
      textSize: 25
    }));
    this.UIElements.push(new TextInput({
      cv: this.cv,
      pos: new Vec2(this.cv.width * 0.5 + 220, this.cv.height * 0.5 + 145),
      length: 220
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
    this.cv.text("Settings State", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
