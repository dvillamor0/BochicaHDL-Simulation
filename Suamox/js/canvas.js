/* =========================================================
   CANVAS / VISUALIZATION
========================================================= */

window.SuamoxCanvas = (() => {
  const canvas = document.getElementById("gfx");
  const ctx = canvas.getContext("2d");
  let t = 0;

  function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function render() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = `hsl(${t % 360}, 100%, 60%)`;
    ctx.lineWidth = 2;

    for (let x = 0; x < canvas.width; x += 10) {
      const y = canvas.height / 2 + Math.sin(x * 0.015 + t * 0.05) * 60;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
    t++;
    requestAnimationFrame(render);
  }

  function init() {
    window.addEventListener("resize", resize);
    resize();
    render();
  }

  return { init };
})();
