export enum Axis {
  X,
  Y,
}

export class Vec2 {
  constructor(public x: number, public y: number) {}

  add(v: Vec2): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vec2): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mul(v: Vec2): this {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  div(v: Vec2): this {
    this.x /= v.x || 0.00001;
    this.y /= v.y || 0.00001;
    return this;
  }

  scale(s: number): this {
    this.x *= s;
    this.y *= s;
    return this;
  }

  rotate(angle: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x;
    const y = this.y;
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }

  from(v: Vec2): this {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  equals(v: Vec2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): this {
    const len = this.length();
    if (len !== 0) {
      this.x /= len;
      this.y /= len;
    }
    return this;
  }

  distance(v: Vec2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  toString(): string {
    return `Vec2(${this.x}, ${this.y})`;
  }

  static zero(): Vec2 {
    return new Vec2(0, 0);
  }

  static one(): Vec2 {
    return new Vec2(1, 1);
  }

  static up(): Vec2 {
    return new Vec2(0, -1);
  }

  static down(): Vec2 {
    return new Vec2(0, 1);
  }

  static left(): Vec2 {
    return new Vec2(-1, 0);
  }

  static right(): Vec2 {
    return new Vec2(1, 0);
  }
}
