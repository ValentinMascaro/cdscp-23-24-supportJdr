const socket = new WebSocket('ws://localhost:3000'); // Assurez-vous que l'URL correspond à votre serveur WebSocket

// Gérer l'ouverture de la connexion WebSocket
socket.addEventListener('open', (event) => {
    console.log('Connexion WebSocket établie');
});

// Gérer la réception de messages du serveur
socket.addEventListener('message', (event) => {
    console.log('Message texte reçu du serveur:', event.data);
    const message = event.data;
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
