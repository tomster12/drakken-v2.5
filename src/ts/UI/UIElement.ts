
import Canvas from "../Canvas";
import Vec2 from "../Vec2";


export type Bounds = {
  pos: Vec2;
  size: Vec2;
}


export interface UIElement {

  cv: Canvas;


  update(): void;
  show(): void;
  isOntop(x: number, y: number): boolean;
  getBounds(): Bounds;
}