window.SuamoxLexer = (() => {
  function highlight(code, semantic) {
    let out = "";
    let i = 0;

    for (const tok of semantic.tokens) {
      out += escapeHTML(code.slice(i, tok.span[0]));
      out += `<span class="token-${tok.kind}">`;
      out += escapeHTML(code.slice(tok.span[0], tok.span[1]));
      out += `</span>`;
      i = tok.span[1];
    }

    out += escapeHTML(code.slice(i));
    return out;
  }

  return { highlight };
})();
