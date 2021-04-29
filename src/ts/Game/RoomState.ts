
// Imports
import tokenData from "../../assets/tokenData";
import AssetManager from "../AssetManager";
import SoundManager from "../SoundManager";
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import Theming from "../utility/Theming";
import Vec2 from "../utility/Vec2";
import { UIElement } from "../ui/UIElement";
import Button from "../ui/Button";


export default class RoomState extends State {

  // Declare variables
  UIElements: UIElement[];


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];

    // Populate UIElements
    this.UIElements.push(new Button({ cv: this.cv,
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
    this.cv.text("Room", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();

    // DEBUG Draw tokens
    let i = 0;
    for (let token of tokenData.tokens.neutral.common) {
      let name = "neutral/common/" + token.name;

      this.cv.imageMode(this.cv.CENTER);
      this.cv.image(AssetManager.instance.getImage(name),
        this.cv.width * 0.5,
        this.cv.height * 0.25 + 120 * i,
        80, 80);

      this.cv.textSize(20);
      this.cv.fill(Theming.DARK_TEXT);
      this.cv.textAlign(this.cv.CENTER);
      this.cv.text(token.name + ": " + token.description,
        this.cv.width * 0.5,
        this.cv.height * 0.25 + 120 * i - 70,
      );

      i += 1;
    }
  }
}
