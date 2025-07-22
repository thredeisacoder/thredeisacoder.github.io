// ===== VIRTUAL FILESYSTEM MODULE =====

class VirtualFileSystem {
    constructor() {
        this.currentPath = '/home/threde';
        this.history = ['/home/threde'];
        this.hiddenFlags = [];
        this.foundFlags = [];
        this.fileSystem = this.initializeFileSystem();
    }

    initializeFileSystem() {
        return {
            '/': {
                type: 'directory',
                children: {
                    'home': {
                        type: 'directory',
                        children: {
                            'threde': {
                                type: 'directory',
                                children: {
                                    'Documents': {
                                        type: 'directory',
                                        children: {
                                            'notes.txt': {
                                                type: 'file',
                                                content: 'Remember: The first flag is hidden in plain sight.\nLook for files that start with dots...',
                                                size: '145'
                                            },
                                            'passwords.txt': {
                                                type: 'file', 
                                                content: 'admin:admin123\nroot:password\nguest:guest\n\n# The real password is encoded in base64 somewhere...',
                                                size: '89'
                                            },
                                            'projects': {
                                                type: 'directory',
                                                children: {
                                                    'ctf_tools': {
                                                        type: 'directory',
                                                        children: {
                                                            'decoder.py': {
                                                                type: 'file',
                                                                content: '#!/usr/bin/env python3\n# Base64 decoder\nimport base64\n\n# Hint: ZmxhZ3tmaXJzdF9mbGFnX2ZvdW5kfQ==',
                                                                size: '112'
                                                            },
                                                            'scanner.sh': {
                                                                type: 'file',
                                                                content: '#!/bin/bash\n# Network scanner\necho "Scanning network..."\n# Hidden: Check /var/log/scan.log',
                                                                size: '98'
                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    'Downloads': {
                                        type: 'directory',
                                        children: {
                                            'exploit.zip': {
                                                type: 'file',
                                                content: '[BINARY FILE] - Use "unzip" to extract\nContains: exploit.exe, readme.txt',
                                                size: '2048'
                                            }
                                        }
                                    },
                                    '.hidden': {
                                        type: 'directory',
                                        hidden: true,
                                        children: {
                                            '.secret': {
                                                type: 'file',
                                                hidden: true,
                                                content: 'flag{first_flag_found}\n\nCongratulations! You found the first flag.\nHint for next flag: Look deeper into system files...',
                                                size: '78'
                                            },
                                            'backup.tar.gz': {
                                                type: 'file',
                                                hidden: true,
                                                content: '[COMPRESSED FILE] - Contains encrypted data\nPassword hint: Check the admin password file',
                                                size: '4096'
                                            }
                                        }
                                    },
                                    '.bashrc': {
                                        type: 'file',
                                        hidden: true,
                                        content: '# Bash configuration\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\n\n# Secret: flag{hidden_in_config}',
                                        size: '156'
                                    }
                                }
                            }
                        }
                    },
                    'var': {
                        type: 'directory',
                        children: {
                            'log': {
                                type: 'directory',
                                children: {
                                    'system.log': {
                                        type: 'file',
                                        content: '2024-01-03 15:30:12 - System boot\n2024-01-03 15:30:45 - User login: threde\n2024-01-03 15:31:02 - Suspicious activity detected',
                                        size: '156'
                                    },
                                    'scan.log': {
                                        type: 'file',
                                        content: 'Network scan results:\n192.168.1.1 - OPEN\n192.168.1.100 - FILTERED\n\nflag{network_discovery_complete}',
                                        size: '98'
                                    },
                                    '.hidden_logs': {
                                        type: 'directory',
                                        hidden: true,
                                        children: {
                                            'access.log': {
                                                type: 'file',
                                                content: 'Unauthorized access attempts:\n10.0.0.50 - FAILED\n172.16.1.25 - SUCCESS\n\nflag{access_logs_reviewed}',
                                                size: '112'
                                            }
                                        }
                                    }
                                }
                            },
                            'www': {
                                type: 'directory',
                                children: {
                                    'html': {
                                        type: 'directory',
                                        children: {
                                            'index.html': {
                                                type: 'file',
                                                content: '<!DOCTYPE html>\n<html>\n<head><title>Hacked Site</title></head>\n<body>\n<!-- flag{web_source_discovered} -->\n</body>\n</html>',
                                                size: '134'
                                            },
                                            'admin': {
                                                type: 'directory',
                                                children: {
                                                    'config.php': {
                                                        type: 'file',
                                                        content: '<?php\n$db_pass = "ZmxhZ3tkYXRhYmFzZV9jcmVkZW50aWFsc30=";\n// Base64 encoded password\n?>',
                                                        size: '89'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'etc': {
                        type: 'directory',
                        children: {
                            'passwd': {
                                type: 'file',
                                content: 'root:x:0:0:root:/root:/bin/bash\nthrede:x:1000:1000:Threde Nolan:/home/threde:/bin/bash\nguest:x:1001:1001:Guest:/home/guest:/bin/sh',
                                size: '145'
                            },
                            'shadow': {
                                type: 'file',
                                content: 'root:$6$encrypted$hash...\nthrede:$6$another$hash...\n\n# flag{system_files_accessed}',
                                size: '89',
                                permissions: '600'
                            },
                            'hosts': {
                                type: 'file',
                                content: '127.0.0.1 localhost\n192.168.1.100 threde-workstation\n10.0.0.1 secret-server\n\n# Hidden: Check secret-server',
                                size: '112'
                            }
                        }
                    },
                    'tmp': {
                        type: 'directory',
                        children: {
                            '.temp_files': {
                                type: 'directory',
                                hidden: true,
                                children: {
                                    'memory_dump.bin': {
                                        type: 'file',
                                        content: '[BINARY DATA]\n0x48656C6C6F20576F726C64\nASCII: Hello World\n\nflag{memory_forensics_master}',
                                        size: '2048'
                                    }
                                }
                            },
                            'exploit_payload.txt': {
                                type: 'file',
                                content: 'Payload for buffer overflow:\n\\x41\\x41\\x41\\x41\\x42\\x42\\x42\\x42\n\nflag{exploit_development_skills}',
                                size: '98'
                            }
                        }
                    },
                    'root': {
                        type: 'directory',
                        permissions: '700',
                        children: {
                            '.ssh': {
                                type: 'directory',
                                hidden: true,
                                children: {
                                    'id_rsa': {
                                        type: 'file',
                                        content: '-----BEGIN RSA PRIVATE KEY-----\n[ENCRYPTED KEY DATA]\n-----END RSA PRIVATE KEY-----\n\nflag{ssh_keys_compromised}',
                                        size: '1024',
                                        permissions: '600'
                                    }
                                }
                            },
                                                         'flag.txt': {
                                type: 'file',
                                content: 'flag{root_access_achieved}\n\nCongratulations! You have gained root access.\nFinal challenge: Find the master flag hidden in the kernel.',
                                size: '89',
                                permissions: '600'
                            },
                            '.secret_vault': {
                                type: 'directory',
                                hidden: true,
                                children: {
                                    'master_key.txt': {
                                        type: 'file',
                                        content: 'MASTER KEY: flag{ultimate_hacker_champion}\n\n🎉 CONGRATULATIONS! 🎉\nYou have successfully completed the CTF challenge!\n\nSkills demonstrated:\n✓ File system navigation\n✓ Hidden file discovery\n✓ Permission bypassing\n✓ Pattern recognition\n✓ Persistence and methodology\n\nWelcome to the elite hackers club! 🏆',
                                        size: '234',
                                        permissions: '600'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    // Navigation methods
    cd(path) {
        if (!path || path === '') {
            this.currentPath = '/home/threde';
            return { success: true, message: '' };
        }

        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            if (parts.length > 1) {
                parts.pop();
                this.currentPath = '/' + parts.join('/');
            } else {
                this.currentPath = '/';
            }
            return { success: true, message: '' };
        }

        if (path === '/') {
            this.currentPath = '/';
            return { success: true, message: '' };
        }

        if (path === '~') {
            this.currentPath = '/home/threde';
            return { success: true, message: '' };
        }

        let targetPath;
        if (path.startsWith('/')) {
            targetPath = path;
        } else {
            targetPath = this.currentPath === '/' ? '/' + path : this.currentPath + '/' + path;
        }

        const item = this.getItem(targetPath);
        if (!item) {
            return { success: false, message: `cd: ${path}: No such file or directory` };
        }

        if (item.type !== 'directory') {
            return { success: false, message: `cd: ${path}: Not a directory` };
        }

        if (item.permissions === '700' && !this.isRoot()) {
            return { success: false, message: `cd: ${path}: Permission denied` };
        }

        this.currentPath = targetPath;
        this.history.push(targetPath);
        return { success: true, message: '' };
    }

    ls(options = '', path = '') {
        const showHidden = options.includes('a');
        const longFormat = options.includes('l');
        
        const targetPath = path || this.currentPath;
        const item = this.getItem(targetPath);
        
        if (!item) {
            return { success: false, message: `ls: ${path}: No such file or directory` };
        }

        if (item.type === 'file') {
            return { success: true, content: this.formatFileList([{ name: path.split('/').pop(), item }], longFormat) };
        }

        const children = item.children || {};
        let files = [];

        for (const [name, childItem] of Object.entries(children)) {
            if (!showHidden && (childItem.hidden || name.startsWith('.'))) {
                continue;
            }
            files.push({ name, item: childItem });
        }

        files.sort((a, b) => {
            if (a.item.type !== b.item.type) {
                return a.item.type === 'directory' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        });

        return { success: true, content: this.formatFileList(files, longFormat) };
    }

    formatFileList(files, longFormat) {
        if (!longFormat) {
            return files.map(f => f.name).join('  ');
        }

        let output = '';
        for (const { name, item } of files) {
            const permissions = item.permissions || (item.type === 'directory' ? '755' : '644');
            const size = item.size || '0';
            const type = item.type === 'directory' ? 'd' : '-';
            const permStr = this.permissionsToString(permissions);
            
            output += `${type}${permStr} 1 threde threde ${size.padStart(8)} Jan  3 15:42 ${name}\n`;
        }
        return output.trim();
    }

    permissionsToString(perm) {
        const octal = perm.padStart(3, '0');
        let result = '';
        
        for (let i = 0; i < 3; i++) {
            const digit = parseInt(octal[i]);
            result += (digit & 4 ? 'r' : '-');
            result += (digit & 2 ? 'w' : '-');
            result += (digit & 1 ? 'x' : '-');
        }
        
        return result;
    }

    cat(filename) {
        const filePath = this.resolvePath(filename);
        const item = this.getItem(filePath);
        
        if (!item) {
            return { success: false, message: `cat: ${filename}: No such file or directory` };
        }

        if (item.type === 'directory') {
            return { success: false, message: `cat: ${filename}: Is a directory` };
        }

        if (item.permissions === '600' && !this.isRoot()) {
            return { success: false, message: `cat: ${filename}: Permission denied` };
        }

        // Check for flags in content
        this.checkForFlag(item.content);

        return { success: true, content: item.content };
    }

    find(startPath = '.', name = '', type = '') {
        const resolvedStart = this.resolvePath(startPath);
        const results = [];
        
        this.findRecursive(resolvedStart, name, type, results);
        
        if (results.length === 0) {
            return { success: true, content: 'No files found matching criteria' };
        }
        
        return { success: true, content: results.join('\n') };
    }

    findRecursive(currentPath, name, type, results) {
        const item = this.getItem(currentPath);
        if (!item || item.type !== 'directory') return;

        const children = item.children || {};
        
        for (const [childName, childItem] of Object.entries(children)) {
            const childPath = currentPath === '/' ? '/' + childName : currentPath + '/' + childName;
            
            // Check if matches criteria
            let matches = true;
            if (name && !childName.includes(name)) matches = false;
            if (type && childItem.type !== type) matches = false;
            
            if (matches) {
                results.push(childPath);
            }
            
            // Recurse into directories
            if (childItem.type === 'directory') {
                this.findRecursive(childPath, name, type, results);
            }
        }
    }

    grep(pattern, filename) {
        const filePath = this.resolvePath(filename);
        const item = this.getItem(filePath);
        
        if (!item) {
            return { success: false, message: `grep: ${filename}: No such file or directory` };
        }

        if (item.type === 'directory') {
            return { success: false, message: `grep: ${filename}: Is a directory` };
        }

        const lines = item.content.split('\n');
        const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
        
        if (matches.length === 0) {
            return { success: true, content: 'No matches found' };
        }

        // Check for flags in matches
        matches.forEach(match => this.checkForFlag(match));
        
        return { success: true, content: matches.join('\n') };
    }

    pwd() {
        return { success: true, content: this.currentPath };
    }

    // Utility methods
    getItem(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem['/'];
        
        for (const part of parts) {
            if (!current.children || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }
        
        return current;
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }
        if (path === '~') {
            return '/home/threde';
        }
        if (path.startsWith('~/')) {
            return '/home/threde' + path.substring(1);
        }
        
        return this.currentPath === '/' ? '/' + path : this.currentPath + '/' + path;
    }

    isRoot() {
        return window.currentUser === 'root' || this.foundFlags.length >= 5;
    }

    checkForFlag(content) {
        const flagPattern = /flag\{([^}]+)\}/g;
        let match;
        
        while ((match = flagPattern.exec(content)) !== null) {
            const flag = match[0];
            if (!this.foundFlags.includes(flag)) {
                this.foundFlags.push(flag);
                this.showFlagFound(flag);
            }
        }
    }

    showFlagFound(flag) {
        if (window.terminal) {
            window.terminal.addOutput(`\n🚩 FLAG FOUND: ${flag}`, 'success');
            window.terminal.addOutput(`Total flags found: ${this.foundFlags.length}/11`, 'info');
            
            if (this.foundFlags.length === 11) {
                window.terminal.addOutput('\n🎉 CONGRATULATIONS! You found all flags!', 'success');
                window.terminal.addOutput('You are now a CTF master! 🏆', 'success');
                window.terminal.addOutput('\n╔══════════════════════════════════════════════════════════════╗', 'success');
                window.terminal.addOutput('║                    CHALLENGE COMPLETED!                      ║', 'success');
                window.terminal.addOutput('╚══════════════════════════════════════════════════════════════╝', 'success');
                window.terminal.addOutput('\n✅ CTF mode automatically disabled.', 'info');
                window.terminal.addOutput('💡 Only "decode" and "status" commands are now available.', 'info');
                window.terminal.addOutput('🎯 Type "status" to see your final achievement!', 'info');
            }
        }
    }

    // Game status
    getGameStatus() {
        return {
            currentPath: this.currentPath,
            foundFlags: this.foundFlags.length,
            totalFlags: 11,
            flags: this.foundFlags
        };
    }

    // Help system for CTF commands
    getHelp() {
        return `🚩 CTF FILESYSTEM EXPLORATION GUIDE

📁 NAVIGATION COMMANDS:
   cd <directory>     - Change directory
   ls [-la] [path]    - List directory contents (-a shows hidden files)
   pwd                - Show current directory
   find <path> <name> - Search for files/directories

📄 FILE COMMANDS:
   cat <file>         - Display file contents
   grep <pattern> <file> - Search for patterns in files
   
🎯 CTF TIPS:
   • Look for hidden files (starting with .)
   • Check system directories (/var, /etc, /tmp)
   • Examine file contents for flags
   • Decode base64 strings you find
   • Check configuration files and logs
   
 🚩 FLAGS FORMAT: flag{description}
 🏆 GOAL: Find all 11 hidden flags!
 
 Current progress: ${this.foundFlags.length}/11 flags found`;
    }
}

// Export for use in other modules
window.VirtualFileSystem = VirtualFileSystem; 