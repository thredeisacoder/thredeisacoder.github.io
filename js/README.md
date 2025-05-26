# JavaScript Modules Documentation

## 📁 **Module Structure**

The portfolio website JavaScript has been organized into modular components for better maintainability and debugging:

### **Core Modules**

#### 🚀 **main.js** - Application Controller
- **Purpose**: Initializes and coordinates all modules
- **Key Features**:
  - Module initialization and global state management
  - Error handling and performance monitoring
  - Global keyboard shortcuts (Ctrl+L, Ctrl+R, Escape)
  - Responsive layout handling
  - Debug mode with performance metrics

#### 📱 **loading.js** - Loading Screen Module
- **Purpose**: Manages the 7-second hacker-themed loading sequence
- **Key Features**:
  - Real-time timestamp updates
  - Progress bar animation (0-100%)
  - Automatic transition to login screen
  - Cleanup and memory management

#### 🔐 **login.js** - Login Screen Module
- **Purpose**: Handles the cinematic login simulation
- **Key Features**:
  - Simulated hacker username attempts
  - Character-by-character typing animation
  - Password crack simulation
  - User input handling and validation
  - Smooth transition to terminal

#### 💻 **terminal.js** - Terminal Interface Module
- **Purpose**: Core terminal functionality and user interaction
- **Key Features**:
  - Command input handling with history (↑/↓ arrows)
  - Tab completion for commands
  - Output formatting and scrolling
  - Control button interactions
  - Welcome message display
  - Real-time timestamp updates

#### ⚡ **effects.js** - Visual Effects Module
- **Purpose**: All visual effects and animations
- **Key Features**:
  - **Matrix Rain Effect**: Full-screen falling characters
  - **Scan Effect**: Network reconnaissance with radar visualization
  - **Hack Effect**: Advanced intrusion simulation with typing
  - **Hacked Screen**: Final compromise display with glitch effects
  - **Subtle Effects**: Background animations and typing glow
  - Effect cleanup and memory management

#### 📋 **commands.js** - Command Execution Module
- **Purpose**: Defines and executes all terminal commands
- **Available Commands**:
  - `help` - Command index with classifications
  - `about` - Classified intelligence dossier
  - `skills` - Operational capabilities with progress bars
  - `projects` - Active mission portfolio
  - `ctf` - CTF platform profiles
  - `contact` - Secure communication channels
  - `social` - Social media links
  - `tools` - Penetration testing arsenal
  - `ls`, `pwd`, `date`, `uname` - System commands
  - `history` - Command audit trail
  - `banner` - Operator identification
  - `matrix` - Matrix rain activation
  - `hack` - Intrusion simulation
  - `scan` - Network reconnaissance
  - `clear` - Terminal sanitization
  - `exit` - Connection termination

#### 📊 **panels.js** - Dynamic Panels Module
- **Purpose**: Real-time system monitoring panels
- **Panel Types**:
  - **System Monitor**: CPU, Memory, Network usage with animations
  - **Network Traffic**: Active connections and bandwidth monitoring
  - **Activity Log**: Real-time security events with timestamps
- **Features**:
  - Auto-updating data every 2-5 seconds
  - Panel controls (minimize/close) with animations
  - Smooth scrolling and fade effects
  - Log entry management (max 15 entries)

## 🔧 **Module Communication**

### **Global Window Objects**
Each module is accessible globally for inter-module communication:
- `window.loadingScreen` - LoadingScreen instance
- `window.loginScreen` - LoginScreen instance  
- `window.terminal` - Terminal instance
- `window.visualEffects` - VisualEffects instance
- `window.commands` - Commands instance
- `window.dynamicPanels` - DynamicPanels instance
- `window.app` - Main application controller

### **Event Flow**
1. **Loading Screen** (7 seconds) → **Login Screen**
2. **Login Screen** (username/password simulation) → **Terminal Interface**
3. **Terminal Interface** ↔ **Commands Module** ↔ **Effects Module**
4. **Panels Module** runs continuously with real-time updates

## 🚀 **Initialization Sequence**

```javascript
// 1. DOM Ready Event
document.addEventListener('DOMContentLoaded', () => {
    // 2. Main app initialization
    const app = new Main();
    app.init();
    
    // 3. Module instantiation
    app.initializeModules();
    
    // 4. Global event setup
    app.setupGlobalEvents();
    
    // 5. Start loading screen
    app.startApplicationSequence();
});
```

## 🛠️ **Development Features**

### **Debug Mode**
Uncomment debug line in `main.js` for development:
```javascript
// app.enableDebugMode();
```

**Debug Panel Features**:
- Real-time memory usage
- Module count
- Viewport dimensions
- Current user info

### **Global Shortcuts**
- `Ctrl+L` - Clear terminal
- `Ctrl+R` - Refresh panels
- `Escape` - Stop effects & focus terminal

### **Error Handling**
- Global error catching
- Module-specific error handling
- Terminal error display
- Performance monitoring

## 📱 **Responsive Design**

### **Breakpoints**
- **Desktop**: Full panel layout with terminal left, panels right
- **Tablet**: Stacked panel layout with responsive sizing
- **Mobile**: Single column layout with collapsed panels

### **Dynamic Properties**
- `--is-mobile`: 1 for mobile, 0 for desktop
- `--is-tablet`: 1 for tablet, 0 for others

## 🔧 **Maintenance Tips**

### **Adding New Commands**
1. Add command to `commands.js` in `initializeCommands()`
2. Define `description` and `execute` function
3. Commands automatically appear in `help` and tab completion

### **Adding New Effects**
1. Create method in `VisualEffects` class
2. Add canvas management and cleanup
3. Call from command or other trigger

### **Modifying Panels**
1. Update HTML structure in `index.html`
2. Add update logic in `panels.js`
3. Style in `styles.css`

### **Performance Optimization**
- Use `requestAnimationFrame` for smooth animations
- Implement proper cleanup in module destructors
- Monitor memory usage with debug panel
- Pause animations when tab is hidden

## 🎯 **Key Benefits of Modular Structure**

1. **Maintainability**: Easy to locate and fix issues
2. **Scalability**: Simple to add new features
3. **Debugging**: Isolated module testing
4. **Performance**: Selective loading and cleanup
5. **Collaboration**: Multiple developers can work on different modules
6. **Code Reuse**: Modules can be reused in other projects

## 📈 **Performance Metrics**

The debug panel shows:
- **Memory Usage**: Real-time heap size monitoring
- **Module Count**: Number of active modules
- **Performance Timing**: Load and navigation metrics
- **User Agent**: Browser and device information

Each module includes proper cleanup methods to prevent memory leaks and ensure smooth performance across all devices. 