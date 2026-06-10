const windows = [];

let topZIndex = 10;


const taskbarApps = [
    "Apps",
    "Settings",
    "About"
];

//for overlaps sake, create a unique function name for JS in apps
const apps = [
    {
        name: 'Apps',
        content: `<div>
            <div id="app-launcher" style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; gap: 10px;  width: 100%; height: 100%; padding: 10px; box-sizing: border-box;"></div>
        </div>`,
        icon: '🗂️',
        onload: (id) => {
            new App().getApps().sort((a, b) => a.name.localeCompare(b.name)).forEach(app => {
                if (app.name === "Apps") return; // Don't show the Apps app in the launcher
                const button = document.createElement('button');
                button.textContent = app.icon;
                button.appendChild(document.createElement('span')).textContent = app.name;
                button.classList.add('launcher-button');
                button.title = app.name;
                document.getElementById('app-launcher').appendChild(button);
                button.addEventListener('click', () => {
                    new App().launchApp(app);
                    closeWindow(id);
                });
            });
        },
        position: { x: 0, y: 0.9 * window.innerHeight - 300 },
        size: { width: 400, height: 300 },
        resizable: false
    },
    {
        name: 'Text Editor',
        content: '<textarea id="text-editor" style="width: 100%; height: 100%; border: none; resize: none;">This is a simple text editor. You can type here...</textarea>',
        icon: '📝',
        resizable: true
    },
    {
        name: 'Calculator',
        content: `<div>
            <input type="text" id="Calc-display" readonly>
            <div class="calc-buttons">
                <button onclick="new Calc().appendCalc('7')">7</button>
                <button onclick="new Calc().appendCalc('8')">8</button>
                <button onclick="new Calc().appendCalc('9')">9</button>
                <button onclick="new Calc().appendCalc('/')">/</button>
                <button onclick="new Calc().appendCalc('4')">4</button>
                <button onclick="new Calc().appendCalc('5')">5</button>
                <button onclick="new Calc().appendCalc('6')">6</button>
                <button onclick="new Calc().appendCalc('*')">*</button>
                <button onclick="new Calc().appendCalc('1')">1</button>
                <button onclick="new Calc().appendCalc('2')">2</button>
                <button onclick="new Calc().appendCalc('3')">3</button>
                <button onclick="new Calc().appendCalc('-')">-</button>
                <button onclick="new Calc().appendCalc('0')">0</button>
                <button onclick="new Calc().appendCalc('.')">.</button>
                <button onclick="new Calc().appendCalc('=')">=</button>
                <button onclick="new Calc().appendCalc('+')">+</button>
            </div>

            <style>
                .calc-buttons {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 5px;
                    margin-top: 10px;
                }
                    .Calc-display {
                    width: 100%;
                    height: 30px;
                    font-size: 18px;
                    text-align: right;
                }
                    .calc-buttons button {
                    padding: 3px;
                    font-size: 18px;
                }
            </style>
        </div>
        
        `,
        icon: '🔢',
        resizable: true
    },
    {
        name: 'Wallpaper',
        content: `<div>
            <p>Click a photo below to set it as your wallpaper or type a URL:</p>
            <div class="wallpaper-options">
                <img src="https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/cardiff_orig.jpeg" style="width: 100px;" alt="Cardiff" onclick="new Wallpaper().createWallpaper('https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/cardiff_orig.jpeg')">
                <img src="https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/img-9975_orig.jpg" style="width: 100px;" alt="Mountain 1" onclick="new Wallpaper().createWallpaper('https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/img-9975_orig.jpg')">
                <img src="https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/img-9973_orig.jpg" style="width: 100px;" alt="Mountain 2" onclick="new Wallpaper().createWallpaper('https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/img-9973_orig.jpg')">
                <img src="https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/idg-20251004-183007-543_orig.jpg" style="width: 100px;" alt="Sunset" onclick="new Wallpaper().createWallpaper('https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/idg-20251004-183007-543_orig.jpg')">
            </div>
            <input type="text" id="wallpaper-url" placeholder="Enter wallpaper URL">
            <button onclick="new Wallpaper().createWallpaper(document.getElementById('wallpaper-url').value)">Set Wallpaper</button>
        </div>`,
        icon: '🖼️',
        resizable: true
    },
    {
        name: 'Settings',
        content: `<div id="settings-app" style="display: flex; flex-direction: column; gap: 10px;">
            <button class="settings-button" onclick="new Settings().toggleDarkMode()">Toggle Dark Mode</button>
        </div>`,
        icon: '⚙️',
        size: { width: 400, height: 300 },
        resizable: true
    },
    {
        name: 'About',
        content: `<div>
            <h2>About PersonalOS</h2>
            <p>PersonalOS is a simple desktop environment built with JavaScript. It features a windowing system, a taskbar, and a few basic apps like a text editor, calculator, and wallpaper manager.</p>
            <p>Created by Jackson Szekeres.</p>
        </div>`,
        icon: 'ℹ️',
        size: { width: 400, height: 300 },
        resizable: true
    },
    {
        name: '2048',
        content: `<iframe src="https://jackson.canyoncrest.academy/2048.html" style="width: 290px; height: 270px; border: none; overflow: hidden; padding: 0; margin: 0;"></iframe>`,
        icon: '🎮',
        size: { width: 300, height: 300 },
        resizable: false
    }
];

//App Classes
class Calc {
    appendCalc(value) {
        const display = document.getElementById('Calc-display');
        if (value === '=') {
            try {
                display.value = eval(display.value);
            } catch {
                        display.value = 'Error';
                    }
                } else {
                    display.value += value;
                }
            }
}

