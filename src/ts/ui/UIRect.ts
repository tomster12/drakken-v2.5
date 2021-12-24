
// Imports
import * as p5 from "p5";
import Vec2 from "../utility/Vec2";
import { Canvas } from "../Canvas";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
export interface UIRect_cfg {

  cv: p5 | Canvas;

  pos: Vec2;
  size: Vec2;
  align?: p5.CORNER | p5.CENTER;
}


export class UIRect implements UIElement {

  // Declare variables
  cv: p5 | Canvas;

  pos: Vec2;
  size: Vec2;
  align: p5.CORNER | p5.CENTER;


  constructor(opt: UIRect_cfg) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.size = opt.size;
    this.align = opt.align || this.cv.CENTER;
  }


  update() { }


  show() {
    let bounds = this.getBounds();

    // Draw as rect
    this.cv.stroke(0);
    this.cv.noFill();
    this.cv.rect(bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
  }


  isOntop(x: number, y: number): boolean {
    // Returns whether a point is overtop this button
    let bounds = this.getBounds();
    return ((x > bounds.pos.x)
      && x < (bounds.pos.x + bounds.size.x)
      && y > (bounds.pos.y)
      && y < (bounds.pos.y + bounds.size.y)
    );
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


  getRelativeMousePos() {
    // Return mouse relative to this object
    let bounds = this.getBounds();
    let x = this.cv.mouseX - bounds.pos.x;
    let y = this.cv.mouseY - bounds.pos.y;
    return new Vec2(x, y);
  }
}
