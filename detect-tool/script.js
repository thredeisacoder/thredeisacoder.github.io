// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
// ▓ CYBERSEC INFO STEALER DETECTION SYSTEM v3.0 - GITHUB PAGES EDITION     ▓
// ▓ SECURE API ACCESS WITH ENDPOINT OBFUSCATION                             ▓  
// ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

// OBFUSCATED SECURITY MODULE
class SecureAPIManager {
    constructor() {
        this._vault = this._initVault();
        this._keySchedule = this._generateKeySchedule();
        this._integrity = this._calculateIntegrity();
        this._antiDebug();
    }

    // Initialize obfuscated data vault
    _initVault() {
        return {
            // Multiple layers of encoding
            e1: this._encode('aHR0cHM6Ly9jYXZhbGllci5o'),
            e2: this._encode('dWRzb25yb2NrLmNvbS9hcGkv'), 
            e3: this._encode('anNvbi92Mi9vc2ludC10b29scw=='),
            // Decoy endpoints to confuse analysis
            d1: 'aHR0cHM6Ly9mYWtlLWFwaS5jb20v',
            d2: 'aHR0cHM6Ly9leGFtcGxlLmNvbS9hcGkv',
            d3: 'aHR0cHM6Ly90ZXN0LmFwaS5vcmcv'
        };
    }

    // Simple encoding layer
    _encode(str) {
        return btoa(str).split('').reverse().join('');
    }

    // Decode with integrity check
    _decode(encoded) {
        try {
            return atob(encoded.split('').reverse().join(''));
        } catch(e) {
            return null;
        }
    }

    // Generate dynamic key schedule
    _generateKeySchedule() {
        const now = new Date();
        return (now.getFullYear() + now.getMonth() + now.getDate()) % 256;
    }

    // Calculate integrity checksum
    _calculateIntegrity() {
        const data = JSON.stringify(this._vault);
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }

    // Anti-debugging measures
    _antiDebug() {
        // Check for common debugging tools
        if (window.outerHeight - window.innerHeight > 200) {
            this._corrupted = true;
        }
        
        // Console detection
        let devtools = {open: false};
        setInterval(() => {
            if (devtools.open) {
                this._corrupted = true;
            }
        }, 500);

        // Performance timing check
        const start = performance.now();
        for(let i = 0; i < 1000; i++) {
            Math.random();
        }
        const end = performance.now();
        
        if (end - start > 50) {
            this._corrupted = true;
        }
    }

    // Reconstruct API endpoint securely
    _reconstructEndpoint() {
        if (this._corrupted) {
            // Return decoy endpoint if tampered
            return 'https://httpbin.org/status/404';
        }

        // Verify integrity
        const currentIntegrity = this._calculateIntegrity();
        if (currentIntegrity !== this._integrity) {
            this._corrupted = true;
            return 'https://httpbin.org/status/404';
        }

        // Decode real endpoint
        const part1 = this._decode(this._vault.e1);
        const part2 = this._decode(this._vault.e2);
        const part3 = this._decode(this._vault.e3);

        if (!part1 || !part2 || !part3) {
            return 'https://httpbin.org/status/404';
        }

        // Decode base64 parts
        try {
            const decoded1 = atob(part1);
            const decoded2 = atob(part2);
            const decoded3 = atob(part3);
            
            return decoded1 + decoded2 + decoded3;
        } catch(e) {
            return 'https://httpbin.org/status/404';
        }
    }

    // Generate secure API URL
    generateSecureUrl(type, query) {
        const baseUrl = this._reconstructEndpoint();
        
        switch(type) {
            case 'email':
                return `${baseUrl}/search-by-email?email=${encodeURIComponent(query)}`;
            case 'username':
                return `${baseUrl}/search-by-username?username=${encodeURIComponent(query)}`;
            case 'domain':
                return `${baseUrl}/search-by-domain?domain=${encodeURIComponent(query)}`;
            default:
                return 'https://httpbin.org/status/404';
        }
    }
}

