// Sistema de Datos de Ciberseguridad
class CyberData {
    constructor() {
        this.threats = [];
        this.alerts = [];
        this.metrics = {
            criticalAlerts: 3,
            threatsBlocked: 247,
            activeUsers: 42,
            defensesActive: '12/12',
            securityLevel: 98
        };
        this.init();
    }

    init() {
        this.generateInitialData();
        this.startRealtimeUpdates();
        this.createThreatMap();
        this.initializeCharts();
    }

    // Generar datos iniciales
    generateInitialData() {
        // Alertas de ejemplo
        this.alerts = [
            {
                id: 1,
                type: 'critical',
                title: 'Intento de intrusión detectado',
                source: '192.168.1.100',
                target: 'Servidor Web',
                time: 'Hace 2 minutos',
                location: 'Rusia'
            },
            {
                id: 2,
                type: 'warning',
                title: 'Comportamiento sospechoso de usuario',
                source: 'Usuario: jsmith',
                target: 'Base de datos',
                time: 'Hace 5 minutos',
                location: 'Interno'
            },
            {
                id: 3,
                type: 'critical',
                title: 'Ataque DDoS detectado',
                source: 'Múltiples IPs',
                target: 'Firewall principal',
                time: 'Hace 8 minutos',
                location: 'China'
            },
            {
                id: 4,
                type: 'info',
                title: 'Actualización de seguridad disponible',
                source: 'Sistema',
                target: 'Todos los equipos',
                time: 'Hace 15 minutos',
                location: 'Interno'
            }
        ];

        this.displayAlerts();
    }

    // Mostrar alertas en la interfaz
    displayAlerts() {
        const alertsList = document.getElementById('alertsList');
        alertsList.innerHTML = '';

        this.alerts.forEach(alert => {
            const alertElement = document.createElement('div');
            alertElement.className = `alert-item ${alert.type}`;
            alertElement.innerHTML = `
                <div class="alert-header">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
                <div class="alert-details">
                    Origen: ${alert.source} | Objetivo: ${alert.target}
                    ${alert.location ? ` | Ubicación: ${alert.location}` : ''}
                </div>
            `;
            alertsList.appendChild(alertElement);
        });
    }

    // Crear mapa de amenazas
    createThreatMap() {
        const worldMap = document.getElementById('worldMap');
        const regions = [
            { name: 'north-america', x: 25, y: 30, count: 45 },
            { name: 'south-america', x: 30, y: 60, count: 39 },
            { name: 'europe', x: 50, y: 30, count: 67 },
            { name: 'asia', x: 75, y: 35, count: 92 },
            { name: 'africa', x: 55, y: 50, count: 28 },
            { name: 'australia', x: 85, y: 65, count: 15 }
        ];

        regions.forEach(region => {
            for (let i = 0; i < Math.min(region.count, 15); i++) {
                const threat = document.createElement('div');
                threat.className = 'threat-point';
                threat.style.left = `${region.x + Math.random() * 10}%`;
                threat.style.top = `${region.y + Math.random() * 15}%`;
                threat.style.animationDelay = `${Math.random() * 2}s`;
                worldMap.appendChild(threat);
            }
        });
    }

