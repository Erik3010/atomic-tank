class Bullet {
  constructor(ctx, { tank, x, y, width, height, angle, speed, velocity }) {
    this.ctx = ctx;

    this.tank = tank;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;

    this.speed = speed;
    this.velocity = velocity;
  }
  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y + this.height / 2);
    this.ctx.rotate(this.tank.angle * (Math.PI / 180));
    this.ctx.translate(-this.x, -(this.y + this.height / 2));
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }
  update() {
    this.draw();

    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
  }
}
