// Sistema de Atajos de Teclado Personalizables
class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            'F1': { action: 'showHelp', description: 'Mostrar ayuda' },
            'F2': { action: 'scanNetwork', description: 'Escanear red' },
            'F3': { action: 'toggleTheme', description: 'Cambiar tema' },
            'F4': { action: 'toggleViewMode', description: 'Cambiar modo vista' },
            'F5': { action: 'refreshData', description: 'Actualizar datos' },
            'F6': { action: 'toggleEditMode', description: 'Modo edición dashboard' },
            'F7': { action: 'toggleAudio', description: 'Activar/desactivar audio' },
            'F8': { action: 'quickSave', description: 'Guardar layout' },
            'F9': { action: 'showMetrics', description: 'Mostrar métricas detalladas' },
            'F10': { action: 'toggleFullscreen', description: 'Pantalla completa' },
            'F11': { action: 'emergencyLockdown', description: 'Bloqueo de emergencia' },
            'Escape': { action: 'cancelAction', description: 'Cancelar acción actual' },
            'Ctrl+S': { action: 'saveReport', description: 'Guardar reporte' },
            'Ctrl+P': { action: 'printDashboard', description: 'Imprimir dashboard' },
            'Ctrl+E': { action: 'exportData', description: 'Exportar datos' }
        };
        
        this.customShortcuts = {};
        this.init();
    }

    init() {
        this.loadCustomShortcuts();
        this.setupEventListeners();
        this.createShortcutHelper();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const shortcut = this.getShortcutString(e);
            
            if (this.shortcuts[shortcut] || this.customShortcuts[shortcut]) {
                e.preventDefault();
                this.executeShortcut(shortcut);
            }
        });
    }

    getShortcutString(event) {
        let shortcut = '';
        
        if (event.ctrlKey) shortcut += 'Ctrl+';
        if (event.altKey) shortcut += 'Alt+';
        if (event.shiftKey) shortcut += 'Shift+';
        
        // Manejar teclas especiales
        if (event.key.startsWith('F') && event.key.length > 1) {
            shortcut += event.key;
        } else if (event.key === 'Escape') {
            shortcut += 'Escape';
        } else {
            shortcut += event.key.toUpperCase();
        }
        
        return shortcut;
    }

    executeShortcut(shortcut) {
        const action = this.shortcuts[shortcut] || this.customShortcuts[shortcut];
        
        if (action) {
            this[action.action]();
            this.showShortcutFeedback(shortcut, action.description);
        }
    }

    // Acciones de los shortcuts
    showHelp() {
        this.displayHelpModal();
    }

    scanNetwork() {
        if (window.cyberData) {
            window.cyberData.simulateNetworkScan();
        }
    }

    toggleTheme() {
        if (window.tronApp) {
            window.tronApp.toggleTheme();
        }
    }

    toggleViewMode() {
        if (window.viewModes) {
            const modes = ['operator', 'executive', 'technical'];
            const currentIndex = modes.indexOf(window.viewModes.currentMode);
            const nextMode = modes[(currentIndex + 1) % modes.length];
            window.viewModes.switchMode(nextMode);
        }
    }

    refreshData() {
        if (window.cyberData) {
            window.cyberData.updateMetrics();
        }
    }

    toggleEditMode() {
        if (window.dashboardBuilder) {
            window.dashboardBuilder.toggleEditMode();
        }
    }

    toggleAudio() {
        if (window.tronAnimations) {
            window.tronAnimations.toggleAudio();
        }
    }

    quickSave() {
        if (window.dashboardBuilder) {
            window.dashboardBuilder.saveLayout();
        }
    }

    showMetrics() {
        // Mostrar panel de métricas detalladas
        document.querySelectorAll('.metric-card').forEach(card => {
            card.classList.toggle('expanded-view');
        });
    }

    toggleFullscreen() {
        if (window.tronApp) {
            window.tronApp.toggleFullscreen();
        }
    }

    emergencyLockdown() {
        if (confirm('¿Ejecutar protocolo de bloqueo de emergencia?')) {
            // Simular bloqueo completo
            document.body.classList.add('lockdown-mode');
            setTimeout(() => {
                document.body.classList.remove('lockdown-mode');
            }, 5000);
        }
    }

    cancelAction() {
        // Cancelar cualquier acción en progreso
        console.log('Acción cancelada');
    }

    saveReport() {
        if (window.tronApp) {
            window.tronApp.generateReport();
        }
    }

    printDashboard() {
        window.print();
    }

    exportData() {
        // Exportar datos actuales
        const data = {
            metrics: window.cyberData?.metrics,
            alerts: window.cyberData?.alerts,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tron-export-${new Date().getTime()}.json`;
        a.click();
    }

    displayHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'shortcuts-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎮 Atajos de Teclado</h3>
                <div class="shortcuts-list">
                    ${this.generateShortcutsList()}
                </div>
                <button class="close-modal">Cerrar</button>
                <button class="customize-shortcuts">Personalizar Atajos</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.customize-shortcuts').addEventListener('click', () => {
            this.showCustomizationModal();
        });
    }

    generateShortcutsList() {
        let html = '';
        
        Object.entries(this.shortcuts).forEach(([shortcut, config]) => {
            html += `
                <div class="shortcut-item">
                    <span class="shortcut-key">${shortcut}</span>
                    <span class="shortcut-description">${config.description}</span>
                </div>
            `;
        });

        return html;
    }

    showShortcutFeedback(shortcut, description) {
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.innerHTML = `
            <span class="shortcut">${shortcut}</span>
            <span class="action">${description}</span>
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(feedback)) {
                    feedback.remove();
                }
            }, 1000);
        }, 2000);
    }

    loadCustomShortcuts() {
        const saved = localStorage.getItem('tron-custom-shortcuts');
        if (saved) {
            this.customShortcuts = JSON.parse(saved);
        }
    }

    saveCustomShortcuts() {
        localStorage.setItem('tron-custom-shortcuts', JSON.stringify(this.customShortcuts));
    }

    showCustomizationModal() {
        // Modal para personalizar atajos (implementación básica)
        const modal = document.createElement('div');
        modal.className = 'customization-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Personalizar Atajos</h3>
                <p>Próximamente: Interfaz para personalizar atajos de teclado</p>
                <button class="close-modal">Cerrar</button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
}