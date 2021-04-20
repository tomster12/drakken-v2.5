
// Imports
import * as p5 from "p5";
import Canvas from "../Canvas";
import Vec2 from "../Vec2";
import Theming from "../Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface TextboxOptions {
  cv: Canvas;

  pos: Vec2;
  length: number;
  align?: p5.CORNER | p5.CENTER;
  textSize?: number;
  backgroundCol?: string;
  outlineCol?: string;
  outlineHiglightCol?: string;
  textCol?: string;
}


export default class TextInput implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  length: number;
  align: p5.CORNER | p5.CENTER;
  textSize: number;
  backgroundCol: string;
  outlineCol: string;
  outlineHiglightCol: string;
  textCol: string;

  text: string;
  highlighted: boolean;
  selected: boolean;
  inputTimer: number[];
  deleteTimer: number[];
  output: p5.Graphics;


  constructor(opt: TextboxOptions) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.length = opt.length;
    this.align = opt.align || this.cv.CENTER;
    this.textSize = opt.textSize || 20;
    this.backgroundCol = opt.backgroundCol || Theming.SECONDARY;
    this.outlineCol = opt.outlineCol || Theming.BORDER;
    this.outlineHiglightCol = opt.outlineHiglightCol || Theming.BORDER_HIGHLIGHT;
    this.textCol = opt.textCol || Theming.DARK_TEXT;

    this.text = "";
    this.highlighted = false;
    this.selected = false;
    this.inputTimer = [0.0, 0.8];
    this.deleteTimer = [0.0, 1.0];

    // Init graphics
    let bounds = this.getBounds();
    this.output = this.cv.createGraphics(bounds.size.x, bounds.size.y);
  }


  update() {
    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.cv.in.mouse.pressed[this.cv.LEFT]) this.selected = this.highlighted;

    // Update input timer
    if (this.selected) {
      if (this.inputTimer[0] < 0)
        this.inputTimer[0] = this.inputTimer[1];
      else this.inputTimer[0] -= 1.0 / 60.0;

      // Detect input
      let keys = Object.keys(this.cv.in.keys.pressed).filter((key) => this.cv.in.keys.pressed[key])
      for (let key of keys) {

        // Delete
        if (key == "8") {
          this.text = this.text.substr(0, this.text.length - 1);

        // Add new key
        } else {
          let out = String.fromCharCode(parseInt(key)).toLowerCase();
          if (this.cv.in.keys.held[16]) out = out.toUpperCase();
          this.text += out;
        }
      }

      // Hold delete
      if (this.cv.in.keys.held[8]) {
        this.deleteTimer[0] -= 1 / 60;
        if (this.deleteTimer[0] < 0)
          this.text = this.text.substr(0, this.text.length - 1);
      } else this.deleteTimer[0] = this.deleteTimer[1];

    // Default to max
    } else this.inputTimer[0] = this.inputTimer[1];
  }


  show() {
    let bounds = this.getBounds();

    // Draw text between into the output buffer
    this.output.background(this.backgroundCol);
    this.output.noStroke();
    this.output.fill(this.textCol);
    this.output.textSize(25);
    this.output.textAlign(this.cv.LEFT, this.cv.BOTTOM);
    let out = this.text;
    if (this.selected) out += (this.inputTimer[0] > (this.inputTimer[1] * 0.5)) ? "_" : " ";
    let outWidth = this.output.textWidth(out.substring(0, out.length - 1));
    this.output.text(out, 4 - this.cv.max(outWidth - this.length + 12 + this.output.textWidth("_"), 0), bounds.size.y - 4);
    this.cv.image(this.output, bounds.pos.x, bounds.pos.y);

    // Draw outline overtop
    this.cv.stroke(this.outlineCol);
    this.cv.noFill();
    this.cv.rect(bounds.pos.x, bounds.pos.y, bounds.size.x, bounds.size.y);
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
        size: new Vec2(this.length, this.textSize * 1.2)
      }

    // Position represents centre
    } else if (this.align == this.cv.CENTER) {
      return {
        pos: this.pos.sub(new Vec2(this.length * 0.5, this.textSize * 0.6)),
        size: new Vec2(this.length, this.textSize + 16)
      };
    }
  }
}
