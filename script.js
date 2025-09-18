let icosahedron = document.querySelector(".icosahedron");

let daleIndex;
for (let i = 0; i < 20; i++) {
    daleIndex = i % 10;

    icosahedron.innerHTML += `<figure class="face" id="face${i}" data-val=${i} onclick="clickFace(this)"><div class="content"><p>${i}</p><img src="dales/dale${daleIndex}.jpg"></div></figure>`;
}

const icosahedronFaces = {
    1: { x: -127.399, y: 0 },
    2: { x: -127.399, y: 72 },
    3: { x: -127.399, y: 144 },
    4: { x: -127.399, y: 216 },
    5: { x: -127.399, y: 288 },
    6: { x: -10.791, y: 36 },
    7: { x: -10.791, y: 108 },
    8: { x: -10.791, y: 180 },
    9: { x: -10.791, y: 252 },
    10: { x: -10.791, y: 324 },
    11: { x: 52.601, y: 0 },
    12: { x: 52.601, y: 72 },
    13: { x: 52.601, y: 144 },
    14: { x: 52.601, y: 216 },
    15: { x: 52.601, y: 288 },
    16: { x: 169.209, y: 36 },
    17: { x: 169.209, y: 108 },
    18: { x: 169.209, y: 180 },
    19: { x: 169.209, y: 252 },
    20: { x: 169.209, y: 324 },
};

// let face;
// function displayFace(n) {
//     face = icosahedronFaces[n];
//     icosahedron.style.setProperty('--container-rotation-x', `${face['x']}`)
//     icosahedron.style.setProperty('--container-rotation-y', `${face['y']}`)
// }

htmlFaces = document.querySelectorAll(".faces");
daleNumber = document.querySelector("#daleNumber");

let dales = 0;

function updateDales() {
    daleNumber.innerHTML = dales;
}

function clickFace(el) {
    dales += parseInt(el.dataset.val);
    console.log(dales)
    updateDales();
}
