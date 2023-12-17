// import { Client, ClientList } from './Client.js';
// const { Client, ClientList } = require('./Client.js');

const socket = new WebSocket('ws://localhost:3000');
const clients = new ClientList();
const me = new Client(null, null, null);

// Gérer l'ouverture de la connexion WebSocket
socket.addEventListener('open', (event) => {
    console.log('Connexion WebSocket établie');
});

// Gérer la réception de messages du serveur
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    console.log('Message du serveur :', message.type);

    if(message.type === "your_data"){
        me.id = message.data.id;
        me.name = message.data.name;
        me.websocket = socket;
        console.log("My data:", me);
    }

    else if (message.type == "list_players") {
        // display the list of players
        console.log("List of other client:", message.data);
        message.data.clients.map((client) => {
            addClientToOptions(client);
        });
    }
    else if (message.type == "new_player") {
        addClientToOptions(message.data);
    }
    
    else if (message.type == "private_message") {
        // display the private message
        console.log("Private message from", message.data.from, "to", message.data.to, ":", message.data.message);
    }
    else if (message.type == "canvas_update") {
        // Appel de la fonction pour traiter les mises à jour du canvas
        handleCanvasUpdate(message);
    }
    else {
        console.log("Message type " + message.type + " not implemented yet");
    }
});

function addClientToOptions(client) {
    const select = document.getElementById('mpDestinataireInput');
    const option = document.createElement("option");
    option.text = client.name;
    option.value = JSON.stringify(client);
    select.add(option);
}

// Gérer la fermeture de la connexion WebSocket
socket.addEventListener('close', (event) => {
    console.log('Connexion WebSocket fermée');
});

// Fonction pour envoyer un message au serveur
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    const destInput = document.getElementById('mpDestinataireInput');
    const clientDest = JSON.parse(destInput.value);
    
    const messageToSend = {
        type: "private_message",
        data: {
            from: me,
            to: clientDest,
            message: message
        }
    };

    if (message.trim() !== '') {
        socket.send(JSON.stringify(messageToSend));
        messageInput.value = ''; // Effacer le champ de saisie après l'envoi
    }
}

function closeConnection() {
    socket.close();
}

function changeName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value;
    if (name.trim() !== '') {
        me.name = name;
        // send the new name to the server
        const messageToSend = {
            type: "change_name",
            data:name
        };
    } else {
        console.warn("You should set your name before sending a message");
    }
}