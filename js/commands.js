// ===== COMMANDS MODULE =====

class Commands {
    constructor() {
        this.commandHistory = [];
        this.commands = this.initializeCommands();
    }

    initializeCommands() {
        return {
            help: {
                description: "Show available commands",
                execute: (args) => {
                    // Special help for CTF mode
                    if (args[0] === 'play' && window.virtualFS) {
                        return window.virtualFS.getHelp();
                    }
                    
                    return `╔══════════════════════════════════════════════════════════════╗
║                    CLASSIFIED COMMAND INDEX                  ║
╚══════════════════════════════════════════════════════════════╝

▶ AVAILABLE OPERATIONS [CLEARANCE LEVEL: ALPHA]

┌─────────────────┬──────────────────────────────────────────────┐
│ Command         │ Classification                               │
├─────────────────┼──────────────────────────────────────────────┤
│ help            │ Display operational command index            │
│ clear           │ Sanitize terminal display                    │
│ whoami          │ Current user identification                  │
│ target          │ Target system information                    │
│ about           │ Classified intelligence dossier              │
│ skills          │ Operational capability assessment            │
│ projects        │ Active mission portfolio                     │
│ ctf             │ Competition network profiles                 │
│ contact         │ Secure communication channels                │
│ social          │ Social engineering attack vectors            │
│ tools           │ Black ops arsenal inventory                  │
│ ls              │ Directory reconnaissance                     │
│ pwd             │ Current position coordinates                 │
│ date            │ Temporal reference point                     │
│ uname           │ System fingerprinting                        │
│ history         │ Operation audit trail                        │
│ banner          │ Operator identification                      │
│ matrix          │ Digital camouflage activation                │
│ hack            │ Advanced intrusion simulation                │
│ scan            │ Network reconnaissance protocol              │
│ play            │ Start CTF filesystem exploration             │
│ cd              │ Change directory (CTF mode)                  │
│ cat             │ Display file contents (CTF mode)             │
│ find            │ Search for files (CTF mode)                  │
│ grep            │ Search patterns in files (CTF mode)          │
│ decode          │ Decode base64 strings (CTF helper)           │
│ status          │ Show CTF game progress                       │
└─────────────────┴──────────────────────────────────────────────┘

▲ SECURITY WARNING: You have infiltrated a classified workstation
▲ Codename: THREDE NOLAN - Digital phantom operative
▲ All activities monitored - Maintain operational security`;
                }
            },
            
            clear: {
                description: "Clear the terminal screen",
                execute: () => {
                    if (window.terminal) {
                        window.terminal.clearTerminal();
                    }
                    return null;
                }
            },
            
            whoami: {
                description: "Display current user information",
                execute: () => {
                    const currentUser = window.currentUser || 'hacker';
                    return `┌────────────────────────────────────────────────────────────┐
│                     CURRENT USER PROFILE                   │
├────────────────────────────────────────────────────────────┤
│ USERNAME:       ${currentUser.padEnd(43)} │
│ STATUS:         AUTHENTICATED                               │
│ SESSION:        ACTIVE                                      │
│ PRIVILEGES:     ELEVATED                                    │
│ CONNECTION:     ENCRYPTED TUNNEL                           │
│ ACCESS LEVEL:   FULL SYSTEM ACCESS                         │
│ LAST LOGIN:     ${new Date().toLocaleString().padEnd(43)} │
│                                                            │
│ ▲ WARNING: You are accessing Threde Nolan's system         │
│   All activities are being monitored and logged            │
└────────────────────────────────────────────────────────────┘`;
                }
            },
            
            target: {
                description: "Display target system information",
                execute: () => {
                    return `┌────────────────────────────────────────────────────────────┐
│                     TARGET PROFILE                         │
├────────────────────────────────────────────────────────────┤
│ CODENAME:       Threde Nolan                               │
│ CLASSIFICATION: [REDACTED]                                 │
│ STATUS:         [SYSTEM COMPROMISED]                       │
│ SECTOR:         Digital Security Operations                │
│ LOCATION:       [COORDINATES CLASSIFIED]                   │
│ CLEARANCE:      [ACCESS DENIED]                            │
│ SPECIALIZATION: Web Penetration Testing                    │
│ THREAT LEVEL:   HIGH                                       │
│                                                            │
│ ▲ WARNING: Target exhibits advanced countermeasures        │
│   Digital footprint actively obfuscated                    │
│   Current system status: BREACHED                          │
└────────────────────────────────────────────────────────────┘`;
                }
            },
            
            about: {
                description: "Show detailed information about target",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                    CLASSIFIED INTELLIGENCE                   ║
╚══════════════════════════════════════════════════════════════╝

▶ SUBJECT: Threde Nolan
▶ SECURITY LEVEL: [EYES ONLY]

A digital phantom operating in the shadows of cyberspace. 
Known only by the codename "Threde Nolan" - true identity 
remains classified. Intelligence suggests deep involvement 
in underground security research and digital reconnaissance.

◈ OPERATIONAL ACTIVITIES:
• [CLASSIFIED] - Digital infiltration operations
• [REDACTED] - Advanced vulnerability research
• [ENCRYPTED] - Participation in clandestine competitions
• [RESTRICTED] - Anonymous security consulting
• [CONFIDENTIAL] - Zero-day discovery and analysis

◈ THREAT PROFILE:
• Exhibits sophisticated operational security
• Maintains multiple encrypted communication channels
• Suspected involvement in white-hat operations
• Advanced knowledge of defensive countermeasures
• Digital footprint carefully sanitized

◈ BACKGROUND INTELLIGENCE:
• Academic affiliations: [NEED TO KNOW BASIS]
• Geographic location: [COMPARTMENTALIZED]
• Personal details: [ABOVE YOUR CLEARANCE]
• Contact information: [SECURED CHANNELS ONLY]

▲ SECURITY NOTICE: Subject demonstrates exceptional OPSEC
   All intelligence gathering attempts actively monitored
   Approach with maximum operational security protocols`;
                }
            },
            
            skills: {
                description: "Display operational capabilities",
                execute: () => {
                    const skills = [
                        { category: "DIGITAL WARFARE", items: [
                            { name: "Exploit Dev", level: 90 },
                            { name: "Cryptanalysis", level: 85 },
                            { name: "Steganography", level: 80 },
                            { name: "Social Eng", level: 88 },
                            { name: "OSINT", level: 75 }
                        ]},
                        { category: "INFILTRATION", items: [
                            { name: "Zero-Day Hunt", level: 95 },
                            { name: "Persistence", level: 92 },
                            { name: "Lateral Move", level: 90 },
                            { name: "Privilege Esc", level: 87 },
                            { name: "Data Exfil", level: 85 }
                        ]},
                        { category: "BLACK OPS TOOLS", items: [
                            { name: "Custom Payloads", level: 93 },
                            { name: "RAT Development", level: 88 },
                            { name: "Traffic Obfus", level: 82 },
                            { name: "Network Pivot", level: 85 },
                            { name: "AV Evasion", level: 90 }
                        ]}
                    ];
                    
                    let output = `╔══════════════════════════════════════════════════════════════╗
║                   OPERATIONAL CAPABILITIES                   ║
╚══════════════════════════════════════════════════════════════╝

▶ CLASSIFICATION: [EYES ONLY] - TACTICAL ASSESSMENT`;
                    
                    skills.forEach(category => {
                        output += `\n\n◈ ${category.category}:`;
                        output += '\n' + '─'.repeat(60);
                        category.items.forEach(skill => {
                            const bar = '█'.repeat(Math.floor(skill.level / 5)) + '░'.repeat(20 - Math.floor(skill.level / 5));
                            output += `\n${skill.name.padEnd(15)} [${bar}] ${skill.level}%`;
                        });
                    });

                    output += `\n\n▲ SECURITY NOTICE: Capabilities assessment based on field reports
▲ Actual operational effectiveness may exceed documented levels`;

                    return output;
                }
            },
            
            projects: {
                description: "List classified operations and achievements",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                    CLASSIFIED OPERATIONS                     ║
╚══════════════════════════════════════════════════════════════╝

┌─ OPERATION: SHADOWSCAN ─────────────────────────────────────┐
│ Status: [ACTIVE] - CLEARANCE LEVEL ALPHA                    │
│ Description: [REDACTED] Advanced threat detection system    │
│ Technologies: [CLASSIFIED] - Multi-vector analysis          │
│ Capabilities: Deep web reconnaissance, zero-day detection   │
└─────────────────────────────────────────────────────────────┘

┌─ PROJECT: PHANTOM ARENA ────────────────────────────────────┐
│ Status: [DEPLOYED] - BLACK SITE OPERATIONAL                 │
│ Description: Clandestine training ground for operatives     │
│ Infrastructure: [COMPARTMENTALIZED] - Distributed nodes     │
│ Purpose: Advanced penetration testing scenarios             │
└─────────────────────────────────────────────────────────────┘

┌─ MISSION: DIGITAL GHOST ────────────────────────────────────┐
│ Status: [ONGOING] - CONTINUOUS OPERATIONS                   │
│ Description: Anonymous vulnerability research initiative    │
│ Methodology: [EYES ONLY] - Coordinated disclosure           │
│ Results: Multiple critical findings, zero attribution       │
└─────────────────────────────────────────────────────────────┘

┌─ TOOL: SPECTER ─────────────────────────────────────────────┐
│ Status: [BETA] - FIELD TESTING PHASE                        │
│ Description: Next-gen static analysis framework             │
│ Classification: [RESTRICTED] - Advanced AI integration      │
│ Capabilities: Automated exploit discovery, stealth mode     │
└─────────────────────────────────────────────────────────────┘`;
                }
            },
            
            ctf: {
                description: "Show CTF platforms and profiles",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                     CTF PLATFORMS                            ║
╚══════════════════════════════════════════════════════════════╝

◈ CTFtime
   Profile: https://ctftime.org/team/350749
   Status: ACTIVE
   Description: Team profile and competition history

◈ picoCTF
   Profile: https://play.picoctf.org/users/threde
   Status: ACTIVE
   Description: Educational CTF by Carnegie Mellon University

◈ Root-Me
   Profile: https://www.root-me.org/Threde_Nolan
   Status: ACTIVE
   Description: Hacking and information security platform

▶ STATISTICS:
   • Competitions Participated: 50+
   • Average Ranking: Top 15%
   • Favorite Categories: Web, Forensics, OSINT
   • Total Points: 10,000+
   • Achievements: Multiple first-place finishes`;
                }
            },
            
            contact: {
                description: "Display contact information",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                    SECURE COMMUNICATION                      ║
╚══════════════════════════════════════════════════════════════╝

▶ ENCRYPTED CHANNELS:
   ◦ Primary:    anphmvn75@gmail.com [PGP ENCRYPTED]
   ◦ Secure IM:  https://t.me/Thredee [SIGNAL PROTOCOL]
   ◦ Professional: https://www.linkedin.com/in/threde/ [MONITORED]
   ◦ Repository: https://github.com/thredeisacoder [PUBLIC]
   ◦ Social:     https://www.facebook.com/Threde/ [COMPARTMENTED]
   ◦ Visual:     https://www.instagram.com/_threde.nolan/ [OPSEC]

▶ OPERATIONAL STATUS:
   ◦ Available for clandestine security operations
   ◦ Accepting encrypted consultation requests
   ◦ Collaborative research on advanced threats
   ◦ Anonymous penetration testing services

▶ SECURITY PROTOCOL:
   ◦ Geographic location: [NEED TO KNOW]
   ◦ Response time: Variable (depends on operational security)
   ◦ All communications subject to encryption verification
   ◦ Dead drops available for sensitive intelligence`;
                }
            },
            
