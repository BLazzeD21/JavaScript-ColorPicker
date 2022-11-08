const img = new Image();
const canvas = document.getElementById('canvas');
const selectedColor = document.getElementById('selected-color');

img.crossOrigin = '';

document.querySelector("#btn").onclick = function(){
    let imgInput = document.getElementById('link-img').value;
    img.src = imgInput;
}
const ctx = canvas.getContext('2d');
img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
});

function pick(event, destination) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.color = rgba;
    destination.textContent = rgba;

    return rgba;
}

canvas.addEventListener('click', event => pick(event, selectedColor));