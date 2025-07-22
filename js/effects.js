// ===== VISUAL EFFECTS MODULE =====

class VisualEffects {
    constructor() {
        this.activeEffects = new Map();
    }

    // Matrix Rain Effect
    startMatrixEffect() {
        const chars = "01";
        const columns = Math.floor(window.innerWidth / 20);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '9999';
        canvas.style.pointerEvents = 'none';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        document.body.appendChild(canvas);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(draw, 33);
        this.activeEffects.set('matrix', { interval, canvas });
        
        // Auto-stop on key press
        const stopMatrix = (event) => {
            this.stopMatrixEffect();
            document.removeEventListener('keydown', stopMatrix);
            if (window.terminal) {
                window.terminal.addOutput("[+] Matrix effect stopped.", 'success');
            }
        };
        
        document.addEventListener('keydown', stopMatrix);
    }

    stopMatrixEffect() {
        const effect = this.activeEffects.get('matrix');
        if (effect) {
            clearInterval(effect.interval);
            if (effect.canvas.parentNode) {
                document.body.removeChild(effect.canvas);
            }
            this.activeEffects.delete('matrix');
        }
    }

    // Subtle Matrix Rain
    createSubtleMatrixRain() {
        const chars = "01";
        const columns = Math.floor(window.innerWidth / 30);
        const drops = [];
        
        for (let i = 0; i < Math.min(columns, 15); i++) {
            drops[i] = 1;
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = '12px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 30, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(draw, 100);
        
        // Auto-cleanup after 10 seconds
        setTimeout(() => {
            clearInterval(interval);
            if (canvas.parentNode) {
                document.body.removeChild(canvas);
            }
        }, 10000);
    }

    // Scan Effect - Movie-style radar scanning animation
    startScanEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.9);
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        
        let angle = 0;
        let scanProgress = 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.max(canvas.width, canvas.height) / 2;
        