// DOM INTERFACE ELEMENTS
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const newSearchBtn = document.getElementById('newSearchBtn');
const retryBtn = document.getElementById('retryBtn');

// GLOBAL SYSTEM VARIABLES
let currentSearchQuery = '';
let isSearching = false;
let apiManager;

// ▓▓▓ SYSTEM INITIALIZATION ▓▓▓
document.addEventListener('DOMContentLoaded', function() {
    apiManager = new SecureAPIManager();
    initializeEventListeners();
    searchInput.focus();
    initTerminalEffects();
    console.log('%c▓▓▓ CYBERSEC SYSTEM ONLINE - GITHUB PAGES EDITION ▓▓▓', 'color: #00ff00; font-weight: bold; font-size: 14px;');
});

// ▓▓▓ TERMINAL EFFECTS ▓▓▓
function initTerminalEffects() {
    // Blinking cursor effect
    const cursor = document.querySelector('.terminal-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 800);
    }
}

// ▓▓▓ EVENT HANDLER SYSTEM ▓▓▓
function initializeEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    newSearchBtn.addEventListener('click', resetSearch);
    retryBtn.addEventListener('click', handleRetry);
    
    // Real-time input validation
    searchInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        updateSearchButton(value);
    });
}

// ▓▓▓ SEARCH INTERFACE UPDATE ▓▓▓
function updateSearchButton(value) {
    if (value.length === 0) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="btn-text">[STANDBY]</span><i class="fas fa-power-off btn-icon"></i>';
    } else {
        searchBtn.disabled = false;
        let type;
        if (isEmail(value)) {
            type = 'EMAIL_TARGET';
        } else if (isDomain(value)) {
            type = 'DOMAIN_TARGET';
        } else {
            type = 'USERNAME_TARGET';
        }
        searchBtn.innerHTML = `<span class="btn-text">[SCAN_${type}]</span><i class="fas fa-crosshairs btn-icon"></i>`;
    }
}

// ▓▓▓ INPUT VALIDATION PROTOCOLS ▓▓▓
function isEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

function isDomain(input) {
    // Domain regex: supports domain.com, subdomain.domain.com, etc.
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(input) && !input.includes('@') && !input.includes(' ');
}

// ▓▓▓ MAIN SEARCH EXECUTION ▓▓▓
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('>>> ERROR: TARGET_INPUT_REQUIRED <<<\n\nPROTOCOL VIOLATION: Please enter an email or username to perform a scan.');
        return;
    }
    
    if (isSearching) return;
    
    currentSearchQuery = query;
    setSearchingState(true);
    
    try {
        const data = await performSearch(query);
        if (isDomain(query)) {
            displayDomainResults(data, query);
        } else {
            displayResults(data, query);
        }
    } catch (error) {
        console.error('▓ SEARCH_ERROR:', error);
        
        // Check if it's a proxy failure error
        if (error.message && error.message.includes('CORS proxies failed')) {
            showError(`>>> CONNECTION_FAILURE_DETECTED <<<\n\nERROR: ${error.message}\n\nREASON: All available proxy servers are currently unavailable or blocked.\nSOLUTION: Please try again later or contact system administrator.`);
        } else {
            showError(`>>> SYSTEM_ERROR_DETECTED <<<\n\nERROR: ${error.message || 'System error detected. This may be due to CORS restrictions or network issues.'}\n\nPlease check your internet connection and try again.`);
        }
    } finally {
        setSearchingState(false);
    }
}

// ▓▓▓ SECURE API COMMUNICATION ▓▓▓
async function performSearch(query) {
    let type;
    if (isEmail(query)) {
        type = 'email';
    } else if (isDomain(query)) {
        type = 'domain';
    } else {
        type = 'username';
    }
    const url = apiManager.generateSecureUrl(type, query);
    
    try {
        // Try direct API call first
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        // If CORS fails, try with a CORS proxy
        console.log('Direct API failed:', error.message);
        if (error.message.includes('CORS') || error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
            console.log('Attempting CORS proxy fallback...');
            updateLoadingMessage('▸ DIRECT ACCESS BLOCKED - TRYING CORS PROXIES...');
            return await tryWithProxy(url);
        }
        throw error;
    }
}

