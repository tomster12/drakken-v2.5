
// Imports
import SoundManager from "../../../managers/SoundManager";
import { GameCanvas } from "./../GameCanvas";
import State from "./../State";
import Theming from "../../../utility/Theming";
import Vec2 from "../../../utility/Vec2";
import { UIElement } from "../../../UI/UIElement";
import { UIButton } from "../../../UI/UIButton";
import UISlider from "../../../UI/UISlider";
import UITextbox from "../../../UI/UITextbox";


export default class SettingsState extends State {

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

    this.UIElements.push(new UITextbox({ cv: this.cv,
      pos: new Vec2(200, this.cv.height * 0.5 - 220),
      size: new Vec2(200, 50),
      align: this.cv.CENTER,
      text: "Global",
      textSize: 25
    }));
    this.UIElements.push(new UISlider({ cv: this.cv,
      pos: new Vec2(this.cv.width - 200, this.cv.height * 0.5 - 220),
      changedFunc: (value) => { SoundManager.instance.setVolumePct("global", value); },
      value: SoundManager.instance.getVolumePct("global"),
      length: 220,
      barSize: 10,
      nobSize: 20,
      align: this.cv.CENTER,
      range: [30, 150]
    }));

    this.UIElements.push(new UITextbox({ cv: this.cv,
      pos: new Vec2(200, this.cv.height * 0.5 - 170),
      size: new Vec2(200, 50),
      align: this.cv.CENTER,
      text: "Music",
      textSize: 25
    }));
    this.UIElements.push(new UISlider({ cv: this.cv,
      pos: new Vec2(this.cv.width - 200, this.cv.height * 0.5 - 170),
      changedFunc: (value) => { SoundManager.instance.setVolumePct("music", value); },
      value: SoundManager.instance.getVolumePct("music"),
      length: 220,
      barSize: 10,
      nobSize: 20,
      align: this.cv.CENTER,
      range: [30, 150]
    }));

    this.UIElements.push(new UITextbox({ cv: this.cv,
      pos: new Vec2(200, this.cv.height * 0.5 - 120),
      size: new Vec2(200, 50),
      align: this.cv.CENTER,
      text: "sfx",
      textSize: 25
    }));
    this.UIElements.push(new UISlider({ cv: this.cv,
      pos: new Vec2(this.cv.width - 200, this.cv.height * 0.5 - 120),
      changedFunc: (value) => { SoundManager.instance.setVolumePct("sfx", value); },
      value: SoundManager.instance.getVolumePct("sfx"),
      length: 220,
      barSize: 10,
      nobSize: 20,
      align: this.cv.CENTER,
      range: [30, 150]
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
    this.cv.text("Settings", this.cv.width * 0.5, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
