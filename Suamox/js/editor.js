window.SuamoxEditor = (() => {
  const editor = document.getElementById("editor");
  const highlight = document.getElementById("highlight");

  function syncScroll() {
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
  }

  function render() {
    highlight.innerHTML = SuamoxLexer.lex(editor.value) + "\n";
  }

  function init() {
    editor.addEventListener("scroll", syncScroll);
    editor.addEventListener("input", render);
    editor.addEventListener("input", () => {
      State.updateContent(editor.value);
    });

    render();
  }

  function setValue(code) {
    editor.value = code;
    render();
  }

  function getValue() {
    return editor.value;
  }

  return {
    init,
    setValue,
    getValue,
  };
})();
