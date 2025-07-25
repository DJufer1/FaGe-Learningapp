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
    hub.classList.add('hidden');
    appContainer.innerHTML = '<p style="text-align:center; color:white; font-size: 1.5em;">Lade App...</p>';
    appContainer.classList.remove('hidden');

    // HIER DIE ÄNDERUNG EINFÜGEN
    if (appName === 'bku-imposter') {
        // Fügt nur noch die speziellen Klassen für die vertikale Zentrierung hinzu
        appContainer.classList.add('justify-center', 'min-h-screen');
    }

    const config = appConfig[appName];
    //...

    try {
        const htmlPath = `${appName}/${config.html}`;
        const response = await fetch(htmlPath);
        if (!response.ok) throw new Error(`HTML-Datei unter dem Pfad '${htmlPath}' nicht gefunden.`);
        const appHtml = await response.text();
        appContainer.innerHTML = appHtml;

        loadCss(`${appName}/${config.css}`, `css-${appName}`);

        // =============================================================
        // NEU START: Lade alle Abhängigkeiten, bevor das App-Skript startet
        // =============================================================
        if (config.dependencies && config.dependencies.length > 0) {
            console.log(`Lade Abhängigkeiten für ${appName}...`);
            for (const depUrl of config.dependencies) {
                // Wir geben jeder Abhängigkeit eine eindeutige ID, um sie später zu entfernen
                const depId = `dep-${appName}-${depUrl.split('/').pop()}`; 
                await loadScript(depUrl, depId);
            }
        }
        // =============================================================
        // NEU ENDE
        // =============================================================

        await loadScript(`${appName}/${config.js}`, `js-${appName}`);

        addBackButton();
        currentApp = appName;

    } catch (error) {
        console.error(error);
        appContainer.innerHTML = `<p style="text-align:center; color:red; padding: 20px;"><b>Fehler:</b> Die App konnte nicht geladen werden.<br><small>${error.message}</small></p>`;
        addBackButton();
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

    function addBackButton() {
        if (document.querySelector('.back-to-hub-button')) return;
        const backButton = document.createElement('button');
        backButton.innerHTML = '&#x2190;';
        backButton.className = 'back-to-hub-button';
        backButton.title = 'Zurück zum Portal';
        backButton.addEventListener('click', closeApp);
        document.body.appendChild(backButton);
    }

function closeApp() {
    appContainer.innerHTML = '';
    appContainer.classList.add('hidden');
    
    // HIER DIE ÄNDERUNG EINFÜGEN
    appContainer.classList.remove('justify-center', 'min-h-screen');

    hub.classList.remove('hidden');

    //... Rest der Funktion

    // CSS & Haupt-JS entfernen
    const dynamicCss = document.getElementById(`css-${currentApp}`);
    if (dynamicCss) dynamicCss.remove();

    const dynamicJs = document.getElementById(`js-${currentApp}`);
    if (dynamicJs) dynamicJs.remove();

    // Abhängigkeiten der aktuellen App entfernen
    const config = appConfig[currentApp];
    if (config && config.dependencies) {
        config.dependencies.forEach(depUrl => {
            const depId = `dep-${currentApp}-${depUrl.split('/').pop()}`;
            const el = document.getElementById(depId);
            if (el) el.remove();
        });
    }

    const backButton = document.querySelector('.back-to-hub-button');
    if (backButton) backButton.remove();

    currentApp = null;
}
});
