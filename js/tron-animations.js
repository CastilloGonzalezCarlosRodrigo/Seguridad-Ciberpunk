// Sistema de Animaciones TRON
class TronAnimations {
    constructor() {
        this.audioEnabled = false;
        this.audioContext = null;
        this.oscillator = null;
        this.isCriticalMode = false;
        this.init();
    }

    init() {
        this.createLightBeams();
        this.createEnergyPulses();
        this.createParticles();
        this.trackLightCycle();
        this.startScanLine();
        this.updateDateTime();
    }

    // Crear rayos de luz
    createLightBeams() {
        const container = document.querySelector('.tron-bg');
        for (let i = 0; i < 6; i++) {
            const beam = document.createElement('div');
            beam.className = 'light-beam';
            beam.style.left = `${Math.random() * 100}%`;
            beam.style.transform = `rotate(${Math.random() * 360}deg)`;
            beam.style.animation = `pulse ${2 + Math.random() * 3}s infinite alternate`;
            container.appendChild(beam);
        }
    }

    // Crear pulsos de energía
    createEnergyPulses() {
        const energyPulse = document.getElementById('energyPulse');
        
        setInterval(() => {
            const pulseRing = document.createElement('div');
            pulseRing.className = 'pulse-ring';
            pulseRing.style.animationDelay = `${Math.random() * 2}s`;
            energyPulse.appendChild(pulseRing);
            
            setTimeout(() => {
                if (energyPulse.contains(pulseRing)) {
                    energyPulse.removeChild(pulseRing);
                }
            }, 4000);
        }, 2000);
    }

    // Crear partículas
    createParticles() {
        const particlesContainer = document.getElementById('particlesContainer');
        
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // Rastrear ciclo de luz
    trackLightCycle() {
        const lightCycle = document.getElementById('lightCycle');
        const lightTrail = document.getElementById('lightTrail');
        
        setInterval(() => {
            const rect = lightCycle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            this.createTrailDot(lightTrail, x, y);
        }, 100);
    }

    // Crear punto en el rastro
    createTrailDot(container, x, y) {
        const trailDot = document.createElement('div');
        trailDot.style.position = 'absolute';
        trailDot.style.left = `${x}px`;
        trailDot.style.top = `${y}px`;
        trailDot.style.width = '8px';
        trailDot.style.height = '8px';
        trailDot.style.backgroundColor = 'var(--primary-color)';
        trailDot.style.borderRadius = '50%';
        trailDot.style.boxShadow = '0 0 8px var(--primary-color)';
        trailDot.style.opacity = '0.7';
        trailDot.style.zIndex = '4';
        trailDot.style.transition = 'opacity 1.5s ease';
        
        container.appendChild(trailDot);
        
        // Desvanecer y eliminar
        setTimeout(() => {
            trailDot.style.opacity = '0';
        }, 500);
        
        setTimeout(() => {
            if (container.contains(trailDot)) {
                container.removeChild(trailDot);
            }
        }, 2000);
    }

    // Línea de escaneo
    startScanLine() {
        const scanLine = document.getElementById('scanLine');
        setInterval(() => {
            scanLine.style.animation = 'none';
            setTimeout(() => {
                scanLine.style.animation = 'scan 4s linear infinite';
            }, 10);
        }, 4000);
    }

    // Actualizar fecha y hora
    updateDateTime() {
        const timeElement = document.getElementById('currentTime');
        
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Efecto de alerta crítica
    triggerCriticalAlert() {
        this.isCriticalMode = true;
        document.body.classList.add('critical-mode');
        
        // Efecto de parpadeo
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            document.body.classList.toggle('critical-blink');
            blinkCount++;
            
            if (blinkCount >= 6) {
                clearInterval(blinkInterval);
                document.body.classList.remove('critical-blink');
                setTimeout(() => {
                    document.body.classList.remove('critical-mode');
                    this.isCriticalMode = false;
                }, 5000);
            }
        }, 500);
    }

    // Sistema de audio
    toggleAudio() {
        if (!this.audioEnabled) {
            this.startAudio();
        } else {
            this.stopAudio();
        }
    }

    startAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            this.oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            this.oscillator.type = 'sine';
            this.oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            
            this.oscillator.start();
            this.audioEnabled = true;
            
            // Cambios aleatorios de frecuencia para efecto TRON
            this.audioInterval = setInterval(() => {
                if (this.audioEnabled) {
                    const freq = 180 + Math.random() * 100;
                    this.oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                }
            }, 300);
            
        } catch (error) {
            console.warn('Audio no soportado:', error);
        }
    }

    stopAudio() {
        if (this.oscillator) {
            this.oscillator.stop();
            clearInterval(this.audioInterval);
        }
        this.audioEnabled = false;
    }

    // Efecto visual para métricas
    animateMetricChange(element, newValue) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.tronAnimations = new TronAnimations();
});