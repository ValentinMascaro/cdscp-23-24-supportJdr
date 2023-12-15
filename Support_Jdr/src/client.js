const socket = new WebSocket('ws://localhost:3000');
// const socket = new WebSocket('wss://72d8-83-201-91-17.ngrok.io');

// list of pseudo
const players = [];
let myName = null;

// Gérer l'ouverture de la connexion WebSocket
socket.addEventListener('open', (event) => {
    console.log('Connexion WebSocket établie');
});

// Gérer la réception de messages du serveur
socket.addEventListener('message', (event) => {
    console.log('Message texte reçu du serveur:', event.data);
    const message = JSON.parse(event.data);

    console.log("Message type:", message.type);

    if (message.type == "list_players") {
        // display the list of players
        console.log("List of other players:", message.data);
        message.data.map((player) => {
            players.push(player);
            // add the player to the list of players options
            const select = document.getElementById('mpDestinataireInput');
            const option = document.createElement("option");
            option.text = player;
            option.value = player;
            select.add(option);
        });
    }
    else if (message.type == "new_player") {
        // add the player to the list of players
        players.push(message.data.name);
        // add the player to the list of players options
        const select = document.getElementById('mpDestinataireInput');
        const option = document.createElement("option");
        option.text = message.data.name;
        option.value = message.data.name;
        select.add(option);
    }
    
    else if (message.type == "private_message") {
        // display the private message
        console.log("Private message from", message.data.from, "to", message.data.to, ":", message.data.message);
    }
    else {
        console.log("Message type " + message.type + " not implemented yet");
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

    const destInput = document.getElementById('mpDestinataireInput');
    const dest = destInput.value;

    if(myName == null) {
        console.warn("You try to send a message but you don't have a name yet");
    }
    
    const messageToSend = {
        type: "private_message",
        data: {
            from: myName,
            to: dest,
            message: message
        }
    };

    if (message.trim() !== '') {
        socket.send(JSON.stringify(messageToSend));
        messageInput.value = ''; // Effacer le champ de saisie après l'envoi
        destInput.value = ''; // Effacer le champ de saisie après l'envoi
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
        socket.send(JSON.stringify({ type: "first_connection", data: name }));
        myName = name;
    } else {
        console.warn("You should set your name before sending a message");
    }
    
}