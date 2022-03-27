export function fontSize(res) {
    let docEl = document.documentElement,
      clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 23329);
    return res * fontSize;
  }
  