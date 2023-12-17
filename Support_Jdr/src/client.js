/**
 * @fileoverview Gestion des clients
 */

/**
 * Classe représentant un client
 * @class
 * @property {string} name Nom du client
 * @property {string} id Identifiant du client
 * @property {WebSocket} websocket Instance du WebSocket du client
 */
class Client {
    constructor(websocket, id, name = null, canvasLayer = null) {
        this.name = (name == null) ? ("Anonymous_" + id) : name;
        this.id = id;
        this.websocket = websocket;
        this.canvasLayer = canvasLayer;
    }
}

/**
 * Classe représentant une liste de clients
 * @class
 * @property {Client[]} clients Liste des clients
 * @method addClient Ajouter un client à la liste
 * @method getClientById Recherche de client par ID
 * @method getClientByName Recherche de client par nom
 * @method getClientByWebSocket Recherche de client par WebSocket
 */
class ClientList {
    constructor() {
        this.clients = [];
    }

    // Ajouter un client à la liste
    addClient(client) {
        this.clients.push(client);
    }

    
    removeClientById(id) {
        this.clients = this.clients.filter(client => client.id != id);
    }

    removeClientByWebSocket(websocket) {
        this.clients = this.clients.filter(client => client.websocket != websocket);
    }

    /**
     * Remove a client from the list by its name
     * @param {string} name 
     * @returns {void}
     * @deprecated Use {@link ClientList#removeClientById} or {@link ClientList#removeClientByWebSocket } instead
     */
    removeClientByName(name) {
        this.clients = this.clients.filter(client => client.name != name);
    }

    // Recherche de client par ID
    getClientById(id) {
        return this.clients.find(client => client.id == id);
    }

    // Recherche de client par nom
    getClientByName(name) {
        return this.clients.find(client => client.name == name);
    }

    // Recherche de client par WebSocket
    getClientByWebSocket(websocket) {
        return this.clients.find(client => client.websocket == websocket);
    }
}
// TODO : FIX import/export/requires and module.exports problems
try {
    module.exports = { Client, ClientList };
} catch (error) {
    console.warn("Module.exports not available");
}