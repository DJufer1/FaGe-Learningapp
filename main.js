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
            js: 'rechentrainer.js'
        },
        'bku-imposter': {
            html: 'imposter.html',
            css: 'imposter.css',
            js: 'imposter.js'
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

        const config = appConfig[appName];

        try {
            const htmlPath = `${appName}/${config.html}`;
            const response = await fetch(htmlPath);
            if (!response.ok) throw new Error(`HTML-Datei unter dem Pfad '${htmlPath}' nicht gefunden.`);
            const appHtml = await response.text();
            appContainer.innerHTML = appHtml;

            loadCss(`${appName}/${config.css}`, `css-${appName}`);

            // NEU: Lade p5.js aus dem lokalen Ordner
            if (appName === 'rechentrainer') {
                await loadScript('./assets/libs/p5.js', 'p5-main');
                await loadScript('./assets/libs/p5.dom.js', 'p5-dom');
            }
            
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
        hub.classList.remove('hidden');

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
