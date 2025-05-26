// ===== DYNAMIC PANELS MODULE =====

class DynamicPanels {
    constructor() {
        this.updateIntervals = [];
        this.maxLogEntries = 15;
    }

    init() {
        this.updateSystemResources();
        this.updateNetworkTraffic();
        this.updateActivityLog();
        this.setupControlInteractions();
        
        // Schedule regular updates
        this.scheduleUpdates();
    }

    scheduleUpdates() {
        // Update system resources every 2 seconds
        const resourceInterval = setInterval(() => {
            this.updateSystemResources();
        }, 2000);
        
        // Update network traffic every 3 seconds
        const networkInterval = setInterval(() => {
            this.updateNetworkTraffic();
        }, 3000);
        
        // Add new activity log entries every 5-10 seconds
        const logInterval = setInterval(() => {
            this.addRandomLogEntry();
        }, 5000 + Math.random() * 5000);
        
        // Store intervals for cleanup
        this.updateIntervals.push(resourceInterval, networkInterval, logInterval);
    }

    updateSystemResources() {
        const cpuElement = document.getElementById('cpu-usage');
        const memoryElement = document.getElementById('memory-usage');
        const networkElement = document.getElementById('network-usage');
        const cpuValue = document.getElementById('cpu-value');
        const memoryValue = document.getElementById('memory-value');
        const networkValue = document.getElementById('network-value');
        
        if (!cpuElement) return;
        
        // Generate realistic fluctuating values
        const cpu = Math.max(30, Math.min(95, 78 + (Math.random() - 0.5) * 20));
        const memory = Math.max(60, Math.min(90, 84 + (Math.random() - 0.5) * 10));
        const network = Math.max(10, Math.min(80, 45 + (Math.random() - 0.5) * 30));
        
        // Update bar widths with smooth animation
        if (cpuElement) {
            cpuElement.style.transition = 'width 0.5s ease';
            cpuElement.style.width = cpu + '%';
        }
        if (memoryElement) {
            memoryElement.style.transition = 'width 0.5s ease';
            memoryElement.style.width = memory + '%';
        }
        if (networkElement) {
            networkElement.style.transition = 'width 0.5s ease';
            networkElement.style.width = network + '%';
        }
        
        // Update text values
        if (cpuValue) cpuValue.textContent = Math.floor(cpu) + '%';
        if (memoryValue) memoryValue.textContent = Math.floor(memory) + '%';
        if (networkValue) networkValue.textContent = Math.floor(network) + '%';
        
        // Update system info occasionally
        if (Math.random() < 0.1) {
            this.updateSystemInfo();
        }
    }

    updateSystemInfo() {
        const hostElement = document.getElementById('system-host');
        const uptimeElement = document.getElementById('system-uptime');
        
        if (hostElement) {
            const hosts = ['THREDE-MAIN', 'PHANTOM-01', 'GHOST-SRV', 'SHADOW-SYS'];
            hostElement.textContent = hosts[Math.floor(Math.random() * hosts.length)];
        }
        
        if (uptimeElement) {
            const hours = Math.floor(Math.random() * 72) + 1;
            const minutes = Math.floor(Math.random() * 60);
            uptimeElement.textContent = `${hours}h ${minutes}m`;
        }
    }

    updateNetworkTraffic() {
        const bandwidthIn = document.getElementById('bandwidth-in');
        const bandwidthOut = document.getElementById('bandwidth-out');
        const packetsIn = document.getElementById('packets-in');
        const packetsOut = document.getElementById('packets-out');
        const networkLatency = document.getElementById('network-latency');
        
        if (!bandwidthIn) return;
        
        // Generate realistic bandwidth values
        const inSpeed = (Math.random() * 2 + 0.5).toFixed(1);
        const outSpeed = (Math.random() * 500 + 100).toFixed(0);
        
        bandwidthIn.textContent = inSpeed + ' MB/s';
        bandwidthOut.textContent = outSpeed + ' KB/s';
        
        // Update network stats with realistic values
        if (packetsIn) {
            const packetsInValue = Math.floor(Math.random() * 1000000 + 1000000);
            packetsIn.textContent = packetsInValue.toLocaleString();
        }
        
        if (packetsOut) {
            const packetsOutValue = Math.floor(Math.random() * 800000 + 800000);
            packetsOut.textContent = packetsOutValue.toLocaleString();
        }
        
        if (networkLatency) {
            const latency = Math.floor(Math.random() * 30 + 30);
            networkLatency.textContent = latency + 'ms';
        }
        
        // Update connection statuses
        this.updateConnectionStatuses();
    }

    updateConnectionStatuses() {
        const connections = document.querySelectorAll('.connection-status');
        connections.forEach(connection => {
            if (Math.random() < 0.1) {
                // Randomly change connection status
                const isActive = Math.random() > 0.3;
                connection.className = `connection-status ${isActive ? 'active' : 'warning'}`;
            }
        });
    }

    updateActivityLog() {
        // Initial log entries
        const initialEntries = [
            "System initialization complete",
            "Security protocols activated",
            "Monitoring systems online",
            "Intrusion detection enabled",
            "Network scanning initiated"
        ];
        
        initialEntries.forEach((entry, index) => {
            setTimeout(() => {
                this.addLogEntry(entry);
            }, index * 500);
        });
    }