        // Extended scan data to display - much longer scan
        const scanLines = [
            "[+] Initializing advanced network reconnaissance...",
            "[+] Loading stealth scanning modules...",
            "[+] Target range: 192.168.1.0/24",
            "[+] Performing host discovery sweep...",
            "[+] Host 192.168.1.1 - ALIVE (Gateway Router)",
            "[+] Host 192.168.1.5 - ALIVE (Smart TV)",
            "[+] Host 192.168.1.15 - ALIVE (Mobile Device)",
            "[+] Host 192.168.1.22 - ALIVE (Laptop)",
            "[+] Host 192.168.1.50 - ALIVE (IoT Camera)",
            "[+] Host 192.168.1.100 - ALIVE (Primary Target)",
            "[+] Host 192.168.1.150 - ALIVE (Server)",
            "[+] Starting TCP SYN scan on 65535 ports...",
            "[+] Port 22/tcp OPEN - SSH OpenSSH 8.2p1",
            "[+] Port 53/tcp OPEN - DNS ISC BIND 9.16.1",
            "[+] Port 80/tcp OPEN - HTTP Apache 2.4.41",
            "[+] Port 139/tcp OPEN - NetBIOS-SSN Samba",
            "[+] Port 443/tcp OPEN - HTTPS Apache 2.4.41",
            "[+] Port 445/tcp OPEN - SMB Samba 4.13.17",
            "[+] Port 993/tcp OPEN - IMAPS Dovecot",
            "[+] Port 3306/tcp OPEN - MySQL 8.0.25",
            "[+] Port 5432/tcp OPEN - PostgreSQL 13.7",
            "[+] Port 8080/tcp OPEN - HTTP Tomcat 9.0.65",
            "[+] Performing UDP scan on common ports...",
            "[+] Port 53/udp OPEN - DNS",
            "[+] Port 67/udp OPEN - DHCP Server",
            "[+] Port 161/udp OPEN - SNMP",
            "[+] Running OS fingerprinting...",
            "[+] OS Detection: Linux Ubuntu 20.04.3 LTS",
            "[+] Kernel version: 5.4.0-74-generic",
            "[+] Architecture: x86_64",
            "[+] Performing service version detection...",
            "[+] SSH Banner: SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5",
            "[+] HTTP Server: Apache/2.4.41 (Ubuntu)",
            "[+] MySQL Version: 8.0.25-0ubuntu0.20.04.1",
            "[+] Running vulnerability scans...",
            "[+] Checking for CVE-2021-44228 (Log4Shell)...",
            "[+] VULNERABLE: Log4Shell detected on port 8080",
            "[+] Checking for CVE-2021-34527 (PrintNightmare)...",
            "[+] Not vulnerable to PrintNightmare",
            "[+] Checking for CVE-2022-0847 (DirtyPipe)...",
            "[+] VULNERABLE: DirtyPipe kernel exploit possible",
            "[+] Enumerating SMB shares...",
            "[+] Share: ADMIN$ (Admin access required)",
            "[+] Share: C$ (Admin access required)", 
            "[+] Share: IPC$ (Anonymous access allowed)",
            "[+] Share: public (Read access allowed)",
            "[+] Performing SNMP enumeration...",
            "[+] System Description: Linux target 5.4.0-74-generic",
            "[+] System Contact: admin@company.com",
            "[+] System Location: Server Room A",
            "[+] Network interfaces discovered: 2",
            "[+] Running web application scan...",
            "[+] Directory found: /admin (403 Forbidden)",
            "[+] Directory found: /backup (200 OK)",
            "[+] Directory found: /config (301 Moved)",
            "[+] File found: /robots.txt (200 OK)",
            "[+] File found: /.htaccess (403 Forbidden)",
            "[+] Checking for SQL injection vulnerabilities...",
            "[+] Parameter 'id' appears vulnerable to SQLi",
            "[+] Testing XSS vulnerabilities...",
            "[+] Reflected XSS found in search parameter",
            "[+] Analyzing SSL/TLS configuration...",
            "[+] SSL Labs Grade: B (Weak cipher suites detected)",
            "[+] Certificate expires: 2024-12-31",
            "[+] Weak cipher: TLS_RSA_WITH_AES_128_CBC_SHA",
            "[+] Performing DNS enumeration...",
            "[+] Subdomain: mail.target.com (192.168.1.200)",
            "[+] Subdomain: ftp.target.com (192.168.1.201)",
            "[+] Subdomain: dev.target.com (192.168.1.202)",
            "[+] MX Record: mail.target.com (Priority: 10)",
            "[+] TXT Record: v=spf1 include:_spf.google.com ~all",
            "[+] Collecting WHOIS information...",
            "[+] Domain registered: 2018-03-15",
            "[+] Registrar: GoDaddy Inc.",
            "[+] Organization: Target Corporation",
            "[+] Running final security assessment...",
            "[+] Critical vulnerabilities: 2",
            "[+] High severity issues: 5",
            "[+] Medium severity issues: 12",
            "[+] Low severity issues: 8",
            "[+] Total attack vectors identified: 27",
            "[+] Scan completed - Network fully mapped",
            "[+] Report saved to scan_results.xml",
            "[+] Press any key to exit scanner..."
        ];
        
        let currentLine = 0;
        let currentCharIndex = 0;
        let isTypingLine = false;
        
        function drawScan() {
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw radar grid
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
            ctx.lineWidth = 1;
            
            // Concentric circles
            for (let r = 50; r <= maxRadius; r += 50) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
                ctx.stroke();
            }
            
