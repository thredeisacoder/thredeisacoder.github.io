// ===== LOADING SCREEN MODULE =====

class LoadingScreen {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.loginScreen = document.getElementById('login-screen');
        this.mainContent = document.getElementById('main-content');
        this.progressFill = document.querySelector('.hack-progress-fill');
        this.progressText = document.querySelector('.hack-progress-text');
        this.timestamp = document.getElementById('hack-timestamp');
        
        this.progress = 0;
        this.timestampInterval = null;
        this.progressInterval = null;
    }

    init() {
        this.updateTimestamp();
        this.startTimestampUpdate();
        this.startProgressAnimation();
        this.scheduleTransition();
    }

    updateTimestamp() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        if (this.timestamp) {
            this.timestamp.textContent = timeString;
        }
    }

    startTimestampUpdate() {
        this.timestampInterval = setInterval(() => {
            this.updateTimestamp();
        }, 1000);
    }

    startProgressAnimation() {
        this.progressInterval = setInterval(() => {
            this.progress += Math.random() * 15;
            if (this.progress > 100) this.progress = 100;
            
            if (this.progressText) {
                this.progressText.textContent = `${Math.floor(this.progress)}%`;
            }
            
            if (this.progress >= 100) {
                clearInterval(this.progressInterval);
                if (this.progressText) {
                    this.progressText.textContent = "100%";
                }
            }
        }, 200);
    }

    scheduleTransition() {
        setTimeout(() => {
            this.transitionToLogin();
        }, 7000);
    }

    transitionToLogin() {
        clearInterval(this.timestampInterval);
        
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.display = 'none';
            }
            if (this.loginScreen) {
                this.loginScreen.classList.remove('hidden');
                // Initialize login screen
                if (window.loginScreen) {
                    window.loginScreen.init();
                }
            }
        }, 500);
    }

    cleanup() {
        if (this.timestampInterval) {
            clearInterval(this.timestampInterval);
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
}

// Export for use in other modules
window.LoadingScreen = LoadingScreen; 