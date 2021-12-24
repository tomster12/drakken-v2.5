
// Imports
import * as p5 from "p5";
import { UIRect_cfg, UIRect } from "./UIRect";


// Constructor parameters
export interface UISprite_cfg extends UIRect_cfg {

  image: p5.Image;
}


export class UISprite extends UIRect {

  // Declare variables
  image: p5.Image;


  constructor(opt: UISprite_cfg) {
    super(opt);

    // Init variables
    this.image = opt.image;
  }


  update() { }


  show() {
    let bounds = this.getBounds();

    // Draw image
    this.cv.image(this.image, bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
  }
}
