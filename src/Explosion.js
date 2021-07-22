class Explosion {
  constructor(ctx, { x, y, width, height }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = "assets/explosion-sprite.png";

    this.mask = {
      x: 0,
      y: 0,
      width: 250,
      height: 230,
    };

    this.step = 0;

    this.row = 2;
    this.col = 4;

    this.delay = 3;

    this.isFinish = false;
  }
  draw() {
    const currentStep = Math.floor(this.step / this.delay);

    this.ctx.drawImage(
      this.image,
      this.mask.x + (currentStep % this.col) * this.mask.width,
      this.mask.y + Math.floor(currentStep / this.col) * this.mask.height,
      this.mask.width,
      this.mask.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();

    this.step++;
    if (this.step === this.row * this.col * this.delay) {
      // this.step = 0;
      this.isFinish = true;
    }
  }
}
