
// Imports
import * as p5 from "p5";
import AssetManager from "./../managers/AssetManager";
import SoundManager from "./../managers/SoundManager";
import { Canvas } from "./../Canvas";
import Vec2 from "./../utility/Vec2";
import Theming from "./../utility/Theming";
import { Bounds, UIElement } from "./UIElement";


// Constructor parameters
interface UITextbox_cfg {
  cv: Canvas;

  pos: Vec2;
  length: number;
  align?: p5.CORNER | p5.CENTER;
  textSize?: number;
  backgroundCol?: string;
  cvlineCol?: string;
  cvlineHiglightCol?: string;
  textCol?: string;
  textFont?: p5.Font;
}


export default class UITextInput implements UIElement {

  // Declare variables
  cv: Canvas;

  pos: Vec2;
  length: number;
  align: p5.CORNER | p5.CENTER;
  textSize: number;
  backgroundCol: string;
  cvlineCol: string;
  cvlineHiglightCol: string;
  textCol: string;
  textFont: p5.Font;

  text: string;
  highlighted: boolean;
  selected: boolean;
  inputTimer: number[];
  deleteTimer: number[];
  cvput: p5.Graphics;


  constructor(opt: UITextbox_cfg) {
    // Init variables
    this.cv = opt.cv;

    this.pos = opt.pos;
    this.length = opt.length;
    this.align = opt.align || this.cv.CENTER;
    this.textSize = opt.textSize || 20;
    this.backgroundCol = opt.backgroundCol || Theming.SECONDARY;
    this.cvlineCol = opt.cvlineCol || Theming.BORDER;
    this.cvlineHiglightCol = opt.cvlineHiglightCol || Theming.BORDER_HIGHLIGHT;
    this.textCol = opt.textCol || Theming.DARK_TEXT;
    this.textFont = opt.textFont || AssetManager.instance.getFont("main");

    this.text = "";
    this.highlighted = false;
    this.selected = false;
    this.inputTimer = [0.0, 0.8];
    this.deleteTimer = [0.0, 0.65];

    // Init graphics
    let bounds = this.getBounds();
    this.cvput = this.cv.createGraphics(bounds.size.x, bounds.size.y);
  }


  update() {
    // Update highlighted
    this.highlighted = this.isOntop(this.cv.mouseX, this.cv.mouseY);

    // Clicked on this
    if (this.cv.in.mouse.pressed[this.cv.LEFT]) {
      if (this.highlighted && !this.selected)
        SoundManager.instance.playSound("sfx", "click0");
      this.selected = this.highlighted;
    }


    // Default timer to max
    if (!this.selected) {
      this.inputTimer[0] = this.inputTimer[1];

    // Update input timer
    } else {
      if (this.inputTimer[0] < 0)
        this.inputTimer[0] = this.inputTimer[1];
      else this.inputTimer[0] -= 1.0 / 60.0;

      // Detect input
      let keys = Object.keys(this.cv.in.keys.pressed).filter((key) => this.cv.in.keys.pressed[key])
      for (let key of keys) {


        // Delete on backspace
        if (key == "8") {
          this.text = this.text.substr(0, this.text.length - 1);


        // Add new key on other
        } else {
          let cv = String.fromCharCode(parseInt(key)).toLowerCase();
          if (this.cv.in.keys.held[16]) cv = cv.toUpperCase();
          this.text += cv;
        }
      }


      // Default timer to max
      if (!this.cv.in.keys.held[8]) {
        this.deleteTimer[0] = this.deleteTimer[1];

      // Hold delete
      } else {
        this.deleteTimer[0] -= 1 / 60;
        if (this.deleteTimer[0] < 0) {
          this.text = this.text.substr(0, this.text.length - 1);
        }
      }
    }


    // Update cursor
    if (this.highlighted) this.cv.element.style.cursor = "pointer";
  }


  show() {
    let bounds = this.getBounds();

    // Draw text between into the cvput buffer
    this.cvput.background(this.backgroundCol);
    this.cvput.noStroke();
    this.cvput.fill(this.textCol);
    this.cvput.textSize(25);
    this.cvput.textFont(this.textFont);
    this.cvput.textAlign(this.cv.LEFT, this.cv.BOTTOM);
    let cv = this.text;
    if (this.selected) cv += (this.inputTimer[0] > (this.inputTimer[1] * 0.5)) ? "_" : " ";
    let cvWidth = this.cvput.textWidth(cv.substring(0, cv.length - 1));
    this.cvput.text(cv, 4 - this.cv.max(cvWidth - this.length + 12 + this.cvput.textWidth("_"), 0), bounds.size.y - 4);
    this.cv.imageMode(this.cv.CORNER);
    this.cv.image(this.cvput, bounds.pos.x, bounds.pos.y);

    // Draw cvline overtop
    this.cv.stroke(this.cvlineCol);
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