            // Cross lines
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);
            ctx.stroke();
            
            // Rotating scan line
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00ff00';
            
            const endX = centerX + Math.cos(angle) * maxRadius;
            const endY = centerY + Math.sin(angle) * maxRadius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Scan sweep gradient
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0.4)');
            gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, maxRadius, angle - Math.PI/6, angle);
            ctx.closePath();
            ctx.fill();
            
            // Dynamic target blips
            const allBlips = [
                {x: centerX + 100, y: centerY - 80, label: "192.168.1.1", minLine: 4},
                {x: centerX - 120, y: centerY + 60, label: "192.168.1.100", minLine: 9},
                {x: centerX + 80, y: centerY + 100, label: "192.168.1.150", minLine: 10},
                {x: centerX - 80, y: centerY - 120, label: "192.168.1.5", minLine: 5},
                {x: centerX + 150, y: centerY + 40, label: "192.168.1.22", minLine: 7},
                {x: centerX - 50, y: centerY + 130, label: "192.168.1.50", minLine: 8},
                {x: centerX + 200, y: centerY - 30, label: "192.168.1.15", minLine: 6}
            ];
            
            // Only show blips that have been discovered in the scan
            const visibleBlips = allBlips.filter(blip => currentLine >= blip.minLine);
            
            visibleBlips.forEach(blip => {
                // Blinking effect for newly discovered hosts
                const isNew = currentLine === blip.minLine;
                const shouldShow = isNew ? Math.floor(Date.now() / 200) % 2 : true;
                
                if (shouldShow) {
                    ctx.fillStyle = isNew ? '#ffff00' : '#ff0000';
                    ctx.shadowBlur = isNew ? 15 : 10;
                    ctx.shadowColor = isNew ? '#ffff00' : '#ff0000';
                    ctx.beginPath();
                    ctx.arc(blip.x, blip.y, isNew ? 6 : 4, 0, 2 * Math.PI);
                    ctx.fill();
                    
                    ctx.fillStyle = '#00ff00';
                    ctx.font = '12px monospace';
                    ctx.fillText(blip.label, blip.x + 10, blip.y);
                }
            });
            
            // Display scan results - only show recent lines
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#00ff00';
            ctx.font = '14px monospace';
            
            const startY = 30;
            const lineHeight = 20;
            const maxVisibleLines = Math.floor((canvas.height - 150) / lineHeight);
            
            // Calculate which lines to show (show most recent lines)
            let startIndex = 0;
            let endIndex = currentLine;
            
            if (currentLine >= maxVisibleLines) {
                startIndex = currentLine - maxVisibleLines + 1;
                endIndex = currentLine;
            }
            
            // Display visible lines
            for (let i = startIndex; i <= endIndex && i < scanLines.length; i++) {
                const lineY = startY + (i - startIndex) * lineHeight;
                
                if (i < currentLine) {
                    // Show completed lines fully
                    ctx.fillText(scanLines[i], 20, lineY);
                } else if (i === currentLine) {
                    // Show current line being typed
                    const currentText = scanLines[i].substring(0, currentCharIndex);
                    ctx.fillText(currentText, 20, lineY);
                    
                    // Add typing cursor
                    if (Math.floor(Date.now() / 400) % 2) {
                        const cursorX = 20 + ctx.measureText(currentText).width;
                        ctx.fillText('_', cursorX, lineY);
                    }
                }
            }
            
            // Show scroll indicator if there are hidden lines
            if (startIndex > 0) {
                ctx.fillStyle = '#ffff00';
                ctx.font = '12px monospace';
                ctx.fillText(`... (${startIndex} earlier lines hidden)`, 20, 15);
            }
            
            // Progress indicator
            ctx.fillStyle = '#ffff00';
            ctx.font = '16px monospace';
            ctx.fillText(`SCAN PROGRESS: ${Math.floor(scanProgress)}%`, 20, canvas.height - 60);
            
            // Show blinking message when scan is complete
            if (currentLine >= scanLines.length) {
                if (Math.floor(Date.now() / 500) % 2) {
                    ctx.fillStyle = '#00ff00';
                    ctx.font = 'bold 18px monospace';
                    ctx.fillText('SCAN COMPLETE - PRESS ANY KEY TO EXIT', 20, canvas.height - 30);
                }
            } else {
                // Show current scan status
                ctx.fillStyle = '#00ff88';
                ctx.font = '14px monospace';
                const progress = currentLine < scanLines.length ? `${currentLine + 1}/${scanLines.length}` : `${scanLines.length}/${scanLines.length}`;
                ctx.fillText(`Scanning... ${progress} modules`, 20, canvas.height - 30);
            }
            
            // Update animation
            angle += 0.1;
            
            // Handle typing animation for current line
            if (currentLine < scanLines.length && !isTypingLine) {
                isTypingLine = true;
                
                // Start typing the current line
                const typeNextChar = () => {
                    if (currentCharIndex < scanLines[currentLine].length) {
                        currentCharIndex++;
                        setTimeout(typeNextChar, 30 + Math.random() * 50); // Variable typing speed
                    } else {
                        // Finished typing current line, pause then move to next
                        setTimeout(() => {
                            currentLine++;
                            currentCharIndex = 0;
                            isTypingLine = false;
                            scanProgress = Math.min(100, (currentLine / scanLines.length) * 100);
                        }, 200 + Math.random() * 800); // Pause between lines
                    }
                };
                
                setTimeout(typeNextChar, 500); // Initial delay before typing
            }
            
            // Keep scanning until user presses a key
            requestAnimationFrame(drawScan);
        }
        
        drawScan();
        
        // Stop on any key press
        const stopScan = (event) => {
            if (canvas.parentNode) {
                document.body.removeChild(canvas);
                
                // Show different message based on scan completion
                if (currentLine >= scanLines.length) {
                    if (window.terminal) {
                        window.terminal.addOutput("Network reconnaissance completed successfully!", 'success');
                        window.terminal.addOutput("Comprehensive scan report generated.", 'success');
                        window.terminal.addOutput("Total vulnerabilities found: 27 critical attack vectors", 'error');
                    }
                } else {
                    if (window.terminal) {
                        window.terminal.addOutput("Scan terminated by user at " + Math.floor((currentLine / scanLines.length) * 100) + "% completion.", 'info');
                    }
                }
            }
            document.removeEventListener('keydown', stopScan);
        };
        
        document.addEventListener('keydown', stopScan);
    }

    // Hack Effect - Movie-style hacking animation
    startHackEffect() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.95);
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        
        // Bind showHackedScreen to preserve this context
        const boundShowHackedScreen = this.showHackedScreen.bind(this);
        
        // Hack sequences with more realistic hacking steps
        const hackSequences = [
            "INITIATING INTRUSION PROTOCOL...",
            "Scanning target network 192.168.1.0/24",
            "Found 5 active hosts, analyzing vulnerabilities...",
            "BYPASSING FIREWALL... SUCCESS",
            "Exploiting CVE-2021-44228 (Log4Shell)...",
            "ESCALATING PRIVILEGES... SUCCESS", 
            "Uploading custom payload to /tmp/sys.bin",
            "INJECTING PAYLOAD... SUCCESS",
            "Creating persistence mechanism...",
            "ESTABLISHING BACKDOOR... SUCCESS",
            "Accessing database credentials...",
            "EXTRACTING DATA... 23% COMPLETE",
            "EXTRACTING DATA... 47% COMPLETE",
            "EXTRACTING DATA... 78% COMPLETE", 
            "EXTRACTING DATA... 100% COMPLETE",
            "Wiping access logs and traces...",
            "CLEARING LOGS... SUCCESS",
            "Mission accomplished. Exfiltration complete.",
            "INTRUSION COMPLETED SUCCESSFULLY"
        ];
        
        let currentSequence = 0;
        let charIndex = 0;
        let isTyping = false;
        let hackProgress = 0;
        let lastTypeTime = Date.now();
        let pauseBetweenLines = false;
        
        // Digital rain effect
        const matrixChars = "01";
        const columns = Math.floor(canvas.width / 20);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawHack() {
            // Semi-transparent background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Matrix rain background
            ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
            ctx.font = '14px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            // Main hack terminal
            const terminalY = canvas.height / 2 - 150;
            const terminalHeight = 300;
            
            // Terminal background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.fillRect(50, terminalY, canvas.width - 100, terminalHeight);
            
            // Terminal border
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(50, terminalY, canvas.width - 100, terminalHeight);
            
            // Terminal header
            ctx.fillStyle = '#ff0000';
            ctx.font = '18px monospace';
            ctx.fillText('UNAUTHORIZED ACCESS PROTOCOL', 70, terminalY + 30);
            
            // Separator line after header
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(70, terminalY + 40);
            ctx.lineTo(canvas.width - 70, terminalY + 40);
            ctx.stroke();
            
            // Hack messages area - limit to available space
            ctx.fillStyle = '#00ff00';
            ctx.font = '14px monospace';
            
            const messageStartY = terminalY + 60;
            const messageAreaHeight = terminalHeight - 120;
            const maxLines = Math.floor(messageAreaHeight / 20) - 1;
            
            // Show only recent messages that fit in the area
            const startIndex = Math.max(0, currentSequence - maxLines + 1);
            const endIndex = Math.min(currentSequence - 1, startIndex + maxLines - 1);
            
            // Show completed lines only
            for (let i = startIndex; i <= endIndex; i++) {
                const lineY = messageStartY + (i - startIndex) * 20;
                ctx.fillText(`[${String(i+1).padStart(2, '0')}] ${hackSequences[i]}`, 70, lineY);
            }
            
            // Current typing line - only show characters that have been typed
            if (currentSequence < hackSequences.length && !pauseBetweenLines) {
                const currentText = hackSequences[currentSequence].substring(0, charIndex);
                const lineIndex = currentSequence - startIndex;
                
                let currentLineY;
                if (endIndex >= startIndex && endIndex >= 0) {
                    currentLineY = messageStartY + (endIndex - startIndex + 1) * 20;
                } else {
                    currentLineY = messageStartY;
                }
                
                if (lineIndex < maxLines) {
                    const prefix = `[${String(currentSequence+1).padStart(2, '0')}] `;
                    
                    if (currentText.length > 0) {
                        ctx.fillText(prefix + currentText, 70, currentLineY);
                    } else {
                        ctx.fillText(prefix, 70, currentLineY);
                    }
                    
                    if (charIndex < hackSequences[currentSequence].length && Math.floor(Date.now() / 300) % 2) {
                        const cursorX = 70 + ctx.measureText(prefix + currentText).width;
                        ctx.fillText('▊', cursorX, currentLineY);
                    }
                    
                    if (Math.random() < 0.05 && currentText.length > 3) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        const flickerIndex = Math.floor(Math.random() * currentText.length);
                        const beforeFlicker = currentText.substring(0, flickerIndex);
                        const flickerChar = currentText[flickerIndex];
                        const flickerX = 70 + ctx.measureText(prefix + beforeFlicker).width;
                        ctx.fillText(flickerChar, flickerX, currentLineY);
                        ctx.fillStyle = '#00ff00';
                    }
                }
            }
            
            // Progress bar - fixed position at bottom
            const progressY = terminalY + terminalHeight - 50;
            
            // Progress label
            ctx.fillStyle = '#ffff00';
            ctx.font = '12px monospace';
            ctx.fillText(`BREACH PROGRESS: ${Math.floor(hackProgress)}%`, 70, progressY - 10);
            
            // Progress bar background
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 1;
            ctx.strokeRect(70, progressY, canvas.width - 140, 20);
            
            // Progress bar fill
            ctx.fillStyle = '#00ff00';
            const progressWidth = (canvas.width - 140) * (hackProgress / 100);
            ctx.fillRect(70, progressY, progressWidth, 20);
            
            // Progress bar shine effect
            if (progressWidth > 0) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fillRect(70, progressY, progressWidth, 10);
            }
            
            // Glitch effects
            if (Math.random() < 0.1) {
                ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.5})`;
                ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2);
            }
            
            // Update typing animation
            if (currentSequence < hackSequences.length && !pauseBetweenLines) {
                const now = Date.now();
                
                let typingSpeed = 40 + Math.random() * 60;
                
                if (currentSequence < hackSequences.length && charIndex < hackSequences[currentSequence].length) {
                    const currentChar = hackSequences[currentSequence][charIndex];
                    if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
                        typingSpeed += 200;
                    } else if (currentChar === ' ') {
                        typingSpeed += 50;
                    } else if (currentChar === ',') {
                        typingSpeed += 100;
                    }
                }
                
                if (now - lastTypeTime > typingSpeed) {
                    charIndex++;
                    lastTypeTime = now;
                    
                    if (Math.random() < 0.3) {
                        const popElements = document.querySelectorAll('.terminal-name');
                        if (popElements.length > 0) {
                            const element = popElements[0];
                            element.style.textShadow = '0 0 8px #00ff00';
                            setTimeout(() => {
                                element.style.textShadow = '';
                            }, 50);
                        }
                    }
                    
                    if (charIndex >= hackSequences[currentSequence].length) {
                        pauseBetweenLines = true;
                        
                        setTimeout(() => {
                            currentSequence++;
                            charIndex = 0;
                            pauseBetweenLines = false;
                            hackProgress += 8 + Math.random() * 7;
                            
                            const currentMsg = hackSequences[currentSequence - 1];
                            if (currentMsg && (currentMsg.includes('SUCCESS') || currentMsg.includes('COMPLETE'))) {
                                hackProgress += Math.random() * 10;
                                
                                const flashOverlay = document.createElement('div');
                                flashOverlay.style.cssText = `
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: rgba(0, 255, 0, 0.1);
                                    z-index: 10000;
                                    pointer-events: none;
                                `;
                                document.body.appendChild(flashOverlay);
                                setTimeout(() => {
                                    if (flashOverlay.parentNode) {
                                        document.body.removeChild(flashOverlay);
                                    }
                                }, 150);
                            }
                            
                            if (hackProgress > 100) hackProgress = 100;
                        }, 400 + Math.random() * 800);
                    }
                }
            }
            
            // Continue animation
            if (currentSequence < hackSequences.length || hackProgress < 100) {
                requestAnimationFrame(drawHack);
            } else {
                // Show final "YOU HAVE BEEN HACKED" screen
                setTimeout(() => {
                    boundShowHackedScreen(canvas);
                }, 1000);
            }
        }
        
        drawHack();
        
        // Stop on any key press
        const stopHack = (event) => {
            if (canvas.parentNode) {
                document.body.removeChild(canvas);
                if (window.terminal) {
                    window.terminal.addOutput("Hack simulation terminated by user.", 'info');
                }
            }
            document.removeEventListener('keydown', stopHack);
        };
        
        document.addEventListener('keydown', stopHack);
    }

    // Final "YOU HAVE BEEN HACKED" screen
    showHackedScreen(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Matrix rain setup
        const matrixChars = "01";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        let frameCount = 0;
        const ANIMATION_DURATION = 7000;
        const startTime = Date.now();
        
        function drawHackedScreen() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            // Solid black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Matrix rain effect
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.3})`;
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                drops[i] += 0.5 + Math.random() * 0.5;
            }
            
            // Occasional background glitch effect
            if (Math.random() > 0.8) {
                for (let i = 0; i < 15; i++) {
                    const glitchX = Math.random() * canvas.width;
                    const glitchY = Math.random() * canvas.height;
                    const glitchW = Math.random() * 400 + 100;
                    const glitchH = Math.random() * 10 + 2;
                    
                    const opacity = Math.random() * 0.3 + 0.1;
                    ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                    ctx.fillRect(glitchX, glitchY, glitchW, glitchH);
                }
            }
            
            // Main text setup
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Warning-style blinking text effect
            const blinkRate = 500; // 500ms per blink
            const textVisible = Math.floor(currentTime / blinkRate) % 2 === 0;
            
            if (textVisible) {
                // Text shadow for glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00ff00';
                
                // Main text
                ctx.font = 'bold 72px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Draw multiple layers for stronger glow
                for (let i = 0; i < 3; i++) {
                    ctx.fillStyle = `rgba(0, 255, 0, ${0.7 - i * 0.2})`;
                    ctx.fillText('YOU HAVE BEEN HACKED', centerX, centerY);
                }
                
                // Central bright text
                ctx.fillStyle = '#00ff00';
                ctx.fillText('YOU HAVE BEEN HACKED', centerX, centerY);
            }
            
            // Subtle scan lines
            for (let i = 0; i < canvas.height; i += 2) {
                if (Math.random() > 0.93) {
                    const opacity = Math.random() * 0.2 + 0.1;
                    ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                    ctx.fillRect(0, i, canvas.width, 1);
                }
            }
            
            // Occasional vertical glitch lines
            if (Math.random() > 0.85) {
                for (let i = 0; i < 5; i++) {
                    const x = Math.random() * canvas.width;
                    const opacity = Math.random() * 0.4 + 0.2;
                    ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                    ctx.fillRect(x, 0, 1 + Math.random() * 2, canvas.height);
                }
            }
            
            frameCount++;
            
            if (elapsedTime < ANIMATION_DURATION) {
                requestAnimationFrame(drawHackedScreen);
            } else {
                // Fade out with warning blink
                let fadeOut = 1.0;
                function fade() {
                    fadeOut -= 0.02;
                    
                    // Continue warning blink during fade
                    const now = Date.now();
                    const textVisible = Math.floor(now / 500) % 2 === 0;
                    
                    if (textVisible) {
                        ctx.shadowBlur = 15;
                        ctx.shadowColor = '#00ff00';
                        ctx.fillStyle = `rgba(0, 255, 0, ${fadeOut})`;
                        ctx.fillText('YOU HAVE BEEN HACKED', centerX, centerY);
                    }
                    
                    // Subtle glitch during fade
                    if (Math.random() > 0.7) {
                        for (let i = 0; i < 10; i++) {
                            const glitchX = Math.random() * canvas.width;
                            const glitchY = Math.random() * canvas.height;
                            const opacity = Math.random() * fadeOut * 0.3;
                            ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
                            ctx.fillRect(glitchX, glitchY, Math.random() * 300, Math.random() * 3);
                        }
                    }
                    
                    // Fade to black
                    ctx.fillStyle = `rgba(0, 0, 0, ${0.05})`;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    if (fadeOut > 0) {
                        requestAnimationFrame(fade);
                    } else {
                        if (canvas.parentNode) {
                            document.body.removeChild(canvas);
                        }
                        if (window.terminal) {
                            window.terminal.addOutput("SYSTEM COMPROMISED", 'error');
                            window.terminal.addOutput("Target successfully infiltrated...", 'error');
                        }
                    }
                }
                fade();
            }
        }
        
        drawHackedScreen();
    }

    // Initialize subtle effects
    initCoolEffects() {
        this.addTypingEffect();
        
        // Occasional subtle matrix effect
        setInterval(() => {
            if (Math.random() < 0.01) {
                this.createSubtleMatrixRain();
            }
        }, 30000);
    }

    addTypingEffect() {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('input', () => {
                input.style.textShadow = '0 0 8px rgba(0, 255, 136, 0.4)';
                setTimeout(() => {
                    input.style.textShadow = '0 0 2px rgba(0, 255, 136, 0.2)';
                }, 150);
            });
        }
    }

    // Clean up all effects
    cleanup() {
        this.activeEffects.forEach((effect, name) => {
            if (effect.interval) {
                clearInterval(effect.interval);
            }
            if (effect.canvas && effect.canvas.parentNode) {
                document.body.removeChild(effect.canvas);
            }
        });
        this.activeEffects.clear();
    }
}

// Export for use in other modules
window.VisualEffects = VisualEffects; 