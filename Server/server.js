const WebSocket = require('ws');
const http = require('http');
// import { Client, ClientList } from '../Support_Jdr/src/Client.js';
const { Client, ClientList } = require('../Support_Jdr/src/Client.js');

// Créer un serveur HTTP pour gérer les requêtes WebSocket
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server\n');
});

// Créer le serveur WebSocket en utilisant le serveur HTTP
const wss = new WebSocket.Server({ server });

// Créer une liste de clientList
const clientList = new ClientList();

// Écouter les connexions WebSocket
wss.on('connection', (ws) => {

    // Check if the client is already known
    if (clientList.getClientByWebSocket(ws) != null) {
        console.warn("Client already known" );
        return;
    }
    
    // send him the list of players
    const messageToSendLstPlayers = {
        type: "list_players",
        data: clientList
    };
    ws.send(JSON.stringify(messageToSendLstPlayers));

    // Create a new client with the websocket and the current time as id
    // BY KEEPING THE CLIENT HERE, we avoid to search it in the list
    const client = new Client(ws, Date.now());
    console.log('Nouvelle connexion WebSocket :', client.id, client.name);
    ws.send(JSON.stringify({type: "your_data", data: client}));


    // Add the client to the list
    clientList.addClient(client);
    // Send to all clientList the new client
    const messageToSendToAll = {
        type: "new_player",
        data: client
    };
    clientList.clients.forEach((client) => {
        if (client.websocket.readyState === WebSocket.OPEN) {
            client.websocket.send(JSON.stringify(messageToSendToAll));
        }
    });

    // log the name of all clientList
    console.log("List of clientList:");
    clientList.clients.forEach((client) => {
        console.log(client.name);
    });

    // Écouter les messages des clientList
    ws.on('message', (message) => {
        // Analyser le message pour extraire l'identifiant du destinataire
        console.log(`Receive message ${message} from ${client.id}`);
        
        handleMessage(client, JSON.parse(message));
    });

    // Gérer la fermeture de la connexion
    ws.on('close', () => {
        console.log('Connexion WebSocket fermée : client', client.id, 'déconnecté');
        clientList.removeClientById(client.id);
    });
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
    console.log('Serveur WebSocket en cours d\'écoute sur le port 3000');
});


function handleMessage(client, message) {

    console.log("Message type:", message.type);

    // if(message.type == "first_connection") {
    //     // associate the client id with the player name
    //     const clientId = clientList.size;
        
    //     // send to all clientList the new client

    //     const messageToSendLstPlayers = {
    //         type: "list_players",
    //         data: Array.from(players.keys())
    //     };

    //     clientList.get(clientId).send(JSON.stringify(messageToSendLstPlayers));

    //     const messageToSendToAll = {
    //         type: "new_player",
    //         data: {
    //             name: message.data,
    //             id: clientId
    //         }
    //     };
    //     clientList.forEach((client) => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(JSON.stringify(messageToSendToAll));
    //         }
    //     });
    //     players.set(message.data, clientId );
    //     console.log("Client", clientId, "is now known as", message.data);
    // }
    if(message.type === "change_name"){
        // update the client name
        client.name = message.data;
        console.log("TODO : update the client name in the list of all clientList");
    }
    else if(message.type == "private_message") {

    
        console.log("Private message from", message.data.from.id, "to", message.data.to.id);
        const clientDest = clientList.getClientById(message.data.to.id);
        if (clientDest != null) {
            console.log("Send private message to", clientDest.name, ":", message.data.message);
            clientDest.websocket.send(JSON.stringify(message));
        }
        else {
            console.warn(`DestClient not found`);
            console.log("clientList", clientList);
            debugger;
        }
    }

    else if (message.type == 'canvas_update') {
        // Diffuser la mise à jour du canvas à tous les clientList
        broadcastCanvasUpdate(message);
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


function broadcastCanvasUpdate(message) {
    // Met à jour la couche de canevas du client émetteur
    const senderId = message.data.from.id;
    const senderClient = clientList.getClientById(senderId);

    if (senderClient) {
        senderClient.canvasLayer = message.data.canvas;
    } else {
        console.error(`Client not found for sender ID: ${senderId}`);
        return;
    }

    // Fusionne toutes les couches de canevas
    const mergedCanvas = mergeCanvasLayers();

    // Envoie le canevas résultant à tous les clients
    clientList.clients.forEach((client) => {
        if (client.websocket.readyState === WebSocket.OPEN) {
            const updateMessage = {
                type: 'canvas_update',
                data: mergedCanvas,
            };
            client.websocket.send(JSON.stringify(updateMessage));
        }
    });
}

// Fonction pour fusionner toutes les couches de canevas
function mergeCanvasLayers() {
    // Implémentez votre logique de fusion ici, en utilisant les canvasLayer de tous les clients
    // Retournez le canevas résultant après la fusion
    // Exemple simplifié : concaténer les couches
    const allCanvasLayers = clientList.clients.map((client) => client.canvasLayer);
    const mergedCanvas = allCanvasLayers.join('\n');

    return mergedCanvas;
}