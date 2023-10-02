const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
const el = (sel, par) => (par ||document).querySelector(sel);