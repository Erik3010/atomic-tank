class Background {
  constructor(ctx, { x, y, width, height, speed }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;

    this.image = new Image();
    this.image.src = "assets/background.png";
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();

    if (this.x === -this.width) this.x = 0;

    this.x -= this.speed;
  }
}
