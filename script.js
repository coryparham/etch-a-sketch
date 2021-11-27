let pixels;
let buttons = document.querySelectorAll('.mode');
let clearButton = document.querySelector('#clearbtn');
let currentMode;

// Create divs for drawing surface
function createDivs() {
    let drawingSurface = document.querySelector('#drawing-surface');
    while (drawingSurface.firstChild) {
        drawingSurface.removeChild(drawingSurface.firstChild);
    }
    let gridSize = document.querySelector('#slider').value;
    for (i = 1; i <= gridSize**2; i++) {
        let div = document.createElement('div');
        div.style.cssText = `height: ${480/gridSize}px; width: ${480/gridSize}px`;
        div.classList.add('pixel');
        drawingSurface.appendChild(div);
    }
    pixels = document.querySelectorAll('.pixel');
}

function changePixel(e) {
    let mode=document.querySelector('.active');
    if (mode.id === 'colorbtn') {
        let color = document.querySelector('#pixel-color').value;
        this.style.backgroundColor = color;
        this.style.opacity = 1;
    } else if (mode.id === 'rainbowbtn') {
        let rgb1 = Math.floor(Math.random()*256);
        let rgb2 = Math.floor(Math.random()*256);
        let rgb3 = Math.floor(Math.random()*256);
        let color = `rgb(${rgb1}, ${rgb2}, ${rgb3})`
        this.style.backgroundColor = color;
        this.style.opacity = 1;
    } else if(mode.id === 'eraserbtn') {
        this.style.backgroundColor = 'white';
        this.style.opacity = 1;
    } else if(mode.id === 'opacitybtn') {
        if (this.style.backgroundColor.match(/rgba/)) {
            let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
            if (this.style.backgroundColor == 'rgb(0, 0, 0') {
                return;
            } else {
                this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                console.log(this.style.backgroundColor);
            }
        } else if (this.style.backgroundColor.match(/rgb/)) {
            return;
        } else {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    }
}

function makeActive(e) {
    let mode = document.querySelector('.active');
    mode.classList.remove('active');
    this.classList.add('active');
    currentMode = this;
}

let slider = document.querySelector('#slider');
let para = document.querySelector('#grid-size');
slider.oninput = function() {
    let gridSize = slider.value;
    para.textContent = `${gridSize} x ${gridSize}`;
    createDivs();
    pixels.forEach(pixel => pixel.addEventListener('mouseover', changePixel));
}

createDivs();

//Add event listener to pixels for hover. When hover happens on a pixel, pixel 
//changes color or opacity, depending on the selectors that the user has chosen.
pixels.forEach(pixel => pixel.addEventListener('mouseover', changePixel));

//Add event listener for buttons to make active on click.
buttons.forEach(button =>button.addEventListener('click', makeActive));

//Add event listener for clear button.
clearButton.addEventListener('click', function() {
    slider.value = '16';
    para.textContent = '16 x 16'
    createDivs();
    pixels.forEach(pixel => pixel.addEventListener('mouseover', changePixel));
})