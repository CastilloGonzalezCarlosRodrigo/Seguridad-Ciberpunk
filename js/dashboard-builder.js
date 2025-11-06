// Sistema de Dashboard Personalizable
class DashboardBuilder {
    constructor() {
        this.widgets = [];
        this.layout = {};
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.loadLayout();
        this.createEditControls();
        this.makeWidgetsDraggable();
    }

    createEditControls() {
        const controls = document.createElement('div');
        controls.className = 'dashboard-controls';
        controls.innerHTML = `
            <button class="edit-toggle" id="toggleEditMode">
                🛠️ Modo Edición
            </button>
            <div class="widget-palette" id="widgetPalette">
                <div class="widget-option" data-widget="threatMap">🗺️ Mapa Amenazas</div>
                <div class="widget-option" data-widget="alerts">🚨 Alertas</div>
                <div class="widget-option" data-widget="metrics">📊 Métricas</div>
                <div class="widget-option" data-widget="defenses">🛡️ Defensas</div>
                <div class="widget-option" data-widget="networkChart">📈 Gráfico Red</div>
                <div class="widget-option" data-widget="quickActions">⚡ Acciones Rápidas</div>
            </div>
            <button class="save-layout" id="saveLayout">
                💾 Guardar Layout
            </button>
            <button class="reset-layout" id="resetLayout">
                🔄 Layout por Defecto
            </button>
        `;

        document.querySelector('.container').prepend(controls);

        // Event listeners
        document.getElementById('toggleEditMode').addEventListener('click', () => {
            this.toggleEditMode();
        });

        document.getElementById('saveLayout').addEventListener('click', () => {
            this.saveLayout();
        });

        document.getElementById('resetLayout').addEventListener('click', () => {
            this.resetLayout();
        });

        // Hacer widgets arrastrables
        this.initDragAndDrop();
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editBtn = document.getElementById('toggleEditMode');
        
        if (this.isEditMode) {
            editBtn.textContent = '✅ Salir Edición';
            this.activateEditMode();
        } else {
            editBtn.textContent = '🛠️ Modo Edición';
            this.deactivateEditMode();
        }
    }

    activateEditMode() {
        // Mostrar paleta de widgets
        document.getElementById('widgetPalette').style.display = 'grid';
        
        // Añadir controles de edición a los widgets
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.add('editable');
            this.addWidgetControls(panel);
        });

        // Hacer todos los paneles arrastrables
        this.makeAllPanelsDraggable();
    }

    deactivateEditMode() {
        // Ocultar paleta
        document.getElementById('widgetPalette').style.display = 'none';
        
        // Remover controles de edición
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('editable');
            this.removeWidgetControls(panel);
        });
    }

    addWidgetControls(panel) {
        const controls = document.createElement('div');
        controls.className = 'widget-controls';
        controls.innerHTML = `
            <button class="move-widget">↔️</button>
            <button class="remove-widget">🗑️</button>
            <button class="resize-widget">⤢</button>
        `;

        panel.appendChild(controls);

        // Event listeners para controles
        controls.querySelector('.remove-widget').addEventListener('click', () => {
            this.removeWidget(panel);
        });

        controls.querySelector('.resize-widget').addEventListener('click', () => {
            this.toggleWidgetSize(panel);
        });
    }

    removeWidgetControls(panel) {
        const controls = panel.querySelector('.widget-controls');
        if (controls) {
            controls.remove();
        }
    }

    makeAllPanelsDraggable() {
        document.querySelectorAll('.panel').forEach(panel => {
            panel.draggable = true;
            
            panel.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', panel.id);
                panel.classList.add('dragging');
            });

            panel.addEventListener('dragend', () => {
                panel.classList.remove('dragging');
            });
        });

        // Áreas de drop
        document.querySelectorAll('.content-column').forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('drop-zone');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drop-zone');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drop-zone');
                
                const widgetId = e.dataTransfer.getData('text/plain');
                const widget = document.getElementById(widgetId);
                
                if (widget && column !== widget.parentElement) {
                    column.appendChild(widget);
                    this.saveLayout();
                }
            });
        });
    }

    removeWidget(panel) {
        if (confirm('¿Eliminar este widget?')) {
            panel.remove();
            this.saveLayout();
        }
    }

    toggleWidgetSize(panel) {
        panel.classList.toggle('expanded');
        this.saveLayout();
    }

    saveLayout() {
        const layout = {
            columns: []
        };

        document.querySelectorAll('.content-column').forEach((column, colIndex) => {
            const columnWidgets = [];
            
            column.querySelectorAll('.panel').forEach(panel => {
                columnWidgets.push({
                    id: panel.id,
                    type: panel.dataset.widgetType,
                    expanded: panel.classList.contains('expanded')
                });
            });

            layout.columns[colIndex] = columnWidgets;
        });

        localStorage.setItem('tron-dashboard-layout', JSON.stringify(layout));
        this.showNotification('Layout guardado');
    }

    loadLayout() {
        const savedLayout = localStorage.getItem('tron-dashboard-layout');
        
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            this.applyLayout(layout);
        }
    }

    applyLayout(layout) {
        const columns = document.querySelectorAll('.content-column');
        
        layout.columns.forEach((columnWidgets, colIndex) => {
            if (columns[colIndex]) {
                columns[colIndex].innerHTML = '';
                
                columnWidgets.forEach(widgetConfig => {
                    const widget = this.createWidget(widgetConfig.type, widgetConfig.id);
                    if (widgetConfig.expanded) {
                        widget.classList.add('expanded');
                    }
                    columns[colIndex].appendChild(widget);
                });
            }
        });
    }

    resetLayout() {
        if (confirm('¿Restablecer layout por defecto?')) {
            localStorage.removeItem('tron-dashboard-layout');
            location.reload();
        }
    }

    createWidget(type, id) {
        // Crear widget basado en tipo
        const widget = document.createElement('div');
        widget.className = 'panel';
        widget.id = id;
        widget.dataset.widgetType = type;

        // Contenido específico del widget
        switch(type) {
            case 'threatMap':
                widget.innerHTML = this.getThreatMapContent();
                break;
            case 'alerts':
                widget.innerHTML = this.getAlertsContent();
                break;
            // ... otros widgets
        }

        return widget;
    }

    getThreatMapContent() {
        return `
            <div class="panel-header">
                <h3>🗺️ Mapa de Amenazas</h3>
            </div>
            <div class="panel-content">
                <div class="world-map" id="worldMap"></div>
            </div>
        `;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'layout-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}