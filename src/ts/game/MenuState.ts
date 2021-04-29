
// Imports
import SoundManager from "../SoundManager";
import { GameCanvas } from "./GameCanvas";
import State from "./State";
import RoomState from "./RoomState";
import SettingsState from "./SettingsState";
import HelpState from "./HelpState";
import Theming from "../utility/Theming";
import Vec2 from "../utility/Vec2";
import { UIElement } from "../ui/UIElement";
import Button from "../ui/Button";


export default class MenuState extends State {

  // Declare variables
  UIElements: UIElement[];


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];

    // Populate UIElements
    this.UIElements.push(new Button({ cv: this.cv,
      func: () => { this.cv.states.push(new RoomState(this.cv)); },
      pos: new Vec2(this.cv.width * 0.5, this.cv.height * 0.5 - 10),
      size: new Vec2(250, 90),
      text: "Play"
    }));
    this.UIElements.push(new Button({ cv: this.cv,
      func: () => { this.cv.states.push(new SettingsState(this.cv)); },
      pos: new Vec2(this.cv.width * 0.5, this.cv.height * 0.5 + 100),
      size: new Vec2(250, 90),
      text: "Settings"
    }));
    this.UIElements.push(new Button({ cv: this.cv,
      func: () => { this.cv.states.push(new HelpState(this.cv)); },
      pos: new Vec2(this.cv.width * 0.5, this.cv.height * 0.5 + 210),
      size: new Vec2(250, 90),
      text: "Help"
    }));

    // Start music
    SoundManager.instance.loopSound("music", "main");
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
    this.cv.text("Menu", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