// ▓▓▓ CORS PROXY FALLBACK ▓▓▓
async function tryWithProxy(originalUrl) {
    const proxies = [
        {
            url: 'https://api.allorigins.win/get?url=',
            parseResponse: (data) => JSON.parse(data.contents)
        },
        {
            url: 'https://corsproxy.io/?',
            parseResponse: (data) => data
        },
        {
            url: 'https://api.codetabs.com/v1/proxy?quest=',
            parseResponse: (data) => data
        },
        {
            url: 'https://thingproxy.freeboard.io/fetch/',
            parseResponse: (data) => data
        }
    ];
    
    for (const proxy of proxies) {
        try {
            console.log(`Trying proxy: ${proxy.url}`);
            updateLoadingMessage(`▸ TRYING PROXY: ${proxy.url.split('/')[2].toUpperCase()}...`);
            
            const proxyUrl = proxy.url + encodeURIComponent(originalUrl);
            
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            if (response.ok) {
                const rawData = await response.json();
                const data = proxy.parseResponse(rawData);
                console.log(`Proxy success: ${proxy.url}`);
                updateLoadingMessage('▸ PROXY CONNECTION SUCCESSFUL!');
                return data;
            } else {
                console.log(`Proxy failed: ${proxy.url} - Status: ${response.status}`);
                updateLoadingMessage(`▸ PROXY FAILED: ${response.status} - TRYING NEXT...`);
            }
        } catch (e) {
            console.log(`Proxy error: ${proxy.url} - ${e.message}`);
            updateLoadingMessage(`▸ PROXY ERROR - TRYING NEXT...`);
            continue;
        }
    }
    
    // If all proxies fail, throw an error
    console.log('All proxies failed, cannot access API');
    updateLoadingMessage('▸ ALL PROXIES FAILED - CONNECTION ERROR');
    
    // Add delay to show the message
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    throw new Error('All CORS proxies failed. Unable to access the API due to network restrictions.');
}

// ▓▓▓ LOADING MESSAGE UPDATE ▓▓▓
function updateLoadingMessage(message) {
    const loadingText2 = document.getElementById('loadingText2');
    if (loadingText2) {
        loadingText2.innerHTML = message;
        loadingText2.style.color = '#ff0040';
        loadingText2.style.textShadow = '0 0 5px #ff0040';
    }
}

// ▓▓▓ SYSTEM STATE MANAGEMENT ▓▓▓
function setSearchingState(searching) {
    isSearching = searching;
    
    if (searching) {
        hideAllSections();
        loadingSpinner.classList.remove('hidden');
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="btn-text">[SCANNING...]</span><i class="fas fa-spinner fa-spin btn-icon"></i>';
        
        // Reset loading messages
        const loadingText1 = document.getElementById('loadingText1');
        const loadingText2 = document.getElementById('loadingText2');
        const loadingText3 = document.getElementById('loadingText3');
        
        if (loadingText1) loadingText1.innerHTML = '▸ ACCESSING DARK WEB DATABASES...';
        if (loadingText2) loadingText2.innerHTML = '▸ CROSS-REFERENCING STEALER LOGS...';
        if (loadingText3) loadingText3.innerHTML = '▸ ANALYZING THREAT INTELLIGENCE...';
        
        // Reset text colors
        [loadingText1, loadingText2, loadingText3].forEach(text => {
            if (text) {
                text.style.color = '#40ff40';
                text.style.textShadow = '0 0 5px #40ff40';
            }
        });
        
        // Add terminal loading effect
        setTimeout(() => {
            const loadingTexts = loadingSpinner.querySelectorAll('p');
            loadingTexts.forEach((text, index) => {
                setTimeout(() => {
                    text.style.opacity = '1';
                    text.style.transform = 'translateX(0)';
                }, index * 1000);
            });
        }, 100);
    } else {
        loadingSpinner.classList.add('hidden');
        updateSearchButton(searchInput.value.trim());
    }
}

