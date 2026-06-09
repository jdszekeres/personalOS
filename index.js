const windows = [];

let topZIndex = 10;

//for overlaps sake, create a unique function name for JS in apps
const apps = [
    {
        name: 'Text Editor',
        content: '<textarea id="text-editor" style="width: 100%; height: 100%; border: none; resize: none;">This is a simple text editor. You can type here...</textarea>',
        icon: '📝'
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
        icon: '🔢'
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
        icon: '🖼️'
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




function createWindow(title, content, size = { width: 300, height: 200 }) {
    const id = `window-${crypto.randomUUID()}`;
    console.log(`Creating window: ${title}`);
    const window = document.createElement('div');
    window.classList.add('window');
    window.id = id;

    const x = Math.random() * 400 + 50;
    const y = Math.random() * 300 + 50;
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
        window.remove();
        const index = windows.findIndex(w => w.id === id);
        if (index !== -1) {
            windows.splice(index, 1);
        }
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

document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screen');
    const taskbar = document.querySelector('.taskbar');
    const appsContainer = document.querySelector('.apps');

    for (const app of apps) {
        const button = document.createElement('button');
        button.textContent = app.icon;
        button.appendChild(document.createElement('span')).textContent = app.name;
        button.classList.add('app-button');
        button.title = app.name;
        button.addEventListener('click', () => {
            if (windows.some(w => w.title === app.name)) {
                const existingWindow = windows.find(w => w.title === app.name);
                existingWindow.element.style.zIndex = topZIndex++;
                return;
            }
            const win = createWindow(app.name, app.content, app.size);
            screen.appendChild(win);
        });
        appsContainer.appendChild(button);
    }

    new Wallpaper().createWallpaper("https://jacksonszekeres.weebly.com/uploads/1/5/2/4/152497468/cardiff_orig.jpeg");

    setInterval(() => {
        const time = document.getElementById('time');
        const now = new Date();
        const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        time.textContent = `${hours}:${minutes} ${ampm}`;
    }, 1000);

    const welcome = createWindow('Welcome', '<p>Welcome to PersonalOS! This is a simple desktop environment built with JavaScript.</p>');
    console.log(welcome);
    screen.appendChild(welcome);
});