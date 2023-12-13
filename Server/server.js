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
    /* message format : 
    {
        type: "message",
        data: "message data"
    }
    */

    if(message.type == "first_connection") {
        // associate the client id with the player name
        const clientId = clients.size;
        players.set(message.data, clientId );
        console.log("Client", clientId, "is now known as", message.data);
        // send to all clients the new client
        const messageToSend = {
            type: "new_player",
            data: {
                name: message.data,
                id: clientId
            }
        };
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messageToSend));
            }
        });

    }

    else if (message.type == "message") {
        // // Send message to recipient
        // const recipient = clients.get(message.recipient);
        // if (recipient.readyState === WebSocket.OPEN) {
        //     recipient.send(message);
        //     // recipient.send(message.data);
        // }
        // else {
        //     console.log(`Client ${recipientId} is not connected => message not sent`);
            
        // }
    }
    else {
        console.log("Unknown message type");
    }
}
