
// Imports
import SoundManager from "../SoundManager";
import * as p5 from "p5";
import Canvas from "../Canvas";
import Vec2 from "../utility/Vec2";
import Theming from "../utility/Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface CheckboxOptions {
  cv: Canvas;

  pos: Vec2;
  changedFunc?: (value: number) => void;
  value?: number;
  align?: p5.LEFT | p5.CENTER;
  length: number;
  barSize: number;
  nobSize?: number;
  range: number[];
  nobCol?: string;
  nobHighlightCol?: string;
  barCol?: string;
}


export default class Checkbox implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  changedFunc?: (value: number) => void;
  align: p5.LEFT | p5.CENTER;
  length: number;
  barSize: number;
  nobSize: number;
  range: number[];
  nobCol: string;
  nobHighlightCol: string;
  barCol: string;

  highlighted: boolean;
  selected: boolean;
  value: number;


  constructor(opt: CheckboxOptions) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.changedFunc = opt.changedFunc;
    this.align = opt.align || this.cv.LEFT;
    this.length = opt.length;
    this.barSize = opt.barSize;
    this.nobSize = opt.nobSize || this.barSize * 2;
    this.range = opt.range;
    this.nobCol = opt.nobCol || Theming.PRIMARY;
    this.nobHighlightCol = opt.nobHighlightCol || Theming.PRIMARY_HIGHLIGHT;
    this.barCol = opt.barCol || Theming.BORDER;

    this.highlighted = false;
    this.selected = false;
    this.value = opt.value || 0;
  }


  update() {
    let bounds = this.getBounds();

    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.highlighted && this.cv.in.mouse.pressed[this.cv.LEFT]) {
      this.selected = true;
      SoundManager.instance.playSound("sfx", "click0");
    } else if (!this.cv.in.mouse.held[this.cv.LEFT]) this.selected = false;

    // Move nob
    if (this.selected) {
      let value = this.cv.map(this.cv.mouseX,
        bounds.pos.x + this.nobSize * 0.5,
        bounds.pos.x + this.nobSize * 0.5 + this.length,
        0, 1);
      this.value = this.cv.min(this.cv.max(value, 0), 1);
      this?.changedFunc(this.value);
    }

    // Update cursor
    if (this.highlighted && !this.selected) this.cv.element.style.cursor = "pointer";
  }


  show() {
    let bounds = this.getBounds();

    // Draw bar
    this.cv.noStroke();
    this.cv.fill(this.barCol);
    this.cv.ellipse(
      bounds.pos.x + this.nobSize * 0.5,
      bounds.pos.y + this.nobSize * 0.5,
      this.barSize, this.barSize);
    this.cv.ellipse(
      bounds.pos.x + this.nobSize * 0.5 + this.length,
      bounds.pos.y + this.nobSize * 0.5,
      this.barSize, this.barSize);
    this.cv.rect(
      bounds.pos.x + this.nobSize * 0.5,
      bounds.pos.y + this.nobSize * 0.5 - this.barSize * 0.5,
      this.length, this.barSize);

    // Draw nob
    this.cv.noStroke();
    if (this.highlighted || this.selected)
      this.cv.fill(this.nobHighlightCol);
    else this.cv.fill(this.nobCol);
    this.cv.ellipse(
      bounds.pos.x + this.nobSize * 0.5 + this.value * this.length,
      bounds.pos.y + this.nobSize * 0.5,
      this.nobSize, this.nobSize);
  }


  getValue(): number {
    // Return value mapped to range
    return this.range[0] + this.value * this.range[1];
  }



  isOntop(x: number, y: number): boolean {
    let bounds = this.getBounds();

    // Check x, y against either end and the middle
    let nearEnd0 = this.cv.dist(x, y,
      bounds.pos.x + this.nobSize * 0.5,
      bounds.pos.y + this.nobSize * 0.5) < (this.nobSize * 0.5);

    let nearEnd1 = this.cv.dist(x, y,
      bounds.pos.x + this.nobSize * 0.5 + this.length,
      bounds.pos.y + this.nobSize * 0.5) < (this.nobSize * 0.5);

    let nearMiddle = (x > (bounds.pos.x + this.nobSize * 0.5)
      && x < (bounds.pos.x + bounds.size.x - this.nobSize * 0.5)
      && y > (bounds.pos.y)
      && y < (bounds.pos.y + bounds.size.y) );

    return nearEnd0 || nearEnd1 || nearMiddle;
  }


  getBounds(): Bounds {
    // Position represents left side
    if (this.align == this.cv.LEFT) {
      return {
        pos: this.pos.sub(new Vec2(this.nobSize * 0.5)),
        size: new Vec2(this.length + this.nobSize, this.nobSize)
      }

    // Position represents centre
    } else if (this.align == this.cv.CENTER) {
      return {
        pos: this.pos.sub(new Vec2(this.nobSize * 0.5)).sub(new Vec2((this.length + this.nobSize) * 0.5, 0.1)),
        size: new Vec2(this.length + this.nobSize, this.nobSize)
      }
    }
  }
}
