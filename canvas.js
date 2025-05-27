const canvas = document.getElementsByTagName('canvas')[0];

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.font = "90px Sans=Serif";
ctx.textBaseline = "top";
ctx.fillText("Hello World!", 195,20);

var helloWorldImage = new Image();
helloWorldImage.onload = function () {
    ctx.drawImage(helloWorldImage, 10, 9)
}

helloWorldImage.src = "helloWorld.gif";
ctx.strokeStyle = "#000000"
ctx.strokeRect(5, 5, 490, 290)
// ctx.fillRect(0, 0, 100, 100);

