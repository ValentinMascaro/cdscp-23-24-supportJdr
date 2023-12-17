// const { createCanvas, loadImage } = require('canvas');

const canvasCommun = document.getElementById('canvasCommun');
const canvasLayer = document.getElementById('canvasLayer');
const ctxLayer = canvasLayer.getContext('2d');
const ctxCommun = canvasCommun.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
canvasLayer.addEventListener('mousemove', draw);
canvasLayer.addEventListener('mousedown', (e) => {
    setPosition(e);
    draw(e);
});
canvasLayer.addEventListener('mouseup', sendCanvas);
canvasLayer.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
    // plus jamais les canvasLayer
    pos.x = e.clientX - canvasLayer.offsetLeft - window.scrollX;
    pos.y = e.clientY - canvasLayer.offsetTop + window.scrollY;
}

// resize canvasLayer
function resize() {
    ctxLayer.canvas.width = canvasLayer.offsetWidth;
    ctxLayer.canvas.height = canvasLayer.offsetHeight;
}

function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctxLayer.beginPath(); // begin

    ctxLayer.lineWidth = 5;
    ctxLayer.lineCap = 'round';
    ctxLayer.strokeStyle = '#c0392b';

    ctxLayer.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctxLayer.lineTo(pos.x, pos.y); // to

    ctxLayer.stroke(); // draw it!

    // for live , uncomment this line
    // sendCanvas();
    

}

function sendCanvas() {
    // Vérifiez si la connexion WebSocket est ouverte
    if (socket.readyState === WebSocket.OPEN) {
        // Envoyez les données au serveur sous forme de chaîne JSON
        socket.send(JSON.stringify({
            type: 'canvas_update',
            data: {
                canvas: canvasLayer.toDataURL(),
                from: me
            }
        }));
    } else {
        console.error('WebSocket connection is not open.');
    }
}

function handleCanvasUpdate(msg) {
    // Assurez-vous que le message a le bon format
    if (msg.type === "canvas_update" && msg.data) {
        // Créez une nouvelle image à partir des données du serveur
        const newImage = new Image();
        newImage.src = msg.data;

        // Attendez que l'image soit chargée avant de dessiner sur le canevas
        newImage.onload = function () {
            // Clear le canevas avant de dessiner la nouvelle image
            ctxCommun.clearRect(0, 0, canvasCommun.width, canvasCommun.height);

            // Dessinez la nouvelle image sur le canevas
            ctxCommun.drawImage(newImage, 0, 0);
        };
    } else {
        console.error("Format de message non pris en charge pour la mise à jour du canevas", msg);
    }
}



function clearLayer() {
    // // théoriquement, le layer du client actuel n'est pas 
    // ctxLayer.clearRect(0, 0, canvasLayer.width, canvasLayer.height);
    // sendCanvas(canvasCommun);
}