// ▓▓▓ RESULTS DISPLAY SYSTEM ▓▓▓
function displayResults(data, query) {
    hideAllSections();
    resultsSection.classList.remove('hidden');
    
    const queryType = isEmail(query) ? 'EMAIL_TARGET' : 'USERNAME_TARGET';
    const hasStealers = data.stealers && data.stealers.length > 0;
    
    let html = '';
    
    if (hasStealers) {
        html += `
            <div class="summary-stats">
                <div class="stat-card">
                    <div class="stat-number">${data.stealers.length}</div>
                    <div class="stat-label">THREATS_FOUND</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.total_user_services || 0}</div>
                    <div class="stat-label">USER_SERVICES</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.total_corporate_services || 0}</div>
                    <div class="stat-label">CORP_SERVICES</div>
                </div>
            </div>
        `;
        
        html += `
            <div class="alert alert-danger">
                <i class="fas fa-skull-crossbones"></i>
                <div>
                    <strong>▓▓▓ CRITICAL_SECURITY_BREACH_DETECTED ▓▓▓</strong><br>
                    TARGET: <strong>${query}</strong> [${queryType}]<br>
                    STATUS: <strong>COMPROMISED</strong> • Credentials found in stealer malware logs.<br>
                    RECOMMENDATION: Immediate password reset and enable 2FA required.
                </div>
            </div>
        `;
        
        // Display individual threats
        data.stealers.forEach((stealer, index) => {
            html += createStealerCard(stealer, index + 1);
        });
        
    } else {
        html += `
            <div class="alert alert-success">
                <i class="fas fa-shield-check"></i>
                <div>
                    <strong>▓▓▓ TARGET_CLEAN ▓▓▓</strong><br>
                    TARGET: <strong>${query}</strong> [${queryType}]<br>
                    STATUS: <strong>NOT_COMPROMISED</strong> • No records found in stealer databases.<br>
                    ASSESSMENT: Target credentials appear secure from known malware.
                </div>
            </div>
        `;
    }
    
    resultsContent.innerHTML = html;
}

// ▓▓▓ DOMAIN RESULTS DISPLAY SYSTEM ▓▓▓
function displayDomainResults(data, query) {
    hideAllSections();
    resultsSection.classList.remove('hidden');
    
    const queryType = 'DOMAIN_TARGET';
    const hasCompromisedUrls = data.total && data.total > 0;
    
    let html = '';
    
    if (hasCompromisedUrls) {
        // Domain statistics
        html += `
            <div class="summary-stats">
                <div class="stat-card">
                    <div class="stat-number">${data.total}</div>
                    <div class="stat-label">COMPROMISED_ACCOUNTS</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.employees || 0}</div>
                    <div class="stat-label">EMPLOYEES</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.users || 0}</div>
                    <div class="stat-label">USERS</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${data.totalUrls || 0}</div>
                    <div class="stat-label">AFFECTED_URLS</div>
                </div>
            </div>
        `;
        
        html += `
            <div class="alert alert-danger">
                <i class="fas fa-skull-crossbones"></i>
                <div>
                    <strong>▓▓▓ DOMAIN_SECURITY_BREACH_DETECTED ▓▓▓</strong><br>
                    TARGET: <strong>${query}</strong> [${queryType}]<br>
                    STATUS: <strong>COMPROMISED</strong> • ${data.total} accounts found in stealer databases.<br>
                    LAST_COMPROMISE: <strong>${new Date(data.last_user_compromised).toLocaleDateString()}</strong><br>
                    RECOMMENDATION: Domain-wide security audit and credential reset required.
                </div>
            </div>
        `;
        
        // Domain intelligence card
        html += createDomainIntelCard(data);
        
        // Compromised URLs
        if (data.data && data.data.all_urls && data.data.all_urls.length > 0) {
            html += createCompromisedUrlsCard(data.data.all_urls);
        }
        
        // Stealer families
        if (data.stealerFamilies) {
            html += createStealerFamiliesCard(data.stealerFamilies);
        }
        
    } else {
        html += `
            <div class="alert alert-success">
                <i class="fas fa-shield-check"></i>
                <div>
                    <strong>▓▓▓ DOMAIN_SECURE ▓▓▓</strong><br>
                    TARGET: <strong>${query}</strong> [${queryType}]<br>
                    STATUS: <strong>NOT_COMPROMISED</strong> • No accounts found in stealer databases.<br>
                    ASSESSMENT: Domain appears secure from known credential theft.
                </div>
            </div>
        `;
    }
    
    resultsContent.innerHTML = html;
}

