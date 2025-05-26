// ===== MAIN MODULE - INITIALIZATION & COORDINATION =====

class Main {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            // Initialize all modules
            this.initializeModules();
            
            // Set up global event listeners
            this.setupGlobalEvents();
            
            // Start the application sequence
            this.startApplicationSequence();
            
            this.isInitialized = true;
            console.log('Portfolio application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    initializeModules() {
        // Initialize all modules
        this.modules.loadingScreen = new LoadingScreen();
        this.modules.loginScreen = new LoginScreen();
        this.modules.terminal = new Terminal();
        this.modules.visualEffects = new VisualEffects();
        this.modules.commands = new Commands();
        this.modules.dynamicPanels = new DynamicPanels();
        
        // Virtual filesystem will be initialized on demand when 'play' command is used

        // Make modules globally available
        window.loadingScreen = this.modules.loadingScreen;
        window.loginScreen = this.modules.loginScreen;
        window.terminal = this.modules.terminal;
        window.visualEffects = this.modules.visualEffects;
        window.commands = this.modules.commands;
        window.dynamicPanels = this.modules.dynamicPanels;

        // Set current user for terminal
        window.currentUser = 'hacker';
    }

    setupGlobalEvents() {
        // Prevent right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });

        // Handle before unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    startApplicationSequence() {
        // Start with loading screen
        if (this.modules.loadingScreen) {
            this.modules.loadingScreen.init();
        }
    }

    handleGlobalKeyboard(event) {
        // Global keyboard shortcuts
        if (event.ctrlKey) {
            switch (event.key) {
                case 'l':
                    event.preventDefault();
                    if (window.terminal) {
                        window.terminal.clearTerminal();
                    }
                    break;
                case 'r':
                    event.preventDefault();
                    // Refresh panels
                    if (window.dynamicPanels) {
                        window.dynamicPanels.refreshAllPanels();
                    }
                    break;
            }
        }

        // Emergency escape key
        if (event.key === 'Escape') {
            this.handleEscape();
        }
    }

    handleEscape() {
        // Stop all visual effects
        if (window.visualEffects) {
            window.visualEffects.cleanup();
        }
        
        // Focus terminal input if available
        if (window.terminal) {
            window.terminal.focus();
        }
    }

    handleResize() {
        // Handle responsive layout adjustments
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        document.documentElement.style.setProperty('--is-mobile', isMobile ? '1' : '0');
        document.documentElement.style.setProperty('--is-tablet', isTablet ? '1' : '0');
    }

    pauseAnimations() {
        // Pause resource-intensive animations when tab is hidden
        document.body.classList.add('paused');
    }

    resumeAnimations() {
        // Resume animations when tab becomes visible
        document.body.classList.remove('paused');
    }

    // Module communication methods
    getModule(name) {
        return this.modules[name];
    }

    broadcastMessage(message, data = {}) {
        // Broadcast messages between modules
        Object.values(this.modules).forEach(module => {
            if (module.handleMessage) {
                module.handleMessage(message, data);
            }
        });
    }

    // Performance monitoring
    getPerformanceMetrics() {
        return {
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            } : null,
            timing: performance.timing,
            navigation: performance.navigation
        };
    }

    // Error handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // Add error to terminal if available
        if (window.terminal) {
            window.terminal.addOutput(`[ERROR] ${context}: ${error.message}`, 'error');
        }
    }

    // Cleanup method
    cleanup() {
        try {
            // Cleanup all modules
            Object.values(this.modules).forEach(module => {
                if (module.cleanup) {
                    module.cleanup();
                }
            });

            // Clear intervals and timeouts
            const highestTimeoutId = setTimeout(() => {}, 0);
            for (let i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
            }

            const highestIntervalId = setInterval(() => {}, 0);
            for (let i = 0; i < highestIntervalId; i++) {
                clearInterval(i);
            }

            console.log('Application cleanup completed');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    // Development utilities
    getDevelopmentInfo() {
        return {
            modules: Object.keys(this.modules),
            isInitialized: this.isInitialized,
            performance: this.getPerformanceMetrics(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    // Debug mode
    enableDebugMode() {
        window.DEBUG = true;
        console.log('Debug mode enabled');
        console.log('Development info:', this.getDevelopmentInfo());
        
        // Add debug panel
        this.createDebugPanel();
    }

    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff88;
            padding: 10px;
            border: 1px solid #00ff88;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        const updateDebugInfo = () => {
            const metrics = this.getPerformanceMetrics();
            debugPanel.innerHTML = `
                <div><strong>DEBUG MODE</strong></div>
                <div>Memory: ${metrics.memory ? metrics.memory.used + 'MB' : 'N/A'}</div>
                <div>Modules: ${Object.keys(this.modules).length}</div>
                <div>Viewport: ${window.innerWidth}x${window.innerHeight}</div>
                <div>User: ${window.currentUser || 'N/A'}</div>
            `;
        };
        
        updateDebugInfo();
        setInterval(updateDebugInfo, 1000);
        
        document.body.appendChild(debugPanel);
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new Main();
    app.init();
    
    // Make app globally available for debugging
    window.app = app;
    
    // Enable debug mode in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Uncomment for debug mode
        // app.enableDebugMode();
    }
});

// Handle any uncaught errors
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    if (window.app) {
        window.app.handleError(event.error, 'Global');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.app) {
        window.app.handleError(event.reason, 'Promise');
    }
}); 