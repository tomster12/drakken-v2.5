
// Imports
import * as p5 from "p5";
import Canvas from "../Canvas";
import Vec2 from "../Vec2";
import Theming from "../Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface CheckboxOptions {
  cv: Canvas;

  pos: Vec2;
  size: number;
  align?: p5.CORNER | p5.CENTER;
  col?: string;
  highlightCol?: string;
}


export default class Checkbox implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  size: number;
  align: p5.CORNER | p5.CENTER;
  col: string;
  highlightCol: string;

  highlighted: boolean;
  selected: boolean;


  constructor(opt: CheckboxOptions) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.size = opt.size;
    this.align = opt.align || this.cv.CENTER;
    this.col = opt.col || Theming.BORDER;
    this.highlightCol = opt.highlightCol || Theming.BORDER_HIGHLIGHT;

    this.highlighted = false;
    this.selected = false;
  }


  update() {
    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.highlighted && this.cv.in.mouse.pressed[this.cv.LEFT]) this.selected = !this.selected;
  }


  show() {
    let bounds = this.getBounds();

    // Draw as rect
    this.cv.strokeWeight(2);
    this.cv.stroke(this.col);
    this.cv.noFill();
    this.cv.rect(bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
    this.cv.strokeWeight(1);


    // Draw indicator at centre
    this.cv.noStroke();

    if (this.selected) {
      if (this.highlighted)
        this.cv.fill(this.highlightCol);
      else this.cv.fill(this.col);

    } else if (this.highlighted)
      this.cv.fill(this.highlightCol + "9d");

    this.cv.ellipse(
      bounds.pos.x + bounds.size.x * 0.5,
      bounds.pos.y + bounds.size.x * 0.5,
      bounds.size.x * 0.6,
      bounds.size.y * 0.6);
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
        size: new Vec2(this.size)
      }

    // Position represents centre
    } else if (this.align == this.cv.CENTER) {
      return {
        pos: this.pos.sub(new Vec2(this.size * 0.5)),
        size: new Vec2(this.size)
      };
    }
  }
}
