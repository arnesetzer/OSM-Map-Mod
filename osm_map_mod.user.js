// ==UserScript==
// @name         OSM map mod
// @version      1.0
// @description  Just a few tweaks with CSS-Filters
// @author       arnesetzer
// @match        https://www.openstreetmap.org/
// @grant        GM_addStyle
// ==/UserScript==
let options;
if (localStorage.getItem("advCmOptions") == null) {
    options = {};
    options.invert = 0;
    options.gray = 0;
    options.brightness = 1.0;
    options.contrast = 1.0;
    options.saturate = 1.0;
    options.sepia = 0;

}
else {
    options = JSON.parse(localStorage.getItem("advCmOptions"));
}
//Create carrier div
let div = document.createElement('div');
div.id = "advCmOptions";
div.classList.add("leaflet-control", "leaflet-control-custom");
div.style.visibility = "hidden";
document.getElementsByClassName('leaflet-bottom leaflet-left')[6].appendChild(div);



//Open&Close-Btn
let a = document.createElement('a');
a.id = "advCmBtn";
a.classList.add("leaflet-bar", "leaflet-control", "leaflet-control-custom");
a.style.backgroundColor = "white";
a.style.width="26px";
a.style.height="26px";
a.style.display="flex";
a.style.alignItems="center";
a.style.justifyContent="center";
a.onclick = function () { toggleVisibility(); }
let span = document.createElement('span');
span.classList.add("glyphicon", "glyphicon-th-list");
a.appendChild(span);
document.getElementsByClassName('leaflet-bottom leaflet-left')[6].appendChild(a);


//Invert slider
let sliderInvert = document.createElement('input');
sliderInvert.type = 'range';
sliderInvert.min = 0;
sliderInvert.max = 1;
sliderInvert.step = 0.2;
sliderInvert.value = options.invert;
sliderInvert.id = 'advCmInvert';
let labelInvert = document.createElement('span');
labelInvert.innerText="Invertieren";
labelInvert.classList.add("bg-primary")
div.appendChild(labelInvert);
div.appendChild(sliderInvert);

//Gray slider
let sliderGray = document.createElement('input');
sliderGray.type = 'range';
sliderGray.min = 0;
sliderGray.max = 1;
sliderGray.step = 0.1;
sliderGray.value = options.gray;
sliderGray.id = 'advCmGray';
let labelGray = document.createElement('span');
labelGray.innerText="Graustufen";
labelGray.classList.add("bg-primary")
div.appendChild(labelGray);
div.appendChild(sliderGray)


//Brightness slider
let sliderBrightness = document.createElement('input');
sliderBrightness.type = 'range';
sliderBrightness.min = 0.1;
sliderBrightness.max = 2;
sliderBrightness.step = 0.1;
sliderBrightness.value = options.brightness;
sliderBrightness.id = 'advCmBrightness';
let labelBrightness = document.createElement('span');
labelBrightness.innerText="Helligkeit";
labelBrightness.classList.add("bg-primary")
div.appendChild(labelBrightness);
div.appendChild(sliderBrightness);


//Contrast slider
let sliderContrast = document.createElement('input');
sliderContrast.type = 'range';
sliderContrast.min = 0.1;
sliderContrast.max = 2;
sliderContrast.step = 0.1;
sliderContrast.value = options.contrast;
sliderContrast.id = 'advCmContrast';
let labelContrast = document.createElement('span');
labelContrast.innerText="Kontrast";
labelContrast.classList.add("bg-primary")
div.appendChild(labelContrast);
div.appendChild(sliderContrast);

//Saturate slider
let sliderSaturate = document.createElement('input');
sliderSaturate.type = 'range';
sliderSaturate.min = 0;
sliderSaturate.max = 2;
sliderSaturate.step = 0.1;
sliderSaturate.value = options.saturate;
sliderSaturate.id = 'advCmSaturate';
let labelSaturate = document.createElement('span');
labelSaturate.innerText="Sättigung";
labelSaturate.classList.add("bg-primary")
div.appendChild(labelSaturate);
div.appendChild(sliderSaturate);

