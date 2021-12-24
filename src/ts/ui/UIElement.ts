
import * as p5 from "p5";
import { Canvas } from "./../Canvas";
import Vec2 from "./../utility/Vec2";


export type Bounds = {

  pos: Vec2;
  size: Vec2;
}


export interface UIElement {

  cv: p5 | Canvas;

  update(): void;
  show(): void;

  isOntop(x: number, y: number): boolean;
  getBounds(): Bounds;
}