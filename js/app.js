// Aplicación Principal TRON Cyber Dashboard
class TronApp {
    constructor() {
        this.currentTheme = 'default';
        this.isFullscreen = false;
        
        // Nuevas inicializaciones para Nivel 1
        this.viewModes = null;
        this.dashboardBuilder = null;
        this.keyboardShortcuts = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeControls();
        this.startSystem();
        
        // Inicializar nuevas características del Nivel 1
        this.initializeLevel1Features();
    }

    // Configurar event listeners
    setupEventListeners() {
        // Toggle de audio
        document.getElementById('audioToggle').addEventListener('click', () => {
            this.toggleAudio();
        });

        // Toggle de tema
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Pantalla completa
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Botones de control
        document.getElementById('scanNetwork').addEventListener('click', () => {
            this.scanNetwork();
        });

        document.getElementById('blockThreats').addEventListener('click', () => {
            this.blockThreats();
        });

        document.getElementById('generateReport').addEventListener('click', () => {
            this.generateReport();
        });

        document.getElementById('backupSystem').addEventListener('click', () => {
            this.backupSystem();
        });

        // Filtros de tiempo
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.changeTimeFilter(e.target.textContent);
            });
        });

        // Controles de panel
        document.querySelectorAll('.panel-control').forEach(control => {
            control.addEventListener('click', (e) => {
                this.handlePanelControl(e.target);
            });
        });

        // Teclado shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    // Inicializar controles
    initializeControls() {
        console.log('🚀 TRON Cyber Dashboard inicializado');
        console.log('🎮 Controles disponibles:');
        console.log('   - F1: Mostrar ayuda');
        console.log('   - F2: Escanear red');
        console.log('   - F3: Cambiar tema');
        console.log('   - F4: Cambiar modo vista');
        console.log('   - F5: Actualizar datos');
        console.log('   - F6: Modo edición dashboard');
        console.log('   - F7: Activar/desactivar audio');
        console.log('   - F11: Pantalla completa');
        console.log('   - ESC: Salir de pantalla completa');
    }

    // Iniciar sistema
    startSystem() {
        this.showSystemMessage('Sistema TRON inicializado - Monitoreo activo');
        
        // Simular inicio del sistema
        setTimeout(() => {
            this.showSystemMessage('Todos los módulos de seguridad cargados');
        }, 2000);
    }

    // ==================== NUEVAS FUNCIONALIDADES NIVEL 1 ====================

    // Inicializar características del Nivel 1
    initializeLevel1Features() {
        // Sistema de Temas
        this.initializeThemeSystem();
        
        // Modos de Visualización
        this.initializeViewModes();
        
        // Dashboard Personalizable
        this.initializeDashboardBuilder();
        
        // Atajos de Teclado Avanzados
        this.initializeKeyboardShortcuts();
        
        // Responsive Avanzado
        this.setupAdvancedResponsive();
    }

    // Sistema de Temas Mejorado
    initializeThemeSystem() {
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('tron-theme') || 'default';
        this.applyTheme(savedTheme);
        this.createThemeSelector();
    }

    createThemeSelector() {
        const selector = document.createElement('div');
        selector.className = 'theme-selector';
        selector.innerHTML = `
            <div class="theme-options">
                <div class="theme-option active" data-theme="default" title="TRON Classic"></div>
                <div class="theme-option" data-theme="matrix" title="Matrix Green"></div>
                <div class="theme-option" data-theme="cyberpunk" title="Cyberpunk Pink"></div>
                <div class="theme-option" data-theme="monochrome" title="Monochrome"></div>
                <div class="theme-option" data-theme="solarized" title="Solarized"></div>
                <div class="theme-option" data-theme="light" title="Light Mode"></div>
            </div>
        `;

        document.body.appendChild(selector);

        selector.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.applyTheme(theme);
                
                // Actualizar estado activo
                selector.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.classList.add('active');
                
                this.showSystemMessage(`Tema cambiado a: ${theme}`);
            });
        });
    }

    // Modos de Visualización
    initializeViewModes() {
        // Crear instancia de ViewModes si existe
        if (typeof ViewModes !== 'undefined') {
            this.viewModes = new ViewModes();
        } else {
            console.warn('ViewModes no está disponible');
        }
    }

    // Dashboard Personalizable
    initializeDashboardBuilder() {
        // Crear instancia de DashboardBuilder si existe
        if (typeof DashboardBuilder !== 'undefined') {
            this.dashboardBuilder = new DashboardBuilder();
        } else {
            console.warn('DashboardBuilder no está disponible');
        }
    }

    // Atajos de Teclado Avanzados
    initializeKeyboardShortcuts() {
        // Crear instancia de KeyboardShortcuts si existe
        if (typeof KeyboardShortcuts !== 'undefined') {
            this.keyboardShortcuts = new KeyboardShortcuts();
        } else {
            console.warn('KeyboardShortcuts no está disponible');
        }
    }

    // Responsive Avanzado
    setupAdvancedResponsive() {
        // Detectar cambios de orientación
        window.addEventListener('orientationchange', () => {
            this.handleOrientationChange();
        });

        // Detectar cambios de tamaño
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Detectar modo de reducción de movimiento
        this.setupReducedMotion();
    }

    handleOrientationChange() {
        const isPortrait = window.innerHeight > window.innerWidth;
        this.showSystemMessage(
            isPortrait ? 'Modo Retrato activado' : 'Modo Paisaje activado'
        );
    }

    handleResize() {
        // Ajustar layout basado en tamaño de pantalla
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    setupReducedMotion() {
        // Respetar preferencias de reducción de movimiento
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
        }

        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        });
    }

    // ==================== FUNCIONES EXISTENTES ACTUALIZADAS ====================

    // Toggle audio
    toggleAudio() {
        const audioBtn = document.getElementById('audioToggle');
        
        if (window.tronAnimations && window.tronAnimations.audioEnabled) {
            window.tronAnimations.stopAudio();
            audioBtn.textContent = '🔇 Audio';
            this.showSystemMessage('Audio desactivado');
        } else if (window.tronAnimations) {
            window.tronAnimations.startAudio();
            audioBtn.textContent = '🔊 Audio';
            this.showSystemMessage('Audio activado - Modo vigilancia');
        } else {
            this.showSystemMessage('Sistema de audio no disponible');
        }
    }

    // Toggle tema - ACTUALIZADA
    toggleTheme() {
        const themes = ['default', 'matrix', 'cyberpunk', 'monochrome', 'solarized', 'light'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.currentTheme = themes[nextIndex];
        
        this.applyTheme(this.currentTheme);
        this.showSystemMessage(`Tema cambiado a: ${this.currentTheme.toUpperCase()}`);
        
        // Actualizar selector visual si existe
        const selector = document.querySelector('.theme-selector');
        if (selector) {
            selector.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('active');
                if (opt.dataset.theme === this.currentTheme) {
                    opt.classList.add('active');
                }
            });
        }
    }

    // Aplicar tema - ACTUALIZADA
    applyTheme(theme) {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('tron-theme', theme);
        this.currentTheme = theme;
    }

    // Pantalla completa
    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            this.isFullscreen = true;
            document.getElementById('fullscreenBtn').textContent = '⛶ Salir Pantalla';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
            document.getElementById('fullscreenBtn').textContent = '⛶ Pantalla Completa';
        }
    }

    // Escanear red
    async scanNetwork() {
        this.showSystemMessage('Iniciando escaneo de red...');
        if (window.cyberData) {
            await window.cyberData.simulateNetworkScan();
            this.showSystemMessage('Escaneo de red completado');
        } else {
            this.showSystemMessage('Error: Sistema de datos no disponible');
        }
    }

    // Bloquear amenazas
    blockThreats() {
        this.showSystemMessage('Ejecutando protocolo de bloqueo...');
        
        // Simular bloqueo
        setTimeout(() => {
            if (window.cyberData) {
                window.cyberData.metrics.threatsBlocked += 5;
                window.cyberData.metrics.criticalAlerts = Math.max(0, window.cyberData.metrics.criticalAlerts - 1);
                window.cyberData.updateMetricDisplay();
                this.showSystemMessage('Amenazas bloqueadas - Sistema seguro');
            } else {
                this.showSystemMessage('Error: Sistema de datos no disponible');
            }
        }, 2000);
    }

    // Generar reporte
    generateReport() {
        this.showSystemMessage('Generando reporte de seguridad...');
        
        setTimeout(() => {
            if (window.cyberData) {
                const reportData = {
                    timestamp: new Date().toISOString(),
                    metrics: window.cyberData.metrics,
                    recentAlerts: window.cyberData.alerts.slice(0, 5),
                    systemStatus: 'OPTIMO',
                    currentTheme: this.currentTheme,
                    viewMode: this.viewModes ? this.viewModes.currentMode : 'operator'
                };
                
                console.log('📊 Reporte de Seguridad:', reportData);
                this.showSystemMessage('Reporte generado - Ver consola para detalles');
            } else {
                this.showSystemMessage('Error: Sistema de datos no disponible');
            }
        }, 1500);
    }

    // Backup del sistema
    backupSystem() {
        this.showSystemMessage('Iniciando backup del sistema...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            this.showSystemMessage(`Backup en progreso: ${progress}%`);
            
            if (progress >= 100) {
                clearInterval(interval);
                this.showSystemMessage('Backup completado exitosamente');
            }
        }, 500);
    }

    // Cambiar filtro de tiempo
    changeTimeFilter(filter) {
        this.showSystemMessage(`Filtro de tiempo cambiado a: ${filter}`);
        // Aquí se actualizaría el gráfico con datos del período seleccionado
    }

    // Manejar controles de panel
    handlePanelControl(control) {
        const panel = control.closest('.panel');
        const panelType = panel.querySelector('h3').textContent;
        
        if (control.textContent === '⟳') {
            this.showSystemMessage(`Actualizando: ${panelType}`);
            // Lógica de actualización específica del panel
        } else if (control.textContent === '⏸️') {
            if (control.textContent === '⏸️') {
                control.textContent = '▶️';
                this.showSystemMessage(`Pausado: ${panelType}`);
            } else {
                control.textContent = '⏸️';
                this.showSystemMessage(`Reanudado: ${panelType}`);
            }
        }
    }

    // Manejar shortcuts de teclado - ACTUALIZADA
    handleKeyboardShortcuts(event) {
        // Si existe el sistema de atajos avanzados, delegar a él
        if (this.keyboardShortcuts) {
            return; // El sistema avanzado manejará los atajos
        }
        
        // Manejo básico de atajos (compatibilidad hacia atrás)
        switch(event.key) {
            case 'F1':
                event.preventDefault();
                this.showHelp();
                break;
            case 'F2':
                event.preventDefault();
                this.scanNetwork();
                break;
            case 'F3':
                event.preventDefault();
                this.toggleTheme();
                break;
            case 'F4':
                event.preventDefault();
                this.toggleViewMode();
                break;
            case 'F5':
                event.preventDefault();
                if (window.cyberData) {
                    window.cyberData.updateMetrics();
                    this.showSystemMessage('Datos actualizados manualmente');
                }
                break;
            case 'F6':
                event.preventDefault();
                this.toggleEditMode();
                break;
            case 'F7':
                event.preventDefault();
                this.toggleAudio();
                break;
            case 'F11':
                event.preventDefault();
                this.toggleFullscreen();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                }
                break;
        }
    }

    // ==================== NUEVAS FUNCIONES DE CORTAFUEGOS ====================

    // Cambiar modo de vista (para atajo F4)
    toggleViewMode() {
        if (this.viewModes) {
            const modes = ['operator', 'executive', 'technical'];
            const currentIndex = modes.indexOf(this.viewModes.currentMode);
            const nextMode = modes[(currentIndex + 1) % modes.length];
            this.viewModes.switchMode(nextMode);
        } else {
            this.showSystemMessage('Sistema de modos de vista no disponible');
        }
    }

    // Activar/desactivar modo edición (para atajo F6)
    toggleEditMode() {
        if (this.dashboardBuilder) {
            this.dashboardBuilder.toggleEditMode();
        } else {
            this.showSystemMessage('Sistema de edición de dashboard no disponible');
        }
    }

    // Mostrar ayuda - ACTUALIZADA
    showHelp() {
        const helpMessage = `
🎮 TRON CYBER DASHBOARD - CONTROLES

Teclado:
• F1: Mostrar esta ayuda
• F2: Escanear red
• F3: Cambiar tema
• F4: Cambiar modo vista (Operador/Ejecutivo/Técnico)
• F5: Actualizar datos
• F6: Modo edición dashboard
• F7: Activar/desactivar audio
• F8: Guardar layout
• F9: Mostrar métricas detalladas
• F10: Pantalla completa
• F11: Bloqueo de emergencia
• ESC: Salir de pantalla completa
• Ctrl+S: Guardar reporte
• Ctrl+P: Imprimir dashboard
• Ctrl+E: Exportar datos

Funciones:
• Monitoreo en tiempo real de amenazas
• Visualización geográfica de ataques
• Alertas automáticas del sistema
• Controles de seguridad rápidos
• Reportes automáticos
• Dashboard personalizable
• Múltiples temas visuales
• Modos de visualización adaptables

Estado del sistema: OPERATIVO
Tema actual: ${this.currentTheme.toUpperCase()}
Modo vista: ${this.viewModes ? this.viewModes.currentMode : 'operator'}
        `;
        console.log(helpMessage);
        this.showSystemMessage('Ayuda mostrada - Ver consola para detalles');
    }

    // Mostrar mensaje del sistema - ACTUALIZADA
    showSystemMessage(message) {
        console.log(`[TRON] ${message}`);
        
        // Sistema de notificaciones en UI mejorado
        const notification = document.createElement('div');
        notification.className = 'system-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⚠️</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        // Aplicar estilos dinámicamente
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 255, 0.95);
            color: #000;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-family: 'Courier New', monospace;
            border: 2px solid #00ffff;
            box-shadow: 0 0 25px #00ffff;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(notification);
        
        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    // ==================== FUNCIONES DE UTILIDAD ====================

    // Obtener estado del sistema
    getSystemStatus() {
        return {
            theme: this.currentTheme,
            fullscreen: this.isFullscreen,
            audio: window.tronAnimations ? window.tronAnimations.audioEnabled : false,
            viewMode: this.viewModes ? this.viewModes.currentMode : 'operator',
            editMode: this.dashboardBuilder ? this.dashboardBuilder.isEditMode : false,
            timestamp: new Date().toISOString()
        };
    }

    // Exportar configuración
    exportConfiguration() {
        const config = {
            theme: this.currentTheme,
            layout: this.dashboardBuilder ? this.dashboardBuilder.getLayout() : null,
            shortcuts: this.keyboardShortcuts ? this.keyboardShortcuts.getShortcuts() : null,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tron-config-${new Date().getTime()}.json`;
        a.click();
        
        this.showSystemMessage('Configuración exportada');
    }

    // Reset del sistema
    resetSystem() {
        if (confirm('¿Restablecer toda la configuración del sistema?')) {
            localStorage.clear();
            this.showSystemMessage('Configuración reiniciada - Recargando...');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.tronApp = new TronApp();
});

// Manejar cambios de visibilidad de página
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('🔄 TRON Dashboard reactivado');
        if (window.tronApp) {
            window.tronApp.showSystemMessage('Sistema reactivado');
        }
    }
});

// Manejar errores globales
window.addEventListener('error', (event) => {
    console.error('Error en TRON Dashboard:', event.error);
    if (window.tronApp) {
        window.tronApp.showSystemMessage('Error del sistema - Ver consola');
    }
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TronApp;
}