const WebSocket = require('ws');
const http = require('http');

// Créer un serveur HTTP pour gérer les requêtes WebSocket
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server\n');
});

// Créer le serveur WebSocket en utilisant le serveur HTTP
const wss = new WebSocket.Server({ server });

// Écouter les connexions WebSocket
wss.on('connection', (ws) => {
    console.log('Nouvelle connexion WebSocket établie');

    // Écouter les messages des clients
    ws.on('message', (message) => {
        console.log(`Message reçu : ${message}`);

        // Envoyer le message à tous les clients connectés
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                // Vérifier le type du message avant de l'envoyer
                if (typeof message === 'string') {
                    client.send(`Message texte reçu du serveur  ${message}`);
                } else if (message instanceof Buffer) {
                    client.send(`Données binaires reçues du serveur : ${message.toString('utf8')}`);
                }
                
            }
        });
    });

    // Gérer la fermeture de la connexion
    ws.on('close', () => {
        console.log('Connexion WebSocket fermée');
    });
});

// Démarrer le serveur sur le port 3000
server.listen(3000, () => {
    console.log('Serveur WebSocket en cours d\'écoute sur le port 3000');
});
