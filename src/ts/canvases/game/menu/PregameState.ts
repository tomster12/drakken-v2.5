
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
        if (!this.toggled) {
          SoundManager.instance.playSound("sfx", "click0");
          this.toggled = true;
        }

      } else this.toggled = false;
    }
  }


  show() {
    let bounds = this.getBounds();

    // Show outline if toggled
    if (this.toggled) {
      this.cv.stroke(0);
      this.cv.rect(bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
    }

    // Draw image
    this.cv.imageMode(this.align);
    this.cv.image(this.image, bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
  }
}


interface ClassOptionList_cfg extends UIRect_cfg {}

class ClassOptionList extends UIRect {

  // Declare variables
  cv: Canvas;
  output: p5.Graphics;

  scrollPos: number;
  scrollDir: number;

  tokenSize: number;
  tokens: ClassOptionToken[];


  constructor(opt: ClassOptionList_cfg) {
    super(opt);

    // Init variables
    this.output = this.cv.createGraphics(this.size.x, this.size.y);

    this.scrollPos = 0;
    this.scrollDir = 0;

    // Populate tokens
    this.tokenSize = this.size.y * 0.8;
    this.tokens = [];
    for (let i = 0; i < 5; i++) {
      for (let token of tokenData.tokens.neutral.common) {
        this.tokens.push(new ClassOptionToken({ cv: this.output,
          optList: this,
          pos: new Vec2(0, 0),
          size: new Vec2(this.tokenSize, this.tokenSize),
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
    super.show();

    // Draw each token to output
    this.output.background(Theming.BACKGROUND);
    for (let token of this.tokens) token.show();

    // Draw output
    let bounds = this.getBounds();
    this.cv.image(this.output, bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
  }


  getClicked(mouseButton: string): boolean {
    // Return whether has been clicked on
    return (this.cv.in.mouse.pressed[mouseButton])
      && this.isOntop(this.cv.mouseX, this.cv.mouseY);
  }


  getTokenPosX(i: number): number {
    // Return x position of specific token token
    return (this.size.y - this.tokenSize) * (0.5 + i) + i * this.tokenSize;
  }

  getTokenPosScrolled(i: number): Vec2 {
    // Return token position including scroll
    return new Vec2(this.getTokenPosX(i) - this.scrollPos, this.getTokenPosX(0));
  }

  getMaxScrollPos(): number {
    // Return max scroll position
    return this.cv.max(0, this.getTokenPosX(this.tokens.length) - this.size.x);
  }
}


export default class PregameState extends State {

  // Declare variables
  UIElements: UIElement[];
  optionList: ClassOptionList;


  constructor(cv: GameCanvas) {
    super(cv);

    // Init variables
    this.UIElements = [];

    // Populate UIElements
    this.UIElements.push(new ClassOptionList({ cv: this.cv,
      pos: new Vec2(this.cv.width * 0.5, this.cv.height - 150),
      size: new Vec2(this.cv.width - 100, 120)
    }));
    this.UIElements.push(new UIButton({ cv: this.cv,
      func: () => { this.toPop = true; },
      pos: new Vec2(this.cv.width - 150, 90),
      size: new Vec2(200, 80),
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
    // let i = 0;
    // for (let token of tokenData.tokens.neutral.common) {
    //   let name = "neutral/common/" + token.name;
    //
    //   this.cv.imageMode(this.cv.CENTER);
    //   this.cv.image(AssetManager.instance.getImage(name),
    //     this.cv.width * 0.5,
    //     this.cv.height * 0.25 + 120 * i,
    //     80, 80
    //   );
    //
    //   this.cv.textSize(20);
    //   this.cv.fill(Theming.DARK_TEXT);
    //   this.cv.textAlign(this.cv.CENTER);
    //   this.cv.text(token.name + ": " + token.description,
    //     this.cv.width * 0.5,
    //     this.cv.height * 0.25 + 120 * i - 70,
    //   );
    //
    //   i++;
    // }
  }
}
