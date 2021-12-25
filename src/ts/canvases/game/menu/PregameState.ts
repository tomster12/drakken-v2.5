
// Imports
import * as p5 from "p5";
import tokenData from "./../../../../assets/tokenData";
import AssetManager from "./../../../managers/AssetManager";
import SoundManager from "./../../../managers/SoundManager";
import Theming from "./../../../utility/Theming";

import { Canvas } from "./../../../Canvas";
import { GameCanvas } from "./../GameCanvas";
import { UIElement } from "./../../../UI/UIElement";
import { UIRect_cfg, UIRect } from "./../../../UI/UIRect";
import { UIButton } from "./../../../UI/UIButton";
import Vec2 from "./../../../utility/Vec2";
import State from "./../State";



interface ClassOptionToken_cfg extends UIRect_cfg {

  optList: ClassOptionList;
  name: string;
}

class ClassOptionToken extends UIRect {

  // Declare variables
  optList: ClassOptionList;
  toggled: boolean;
  name: string;
  image: p5.Image;


  constructor(opt: ClassOptionToken_cfg) {
    super(opt);

    // Init variables
    this.optList = opt.optList;
    this.toggled = false;
    this.name = opt.name;
    this.image = AssetManager.instance.getImage(this.name);
  }


  update() {
    // Check if mouse clicked
    if (this.optList.getClicked(this.cv.LEFT)) {

      let relMousePos = this.optList.getRelativeMousePos();
      if (this.isOntop(relMousePos.x, relMousePos.y)) {
        if (!this.toggled) this.select();
      } else this.toggled = false;
    }
  }


  show() {
    let bounds = this.getBounds();
    const border = 4;

    // Show outline if toggled
    if (this.toggled) {
      this.cv.stroke(0);
      this.cv.strokeWeight(border);
      this.cv.ellipse(bounds.pos.x + bounds.size.x * 0.5, bounds.pos.y + bounds.size.y * 0.5, bounds.size.x - border, bounds.size.y - border);
    }

    // Draw image
    this.cv.imageMode(this.align);
    this.cv.image(this.image, bounds.pos.x + border * 0.5, bounds.pos.y + border * 0.5, bounds.size.x - border, bounds.size.y - border);
  }


  select() {
    // Token is selected
    SoundManager.instance.playSound("sfx", "click0");
    this.toggled = true;
    this.optList.pregame.selectedClass = this.name;
  }
}


interface ClassOptionList_cfg extends UIRect_cfg {

  pregame: PregameState;
}

class ClassOptionList extends UIRect {

  // Declare variables
  cv: Canvas;
  pregame: PregameState;
  output: p5.Graphics;

  scrollPos: number;
  scrollDir: number;

  tokenSpacing: number;
  tokens: ClassOptionToken[];


  constructor(opt: ClassOptionList_cfg) {
    super(opt);

    // Init variables
    this.pregame = opt.pregame;
    this.output = this.cv.createGraphics(this.size.x, this.size.y);

    this.scrollPos = 0;
    this.scrollDir = 0;

    // Populate tokens
    this.tokenSpacing = this.size.y * 0.2;
    this.tokens = [];
    for (let i = 0; i < 5; i++) {
      for (let token of tokenData.tokens.neutral.common) {
        this.tokens.push(new ClassOptionToken({ cv: this.output,
          optList: this,
          pos: new Vec2(0, 0),
          size: new Vec2(this.size.y, this.size.y),
          name: "neutral/common/" + token.name,
          align: this.cv.CORNER
        }));
      }
    }
  }


  update() {
    let bounds = this.getBounds();

    // Update scrollDir based on mouse
    this.scrollDir = 0;
    if (this.isOntop(this.cv.mouseX, this.cv.mouseY)) {
      let pct = this.cv.min(this.cv.max((this.cv.mouseX - bounds.pos.x) / bounds.size.x, 0), 1);
      if (pct < 0.4) this.scrollDir = this.cv.map(pct, 0.05, 0.4, -1, 0);
      else if (pct > 0.8) this.scrollDir = this.cv.map(pct, 0.8, 0.95, 0, 1);
    }

    // Update scroll based on scrollDir
    this.scrollPos += this.scrollDir * 10;
    this.scrollPos = this.cv.min(this.cv.max(this.scrollPos, 0), this.getMaxScrollPos());

    // Update token positions
    for (let i = 0; i < this.tokens.length; i++) this.tokens[i].pos = this.getTokenPosScrolled(i);

    // Update tokens
    for (let token of this.tokens) token.update();
  }


  show() {
    let bounds = this.getBounds();

    // Draw each token to output
    this.output.background(Theming.BACKGROUND);
    for (let token of this.tokens) token.show();

    // Draw output
    this.cv.image(this.output, bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
  }


  getClicked(mouseButton: string): boolean {
    // Return whether has been clicked on
    return (this.cv.in.mouse.pressed[mouseButton])
      && this.isOntop(this.cv.mouseX, this.cv.mouseY);
  }


  getTokenPosX(i: number): number {
    // Return x position of specific token token
    return (this.size.y + this.tokenSpacing) * i;
  }

  getTokenPosScrolled(i: number): Vec2 {
    // Return token position including scroll
    return new Vec2(this.getTokenPosX(i) - this.scrollPos, 0);
  }

  getMaxScrollPos(): number {
    // Return max scroll position
    return this.cv.max(0, this.size.y * this.tokens.length + this.tokenSpacing * (this.tokens.length - 1) - this.size.x);
  }
}


interface ClassInfo_cfg extends UIRect_cfg {

  pregame: PregameState;
}

class ClassInfo extends UIRect {

  // Declare variables
  pregame: PregameState;


  constructor(opt: ClassInfo_cfg) {
    super(opt);

    // Init variables
    this.pregame = opt.pregame;
  }


  show() {
    // Ensure class selected and get bounds
    if (this.pregame.selectedClass == null) return;
    let bounds = this.getBounds();

    // Show name of class
    this.cv.textAlign(this.cv.LEFT, this.cv.TOP);
    this.cv.fill(Theming.DARK_TEXT);
    this.cv.textSize(35);
    this.cv.text(this.pregame.selectedClass, bounds.pos.x, bounds.pos.y);
    this.cv.textSize(20);
    this.cv.text("This will be the description for the selected class.", bounds.pos.x, bounds.pos.y + 35 + 20);
  }
}


export default class PregameState extends State {

  // Declare variables
  UIElements: UIElement[];
  selectedClass: string;


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];
    this.selectedClass = null;

    // Populate UIElements
    this.UIElements.push(new ClassOptionList({ cv: this.cv,
      pregame: this,
      pos: new Vec2(this.cv.width * 0.5, this.cv.height - 120),
      size: new Vec2(this.cv.width - 120, 120)
    }));
    this.UIElements.push(new UIButton({ cv: this.cv,
      func: () => { this.toPop = true; },
      pos: new Vec2(this.cv.width - 150, 90),
      size: new Vec2(200, 80),
      text: "Menu"
    }));
    this.UIElements.push(new ClassInfo({ cv: this.cv,
      pregame: this,
      pos: new Vec2(50, 150),
      size: new Vec2(this.cv.width - 100, this.cv.height - 382.5),
      align: this.cv.CORNER
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
    this.cv.textAlign(this.cv.LEFT, this.cv.TOP);
    this.cv.text("Choose Your Class", 40, 60);

    // Show UIElements
    for (let button of this.UIElements) button.show();
  }
}
