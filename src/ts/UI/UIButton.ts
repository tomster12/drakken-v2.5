
// Imports
import * as p5 from "p5";
import { Canvas } from "./../Canvas";
import SoundManager from "./../managers/SoundManager";
import Theming from "./../utility/Theming";
import { UIRect_cfg, UIRect } from "./UIRect";


// Constructor parameters
export interface UIButton_cfg extends UIRect_cfg {

  cv: Canvas;
  func: () => void;

  text?: string;
  col?: string;
  highlightCol?: string;
  textCol?: string;
}


export class UIButton extends UIRect {

  // Declare variables
  cv: Canvas;
  func: () => void;

  align: p5.CORNER | p5.CENTER;
  text: string;
  col: string;
  highlightCol: string;
  textCol: string;

  highlighted: boolean;


  constructor(opt: UIButton_cfg) {
    super(opt);

    // Init variables
    this.func = opt.func;

    this.align = opt.align || this.cv.CENTER;
    this.text = opt.text || "";
    this.col = opt.col || Theming.PRIMARY;
    this.highlightCol = opt.highlightCol || Theming.PRIMARY_HIGHLIGHT;
    this.textCol = opt.textCol || Theming.LIGHT_TEXT;

    this.highlighted = false;
  }


  update() {
    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.highlighted && this.cv.in.mouse.pressed[this.cv.LEFT]) {
      SoundManager.instance.playSound("sfx", "click0");
      this.func();
    }

    // Update cursor
    if (this.highlighted) this.cv.element.style.cursor = "pointer";
  }


  show() {
    let bounds = this.getBounds();

    // Draw as rect
    this.cv.noStroke();
    if (this.highlighted)
      this.cv.fill(this.highlightCol);
    else this.cv.fill(this.col);
    this.cv.rect(bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);

    // Draw text ontop
    this.cv.fill(this.textCol);
    this.cv.textSize(25);
    this.cv.textAlign(this.cv.CENTER, this.cv.CENTER);
    this.cv.text(
      this.text,
      bounds.pos.x + bounds.size.x * 0.5,
      bounds.pos.y + bounds.size.y * 0.5
    );
  }
}
