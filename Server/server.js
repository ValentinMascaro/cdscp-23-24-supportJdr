const WebSocket = require('ws');
const http = require('http');

// Créer un serveur HTTP pour gérer les requêtes WebSocket
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server\n');
});

// Créer le serveur WebSocket en utilisant le serveur HTTP
const wss = new WebSocket.Server({ server });

// Stocker une carte des clients avec leurs identifiants uniques
const clients = new Map();

// dictionnary name -> id
const players = new Map();

// Écouter les connexions WebSocket
wss.on('connection', (ws) => {

    const clientId = clients.size + 1;
    console.log('Nouvelle connexion WebSocket établie avec le client', clientId);
    clients.set(clientId, ws);

    // Écouter les messages des clients
    ws.on('message', (message) => {
        // console.log(`Message reçu de ${clientId}: ${message}`);
        // Analyser le message pour extraire l'identifiant du destinataire
        console.log("Message reçu:", message);
        console.log("Parse JSON:", JSON.parse(message));
        handleMessage(JSON.parse(message));
    });

    // Gérer la fermeture de la connexion
    ws.on('close', () => {
        console.log('Connexion WebSocket fermée : client', clientId, 'déconnecté');
        clients.delete(clientId);
    });
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
    console.log('Serveur WebSocket en cours d\'écoute sur le port 3000');
});




function handleMessage(message) {

    if(message.type == "first_connection") {
        // associate the client id with the player name
        const clientId = clients.size;
        
        // send to all clients the new client

        const messageToSendLstPlayers = {
            type: "list_players",
            data: Array.from(players.keys())
        };

        clients.get(clientId).send(JSON.stringify(messageToSendLstPlayers));

        const messageToSendToAll = {
            type: "new_player",
            data: {
                name: message.data,
                id: clientId
            }
        };
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageToSendToAll));
            }
        });
        players.set(message.data, clientId );
        console.log("Client", clientId, "is now known as", message.data);
    }
    else if(message.type == "private_message") {
        // send to the client the private message
        const destClientId = players.get(message.data.to);

        const messageToSend = {
            type: "private_message",
            data: {
                from: message.data.from,
                to: message.data.to,
                message: message.data.message
            }
        };

        clients.get(destClientId).send(JSON.stringify(messageToSend));
    }

    
    else if(message.type == "ambiance"){
        console.log("Ambiance message received");
        handleAmbiance(message.data);
    }
    
    else {
        console.log("Message type " + message.type + " not implemented yet");
    }
}


function handleAmbiance(ambiance){
    if(ambiance.name == "orage"){
        console.log("Ambiance orage");
        // TODO : send to the node-red server a message to play the sound every 10 seconds
        // TODO : send to the node-red server a message to stop the sound after 1 minute
    
    }
    // ...
    else {
        console.log("Ambiance " + ambiance.name + " not implemented yet");
    }
}