    addRandomLogEntry() {
        const logEntries = [
            "SSH connection established from 192.168.1.50",
            "File access: /etc/passwd",
            "Database query executed: SELECT * FROM users",
            "Firewall rule bypassed",
            "Privilege escalation attempt detected",
            "Network scan from external host",
            "Suspicious file modification detected",
            "Backdoor communication established",
            "Root access granted",
            "System log cleared",
            "Malicious payload downloaded",
            "Encryption key extracted",
            "Port 22 access logged",
            "Administrative command executed",
            "Data exfiltration in progress",
            "Security protocol disabled",
            "Anonymous connection detected",
            "System vulnerability exploited",
            "Critical file accessed: /etc/shadow",
            "Intrusion attempt from unknown IP",
            "Certificate validation bypassed",
            "Memory dump initiated",
            "Process injection detected",
            "Registry modification logged",
            "Network traffic encrypted",
            "Authentication token hijacked",
            "Lateral movement detected",
            "Persistence mechanism installed",
            "Covert channel established",
            "Data staging completed",
            "Cleanup procedures initiated"
        ];
        
        const randomEntry = logEntries[Math.floor(Math.random() * logEntries.length)];
        this.addLogEntry(randomEntry);
    }

    addLogEntry(message) {
        const activityLog = document.getElementById('activity-log');
        if (!activityLog) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const newLogEntry = document.createElement('div');
        newLogEntry.className = 'log-entry';
        newLogEntry.textContent = `[${timeString}] ${message}`;
        
        // Add fade-in animation
        newLogEntry.style.opacity = '0';
        activityLog.appendChild(newLogEntry);
        
        // Trigger fade-in
        setTimeout(() => {
            newLogEntry.style.opacity = '1';
        }, 50);
        
        // Remove old entries if too many
        const entries = activityLog.querySelectorAll('.log-entry');
        if (entries.length > this.maxLogEntries) {
            entries[0].style.opacity = '0';
            setTimeout(() => {
                if (entries[0].parentNode) {
                    entries[0].remove();
                }
            }, 300);
        }
        
        // Scroll to bottom smoothly
        activityLog.scrollTo({
            top: activityLog.scrollHeight,
            behavior: 'smooth'
        });
    }

    setupControlInteractions() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('panel-control')) {
                this.handlePanelControl(e.target);
            }
        });
    }

    handlePanelControl(control) {
        const panel = control.closest('.system-monitor, .network-traffic, .activity-log');
        if (!panel) return;
        
        // Add click effect
        control.style.transform = 'scale(0.8)';
        setTimeout(() => {
            control.style.transform = 'scale(1)';
        }, 100);
        
        if (control.classList.contains('minimize')) {
            this.togglePanelMinimize(panel);
        } else if (control.classList.contains('close')) {
            this.temporaryHidePanel(panel);
        }
    }

    togglePanelMinimize(panel) {
        const content = panel.querySelector('.panel-content');
        if (!content) return;
        
        if (content.style.display === 'none') {
            // Expand
            content.style.display = 'block';
            panel.style.height = '';
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        } else {
            // Minimize
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.display = 'none';
                panel.style.height = '40px';
            }, 200);
        }
    }

    temporaryHidePanel(panel) {
        // Temporary hide with animation
        panel.style.transition = 'all 0.3s ease';
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
        }, 2000);
    }

    // System Information Updates
    updateTargetInfo() {
        const targetIP = document.getElementById('target-ip');
        const targetOS = document.getElementById('target-os');
        
        if (targetIP) {
            const ips = ['192.168.1.100', '10.0.0.50', '172.16.1.25', '192.168.0.150'];
            targetIP.textContent = ips[Math.floor(Math.random() * ips.length)];
        }
        
        if (targetOS) {
            const systems = ['Ubuntu 20.04 LTS', 'Windows 10 Pro', 'CentOS 8', 'Debian 11'];
            targetOS.textContent = systems[Math.floor(Math.random() * systems.length)];
        }
    }

    // Network Connection Management
    updateNetworkConnections() {
        const connections = [
            { host: '192.168.1.1', port: '80', status: 'ESTABLISHED' },
            { host: '10.0.0.1', port: '443', status: 'TIME_WAIT' },
            { host: '172.16.1.1', port: '22', status: 'ESTABLISHED' },
            { host: '192.168.0.1', port: '3306', status: 'CLOSE_WAIT' }
        ];
        
        // Update connection display if elements exist
        connections.forEach((conn, index) => {
            const connElement = document.getElementById(`connection-${index}`);
            if (connElement) {
                connElement.textContent = `${conn.host}:${conn.port} [${conn.status}]`;
            }
        });
    }

    // Performance monitoring
    getSystemHealth() {
        return {
            cpu: Math.floor(Math.random() * 40) + 60,
            memory: Math.floor(Math.random() * 30) + 70,
            network: Math.floor(Math.random() * 50) + 25,
            uptime: Math.floor(Date.now() / 1000) // Simulate uptime
        };
    }

    // Cleanup method
    cleanup() {
        this.updateIntervals.forEach(interval => {
            clearInterval(interval);
        });
        this.updateIntervals = [];
    }

    // Manual refresh methods
    refreshAllPanels() {
        this.updateSystemResources();
        this.updateNetworkTraffic();
        this.addLogEntry("Manual panel refresh initiated");
    }

    refreshSystemMonitor() {
        this.updateSystemResources();
        this.updateSystemInfo();
    }

    refreshNetworkTraffic() {
        this.updateNetworkTraffic();
        this.updateNetworkConnections();
    }

    refreshActivityLog() {
        this.addLogEntry("Activity log refreshed manually");
    }
}

// Export for use in other modules
window.DynamicPanels = DynamicPanels; 