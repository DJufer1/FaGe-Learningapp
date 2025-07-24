// main.js - Die Logik für das App-Portal (Version 2 - Robuster)

document.addEventListener('DOMContentLoaded', () => {
    const hub = document.getElementById('app-hub');
    const appContainer = document.getElementById('app-container');
    const appCards = document.querySelectorAll('.app-card');

    let currentApp = null; // Speichert, welche App gerade aktiv ist

    // NEU: Eine Konfiguration, die genau weiss, wie die Dateien für jede App heissen.
    const appConfig = {
        'rechentrainer': {
            html: 'rechentrainer.html',
            css: 'rechentrainer.css',
            js: 'rechentrainer.js'
            // Hinweis: Der Rechentrainer braucht p5.js, das müssen wir noch laden.
        },
        'bku-imposter': {
            html: 'imposter.html',
            css: 'imposter.css',
            js: 'imposter.js'
        }
        // Hier können zukünftige Apps einfach hinzugefügt werden.
    };

    // Klick-Listener für alle App-Kacheln
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

    /**
     * Lädt und zeigt eine Unter-App an.
     * @param {string} appName - Der Name der App aus dem data-app Attribut.
     */
    async function loadApp(appName) {
        hub.classList.add('hidden');
        appContainer.innerHTML = '<p style="text-align:center; color:white; font-size: 1.5em;">Lade App...</p>';
        appContainer.classList.remove('hidden');

        const config = appConfig[appName];

        try {
            // Lade HTML
            const response = await fetch(`${appName}/${config.html}`);
            if (!response.ok) throw new Error(`HTML-Datei nicht gefunden.`);
            const appHtml = await response.text();
            appContainer.innerHTML = appHtml;

            // Lade CSS
            loadCss(`${appName}/${config.css}`, `css-${appName}`);

            // Spezielle Behandlung für den Rechentrainer, der p5.js benötigt
            if (appName === 'rechentrainer') {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.js', 'p5-main');
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/addons/p5.dom.js', 'p5-dom');
            }
            
            // Lade das Haupt-Skript der App
            await loadScript(`${appName}/${config.js}`, `js-${appName}`);

            addBackButton();
            currentApp = appName;

        } catch (error) {
            console.error(`Fehler beim Laden der App "${appName}":`, error);
            appContainer.innerHTML = `<p style="text-align:center; color:red;">Fehler: Die App "${appName}" konnte nicht geladen werden. (${error.message})</p>`;
            addBackButton();
        }
    }
    
    /**
     * Hilfsfunktionen zum dynamischen Laden von Skripten und CSS
     */
    function loadScript(src, id) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) { // Nicht erneut laden, falls schon vorhanden
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
        if (document.getElementById(id)) return; // Nicht erneut laden
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.id = id;
        document.head.appendChild(link);
    }

    /**
     * Erstellt und zeigt einen "Zurück zum Portal"-Button an.
     */
    function addBackButton() {
        if (document.querySelector('.back-to-hub-button')) return; // Button nicht doppelt hinzufügen
        const backButton = document.createElement('button');
        backButton.innerHTML = '&#x2190;'; // Pfeil nach links
        backButton.className = 'back-to-hub-button';
        backButton.title = 'Zurück zum Portal';
        backButton.addEventListener('click', closeApp);
        document.body.appendChild(backButton);
    }

    /**
     * Schliesst die aktuell geöffnete App und kehrt zum Portal zurück.
     */
    function closeApp() {
        appContainer.innerHTML = '';
        appContainer.classList.add('hidden');
        hub.classList.remove('hidden');

        // Dynamisch geladene Elemente entfernen
        const dynamicElements = [
            `css-${currentApp}`, 
            `js-${currentApp}`, 
            'p5-main', 
            'p5-dom'
        ];
        dynamicElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        const backButton = document.querySelector('.back-to-hub-button');
        if (backButton) backButton.remove();
        
        currentApp = null;
    }
});