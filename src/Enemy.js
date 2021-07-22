class Enemy {
  constructor(ctx, { x, y, width, height, speed }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;

    this.image = new Image();
    this.image.src = "assets/enemy.png";
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();

    this.x += this.speed;
  }
}
