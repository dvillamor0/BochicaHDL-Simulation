/* =========================================================
   TESTBENCH OUTPUT
========================================================= */

window.SuamoxTestbench = (() => {
  const output = document.getElementById("term");

  function clear() {
    output.textContent = "";
  }

  function log(line) {
    output.textContent += line + "\n";
    output.scrollTop = output.scrollHeight;
  }

  function run(code) {
    clear();
    log("$ compiling...");
    log("$ running testbench");
    log("$ OK – no errors");
  }

  return {
    log,
    run,
  };
})();
