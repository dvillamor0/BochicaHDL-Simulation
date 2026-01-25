window.SuamoxLexer = (() => {
  function escapeHTML(code) {
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function lex(code) {
    return escapeHTML(code)
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

  return { lex };
})();
