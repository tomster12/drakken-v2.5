
export default class Vec2 {

  // Declare variables
  x: number;
  y: number;


  constructor(x: number, y?: number) {
    // Init variables
    this.x = x;
    this.y = y || x;
  }


  set(x: number, y?: number): void {
    // Set variables to parameters
    this.x = x;
    this.y = y || x;
  }


  // General arithmetic operators
  add = (o: Vec2): Vec2 => new Vec2(this.x + o.x, this.y + o.y);
  sub = (o: Vec2): Vec2 => new Vec2(this.x - o.x, this.y - o.y);
  mult = (o: Vec2): Vec2 => new Vec2(this.x * o.x, this.y * o.y);
  div = (o: Vec2): Vec2 => new Vec2(this.x / o.x, this.y / o.y);
  scale = (v: number): Vec2 => new Vec2(this.x * v, this.y * v);

  iadd = (o: Vec2): void => { this.x += o.x; this.y += o.y; };
  isub = (o: Vec2): void => { this.x -= o.x; this.y -= o.y; };
  imult = (o: Vec2): void => { this.x *= o.x; this.y *= o.y; };
  idiv = (o: Vec2): void => { this.x /= o.x; this.y /= o.y; };
  iscale = (v: number): void => { this.x *= v; this.y *= v};
}