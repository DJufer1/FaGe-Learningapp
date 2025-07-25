// main.js - Die Logik für das App-Portal (Version 4 - Lädt lokale Skripte)

document.addEventListener('DOMContentLoaded', () => {
    const hub = document.getElementById('app-hub');
    const appContainer = document.getElementById('app-container');
    const appCards = document.querySelectorAll('.app-card');

    let currentApp = null; 
    let currentAppInstance = null; // <-- NEUE ZEILE

const appConfig = {
    'rechentrainer': {
        html: 'rechentrainer.html',
        css: 'rechentrainer.css',
        js: 'rechentrainer.js',
        // NEU: Abhängigkeiten für p5.js
        dependencies: [
            './assets/libs/p5.js',
            './assets/libs/p5.dom.js'
        ]
    },
    'bku-imposter': {
        html: 'imposter.html',
        css: 'imposter.css',
        js: 'imposter.js',
        // NEU: Abhängigkeit für Tailwind CSS
        dependencies: [
            'https://cdn.tailwindcss.com'
        ]
    }
};

    appCards.forEach(card => {
        card.addEventListener('click', () => {
            const appName = card.dataset.app;
            if (appConfig[appName]) {
                loadApp(appName);
            } else {
                alert(`App "${appName}" ist noch nicht konfiguriert.`);
            }
        });
    });

async function loadApp(appName) {
    document.body.classList.add('app-active');
    hub.classList.add('hidden');
    appContainer.classList.remove('hidden');
    appContainer.innerHTML = '<p style="text-align:center; font-size: 1.5em;">Lade App...</p>';

    const config = appConfig[appName];

    try {
        const htmlPath = `${appName}/${config.html}`;
        const response = await fetch(htmlPath);
        if (!response.ok) throw new Error(`HTML-Datei unter dem Pfad '${htmlPath}' nicht gefunden.`);
        const appHtml = await response.text();
        appContainer.innerHTML = appHtml;

        loadCss(`${appName}/${config.css}`, `css-${appName}`);

        if (config.dependencies && config.dependencies.length > 0) {
            for (const depUrl of config.dependencies) {
                const depId = `dep-${appName}-${depUrl.split('/').pop()}`;
                await loadScript(depUrl, depId);
            }
        }

        await loadScript(`${appName}/${config.js}`, `js-${appName}`);

        // Startet die Imposter-App Instanz
        if (appName === 'bku-imposter' && window.ImposterGame) {
            currentAppInstance = new window.ImposterGame();
            currentAppInstance.startNewGame();
        }

        // NEU: Startet die Rechentrainer-Instanz (p5.js Sketch)
        if (appName === 'rechentrainer' && typeof rechentrainerSketch === 'function') {
            currentAppInstance = new p5(rechentrainerSketch, document.getElementById('rechentrainer-container'));
        }

        addCloseButton();
        currentApp = appName;

    } catch (error) {
        console.error(error);
        appContainer.innerHTML = `<p style="text-align:center; color:red; padding: 20px;"><b>Fehler:</b> Die App konnte nicht geladen werden.<br><small>${error.message}</small></p>`;
        addCloseButton();
    }
}
    
    function loadScript(src, id) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Skript konnte nicht geladen werden: ${src}`));
            document.body.appendChild(script);
        });
    }

    function loadCss(href, id) {
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.id = id;
        document.head.appendChild(link);
    }

function addCloseButton() {
    // Sucht nach der ID. Verhindert doppeltes Hinzufügen.
    if (document.querySelector('#hub-close-button')) return;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&#x2715;';
    closeButton.id = 'hub-close-button'; // Wichtig: Setzt die ID statt der Klasse
    closeButton.title = 'App schliessen';

    // HIER IST DIE FEHLENDE ZEILE:
    closeButton.style.borderRadius = '50%';

    closeButton.addEventListener('click', closeApp);
    document.body.appendChild(closeButton);
}

// ERSETZE DEINE BISHERIGE closeApp FUNKTION:
function closeApp() {
    // NEU: Robuste Methode zum Beenden der laufenden App-Instanz
    if (currentAppInstance) {
        // Prüft, ob die Instanz eine "remove"-Funktion hat (wie bei p5.js)
        if (typeof currentAppInstance.remove === 'function') {
            currentAppInstance.remove();
        }
        currentAppInstance = null; // Setzt die Instanz in jedem Fall zurück
    }

    document.body.classList.remove('app-active');
    appContainer.innerHTML = '';
    appContainer.classList.add('hidden');
    hub.classList.remove('hidden');

    // ... (der Rest des Codes zum Entfernen von CSS & JS bleibt gleich) ...
    const dynamicCss = document.getElementById(`css-${currentApp}`);
    if (dynamicCss) dynamicCss.remove();
    const dynamicJs = document.getElementById(`js-${currentApp}`);
    if (dynamicJs) dynamicJs.remove();
    const config = appConfig[currentApp];
    if (config && config.dependencies) {
        config.dependencies.forEach(depUrl => {
            const depId = `dep-${currentApp}-${depUrl.split('/').pop()}`;
            const el = document.getElementById(depId);
            if (el) el.remove();
        });
    }

    const closeButton = document.querySelector('#hub-close-button');
    if (closeButton) closeButton.remove();

    currentApp = null;
}
});
