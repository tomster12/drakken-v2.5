
// Imports
import * as p5 from "p5";
import AssetManager from "../AssetManager";
import Canvas from "../Canvas";
import Vec2 from "../utility/Vec2";
import Theming from "../utility/Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface TextboxOptions {
  cv: Canvas;

  pos: Vec2;
  size: Vec2;
  align?: p5.CORNER | p5.CENTER;
  text?: string;
  textSize?: number;
  textAlign?: p5.LEFT | p5.CENTER;
  textCol?: string;
}


export default class Textbox implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  size: Vec2;
  align: p5.CORNER | p5.CENTER;
  text: string;
  textSize: number;
  textAlign: p5.LEFT | p5.CENTER;
  textCol: string;


  constructor(opt: TextboxOptions) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.size = opt.size;
    this.align = opt.align || this.cv.CENTER;
    this.text = opt.text || "";
    this.textSize = opt.textSize || 20;
    this.textAlign = opt.textAlign || this.cv.LEFT;
    this.textCol = opt.textCol || Theming.DARK_TEXT;
  }


  update() { }


  show() {
    let bounds = this.getBounds();

    // Draw text between the bounds
    this.cv.noStroke();
    this.cv.fill(this.textCol);
    this.cv.textSize(25);
    this.cv.textAlign(this.textAlign, this.cv.BOTTOM);

    // Draw each line of the text
    let split = Textbox.splitText(this.cv, this.text, bounds.size.x);
    for (let i = 0; i < split.length; i++) {
      this.cv.text(
        split[i],
        bounds.pos.x + ((this.textAlign == this.cv.CENTER) ? (bounds.size.x * 0.5) : 0),
        bounds.pos.y + (i + 1) * 25
      );
    }
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


  static splitText(cv: Canvas, inp: string, sx: number): string[] {
    // Split into lines based on textSize / font
    let spaceWidth = cv.textWidth(" ");
    let out = [];
    let lengths = [];
    let current = -1;

    let i: number, j: number;
    for (i = 0, j = 0; i <= inp.length; i++) {

      // If reached a space or the end of the input
      if (inp[i] == " " || i == inp.length) {
        let word = inp.substr(j, i - j);
        let length = cv.textWidth(word);

        // If the addition of this word is within the limit
        if (current > -1 && (lengths[current] + length + spaceWidth) < sx) {
          out[current] += " " + word;
          lengths[current] += length + spaceWidth;

        // Otherwise, simply create a new word
        } else {
          out.push(word);
          lengths.push(length);
          current++;
        }

        // Bring start of next to current
        j = i + 1;
      }
    }

    // Return output
    return out;
  }
}
