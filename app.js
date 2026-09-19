const shape = document.getElementById("shape");
const fields = document.getElementById("fields");
const out = document.getElementById("out");

const defs = {
  rect: [
    ["w", "Width"],
    ["h", "Height"],
  ],
  triangle: [
    ["b", "Base"],
    ["h", "Height"],
  ],
  circle: [["r", "Radius"]],
  trapezoid: [
    ["a", "Base a"],
    ["b", "Base b"],
    ["h", "Height"],
  ],
};

function renderFields() {
  fields.innerHTML = defs[shape.value]
    .map(
      ([id, label]) =>
        `<label>${label}<input type="number" min="0" step="any" id="${id}" value="1" /></label>`
    )
    .join("");
  fields.querySelectorAll("input").forEach((el) => el.addEventListener("input", calc));
  calc();
}

function num(id) {
  return Number(document.getElementById(id)?.value) || 0;
}

function calc() {
  let a = 0;
  switch (shape.value) {
    case "rect":
      a = num("w") * num("h");
      break;
    case "triangle":
      a = 0.5 * num("b") * num("h");
      break;
    case "circle":
      a = Math.PI * num("r") ** 2;
      break;
    case "trapezoid":
      a = 0.5 * (num("a") + num("b")) * num("h");
      break;
  }
  out.textContent = Number.isFinite(a) ? a.toFixed(4).replace(/\.?0+$/, "") : "—";
}

shape.addEventListener("change", renderFields);
renderFields();
