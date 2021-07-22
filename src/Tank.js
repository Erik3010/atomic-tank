class Tank {
  constructor(ctx, { x, y, width, height, speed }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;

    this.direction = 0;

    this.angle = 0;

    this.cannon = {
      width: 70,
      height: 10,
    };
  }
  draw() {
    this.drawBody();
    this.drawCanon();
    this.drawHead();
  }
  drawHead() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.x + this.width / 2 / 2,
      this.y - this.height / 2,
      this.width / 2,
      this.height / 2
    );
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBody() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "darkgreen";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawCanon() {
    this.ctx.save();
    this.ctx.fillStyle = "darkgreen";
    this.ctx.translate(this.cannon.x, this.cannon.y + this.cannon.height / 2);
    this.ctx.rotate(this.angle * (Math.PI / 180));
    this.ctx.translate(
      -this.cannon.x,
      -(this.cannon.y + this.cannon.height / 2)
    );
    this.ctx.fillRect(
      this.cannon.x,
      this.cannon.y,
      this.cannon.width,
      this.cannon.height
    );
    this.ctx.restore();
  }
  update() {
    this.x += this.speed * this.direction;
    this.x = Math.min(game.canvas.width - this.width, Math.max(0, this.x));

    this.cannon.x = this.x + this.width / 2;
    this.cannon.y = this.y - this.cannon.height;

    this.draw();
  }
  move(direction) {
    this.direction = direction;
  }
  cannonMove(angle) {
    if (angle > 0 || angle >= 180) return;

    this.angle = angle;
  }
}