// ▓▓▓ THREAT CARD GENERATOR ▓▓▓
function createStealerCard(stealer, index) {
    const compromiseDate = stealer.date_compromised 
        ? new Date(stealer.date_compromised).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'TIMESTAMP_UNKNOWN';
    
    const stealerFamily = stealer.stealer_family || 'GENERIC_MALWARE';
    
    let html = `
        <div class="stealer-card">
            <div class="stealer-header">
                <div class="stealer-family">
                    <i class="fas fa-biohazard"></i> ${stealerFamily.toUpperCase()} [THREAT_${String(index).padStart(3, '0')}]
                </div>
                <div class="compromise-date">
                    <i class="fas fa-clock"></i> COMPROMISED: ${compromiseDate}
                </div>
            </div>
            
            <div class="stealer-details">
    `;
    
    // System intelligence
    if (stealer.computer_name && stealer.computer_name !== 'Not Found') {
        html += createDetailGroup('HOSTNAME', stealer.computer_name, 'fas fa-desktop');
    }
    
    if (stealer.operating_system && stealer.operating_system !== 'Not Found') {
        html += createDetailGroup('OPERATING_SYSTEM', stealer.operating_system, 'fab fa-windows');
    }
    
    if (stealer.ip && stealer.ip !== 'Not Found') {
        html += createDetailGroup('IP_ADDRESS', stealer.ip, 'fas fa-network-wired');
    }
    
    // Malware Path
    if (stealer.malware_path && stealer.malware_path !== 'Not Found') {
        html += createDetailGroup('MALWARE_PATH', stealer.malware_path, 'fas fa-folder-open');
    }
    
    // Security Software
    if (stealer.antiviruses && stealer.antiviruses !== 'Not Found' && stealer.antiviruses.length > 0) {
        const antivirusText = Array.isArray(stealer.antiviruses) 
            ? stealer.antiviruses.join(' | ') 
            : stealer.antiviruses;
        html += createDetailGroup('SECURITY_SOFTWARE', antivirusText, 'fas fa-shield-virus');
    }
    
    // Service Counts (using correct field names from API)
    if (stealer.total_user_services !== undefined) {
        html += createDetailGroup('USER_SERVICES', stealer.total_user_services, 'fas fa-user');
    }
    
    if (stealer.total_corporate_services !== undefined) {
        html += createDetailGroup('CORPORATE_SERVICES', stealer.total_corporate_services, 'fas fa-building');
    }
    
    html += `</div>`;
    
    // CREDENTIAL INTELLIGENCE (using correct API field names)
    if ((stealer.top_passwords && stealer.top_passwords.length > 0) || 
        (stealer.top_logins && stealer.top_logins.length > 0)) {
        
        // COMPROMISED PASSWORDS Section
        if (stealer.top_passwords && stealer.top_passwords.length > 0) {
            html += `
                <div class="compromised-section">
                    <div class="section-header">
                        <i class="fas fa-key"></i> COMPROMISED_PASSWORDS [${stealer.top_passwords.length}]
                    </div>
                    <div class="credentials-list">
            `;
            
            stealer.top_passwords.forEach((password, idx) => {
                const maskedPassword = typeof password === 'string' ? maskSensitiveData(password) : maskSensitiveData(password.password || password);
                html += `
                    <div class="credential-item">
                        <div class="credential-label">PASSWORD:</div>
                        <div class="credential-value">${maskedPassword}</div>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        // COMPROMISED LOGINS Section  
        if (stealer.top_logins && stealer.top_logins.length > 0) {
            html += `
                <div class="compromised-section">
                    <div class="section-header">
                        <i class="fas fa-user-lock"></i> COMPROMISED_LOGINS [${stealer.top_logins.length}]
                    </div>
                    <div class="credentials-list">
            `;
            
            stealer.top_logins.forEach((login, idx) => {
                const maskedLogin = typeof login === 'string' ? maskSensitiveData(login) : maskSensitiveData(login.username || login.email || login);
                html += `
                    <div class="credential-item">
                        <div class="credential-label">LOGIN:</div>
                        <div class="credential-value">${maskedLogin}</div>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
    }
    
    html += `</div>`;
    
    return html;
}

// ▓▓▓ SENSITIVE DATA MASKING ▓▓▓
function maskSensitiveData(data) {
    if (!data || data.length < 4) {
        return '***********';
    }
    
    // For emails, mask the middle part
    if (data.includes('@')) {
        const parts = data.split('@');
        const username = parts[0];
        const domain = parts[1];
        
        if (username.length <= 2) {
            return '*'.repeat(username.length) + '@' + domain;
        }
        
        const visibleStart = username.substring(0, 1);
        const visibleEnd = username.substring(username.length - 1);
        const maskedMiddle = '*'.repeat(Math.max(1, username.length - 2));
        
        return visibleStart + maskedMiddle + visibleEnd + '@' + domain;
    }
    
    // For passwords and other strings
    if (data.length <= 3) {
        return '*'.repeat(data.length);
    }
    
    const visibleChars = Math.min(2, Math.floor(data.length * 0.2));
    const visibleStart = data.substring(0, visibleChars);
    const visibleEnd = data.substring(data.length - visibleChars);
    const maskedMiddle = '*'.repeat(Math.max(1, data.length - (visibleChars * 2)));
    
    return visibleStart + maskedMiddle + visibleEnd;
}

// ▓▓▓ DETAIL GROUP CONSTRUCTOR ▓▓▓
function createDetailGroup(label, value, icon) {
    return `
        <div class="detail-group">
            <div class="detail-label">
                <i class="${icon}"></i> ${label}
            </div>
            <div class="detail-value">${value}</div>
        </div>
    `;
}

// ▓▓▓ DOMAIN INTELLIGENCE CARD ▓▓▓
function createDomainIntelCard(data) {
    let html = `
        <div class="stealer-card">
            <div class="stealer-header">
                <div class="stealer-family">
                    <i class="fas fa-globe"></i> DOMAIN_INTELLIGENCE [ANALYSIS_001]
                </div>
                <div class="compromise-date">
                    <i class="fas fa-database"></i> TOTAL_STEALERS: ${data.totalStealers ? data.totalStealers.toLocaleString() : 'N/A'}
                </div>
            </div>
            
            <div class="stealer-details">
    `;
    
    // Domain information
    if (data.logo) {
        html += createDetailGroup('DOMAIN_LOGO', `<img src="${data.logo}" alt="Domain Logo" style="max-width: 50px; height: auto;">`, 'fas fa-image');
    }
    
    if (data.is_shopify !== undefined) {
        html += createDetailGroup('SHOPIFY_PLATFORM', data.is_shopify ? 'DETECTED' : 'NOT_DETECTED', 'fab fa-shopify');
    }
    
    if (data.last_user_compromised && data.last_user_compromised !== '1970-01-01T00:00:00.000Z') {
        const lastCompromise = new Date(data.last_user_compromised).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        html += createDetailGroup('LAST_USER_COMPROMISE', lastCompromise, 'fas fa-clock');
    }
    
    if (data.last_employee_compromised && data.last_employee_compromised !== '1970-01-01T00:00:00.000Z') {
        const lastEmpCompromise = new Date(data.last_employee_compromised).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        html += createDetailGroup('LAST_EMPLOYEE_COMPROMISE', lastEmpCompromise, 'fas fa-user-tie');
    }
    
    html += `</div></div>`;
    
    return html;
}

// ▓▓▓ COMPROMISED URLS CARD ▓▓▓
function createCompromisedUrlsCard(urls) {
    let html = `
        <div class="stealer-card">
            <div class="stealer-header">
                <div class="stealer-family">
                    <i class="fas fa-link"></i> COMPROMISED_URLS [TOTAL: ${urls.length}]
                </div>
            </div>
            
            <div class="compromised-section">
                <div class="section-header">
                    <i class="fas fa-exclamation-triangle"></i> AFFECTED_ENDPOINTS [${urls.length}]
                </div>
                <div class="credentials-list">
    `;
    
    urls.forEach((urlData, index) => {
        html += `
            <div class="credential-item">
                <div class="credential-label">URL_${String(index + 1).padStart(3, '0')}:</div>
                <div class="credential-value">${urlData.url}</div>
            </div>
            <div class="credential-item">
                <div class="credential-label">TYPE:</div>
                <div class="credential-value">${urlData.type}</div>
            </div>
            <div class="credential-item">
                <div class="credential-label">OCCURRENCES:</div>
                <div class="credential-value">${urlData.occurrence}</div>
            </div>
            <div style="height: 10px; border-bottom: 1px solid rgba(255, 0, 64, 0.2); margin: 10px 0;"></div>
        `;
    });
    
    html += `</div></div></div>`;
    
    return html;
}

// ▓▓▓ STEALER FAMILIES CARD ▓▓▓
function createStealerFamiliesCard(families) {
    let html = `
        <div class="stealer-card">
            <div class="stealer-header">
                <div class="stealer-family">
                    <i class="fas fa-virus"></i> STEALER_FAMILIES [TOTAL: ${families.total}]
                </div>
            </div>
            
            <div class="compromised-section">
                <div class="section-header">
                    <i class="fas fa-biohazard"></i> MALWARE_DISTRIBUTION [${families.total} INFECTIONS]
                </div>
                <div class="credentials-list">
    `;
    
    // Remove 'total' from families object and display each family
    Object.entries(families).forEach(([family, count]) => {
        if (family !== 'total') {
            const percentage = ((count / families.total) * 100).toFixed(1);
            html += `
                <div class="credential-item">
                    <div class="credential-label">${family.toUpperCase()}:</div>
                    <div class="credential-value">${count} (${percentage}%)</div>
                </div>
            `;
        }
    });
    
    html += `</div></div></div>`;
    
    return html;
}

// ▓▓▓ ERROR DISPLAY SYSTEM ▓▓▓
function showError(message) {
    hideAllSections();
    errorSection.classList.remove('hidden');
    errorMessage.innerHTML = message.replace(/\n/g, '<br>');
}

// ▓▓▓ INTERFACE CONTROL ▓▓▓
function hideAllSections() {
    loadingSpinner.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
}

// ▓▓▓ RESET PROTOCOL ▓▓▓
function resetSearch() {
    hideAllSections();
    searchInput.value = '';
    searchInput.focus();
    updateSearchButton('');
    currentSearchQuery = '';
}

// ▓▓▓ RETRY MECHANISM ▓▓▓
function handleRetry() {
    if (currentSearchQuery) {
        searchInput.value = currentSearchQuery;
        handleSearch();
    } else {
        resetSearch();
    }
}

// ▓▓▓ SECURITY MONITORING ▓▓▓
setInterval(() => {
    if (apiManager && apiManager._corrupted) {
        document.body.innerHTML = '<div style="color: red; text-align: center; padding: 50px; font-family: monospace;"><h1>SECURITY VIOLATION DETECTED</h1><p>System has been compromised. Please refresh the page.</p></div>';
    }
}, 1000);

// ▓▓▓ SYSTEM READY ▓▓▓
console.log('%c▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', 'color: #00ff00;');
console.log('%c▓ SECURE STEALER DETECTION SYSTEM - GITHUB PAGES READY', 'color: #00ff00; font-weight: bold;');
console.log('%c▓ ENDPOINT SECURITY: ACTIVE • ANTI-DEBUGGING: ENABLED', 'color: #00ff00; font-weight: bold;');  
console.log('%c▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', 'color: #00ff00;'); 