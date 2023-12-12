const socket = new WebSocket('ws://localhost:3000'); // Assurez-vous que l'URL correspond à votre serveur WebSocket

// Dictionnary Name -> Id
const players = new Map();
// Allow to interact with other players by using their name instead of their id

// Gérer l'ouverture de la connexion WebSocket
socket.addEventListener('open', (event) => {
    console.log('Connexion WebSocket établie');
});

// Gérer la réception de messages du serveur
socket.addEventListener('message', (event) => {
    console.log('Message texte reçu du serveur:', event.data);
    const message = JSON.parse(event.data);

    console.log("Message type:", message.type);

    if (message.type == "new_player") {
        // add the player to the list of players
        players.set(message.data.name, message.data.id);
        console.log("Client", message.data.id, "is now known as", message.data.name);
    } else if (message.type == "message") {
        // TODO
    } else if (message.type == "object_received") {
        // TODO
    } else if (message.type == "object_sent") {
        // TODO
    } else {
        console.log("Unknown message type");
    }


});


// Gérer la fermeture de la connexion WebSocket
socket.addEventListener('close', (event) => {
    console.log('Connexion WebSocket fermée');
});

// Fonction pour envoyer un message au serveur
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        socket.send(message);
        messageInput.value = ''; // Effacer le champ de saisie après l'envoi
    }
}

function closeConnection() {
    socket.close();
}

function sendName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;

    if (name.trim() !== '') {
        nameInput.value = ''; // Effacer le champ de saisie après l'envoi
    }
    socket.send(JSON.stringify({ type: "first_connection", data: name }));
}