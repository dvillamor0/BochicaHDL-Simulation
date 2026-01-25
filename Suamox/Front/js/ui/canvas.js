(function initCanvas() {
  const canvas = document.querySelector(".canvas canvas");
  if (!canvas) return requestAnimationFrame(initCanvas);

  const ctx = canvas.getContext("2d");
  console.log("Canvas OK");
})();
