
// Imports
import SoundManager from "../SoundManager";
import * as p5 from "p5";
import Canvas from "../Canvas";
import Vec2 from "../utility/Vec2";
import Theming from "../utility/Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface ButtonOptions {
  cv: Canvas;
  func: () => void;

  pos: Vec2;
  size: Vec2;
  align?: p5.CORNER | p5.CENTER;
  text?: string;
  col?: string;
  highlightCol?: string;
  textCol?: string;
}


export default class Button implements UIElement {

  // Declare variables
  cv: Canvas;
  func: () => void;

  pos: Vec2;
  size: Vec2;
  align: p5.CORNER | p5.CENTER;
  text: string;
  col: string;
  highlightCol: string;
  textCol: string;

  highlighted: boolean;


  constructor(opt: ButtonOptions) {
    // Init variables
    this.cv = opt.cv;
    this.func = opt.func;

    this.pos = opt.pos;
    this.size = opt.size;
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
      bounds.pos.y + bounds.size.y * 0.5);
  }


  isOntop(x: number, y: number): boolean {
    // Returns whether a point is overtop this button
    let bounds = this.getBounds();
    return ((x > bounds.pos.x)
      && x < (bounds.pos.x + bounds.size.x)
      && y > (bounds.pos.y)
      && y < (bounds.pos.y + bounds.size.y));
  }


  getBounds(): Bounds {
    // Position represents corner
    if (this.align == this.cv.CORNER) {
      return {
        pos: this.pos,
        size: this.size
      }

    // Position represents centre
    } else if (this.align == this.cv.CENTER) {
      return {
        pos: this.pos.sub(this.size.scale(0.5)),
        size: this.size
      };
    }
  }
}
