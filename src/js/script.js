const img = new Image();
const canvas = document.getElementById('canvas');
const selectedColor = document.getElementById('selected-color');
const counterPixelsOnClick = document.getElementById('pixels');
const allPixels = document.getElementById('all-pixels');

img.crossOrigin = '';


const loadImg = () => {
    let imgInput = document.getElementById('link-img').value;
    img.src = imgInput;
    ctx.globalAlpha = rng.value;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.globalAlpha = rng.value;
    ctx.drawImage(img, 0, 0); 
}

document.querySelector("#btn").onclick = function(){
    loadImg();
}

const ctx = canvas.getContext('2d');



function pick(event, destination) {
    let PixelCounter = 0;
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
    for (let i = 1; i <= canvas.width; i++) {
        for (let j = 1; j <= canvas.height; j++) {
            const pixelArray = ctx.getImageData(i, j, 1, 1);
            let pixelColor = pixelArray.data;
            if(data[0] === pixelColor[0] && data[1] === pixelColor[1] && data[2] === pixelColor[2] && data[3] === pixelColor[3]) {
                PixelCounter += 1;
                console.log(pixelColor);
            }
        }
    }
    
    console.log(`${PixelCounter}px - rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`);

    allPixels.innerHTML = `Pixels on image: ${canvas.width * canvas.height}`;
    counterPixelsOnClick.innerHTML = `${PixelCounter}px - rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;


    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.color = rgba;
    destination.textContent = rgba;

    return rgba;
}

canvas.addEventListener('click', event => pick(event, selectedColor));


const rng = document.getElementById('rangeinput');

rng.oninput = function () {
    loadImg();
}

