
export default class Vec2 {

  x: number;
  y: number;


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }


  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }


  add = (o: Vec2): Vec2 => new Vec2(this.x + o.x, this.y + o.y);
  iadd = (o: Vec2): void => { this.x += o.x; this.y += o.y; };


  sub = (o: Vec2): Vec2 => new Vec2(this.x - o.x, this.y - o.y);
  isub = (o: Vec2): void => { this.x -= o.x; this.y -= o.y; };


  mult = (o: Vec2): Vec2 => new Vec2(this.x * o.x, this.y * o.y);
  imult = (o: Vec2): void => { this.x *= o.x; this.y *= o.y; };


  div = (o: Vec2): Vec2 => new Vec2(this.x / o.x, this.y / o.y);
  idiv = (o: Vec2): void => { this.x /= o.x; this.y /= o.y; };
}