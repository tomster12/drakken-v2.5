
// Imports
import * as p5 from "p5";
import Canvas from "../Canvas";
import Vec2 from "../utility/Vec2";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface SpriteOptions {
  cv: Canvas;

  pos: Vec2;
  size: Vec2;
  align?: p5.CORNER | p5.CENTER;
  image: p5.Image;
}


export default class Sprite implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  size: Vec2;
  align: p5.CORNER | p5.CENTER;
  image: p5.Image;


  constructor(opt: SpriteOptions) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.size = opt.size;
    this.align = opt.align || this.cv.CENTER;
    this.image = opt.image;
  }


  update() { }


  show() {
    let bounds = this.getBounds();

    // Draw image
    this.cv.image(this.image, bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
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