    // Inicializar gráficos
    initializeCharts() {
        const ctx = document.getElementById('networkChart').getContext('2d');
        
        // Datos de ejemplo para el gráfico
        const labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
        const attackData = [12, 19, 8, 25, 18, 22, 15];
        const normalData = [45, 52, 48, 60, 55, 58, 50];

        this.networkChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Tráfico Normal',
                        data: normalData,
                        borderColor: '#00ffff',
                        backgroundColor: 'rgba(0, 255, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Intentos de Ataque',
                        data: attackData,
                        borderColor: '#ff0000',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#cccccc'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#cccccc'
                        }
                    }
                }
            }
        });
    }

    // Actualizaciones en tiempo real
    startRealtimeUpdates() {
        // Simular nuevas alertas
        setInterval(() => {
            this.simulateNewAlert();
        }, 15000);

        // Actualizar métricas
        setInterval(() => {
            this.updateMetrics();
        }, 5000);

        // Actualizar uptime
        setInterval(() => {
            this.updateUptime();
        }, 1000);
    }

    // Simular nueva alerta
    simulateNewAlert() {
        const alertTypes = [
            { type: 'warning', title: 'Intento de acceso no autorizado' },
            { type: 'info', title: 'Actualización de reglas de firewall' },
            { type: 'critical', title: 'Detección de malware' },
            { type: 'warning', title: 'Comportamiento anómalo de red' }
        ];

        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const newAlert = {
            id: Date.now(),
            type: randomAlert.type,
            title: randomAlert.title,
            source: this.generateRandomIP(),
            target: ['Servidor Web', 'Base de Datos', 'Firewall', 'VPN'][Math.floor(Math.random() * 4)],
            time: 'Ahora mismo',
            location: ['China', 'Rusia', 'EE.UU.', 'Brasil', 'Alemania'][Math.floor(Math.random() * 5)]
        };

        this.alerts.unshift(newAlert);
        if (this.alerts.length > 10) {
            this.alerts.pop();
        }

        this.displayAlerts();

        // Efecto visual para alertas críticas
        if (newAlert.type === 'critical') {
            window.tronAnimations.triggerCriticalAlert();
            this.metrics.criticalAlerts++;
            this.updateMetricDisplay();
        }
    }

    // Generar IP aleatoria
    generateRandomIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    // Actualizar métricas
    updateMetrics() {
        // Simular cambios en las métricas
        this.metrics.threatsBlocked += Math.floor(Math.random() * 3);
        this.metrics.activeUsers = 40 + Math.floor(Math.random() * 10);
        this.metrics.securityLevel = 95 + Math.floor(Math.random() * 5);

        this.updateMetricDisplay();
    }

    // Actualizar visualización de métricas
    updateMetricDisplay() {
        document.getElementById('criticalAlerts').textContent = this.metrics.criticalAlerts;
        document.getElementById('threatsBlocked').textContent = this.metrics.threatsBlocked;
        document.getElementById('activeUsers').textContent = this.metrics.activeUsers;
        document.getElementById('securityLevel').textContent = `${this.metrics.securityLevel}%`;

        // Animar cambios
        const metricElements = document.querySelectorAll('.metric-value');
        metricElements.forEach(element => {
            window.tronAnimations.animateMetricChange(element);
        });
    }

    // Actualizar tiempo de actividad
    updateUptime() {
        const uptimeElement = document.getElementById('uptime');
        const startTime = new Date(Date.now() - (15 * 24 * 60 * 60 * 1000) - (7 * 60 * 60 * 1000) - (32 * 60 * 1000));
        
        const diff = Date.now() - startTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        uptimeElement.textContent = `Uptime: ${days}d ${hours}h ${minutes}m`;
    }

    // Simular escaneo de red
    simulateNetworkScan() {
        return new Promise((resolve) => {
            // Mostrar indicador de escaneo
            const scanBtn = document.getElementById('scanNetwork');
            const originalText = scanBtn.textContent;
            scanBtn.textContent = '🔍 Escaneando...';
            scanBtn.disabled = true;

            // Simular proceso de escaneo
            setTimeout(() => {
                // Agregar nueva alerta de escaneo
                const scanAlert = {
                    id: Date.now(),
                    type: 'info',
                    title: 'Escaneo de red completado',
                    source: 'Sistema automático',
                    target: 'Toda la red',
                    time: 'Ahora mismo',
                    location: 'Interno'
                };

                this.alerts.unshift(scanAlert);
                if (this.alerts.length > 10) {
                    this.alerts.pop();
                }
                this.displayAlerts();

                // Restaurar botón
                scanBtn.textContent = originalText;
                scanBtn.disabled = false;

                resolve();
            }, 3000);
        });
    }
}

// Inicializar sistema de datos
document.addEventListener('DOMContentLoaded', () => {
    window.cyberData = new CyberData();
});