//Sepia slider
let sliderSepia = document.createElement('input');
sliderSepia.type = 'range';
sliderSepia.min = 0;
sliderSepia.max = 1;
sliderSepia.step = 0.1;
sliderSepia.value = options.sepia;
sliderSepia.id = 'advCmSepia';
let labelSepia = document.createElement('span');
labelSepia.innerText="Sepia";
labelSepia.classList.add("bg-primary")
div.appendChild(labelSepia);
div.appendChild(sliderSepia);

//Initial load of saved data from local storage
changeCSS();

//Close&ResetBtn
let resetBtn = document.createElement('button');
resetBtn.addEventListener('click', resetMap);
resetBtn.classList.add('btn', 'btn-danger');
resetBtn.innerText ="Zurücksetzen";
let closeBtn = document.createElement('button');
closeBtn.addEventListener('click', toggleVisibility);
closeBtn.classList.add('btn', 'btn-info');
closeBtn.innerText ="Schließen";
div.appendChild(resetBtn);
div.appendChild(closeBtn);


//Create EL

sliderInvert.addEventListener('input', changeCSS);
sliderGray.addEventListener('input', changeCSS);
sliderBrightness.addEventListener('input', changeCSS);
sliderContrast.addEventListener('input', changeCSS);
sliderSaturate.addEventListener('input', changeCSS);
sliderSepia.addEventListener('input', changeCSS);

function changeCSS() {
    saveSettings();
    let invert = document.getElementById('advCmInvert').value;
    let gray = document.getElementById('advCmGray').value;
    let brightness = document.getElementById('advCmBrightness').value;
    let contrast = document.getElementById('advCmContrast').value;
    let saturate = document.getElementById('advCmSaturate').value;
    let sepia = document.getElementById('advCmSepia').value;

    GM_addStyle(`
        #map {
            filter: invert(` + invert + `) grayscale(` + gray + `) brightness(` + brightness + `) contrast(` + contrast + `) saturate(` + saturate + `) sepia(` + sepia + `);
    -webkit-filter: invert(` + invert + `) grayscale(` + gray + `) brightness(` + brightness + `) contrast(` + contrast + `) saturate(` + saturate + `) sepia(` + sepia + `);
        `);
}
function saveSettings() {
    options.invert = document.getElementById('advCmInvert').value;
    options.gray = document.getElementById('advCmGray').value;
    options.brightness = document.getElementById('advCmBrightness').value;
    options.contrast = document.getElementById('advCmContrast').value;
    options.saturate = document.getElementById('advCmSaturate').value;
    options.sepia = document.getElementById('advCmSepia').value;
    localStorage.setItem("advCmOptions", JSON.stringify(options));
}
function toggleVisibility() {
    if (document.getElementById("advCmOptions").style.visibility == "hidden") {
        document.getElementById("advCmOptions").style.visibility = "visible";
        document.getElementById("advCmBtn").style.visibility = "hidden";
    }
    else {
        document.getElementById("advCmBtn").style.visibility = "visible";
        document.getElementById("advCmOptions").style.visibility = "hidden"
    }
}
function resetMap() {
    let invert = document.getElementById('advCmInvert').value=options.invert = 0;
    let gray = document.getElementById('advCmGray').value= options.gray = 0;
    let brightness = document.getElementById('advCmBrightness').value = options.brightness = 1.0;
    let contrast = document.getElementById('advCmContrast').value= options.contrast = 1.0;
    let saturate = document.getElementById('advCmSaturate').value= options.saturate = 1.0;
    let sepia = document.getElementById('advCmSepia').value= options.sepia = 0;

    GM_addStyle(`
        #map {
            filter: invert(` + invert + `) grayscale(` + gray + `) brightness(` + brightness + `) contrast(` + contrast + `) saturate(` + saturate + `) sepia(` + sepia + `);
    -webkit-filter: invert(` + invert + `) grayscale(` + gray + `) brightness(` + brightness + `) contrast(` + contrast + `) saturate(` + saturate + `) sepia(` + sepia + `);
        `);
}
