const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const initCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const game = new Game({
  canvas,
  ctx,
});

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update();
};

const init = () => {
  initCanvas();
  game.init();

  animate();
};

init();

addEventListener("resize", init);
