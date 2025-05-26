// ===== LOGIN SCREEN MODULE =====

class LoginScreen {
    constructor() {
        this.loginState = 'username';
        this.currentUsername = '';
        this.currentPassword = '';
        this.attemptCount = 0;
        this.userInputUsername = '';
        
        this.usernameElement = document.getElementById('login-username');
        this.passwordElement = document.getElementById('login-password');
        this.messageElement = document.getElementById('login-message');
        this.passwordLine = document.getElementById('password-line');
    }

    init() {
        setTimeout(() => {
            this.startManualLogin();
        }, 1000);
        
        document.addEventListener('keydown', (event) => this.handleInput(event));
    }

    startManualLogin() {
        this.messageElement.textContent = 'Enter your username (letters and numbers only) or press Enter for auto-hack...';
        this.messageElement.className = 'login-message';
        this.loginState = 'username';
    }

    startUsernameInput() {
        if (!this.userInputUsername.trim()) {
            const hackerAttempts = ['admin', 'root', 'user', 'threde'];
            let attemptIndex = 0;
            
            const tryUsername = () => {
                if (attemptIndex < hackerAttempts.length) {
                    this.currentUsername = '';
                    this.usernameElement.textContent = '';
                    
                    const targetUsername = hackerAttempts[attemptIndex];
                    let charIndex = 0;
                    
                    this.messageElement.textContent = `Trying username: ${targetUsername}`;
                    
                    const typeChar = () => {
                        if (charIndex < targetUsername.length) {
                            this.currentUsername += targetUsername[charIndex];
                            this.usernameElement.textContent = this.currentUsername;
                            charIndex++;
                            setTimeout(typeChar, 80 + Math.random() * 120);
                        } else {
                            setTimeout(() => {
                                if (attemptIndex < hackerAttempts.length - 1) {
                                    this.messageElement.textContent = 'Access denied. Trying next username...';
                                    this.messageElement.className = 'login-message error';
                                    attemptIndex++;
                                    setTimeout(() => {
                                        this.messageElement.className = 'login-message';
                                        tryUsername();
                                    }, 1500);
                                } else {
                                    this.messageElement.textContent = 'Username found! Attempting password crack...';
                                    this.messageElement.className = 'login-message success';
                                    this.userInputUsername = this.currentUsername;
                                    setTimeout(() => {
                                        this.startPasswordInput();
                                    }, 2000);
                                }
                            }, 1000);
                        }
                    };
                    
                    typeChar();
                }
            };
            
            tryUsername();
        } else {
            this.currentUsername = this.userInputUsername;
            this.usernameElement.textContent = this.currentUsername;
            this.messageElement.textContent = 'Username accepted. Proceeding to password...';
            this.messageElement.className = 'login-message success';
            setTimeout(() => {
                this.startPasswordInput();
            }, 1500);
        }
    }

    startPasswordInput() {
        this.passwordLine.classList.remove('hidden');
        
        setTimeout(() => {
            const targetPassword = '********';
            let charIndex = 0;
            
            this.messageElement.textContent = 'Authenticating...';
            this.messageElement.className = 'login-message';
            
            const typeChar = () => {
                if (charIndex < targetPassword.length) {
                    this.currentPassword += '*';
                    this.passwordElement.textContent = this.currentPassword;
                    charIndex++;
                    setTimeout(typeChar, 60 + Math.random() * 100);
                } else {
                    setTimeout(() => {
                        this.authenticateUser();
                    }, 1000);
                }
            };
            
            typeChar();
        }, 800);
    }

    authenticateUser() {
        this.messageElement.textContent = `Welcome ${this.userInputUsername || this.currentUsername}! Access granted.`;
        this.messageElement.className = 'login-message success';
        
        setTimeout(() => {
            this.transitionToTerminal();
        }, 2000);
    }

    transitionToTerminal() {
        const loginScreen = document.getElementById('login-screen');
        const mainContent = document.getElementById('main-content');
        
        if (loginScreen) {
            loginScreen.classList.add('fade-out');
        }
        
        setTimeout(() => {
            if (loginScreen) {
                loginScreen.style.display = 'none';
            }
            if (mainContent) {
                mainContent.classList.remove('hidden');
                this.updateTerminalPrompt();
                // Initialize terminal
                if (window.terminal) {
                    window.terminal.init();
                }
                // Initialize panels
                if (window.dynamicPanels) {
                    window.dynamicPanels.init();
                }
            }
        }, 500);
    }

    updateTerminalPrompt() {
        const promptElement = document.querySelector('.terminal-prompt');
        if (promptElement) {
            const username = this.userInputUsername || this.currentUsername || 'hacker';
            promptElement.textContent = `${username}@threde-system:~$ `;
            // Also update global current user
            window.currentUser = username;
        }
    }

    handleInput(event) {
        if (this.loginState === 'username') {
            if (event.key === 'Enter') {
                // If username is provided, validate it
                if (this.userInputUsername.trim()) {
                    if (this.userInputUsername.length < 3) {
                        this.showValidationError("Username must be at least 3 characters");
                        return;
                    }
                    // Valid username provided, proceed
                    this.messageElement.textContent = `Username "${this.userInputUsername}" accepted. Attempting login...`;
                    this.messageElement.className = 'login-message success';
                    setTimeout(() => {
                        this.startPasswordInput();
                    }, 1500);
                } else {
                    // No username provided, start auto-hack
                    this.startUsernameInput();
                }
                this.loginState = 'waiting';
            } else if (event.key.length === 1) {
                // Validation: Only allow alphanumeric characters and limit length
                if (/^[a-zA-Z0-9]$/.test(event.key)) {
                    if (this.userInputUsername.length < 20) { // Max 20 characters
                        this.userInputUsername += event.key;
                        if (this.usernameElement) {
                            this.usernameElement.textContent = this.userInputUsername;
                        }
                    } else {
                        this.showValidationError("Username too long (max 20 characters)");
                    }
                } else {
                    // Show error for invalid characters
                    this.showValidationError("Only letters and numbers allowed");
                }
            } else if (event.key === 'Backspace') {
                this.userInputUsername = this.userInputUsername.slice(0, -1);
                if (this.usernameElement) {
                    this.usernameElement.textContent = this.userInputUsername;
                }
            }
        }
    }

    showValidationError(message) {
        const originalMessage = this.messageElement.textContent;
        const originalClass = this.messageElement.className;
        
        this.messageElement.textContent = message;
        this.messageElement.className = 'login-message error';
        
        setTimeout(() => {
            this.messageElement.textContent = originalMessage;
            this.messageElement.className = originalClass;
        }, 1500);
    }
}

// Export for use in other modules
window.LoginScreen = LoginScreen; 