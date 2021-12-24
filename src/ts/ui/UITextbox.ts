
// Imports
import * as p5 from "p5";
import { Canvas } from "../Canvas";
import Theming from "../utility/Theming";
import { UIRect_cfg, UIRect } from "./UIRect";


// Constructor parameters
interface UITextbox_cfg extends UIRect_cfg {

  text?: string;
  textSize?: number;
  textAlign?: p5.LEFT | p5.CENTER;
  textCol?: string;
}


export default class UITextbox extends UIRect {

  // Declare variables
  align: p5.CORNER | p5.CENTER;
  text: string;
  textSize: number;
  textAlign: p5.LEFT | p5.CENTER;
  textCol: string;


  constructor(opt: UITextbox_cfg) {
    super(opt);

    // Init variables
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
    let split = UITextbox.splitText(this.cv, this.text, bounds.size.x);
    for (let i = 0; i < split.length; i++) {
      this.cv.text(
        split[i],
        bounds.pos.x + ((this.textAlign == this.cv.CENTER) ? (bounds.size.x * 0.5) : 0),
        bounds.pos.y + (i + 1) * 25
      );
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
          cv[current] += " " + word;
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

    // Return cvput
    return out;
  }
}
