class Game {
  constructor({ canvas, ctx }) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.tank = {};

    this.bullets = [];
    this.enemies = [];
    this.explosions = [];

    this.background;
  }
  init() {
    this.listener();
    this.generateTank();
    this.generateBackground();

    this.generateEnemy();
  }
  generateTank() {
    const tank = {
      width: 90,
      height: 40,
    };

    this.tank = new Tank(this.ctx, {
      x: this.canvas.width / 2 - tank.width,
      y: this.canvas.height - tank.height,
      ...tank,
      speed: 5,
    });
  }
  generateBackground() {
    this.background = new Background(this.ctx, {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      speed: 4,
    });
  }
  generateEnemy() {
    if (this.enemies.length <= 5)
      this.enemies.push(
        new Enemy(this.ctx, {
          x: 0 - 150,
          y: Utility.random(50, 280),
          width: 150,
          height: 60,
          speed: Utility.random(2, 5),
        })
      );

    setTimeout(this.generateEnemy.bind(this), 2000);
  }
  generateExplosion({ x, y, width, height }) {
    this.explosions.push(new Explosion(this.ctx, { x, y, width, height }));
  }
  listener() {
    document.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;
      const angle =
        Math.atan2(y - this.tank.y, x - this.tank.x) * (180 / Math.PI);

      this.tank.cannonMove(angle);
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 39 || e.keyCode === 68) {
        this.tank.move(1);
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        this.tank.move(-1);
      } else if (e.keyCode == 32) {
        this.shoot();
      }
    });

    document.addEventListener("keyup", () => {
      this.tank.move(0);
    });
  }
  update() {
    this.background.update();

    this.bullets.forEach((bullet) => bullet.update());
    this.enemies.forEach((enemy) => enemy.update());
    this.explosions.forEach((explosion, index) => {
      if (explosion.isFinish) {
        this.explosions.splice(index, 1);
      } else {
        explosion.update();
      }
    });

    this.tank.update();

    this.checkBoundary();

    this.checkCollision();
  }
  shoot() {
    this.bullets.push(
      new Bullet(this.ctx, {
        tank: this.tank,
        x: this.tank.cannon.x,
        y: this.tank.cannon.y,
        width: this.tank.cannon.height,
        height: this.tank.cannon.height,
        angle: this.tank.angle,
        speed: 10,
        velocity: {
          x: Math.cos(this.tank.angle * (Math.PI / 180)),
          y: Math.sin(this.tank.angle * (Math.PI / 180)),
        },
      })
    );
  }
  checkBoundary() {
    this.bullets.forEach((bullet, index) => {
      if (Utility.inBoundary(bullet, this.canvas))
        this.bullets.splice(index, 1);
    });

    this.enemies.forEach((enemy, index) => {
      if (Utility.inBoundary(enemy, this.canvas)) this.enemies.splice(index, 1);
    });
  }
  checkCollision() {
    this.bullets.forEach((bullet, index) => {
      this.enemies.forEach((enemy, idx) => {
        if (Utility.isCollide(bullet, enemy)) {
          this.bullets.splice(index, 1);
          this.enemies.splice(idx, 1);
          this.generateExplosion({
            x: enemy.x,
            y: enemy.y - enemy.height,
            width: 250,
            height: 200,
          });
        }
      });
    });
  }
}
