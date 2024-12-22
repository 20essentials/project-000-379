const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let $width = (canvas.width = window.innerWidth);
let $height = (canvas.height = window.innerHeight);
let rows = Math.floor($height / 26);
let columns = Math.floor($width / 26);

const resize = () => {
  $width = canvas.width = window.innerWidth;
  $height = canvas.height = window.innerHeight;
  rows = Math.floor($height / 26);
  columns = Math.floor($width / 26);
};

const randomColor = () => {
  const [r, g, b] = [...Array(3)].map(() => Math.floor(Math.random() * 255));
  return { r, g, b };
};

function drawCanvas() {
  for (let i = 0; i < rows; i++) {
    const { r, g, b } = randomColor();

    for (let j = 0; j < columns; j++) {
      const rowOpacity = (i + 1) / rows;
      const cellOpacity = (j + 1) / columns;
      const combinedOpacity = Math.max(0.3, cellOpacity + rowOpacity);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${combinedOpacity})`;
      ctx.fillRect(30 * j, 30 * i, 30, 30);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  drawCanvas();

  window.addEventListener('resize', () => {
    resize();
    drawCanvas();
  });
});
