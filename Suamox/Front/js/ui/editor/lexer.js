export function highlight(code, semantic) {
  if (!semantic || !Array.isArray(semantic.tokens) || semantic.tokens.length === 0) {
    return escapeHTML(code);
  }

  let out = "";
  let i = 0;
  for (const tok of semantic.tokens) {
    const [s, e] = tok.span;
    out += escapeHTML(code.slice(i, s));
    out += `<span class="token-${tok.kind}">`;
    out += escapeHTML(code.slice(s, e));
    out += `</span>`;
    i = e;
  }
  out += escapeHTML(code.slice(i));
  return out;
}

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