            social: {
                description: "Show social media links",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                      SOCIAL LINKS                            ║
╚══════════════════════════════════════════════════════════════╝

▣ GitHub:    https://github.com/thredeisacoder
   └─ Repositories: Security tools, CTF writeups, Projects

▣ LinkedIn:  https://www.linkedin.com/in/threde/
   └─ Professional network and career updates

▣ Facebook:  https://www.facebook.com/Threde/
   └─ Personal updates and cybersecurity content

▣ Instagram: https://www.instagram.com/_threde.nolan/
   └─ Behind-the-scenes and tech lifestyle

▣ Telegram:  https://t.me/Thredee
   └─ Direct messaging and quick communication

▣ Email:     anphmvn75@gmail.com
   └─ Professional inquiries and collaborations`;
                }
            },
            
            tools: {
                description: "List penetration testing tools I use",
                execute: () => {
                    return `╔══════════════════════════════════════════════════════════════╗
║                  PENETRATION TESTING TOOLS                   ║
╚══════════════════════════════════════════════════════════════╝

▶ WEB APPLICATION TESTING:
   • Burp Suite Professional - Primary web app testing
   • OWASP ZAP - Open source security testing
   • SQLmap - Automated SQL injection testing
   • XSStrike - Advanced XSS detection
   • Nikto - Web server scanner

▶ NETWORK SCANNING:
   • Nmap - Network discovery and security auditing
   • Masscan - High-speed port scanner
   • Rustscan - Modern port scanner
   • Gobuster - Directory/file brute-forcer

⚡ EXPLOITATION FRAMEWORKS:
   • Metasploit - Penetration testing framework
   • Cobalt Strike - Advanced threat emulation
   • Empire - PowerShell post-exploitation
   • BeEF - Browser exploitation framework

▣ CUSTOM TOOLS:
   • Python scripts for automation
   • Bash scripts for reconnaissance
   • Custom payloads and exploits
   • API testing frameworks`;
                }
            },
            
            ls: {
                description: "List directory contents",
                execute: (args) => {
                    // Check if in CTF mode
                    if (window.virtualFS) {
                        // Check if CTF is completed
                        if (window.virtualFS.foundFlags.length >= 11) {
                            return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                        }
                        
                        const options = args.find(arg => arg.startsWith('-')) || '';
                        const path = args.find(arg => !arg.startsWith('-')) || '';
                        
                        const result = window.virtualFS.ls(options, path);
                        
                        if (result.success) {
                            return result.content;
                        } else {
                            return `❌ ${result.message}`;
                        }
                    }
                    
                    // Default ls output when not in CTF mode
                    return `total 42
drwxr-xr-x  8 threde threde  4096 Jan  3 15:42 .
drwxr-xr-x  3 root   root    4096 Jan  1 00:00 ..
-rw-r--r--  1 threde threde   220 Jan  1 00:00 .bash_logout
-rw-r--r--  1 threde threde  3771 Jan  1 00:00 .bashrc
-rw-r--r--  1 threde threde   807 Jan  1 00:00 .profile
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 about/
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 contact/
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 ctf/
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 projects/
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 skills/
drwxr-xr-x  2 threde threde  4096 Jan  3 15:42 tools/
-rwxr-xr-x  1 threde threde  1337 Jan  3 15:42 exploit.py*
-rwxr-xr-x  1 threde threde  2048 Jan  3 15:42 scanner.py*
-rw-r--r--  1 threde threde   512 Jan  3 15:42 targets.txt

💡 TIP: Type 'play' to start CTF filesystem exploration!`;
                }
            },
            
            pwd: {
                description: "Show current directory",
                execute: () => {
                    if (window.virtualFS) {
                        // Check if CTF is completed
                        if (window.virtualFS.foundFlags.length >= 11) {
                            return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                        }
                        
                        const result = window.virtualFS.pwd();
                        return result.content;
                    }
                    
                    return "/home/threde/portfolio";
                }
            },
            
            date: {
                description: "Show current date and time",
                execute: () => {
                    const now = new Date();
                    return now.toString();
                }
            },
            
            uname: {
                description: "Show system information",
                execute: () => {
                    return `Linux penetration-tester 5.15.0-kali3-amd64 #1 SMP Debian 5.15.15-2kali1 (2022-01-31) x86_64 GNU/Linux`;
                }
            },
            
            history: {
                description: "Show command history",
                execute: () => {
                    if (this.commandHistory.length === 0) {
                        return "No commands in history.";
                    }
                    return this.commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
                }
            },
            
            banner: {
                description: "Display operator identification",
                execute: () => {
                    return `████████╗██╗  ██╗██████╗ ███████╗██████╗ ███████╗
╚══██╔══╝██║  ██║██╔══██╗██╔════╝██╔══██╗██╔════╝
   ██║   ███████║██████╔╝█████╗  ██║  ██║█████╗  
   ██║   ██╔══██║██╔══██╗██╔══╝  ██║  ██║██╔══╝  
   ██║   ██║  ██║██║  ██║███████╗██████╔╝███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝
                                                  
    ███╗   ██╗ ██████╗ ██╗      █████╗ ███╗   ██╗
    ████╗  ██║██╔═══██╗██║     ██╔══██╗████╗  ██║
    ██╔██╗ ██║██║   ██║██║     ███████║██╔██╗ ██║
    ██║╚██╗██║██║   ██║██║     ██╔══██║██║╚██╗██║
    ██║ ╚████║╚██████╔╝███████╗██║  ██║██║ ╚████║
    ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
                                                  
    ╔══════════════════════════════════════════════════════════╗
    ║                  CLASSIFIED - EYES ONLY                  ║
    ║            Digital Phantom • Shadow Operative            ║
    ║               .............................              ║
    ║            All Personal Data Compartmentalized           ║
    ╚══════════════════════════════════════════════════════════╝`;
                }
            },
            
            hack: {
                description: "Run penetration testing simulation",
                execute: () => {
                    if (window.visualEffects) {
                        window.visualEffects.startHackEffect();
                    }
                    return "[+] Launching advanced intrusion simulation...";
                }
            },
            
            scan: {
                description: "Simulate network scanning",
                execute: () => {
                    if (window.visualEffects) {
                        window.visualEffects.startScanEffect();
                    }
                    return "[+] Initiating advanced network reconnaissance scan...";
                }
            },
            
            matrix: {
                description: "Start matrix rain effect",
                execute: () => {
                    if (window.visualEffects) {
                        window.visualEffects.startMatrixEffect();
                    }
                    return "[+] Matrix rain effect activated! Press any key to stop.";
                }
            },

            play: {
                description: "Start CTF filesystem exploration game",
                execute: () => {
                    // Initialize filesystem if not exists
                    if (!window.virtualFS) {
                        window.virtualFS = new VirtualFileSystem();
                    }
                    
                    // Check if CTF is already completed
                    if (window.virtualFS.foundFlags.length >= 11) {
                        return `🎉 CTF ALREADY COMPLETED! 

╔══════════════════════════════════════════════════════════════╗
║                    CHALLENGE COMPLETED!                      ║
╚══════════════════════════════════════════════════════════════╝

🏆 Congratulations! You found all 11 flags!
🎯 You are now a CTF master!

🚩 Final Status: ${window.virtualFS.foundFlags.length}/11 flags found
✅ All flags discovered and CTF mode is now disabled.

💡 Available commands: 'decode' and 'status' only.`;
                    }
                    
                    return `🚩 CTF FILESYSTEM EXPLORATION MODE ACTIVATED!

╔══════════════════════════════════════════════════════════════╗
║                    WELCOME TO THE CTF CHALLENGE              ║
╚══════════════════════════════════════════════════════════════╝

🎯 MISSION: Find all 11 hidden flags in the compromised system
🏆 GOAL: Use Linux commands to explore and discover secrets

📁 Available Commands:
   • cd <directory>    - Navigate filesystem
   • ls [-la] [path]   - List files (use -a for hidden files)
   • cat <file>        - Read file contents
   • pwd               - Show current location
   • find <path> <name> - Search for files
   • grep <pattern> <file> - Search text in files

🚩 Current Status: ${window.virtualFS.foundFlags.length}/11 flags found
📍 Current Directory: ${window.virtualFS.currentPath}

💡 TIP: Start with 'ls -la' to see hidden files!
❓ Type 'help play' for detailed CTF guide`;
                }
            },

            cd: {
                description: "Change directory in CTF filesystem",
                execute: (args) => {
                    if (!window.virtualFS) {
                        return "❌ CTF mode not active. Type 'play' to start!";
                    }
                    
                    // Check if CTF is completed
                    if (window.virtualFS.foundFlags.length >= 11) {
                        return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                    }
                    
                    const path = args[0] || '';
                    const result = window.virtualFS.cd(path);
                    
                    if (result.success) {
                        return `📁 Changed to: ${window.virtualFS.currentPath}`;
                    } else {
                        return `❌ ${result.message}`;
                    }
                }
            },

            cat: {
                description: "Display file contents",
                execute: (args) => {
                    if (!window.virtualFS) {
                        return "❌ CTF mode not active. Type 'play' to start!";
                    }
                    
                    // Check if CTF is completed
                    if (window.virtualFS.foundFlags.length >= 11) {
                        return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                    }
                    
                    if (!args[0]) {
                        return "❌ Usage: cat <filename>";
                    }
                    
                    const result = window.virtualFS.cat(args[0]);
                    
                    if (result.success) {
                        return result.content;
                    } else {
                        return `❌ ${result.message}`;
                    }
                }
            },

            find: {
                description: "Search for files in CTF filesystem",
                execute: (args) => {
                    if (!window.virtualFS) {
                        return "❌ CTF mode not active. Type 'play' to start!";
                    }
                    
                    // Check if CTF is completed
                    if (window.virtualFS.foundFlags.length >= 11) {
                        return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                    }
                    
                    const startPath = args[0] || '.';
                    const name = args[1] || '';
                    const type = args[2] || '';
                    
                    const result = window.virtualFS.find(startPath, name, type);
                    
                    return result.success ? result.content : `❌ ${result.message}`;
                }
            },

            grep: {
                description: "Search patterns in files",
                execute: (args) => {
                    if (!window.virtualFS) {
                        return "❌ CTF mode not active. Type 'play' to start!";
                    }
                    
                    // Check if CTF is completed
                    if (window.virtualFS.foundFlags.length >= 11) {
                        return "🎉 CTF COMPLETED! All flags found. CTF mode disabled.\n💡 Use 'decode' and 'status' commands only.";
                    }
                    
                    if (args.length < 2) {
                        return "❌ Usage: grep <pattern> <filename>";
                    }
                    
                    const pattern = args[0];
                    const filename = args[1];
                    
                    const result = window.virtualFS.grep(pattern, filename);
                    
                    return result.success ? result.content : `❌ ${result.message}`;
                }
            },

            decode: {
                description: "Decode base64 strings (CTF helper)",
                execute: (args) => {
                    if (!args[0]) {
                        return "❌ Usage: decode <base64_string>\n💡 Example: decode ZmxhZ3t0ZXN0fQ==";
                    }
                    
                    try {
                        const decoded = atob(args[0]);
                        
                        // Check if decoded text contains a flag
                        if (window.virtualFS) {
                            window.virtualFS.checkForFlag(decoded);
                        }
                        
                        return `🔓 Decoded: ${decoded}`;
                    } catch (error) {
                        return "❌ Invalid base64 string";
                    }
                }
            },

            status: {
                description: "Show CTF game status",
                execute: () => {
                    if (!window.virtualFS) {
                        return "❌ CTF mode not active. Type 'play' to start!";
                    }
                    
                    const status = window.virtualFS.getGameStatus();
                    
                    return `🚩 CTF GAME STATUS

📍 Current Directory: ${status.currentPath}
🏆 Flags Found: ${status.foundFlags}/${status.totalFlags}
📊 Progress: ${Math.round((status.foundFlags / status.totalFlags) * 100)}%

🚩 Found Flags:
${status.flags.length > 0 ? status.flags.map((flag, i) => `${i + 1}. ${flag}`).join('\n') : 'None found yet'}

${status.foundFlags === status.totalFlags ? '🎉 CHALLENGE COMPLETED! 🎉' : '💡 Keep exploring to find more flags!'}`;
                }
            },

            exit: {
                description: "Exit terminal simulation",
                execute: () => {
                    return "Connection terminated. Access logged. Have a nice day, hacker.";
                }
            }
        };
    }

    execute(input) {
        const parts = input.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1); // Keep original case for arguments
        
        // Add to command history
        this.commandHistory.push(input);
        
        // Add command processing delay for realism
        const processingDelay = Math.random() * 200 + 100;
        
        setTimeout(() => {
            if (this.commands[command]) {
                const result = this.commands[command].execute(args);
                if (result !== null && window.terminal) {
                    // Add typing effect for output
                    window.terminal.typeOutput(result);
                }
            } else {
                if (window.terminal) {
                    window.terminal.addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
                }
            }
        }, processingDelay);
    }

    getAvailableCommands() {
        return Object.keys(this.commands);
    }

    getCommandDescription(command) {
        return this.commands[command] ? this.commands[command].description : 'Unknown command';
    }

    getCommandHistory() {
        return [...this.commandHistory];
    }

    clearCommandHistory() {
        this.commandHistory = [];
    }

    addToHistory(command) {
        this.commandHistory.push(command);
    }
}

// Export for use in other modules
window.Commands = Commands; 