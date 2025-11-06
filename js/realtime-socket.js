// Ejemplo de conexión WebSocket real
const socket = new WebSocket('wss://tu-servidor.com/cyber-alerts'); //Enlace para analizar la defensa 

socket.onmessage = (event) => {
    const realData = JSON.parse(event.data);
    window.cyberData.processRealAlert(realData);
};