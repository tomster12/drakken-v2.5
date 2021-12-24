
// Imports
import { Canvas } from "../Canvas";
import SoundManager from "../managers/SoundManager";
import Theming from "../utility/Theming";
import { UIRect_cfg, UIRect } from "./UIRect";


// Constructor parameters
interface UICheckbox_cfg extends UIRect_cfg {

  cv: Canvas;

  col?: string;
  highlightCol?: string;
}


export default class UICheckbox extends UIRect {

  // Declare variables
  cv: Canvas;

  col: string;
  highlightCol: string;

  highlighted: boolean;
  selected: boolean;


  constructor(opt: UICheckbox_cfg) {
    super(opt);

    // Init variables
    this.col = opt.col || Theming.BORDER;
    this.highlightCol = opt.highlightCol || Theming.BORDER_HIGHLIGHT;

    this.highlighted = false;
    this.selected = false;
  }


  update() {
    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.highlighted && this.cv.in.mouse.pressed[this.cv.LEFT]) {
      SoundManager.instance.playSound("sfx", "click0");
      this.selected = !this.selected;
    }

    // Update cursor
    if (this.highlighted) this.cv.element.style.cursor = "pointer";
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
}
