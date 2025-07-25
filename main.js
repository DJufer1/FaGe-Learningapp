// main.js - Die Logik für das App-Portal (Version 4 - Lädt lokale Skripte)

document.addEventListener('DOMContentLoaded', () => {
    const hub = document.getElementById('app-hub');
    const appContainer = document.getElementById('app-container');
    const appCards = document.querySelectorAll('.app-card');

    let currentApp = null; 

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
    document.body.classList.add('app-active'); // NEU: Aktiviert den App-Modus
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

// Ersetze die alte "addBackButton" Funktion komplett hiermit
function addCloseButton() {
    // Sucht nach der ID. Verhindert doppeltes Hinzufügen.
    if (document.querySelector('#hub-close-button')) return;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&#x2715;';
    closeButton.id = 'hub-close-button'; // Wichtig: Setzt die ID statt der Klasse
    closeButton.title = 'App schliessen';
    closeButton.addEventListener('click', closeApp);
    document.body.appendChild(closeButton);
}

function closeApp() {
    document.body.classList.remove('app-active');
    appContainer.innerHTML = '';
    appContainer.classList.add('hidden');
    hub.classList.remove('hidden');

    // CSS & Haupt-JS entfernen... (dieser Teil bleibt gleich)
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

    // Sucht den Button anhand der ID und entfernt ihn.
    const closeButton = document.querySelector('#hub-close-button');
    if (closeButton) closeButton.remove();

    currentApp = null;
}
});
