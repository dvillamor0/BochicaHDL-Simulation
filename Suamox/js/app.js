/* =========================================================
   LEXER-READY EDITOR (STABLE VERSION)
========================================================= */

const editor = document.getElementById("editor");
const highlight = document.getElementById("highlight");

/* Sync scroll */
editor.addEventListener("scroll", () => {
  highlight.scrollTop = editor.scrollTop;
  highlight.scrollLeft = editor.scrollLeft;
});

/* Input */
editor.addEventListener("input", renderHighlight);

/* Initial render */
renderHighlight();

function lex(code) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    .replace(/\/\/.*/g, '<span class="token-comment">$&</span>')

    .replace(
      /\b(module|endmodule|initial|begin|end|if|else)\b/g,
      '<span class="token-keyword">$1</span>'
    )

    .replace(
      /\b(reg|wire|logic|int|float)\b/g,
      '<span class="token-type">$1</span>'
    )

    .replace(/\b\d+(\.\d+)?\b/g, '<span class="token-number">$&</span>');
}

function renderHighlight() {
  highlight.innerHTML = lex(editor.value) + "\n";
}

/* =========================================================
   CANVAS PLACEHOLDER
========================================================= */

const canvas = document.getElementById("gfx");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let t = 0;
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
render();

/* =========================================================
   TERMINAL
========================================================= */

const term = document.getElementById("term");
term.textContent += "\n$ suamox stable layout";
