// Sistema de Modos de Visualización
class ViewModes {
    constructor() {
        this.currentMode = 'operator';
        this.modes = {
            operator: {
                name: 'Operador',
                description: 'Vista completa para monitoreo continuo',
                settings: {
                    dataDensity: 'high',
                    animationLevel: 'minimal',
                    refreshRate: 1000,
                    showRawData: true,
                    showCharts: true,
                    showAlerts: true,
                    showMetrics: true
                }
            },
            executive: {
                name: 'Ejecutivo',
                description: 'Vista simplificada con KPIs clave',
                settings: {
                    dataDensity: 'low',
                    animationLevel: 'moderate',
                    refreshRate: 30000,
                    showRawData: false,
                    showCharts: true,
                    showAlerts: false,
                    showMetrics: true
                }
            },
            technical: {
                name: 'Técnico',
                description: 'Vista detallada para análisis profundo',
                settings: {
                    dataDensity: 'maximum',
                    animationLevel: 'full',
                    refreshRate: 500,
                    showRawData: true,
                    showCharts: true,
                    showAlerts: true,
                    showMetrics: true
                }
            }
        };
        this.init();
    }

    init() {
        this.createModeSelector();
        this.applyMode(this.currentMode);
    }

    createModeSelector() {
        const selector = document.createElement('div');
        selector.className = 'view-mode-selector';
        selector.innerHTML = `
            <div class="mode-toggle">
                <button class="mode-btn active" data-mode="operator">👨‍💼 Operador</button>
                <button class="mode-btn" data-mode="executive">👔 Ejecutivo</button>
                <button class="mode-btn" data-mode="technical">🔧 Técnico</button>
            </div>
        `;

        // Insertar después del título
        const header = document.querySelector('.dashboard-header');
        header.appendChild(selector);

        // Event listeners
        selector.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });
    }

    switchMode(mode) {
        if (this.modes[mode]) {
            this.currentMode = mode;
            this.applyMode(mode);
            this.updateActiveButton(mode);
            this.showModeNotification(mode);
        }
    }

    applyMode(mode) {
        const settings = this.modes[mode].settings;
        
        // Aplicar configuración de densidad de datos
        this.adjustDataDensity(settings.dataDensity);
        
        // Aplicar nivel de animaciones
        this.adjustAnimations(settings.animationLevel);
        
        // Aplicar tasa de actualización
        this.adjustRefreshRate(settings.refreshRate);
        
        // Mostrar/ocultar elementos según el modo
        this.toggleUIElements(settings);
    }

    adjustDataDensity(density) {
        const dataElements = document.querySelectorAll('.data-intensive');
        dataElements.forEach(el => {
            switch(density) {
                case 'high':
                    el.style.display = 'block';
                    break;
                case 'low':
                    el.style.display = 'none';
                    break;
                case 'maximum':
                    el.style.display = 'block';
                    el.classList.add('expanded-view');
                    break;
            }
        });
    }

    adjustAnimations(level) {
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(el => {
            switch(level) {
                case 'minimal':
                    el.style.animationDuration = '0.5s';
                    break;
                case 'moderate':
                    el.style.animationDuration = '1s';
                    break;
                case 'full':
                    el.style.animationDuration = '2s';
                    break;
            }
        });
    }

    adjustRefreshRate(rate) {
        // Actualizar intervalos de actualización de datos
        if (window.cyberData && window.cyberData.updateIntervals) {
            Object.keys(window.cyberData.updateIntervals).forEach(key => {
                clearInterval(window.cyberData.updateIntervals[key]);
                window.cyberData.updateIntervals[key] = setInterval(
                    window.cyberData.updateFunctions[key],
                    rate
                );
            });
        }
    }

    toggleUIElements(settings) {
        // Mostrar/ocultar elementos basado en la configuración
        const elements = {
            rawData: document.querySelectorAll('.raw-data, .log-viewer'),
            charts: document.querySelectorAll('.chart-container, .graph-panel'),
            alerts: document.querySelectorAll('.alerts-panel, .notifications'),
            metrics: document.querySelectorAll('.metrics-panel, .kpi-cards')
        };

        Object.keys(elements).forEach(key => {
            const display = settings[key] ? 'block' : 'none';
            elements[key].forEach(el => {
                el.style.display = display;
            });
        });
    }

    updateActiveButton(activeMode) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === activeMode);
        });
    }

    showModeNotification(mode) {
        const notification = document.createElement('div');
        notification.className = 'mode-notification';
        notification.innerHTML = `
            <span>Modo ${this.modes[mode].name} activado</span>
            <small>${this.modes[mode].description}</small>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 1000);
        }, 3000);
    }

    // Detección automática de modo basado en hora/contexto
    autoDetectMode() {
        const hour = new Date().getHours();
        const isBusinessHours = hour >= 9 && hour <= 17;
        
        if (isBusinessHours) {
            return 'operator';
        } else {
            return 'technical'; // Menos animaciones durante la noche
        }
    }
}