class Wallpaper {
    createWallpaper(imageUrl) {
        const screen = document.querySelector('.screen');
        screen.style.backgroundImage = `url(${imageUrl})`;
    }
}

class Settings {
    toggleDarkMode() {
        localStorage.setItem('darkMode', localStorage.getItem('darkMode') === 'true' ? 'false' : 'true');
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');   
        }
    }
}

class App {
    getApps() {
        return apps;
    }
    launchApp(app) {
        launchApp(app);
    }
}

function getScreenSize() {
    return {
        width: document.querySelector('.screen').clientWidth,
        height: document.querySelector('.screen').clientHeight
    };
}

document.addEventListener('resize', () => {
    const screenSize = getScreenSize();
    windows.forEach(win => {
        if (win.x + win.width > screenSize.width) {
            win.x = screenSize.width - win.width;
            win.element.style.left = `${win.x}px`;
        }
        if (win.y + win.height > screenSize.height) {
            win.y = screenSize.height - win.height;
            win.element.style.top = `${win.y}px`;
        }
    });
});



function createWindow(title, content, size = { width: 300, height: 200 }, position = null, resizable = true) {
    const id = `window-${crypto.randomUUID()}`;
    console.log(`Creating window: ${title}`);
    const window = document.createElement('div');
    window.classList.add('window');
    window.id = id;

    let x = 50;
    let y = 50;

    if (!position) {
        //find location for new window that doesn't overlap existing windows
        const screenSize = getScreenSize();
        const maxX = Math.max(0, screenSize.width - size.width);
        const maxY = Math.max(0, screenSize.height - size.height);
        out:
        for (let i = 0; i <= maxX; i += 30) {
            for (let j = 0; j <= maxY; j += 30) {
                if (!windows.some(w => i < w.x + w.width && i + size.width > w.x && j < w.y + w.height && j + size.height > w.y)) {
                    console.log(`Placing window at (${i}, ${j})`);
                    x = i;
                    y = j;
                    break out;
                }
            }
        }
    } else {
        x = position.x;
        y = position.y;
    }


    window.style.left = `${x}px`;
    window.style.top = `${y}px`;

    const width = size.width;
    const height = size.height;
    window.style.width = `${width}px`;
    window.style.height = `${height}px`;

    const header = document.createElement('div');
    header.classList.add('window-header');
    header.textContent = title;
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', () => {
        closeWindow(id);
    });
    header.appendChild(closeButton);

    header.addEventListener('mousedown', (e) => {
        const offsetX = e.clientX - window.offsetLeft;
        const offsetY = e.clientY - window.offsetTop;

        function onMouseMove(e) {
            window.style.left = `${e.clientX - offsetX}px`;
            window.style.top = `${e.clientY - offsetY}px`;

                // Update window position in state
            const win = windows.find(w => w.id === id);
            if (win) {
                win.x = e.clientX - offsetX;
                win.y = e.clientY - offsetY;
            }
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    const contentElement = document.createElement('div');
    contentElement.classList.add('window-content');
    contentElement.innerHTML = content;

    window.appendChild(header);
    window.appendChild(contentElement);

    if (resizable) {

        window.style.resize = 'both';

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === window) {
                    const win = windows.find(w => w.id === id);
                    if (win) {
                        win.width = entry.contentRect.width;
                        win.height = entry.contentRect.height;
                    }
                }
            }
        });
        resizeObserver.observe(window);
    }

    windows.push({
        id,
        title,
        content,
        x,
        y,
        width,
        height,
        element: window
    });
    return window;
}

function closeWindow(id) {
    const win = windows.find(w => w.id === id);
    if (win) {
        win.element.remove();
        windows.splice(windows.indexOf(win), 1);
    }
}

function launchApp(app) {
    if (windows.some(w => w.title === app.name)) {
        const existingWindow = windows.find(w => w.title === app.name);
        existingWindow.element.style.zIndex = topZIndex++;
        return;
    }
    const win = createWindow(app.name, app.content, app.size, app.position, app.resizable);
    document.querySelector('.screen').appendChild(win);

    if (app.onload) {
        app.onload.bind(null, win.id)();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screen');
    const taskbar = document.querySelector('.taskbar');
    const appsContainer = document.querySelector('.apps');

    for (const app of taskbarApps) {
        const appInfo = apps.find(a => a.name === app);
        if (!appInfo) continue;
        const button = document.createElement('button');
        button.textContent = appInfo.icon;
        button.appendChild(document.createElement('span')).textContent = appInfo.name;
        button.classList.add('app-button');
        button.title = appInfo.name;
        button.addEventListener('click', () => {
            launchApp(appInfo);
        });
        appsContainer.appendChild(button);
    }

    new Wallpaper().createWallpaper("https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/cardiff_orig.jpeg");

    setInterval(() => {
        const time = document.getElementById('time');
        const now = new Date();
        const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        time.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

        const date = document.getElementById('date');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        date.textContent = `${month}/${day}/${year}`;

        const batteryLevel = document.getElementById('battery-level');
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                batteryLevel.textContent = `${Math.round(battery.level * 100)}%`;
            });
        } else {
            batteryLevel.textContent = 'N/A';
        }
    }, 1000);

    const welcome = createWindow('Welcome', '<p>Welcome to PersonalOS! This is a simple desktop environment built with JavaScript.</p>');
    console.log(welcome);
    screen.appendChild(welcome);

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});