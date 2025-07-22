// ===== TERMINAL MODULE =====

class Terminal {
    constructor() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        this.mainTimestamp = document.getElementById('main-timestamp');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentInput = '';
        this.hasShownWelcome = false;
    }

    init() {
        this.updateMainTimestamp();
        this.startTimestampUpdate();
        this.setupInputHandling();
        this.initEffects();
        this.setupControlButtons();
        
        // Only show welcome message first time
        if (!this.hasShownWelcome) {
            this.addWelcomeMessage();
            this.hasShownWelcome = true;
        }

        // Focus the input
        if (this.terminalInput) {
            this.terminalInput.focus();
        }
    }

    addWelcomeMessage() {
        // Add initial system messages to terminal
        setTimeout(() => {
            this.addOutput("System breach protocols activated...", 'info');
            this.addOutput("Terminal access granted to unauthorized user.", 'success');
            this.addOutput("Type 'help' to explore available commands.", 'info');
        }, 1000);
    }

    updateMainTimestamp() {
        if (this.mainTimestamp) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            this.mainTimestamp.textContent = timeString;
        }
    }

    startTimestampUpdate() {
        setInterval(() => {
            this.updateMainTimestamp();
        }, 1000);
    }

    setupInputHandling() {
        if (this.terminalInput) {
            // Remove any existing event listeners
            this.terminalInput.removeEventListener('keydown', (event) => this.handleInput(event));
            
            // Add new event listener
            this.terminalInput.addEventListener('keydown', (event) => this.handleInput(event));
            
            // Ensure focus stays on input
            this.terminalInput.addEventListener('blur', () => {
                // Only refocus if we're not on the login screen
                if (!document.getElementById('login-screen').classList.contains('hidden')) {
                    return;
                }
                setTimeout(() => this.terminalInput.focus(), 10);
            });
        }
    }

    handleInput(event) {
        if (event.key === 'Enter') {
            const input = this.terminalInput.value.trim();
            if (input) {
                this.commandHistory.push(input);
                this.historyIndex = this.commandHistory.length;
                const currentUser = window.currentUser || 'hacker';
                this.addOutput(`${currentUser}@threde-system:~$ ${input}`, 'command');
                this.executeCommand(input);
            }
            this.terminalInput.value = '';
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            } else if (this.historyIndex === this.commandHistory.length - 1) {
                this.historyIndex++;
                this.terminalInput.value = '';
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.autoComplete();
        }
    }

    executeCommand(input) {
        // Use the commands module for execution
        if (window.commands) {
            window.commands.execute(input);
        } else {
            this.addOutput(`Command '${input}' not found. Try 'help' for available commands.`, 'error');
        }
    }

    addOutput(text, type = '') {
        if (!this.terminalOutput || !text) return;
        
        const lineElement = document.createElement('div');
        lineElement.className = `output-line ${type}`;
        
        if (typeof text === 'string') {
            // Handle multiline text
            if (text.includes('\n')) {
                text.split('\n').forEach((line, index) => {
                    if (index > 0) {
                        const newLineElement = document.createElement('div');
                        newLineElement.className = `output-line ${type}`;
                        newLineElement.textContent = line;
                        this.terminalOutput.appendChild(newLineElement);
                    } else {
                        lineElement.textContent = line;
                        this.terminalOutput.appendChild(lineElement);
                    }
                });
            } else {
                lineElement.textContent = text;
                this.terminalOutput.appendChild(lineElement);
            }
        } else {
            // Handle HTML content
            lineElement.appendChild(text);
            this.terminalOutput.appendChild(lineElement);
        }
        
        // Smooth scroll to bottom
        this.terminalOutput.scrollTo({
            top: this.terminalOutput.scrollHeight,
            behavior: 'smooth'
        });
    }

    typeOutput(text) {
        if (!text) return;
        
        const lines = text.split('\n');
        let lineIndex = 0;
        
        const typeLine = () => {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                const lineElement = document.createElement('div');
                lineElement.className = 'output-line';
                
                if (line.trim() === '') {
                    lineElement.innerHTML = '&nbsp;';
                    this.terminalOutput.appendChild(lineElement);
                    lineIndex++;
                    setTimeout(typeLine, 50);
                } else {
                    lineElement.textContent = line;
                    this.terminalOutput.appendChild(lineElement);
                    lineIndex++;
                    setTimeout(typeLine, 100);
                }
                
                // Smooth scroll
                this.terminalOutput.scrollTo({
                    top: this.terminalOutput.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };
        
        typeLine();
    }

    autoComplete() {
        const input = this.terminalInput.value;
        if (!input) return;
        
        // Get available commands from commands module
        const availableCommands = window.commands ? window.commands.getAvailableCommands() : [
            'help', 'about', 'skills', 'projects', 'contact', 'clear', 'ls', 'pwd', 'whoami',
            'target', 'matrix', 'scan', 'hack', 'exit'
        ];
        
        const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
        
        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`, 'info');
        }
    }

    clearTerminal() {
        if (this.terminalOutput) {
            this.terminalOutput.innerHTML = '';
        }
    }

    initEffects() {
        // Initialize visual effects
        if (window.visualEffects) {
            window.visualEffects.initCoolEffects();
        }
        
        // Add subtle glitch effects
        this.startSubtleGlitchEffects();
    }

    startSubtleGlitchEffects() {
        // Simplified glitch effects - much more subtle
        setInterval(() => {
            if (Math.random() < 0.05) { // Reduced frequency
                const elements = document.querySelectorAll('.terminal-name, .terminal-path');
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                if (randomElement) {
                    // Subtle glitch effect
                    randomElement.style.textShadow = '1px 0 #00ccff, -1px 0 #ffaa00';
                    randomElement.style.transform = 'translateX(1px)';
                    setTimeout(() => {
                        randomElement.style.textShadow = '';
                        randomElement.style.transform = '';
                    }, 80);
                }
            }
        }, 5000); // Less frequent
    }

    setupControlButtons() {
        // Control button interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('control')) {
                const control = e.target;
                
                // Add click effect
                control.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    control.style.transform = 'scale(1)';
                }, 100);
                
                // Handle different control types
                if (control.classList.contains('close')) {
                    this.addOutput("Access denied: Cannot close system terminal.", 'error');
                } else if (control.classList.contains('minimize')) {
                    this.addOutput("Terminal minimized (simulation).", 'info');
                } else if (control.classList.contains('maximize')) {
                    this.addOutput("Terminal maximized (simulation).", 'info');
                }
            }
        });

        // Panel control interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('panel-control')) {
                const control = e.target;
                const panel = control.closest('.system-monitor, .network-traffic, .activity-log');
                
                // Add click effect
                control.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    control.style.transform = 'scale(1)';
                }, 100);
                
                if (control.classList.contains('minimize')) {
                    // Toggle minimize
                    const content = panel.querySelector('.panel-content');
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        panel.style.height = '';
                    } else {
                        content.style.display = 'none';
                        panel.style.height = '40px';
                    }
                } else if (control.classList.contains('close')) {
                    // Temporary hide with animation
                    panel.style.opacity = '0';
                    panel.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        panel.style.opacity = '1';
                        panel.style.transform = 'scale(1)';
                    }, 2000);
                }
            }
        });
    }

    // Prevent context menu
    preventContextMenu() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    // Focus methods
    focus() {
        if (this.terminalInput) {
            this.terminalInput.focus();
        }
    }

    blur() {
        if (this.terminalInput) {
            this.terminalInput.blur();
        }
    }

    // Utility methods
    getInput() {
        return this.terminalInput ? this.terminalInput.value : '';
    }

    setInput(value) {
        if (this.terminalInput) {
            this.terminalInput.value = value;
        }
    }

    getCommandHistory() {
        return [...this.commandHistory];
    }

    clearCommandHistory() {
        this.commandHistory = [];
        this.historyIndex = -1;
    }

    reset() {
        this.clearTerminal();
        this.clearCommandHistory();
        this.hasShownWelcome = false;
        
        // Remove input focus when resetting
        if (this.terminalInput) {
            this.terminalInput.blur();
            this.terminalInput.value = '';
        }
        
        // Remove any existing event listeners
        if (this.terminalInput) {
            this.terminalInput.removeEventListener('keydown', (event) => this.handleInput(event));
        }
    }
}

// Export for use in other modules
window.Terminal = Terminal; 