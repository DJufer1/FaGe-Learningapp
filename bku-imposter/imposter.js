// bku-imposter/imposter.js
// Dies ist der Inhalt aus dem <script>-Tag deiner ursprünglichen Datei

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    playerSetup: document.getElementById('player-setup-screen'),
    roleReveal: document.getElementById('role-reveal-screen'),
    game: document.getElementById('game-screen'),
};
const startGameBtn = document.getElementById('startGameBtn');
const semesterSelect = document.getElementById('semesterSelect');
const hkSelectContainer = document.getElementById('hk-select-container');
const hkSelect = document.getElementById('hkSelect');
const playerCountSelect = document.getElementById('playerCount');
const playerNameInputsContainer = document.getElementById('playerNameInputs');
const submitPlayersBtn = document.getElementById('submitPlayersBtn');
const backToStartBtn = document.getElementById('backToStartBtn');
const playerCardsContainer = document.getElementById('playerCardsContainer');
const proceedToGameBtn = document.getElementById('proceedToGameBtn');
const startingPlayerText = document.getElementById('startingPlayerText');
const newGameBtn = document.getElementById('newGameBtn');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const revealBtn = document.getElementById('revealBtn');
const revealInfoDiv = document.getElementById('reveal-info');
const imposterWasText = document.getElementById('imposterWasText');
const wordWasText = document.getElementById('wordWasText');
const replaySamePlayersBtn = document.getElementById('replaySamePlayersBtn');

// Game State
let players = [];
let playerNamesForReplay = [];
let currentWord = { term: '', definition: '' };
let imposterIndex = -1;
let rolesRevealedCount = 0;
let currentTermsList = [];

// Begriff-Datenbank
const termsBySemester = {
    "Semester 1": {
        "HK A1: Umsetzung von Professionalität und Klientenzentrierung - Berufsperson": [
            { term: "Instruktion", definition: "Gezielte Anleitung und Unterweisung." },
            { term: "Reflexion", definition: "Systematisches Nachdenken über Erfahrungen und Handlungen." },
            { term: "Datenschutz", definition: "Schutz personenbezogener Daten vor Missbrauch." },
            { term: "Florence Nightingale", definition: "Britische Krankenschwester, Pionierin der modernen Krankenpflege." },
            { term: "Henry Dunant", definition: "Schweizer Geschäftsmann, Gründer des Roten Kreuzes." },
        ],
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Kommunikation": [
            { term: "4-Ohren-Modell", definition: "Kommunikationsmodell (Sach-, Selbstoffenbarungs-, Beziehungs-, Appell-Ohr)." },
            { term: "Aktives Zuhören", definition: "Aufmerksames Zuhören mit verbalen und nonverbalen Signalen." },
            { term: "Paraphrasieren", definition: "Wiedergeben des Gehörten in eigenen Worten zur Verständnissicherung." },
        ],
        "HK B1: Pflege und Betreuung - Körperpflege": [
            { term: "Hautturgor", definition: "Spannungszustand der Haut, Indikator für Flüssigkeitshaushalt." },
            { term: "Intertrigoprophylaxe", definition: "Vorbeugung von Hautschäden in Hautfalten (z.B. durch Reibung, Feuchtigkeit)." },
            { term: "Diffusion", definition: "Selbstständige Vermischung von Teilchen aufgrund ihrer Eigenbewegung." },
            { term: "Professionelle Berührung", definition: "Zielgerichtete, respektvolle Berührung im Pflegekontext." },
        ],
         "HK B2: Pflege und Betreuung - Mobilität": [
            { term: "Passiver Bewegungsapparat", definition: "Knochen, Gelenke, Bänder, Knorpel; stützt und ermöglicht Bewegung." },
            { term: "Sturzprophylaxe", definition: "Maßnahmen zur Vorbeugung von Stürzen bei gefährdeten Personen." },
            { term: "Quergestreifte Muskulatur", definition: "Skelettmuskulatur, willkürlich steuerbar." },
        ],
        "HK B5: Pflege und Betreuung - Ernährung": [
            { term: "Peristaltik", definition: "Wellenförmige Muskelkontraktion zur Fortbewegung von Nahrung im Verdauungstrakt." },
            { term: "Aspirationsprophylaxe", definition: "Maßnahmen zur Vermeidung des Einatmens von Fremdstoffen in die Atemwege." },
            { term: "Dehydrationsprophylaxe", definition: "Maßnahmen zur Vorbeugung von Flüssigkeitsmangel." },
        ],
        "HK E1: Fördern und Erhalten von Gesundheit und Hygiene - Hygienemassnahmen": [
            { term: "Nosokomiale Infektion", definition: "Im Krankenhaus oder einer Pflegeeinrichtung erworbene Infektion." },
            { term: "Infektionskette", definition: "Weg eines Erregers vom Wirt zur Infektion eines neuen Wirts (Quelle, Übertragungsweg, Empfänger)." },
            { term: "Desinfektion und Sterilisation", definition: "Verfahren zur Keimreduktion bzw. Keimfreiheit." },
        ],
        "HK G1: Wahrnehmen hauswirtschaftlicher Aufgaben - Kleidung": [
            { term: "Wäschekreislauf", definition: "Prozess von schmutziger zu sauberer Wäsche inkl. Sortieren, Waschen, Trocknen, etc." },
            { term: "Textilkunde", definition: "Lehre von den Eigenschaften und der Verarbeitung von Textilien." },
        ],
        "HK G2: Wahrnehmen hauswirtschaftlicher Aufgaben - Sauberes Umfeld": [
            { term: "Küchenhygiene", definition: "Maßnahmen zur Sauberkeit und Vermeidung von Keimübertragung in der Küche." },
            { term: "Ergonomie", definition: "Anpassung der Arbeitsbedingungen an den Menschen zur Gesundheitsförderung." },
        ],
        "HK H2: Durchführen administrativer und logistischer Aufgaben - Informations- und Kommunikationstechnologien": [
            { term: "E-Health-Strategie", definition: "Einsatz digitaler Technologien zur Unterstützung und Verbesserung des Gesundheitswesens." },
            { term: "Cybermobbing", definition: "Belästigung, Bedrohung oder Bloßstellung anderer über digitale Medien." },
        ],
        "HK H4: Durchführen administrativer und logistischer Aufgaben - Verbandsmaterial und Medikamente bewirtschaften": [
            { term: "First-in-First-out", definition: "Lagerprinzip: Zuerst eingelagerte Ware wird zuerst entnommen, um Verfall zu vermeiden." },
            { term: "Betäubungsmittelgesetz", definition: "Gesetzliche Regelung zum Umgang mit Betäubungsmitteln." },
        ],
        "HK H5: Durchführen administrativer und logistischer Aufgaben - Apparate und Mobiliar unterhalten": [
            { term: "Wartung", definition: "Regelmäßige Überprüfung und Instandhaltung von Geräten und Mobiliar zur Funktionssicherung." },
        ],
    },
    "Semester 2": {
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Kommunikation": [
            { term: "Transaktionsanalyse", definition: "Theorie der menschlichen Persönlichkeit und Kommunikation (Ich-Zustände: Eltern-Ich, Erwachsenen-Ich, Kind-Ich)." },
        ],
        "HK A3: Umsetzung von Professionalität und Klientenzentrierung - Beobachtungen": [
            { term: "Orientierungsstörung", definition: "Beeinträchtigung der Orientierung zu Zeit, Ort, Person oder Situation." },
            { term: "Wahrnehmungsstörung", definition: "Veränderte oder gestörte Aufnahme und Verarbeitung von Sinnesreizen." },
        ],
         "HK B1: Pflege und Betreuung - Körperpflege": [
            { term: "Psoriasis", definition: "Schuppenflechte, chronisch-entzündliche Hauterkrankung mit starker Schuppung." },
            { term: "Glaukom", definition: "Grüner Star, Gruppe von Augenerkrankungen mit Schädigung des Sehnervs, oft durch erhöhten Augeninnendruck." },
            { term: "Soor", definition: "Pilzinfektion (meist Candida albicans) der Haut oder Schleimhäute." },
        ],
        "HK B2: Pflege und Betreuung - Mobilität": [
            { term: "Arthrose", definition: "Degenerative Gelenkerkrankung, Gelenkverschleiß mit Knorpelabbau." },
            { term: "Osteoporose", definition: "Knochenschwund, verringerte Knochendichte und -festigkeit, erhöhtes Frakturrisiko." },
            { term: "Kontrakturen", definition: "Dauerhafte Verkürzung von Muskeln, Sehnen, Bändern mit Bewegungseinschränkung eines Gelenks." },
        ],
        "HK B3: Pflege und Betreuung - Ausscheidung": [
            { term: "Urininkontinenz", definition: "Unfreiwilliger Verlust von Urin." },
            { term: "Stressinkontinenz", definition: "Urinverlust bei körperlicher Belastung (Husten, Niesen, Heben)." },
        ],
        "HK D1: Ausführen von medizinaltechnischen Verrichtungen - Vitalzeichen kontrollieren": [
            { term: "Hypertonie", definition: "Bluthochdruck, dauerhaft erhöhter Blutdruck (systolisch >140 mmHg / diastolisch >90 mmHg)." },
            { term: "Bradykardie", definition: "Verlangsamter Herzschlag, Pulsfrequenz unter 60 Schlägen pro Minute." },
            { term: "Hypoxie", definition: "Sauerstoffmangel im Gewebe." },
        ],
        "HK E1: Fördern und erhalten von Gesundheit und Hygiene - Arbeitssicherheit": [
             { term: "Ergonomie", definition: "Anpassung der Arbeitsbedingungen und -mittel an den Menschen zur Vermeidung von Belastungen." },
             { term: "Psychohygiene", definition: "Maßnahmen zur Erhaltung und Förderung der seelischen Gesundheit." },
        ],
        "HK E3: Fördern und erhalten von Gesundheit und Hygiene - Nervensystem, Apoplexie": [
            { term: "Apoplexie", definition: "Schlaganfall, plötzliche Durchblutungsstörung im Gehirn mit neurologischen Ausfällen." },
            { term: "FAST-Test", definition: "Schnelltest zur Erkennung eines Schlaganfalls (Face, Arms, Speech, Time)." },
        ],
        "HK E4: Fördern und erhalten von Gesundheit und Hygiene - Ernährung": [
            { term: "Kohlenhydrate", definition: "Makronährstoffe, die dem Körper Energie liefern (z.B. Zucker, Stärke, Ballaststoffe)." },
            { term: "Body-Mass-Index (BMI)", definition: "Maßzahl zur Bewertung des Körpergewichts in Relation zur Körpergröße (kg/m²)." },
        ],
        "HK F1: Gestalten des Alltags - Alltag gestalten": [
            { term: "Partizipation", definition: "Teilhabe und Mitbestimmung von Klienten an Entscheidungen, die sie betreffen." },
            { term: "Aktivitäten des täglichen Lebens", definition: "Grundlegende Verrichtungen wie Körperpflege, Essen, Mobilität (ATL)." },
        ],
        "HK F2: Gestalten des Alltags - Aufbau und Einhalten der Tagesstruktur": [
            { term: "Milieutherapie", definition: "Gestaltung der Umgebung und des sozialen Umfelds zur therapeutischen Unterstützung." },
            { term: "Depression", definition: "Psychische Erkrankung mit gedrückter Stimmung, Interessenverlust und Antriebslosigkeit." },
        ],
        "HK H1: Durchführen administrativer und logistischer Aufgaben - Ein- und Austritte": [
            { term: "Relokationssyndrom", definition: "Stressreaktion bei Verlegung oder Umzug von (meist älteren) Klienten in eine neue Umgebung." },
        ]
    },
    "Semester 3": {
        "HK A1: Umsetzung von Professionalität und Klientenzentrierung - Planung": [
            { term: "Bezugspflege (Primary Nursing)", definition: "Pflegesystem, bei dem eine Pflegeperson kontinuierlich für die gesamte Pflege einer kleinen Patientengruppe zuständig ist." },
            { term: "Eisenhower-Prinzip", definition: "Zeitmanagement-Methode zur Priorisierung von Aufgaben nach Wichtigkeit und Dringlichkeit." },
        ],
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Konflikte": [
            { term: "Deeskalation", definition: "Maßnahmen zur Reduzierung von Spannung und Verhinderung der Zuspitzung eines Konflikts." },
        ],
        "HK A4: Umsetzung von Professionalität und Klientenzentrierung - Biografie und Religion": [
            { term: "Biografiearbeit", definition: "Auseinandersetzung mit der Lebensgeschichte eines Menschen zur individuellen und verständnisvollen Pflege." },
            { term: "Generationenarbeit", definition: "Aktivitäten und Ansätze, die den Austausch und das Verständnis zwischen verschiedenen Generationen fördern." },
        ],
        "HK B3: Pflege und Betreuung - Ausscheidung": [
            { term: "Niereninsuffizienz", definition: "Ungenügende Funktion der Nieren, Abfallstoffe und Flüssigkeit ausreichend auszuscheiden." },
            { term: "Obstipationsprophylaxe", definition: "Maßnahmen zur Vorbeugung von Verstopfung (z.B. ballaststoffreiche Ernährung, Bewegung, ausreichend Trinken)." },
            { term: "Zystitisprophylaxe", definition: "Maßnahmen zur Vorbeugung von Blasenentzündungen." },
        ],
        "HK B4: Pflege und Betreuung - Atmung": [
            { term: "Dyspnoe", definition: "Atemnot, subjektiv empfundene Erschwerung der Atmung." },
            { term: "Sputum", definition: "Auswurf aus den Atemwegen (Schleim, Sekret)." },
        ],
        "HK B6: Pflege und Betreuung - Ruhen und Schlafen": [
            { term: "REM-Phase", definition: "Schlafphase mit schnellen Augenbewegungen (Rapid Eye Movement), in der intensiv geträumt wird." },
            { term: "Schlafhygiene", definition: "Verhaltensweisen und Gewohnheiten, die einen gesunden und erholsamen Schlaf fördern." },
        ],
        "HK D2: Ausführen von medizinaltechnischen Verrichtungen - Venöse und kapilläre Venenpunktion": [
            { term: "Antikoagulantien", definition: "Medikamente zur Hemmung der Blutgerinnung (Blutverdünner)." },
            { term: "Hämostase", definition: "Prozess der Blutstillung nach einer Verletzung." },
        ],
        "HK D3: Ausführen von medizinaltechnischen Verrichtungen - Medikamente richten und verabreichen": [
            { term: "6-R-Regel", definition: "Sicherheitsregel bei der Medikamentenverabreichung (Richtig: Patient, Medikament, Dosis, Applikationsform, Zeit, Dokumentation)." },
            { term: "Pharmakokinetik", definition: "Lehre davon, was der Körper mit einem Medikament macht (Resorption, Verteilung, Metabolismus, Elimination)." },
        ],
        "HK D6: Ausführen von medizinaltechnischen Verrichtungen - s.c. und i.m. Injektionen": [
            { term: "Hypoglykämie", definition: "Unterzuckerung, zu niedriger Blutzuckerspiegel." },
            { term: "Insulin", definition: "Hormon, das den Blutzuckerspiegel senkt und in der Bauchspeicheldrüse produziert wird." },
            { term: "Metabolisches Syndrom", definition: "Kombination verschiedener Risikofaktoren für Herz-Kreislauf-Erkrankungen (z.B. Übergewicht, Bluthochdruck, erhöhter Blutzucker)." },
        ],
        "HK E1: Fördern und erhalten von Gesundheit und Hygiene - Immunsystem und Infektionskrankheiten": [
            { term: "Antigen", definition: "Substanz, die eine spezifische Immunantwort im Körper auslöst (z.B. Bildung von Antikörpern)." },
            { term: "Immunisierung", definition: "Herbeiführung von Unempfänglichkeit gegenüber einem Krankheitserreger (aktiv oder passiv)." },
        ],
        "HK E2: Fördern und erhalten von Gesundheit und Hygiene - Isolation": [
            { term: "Kontaktisolierung", definition: "Isolationsmaßnahme bei Übertragung von Krankheitserregern durch direkten oder indirekten Kontakt." },
            { term: "Salutogenese", definition: "Modell der Gesundheitsentstehung und -erhaltung (Fokus auf Ressourcen und Schutzfaktoren)." },
        ],
        "HK E3: Fördern und erhalten von Gesundheit und Hygiene - Morbus Parkinson, Multiple Sklerose": [
            { term: "Multiple Sklerose (MS)", definition: "Chronisch-entzündliche Autoimmunerkrankung des zentralen Nervensystems, die die Myelinscheiden schädigt." },
            { term: "Morbus Parkinson", definition: "Neurodegenerative Erkrankung mit Dopaminmangel, führt zu Bewegungsstörungen (Tremor, Rigor, Akinese)." },
        ],
        "HK F1: Gestalten des Alltags - Alltag gestalten": [
             { term: "Rituale", definition: "Regelmäßig wiederkehrende Handlungen mit symbolischer Bedeutung, die Struktur und Sicherheit im Alltag geben können." },
        ],
        "HK H3: Durchführen administrativer und logistischer Aufgaben - Transporte": [
            { term: "Rotkreuzfahrzeuge", definition: "Fahrzeuge des Roten Kreuzes, die für Krankentransporte und im Rettungsdienst eingesetzt werden." },
        ]
    },
     "Semester 4": {
        "HK A4: Umsetzung von Professionalität und Klientenzentrierung - Transkulturelle Pflege": [
            { term: "Transkulturelle Pflege", definition: "Pflege, die kulturelle Unterschiede, Werte und Bedürfnisse von Klienten berücksichtigt und respektiert." },
            { term: "Migration", definition: "Dauerhafter Wechsel des Wohnsitzes über Staatsgrenzen hinweg." },
        ],
        "HK A5: Umsetzung von Professionalität und Klientenzentrierung - Qualitätssicherung": [
            { term: "Pflegeprozess", definition: "Systematischer Problemlösungsansatz in der Pflege (Informationssammlung, Diagnose, Zielsetzung, Planung, Durchführung, Evaluation)." },
            { term: "Fehlermanagement", definition: "Systematischer Umgang mit Fehlern zur Verbesserung der Sicherheit und Qualität." },
        ],
        "HK B4: Pflege und Betreuung - Atmung": [
            { term: "Pneumonie", definition: "Lungenentzündung, eine Infektion des Lungengewebes." },
            { term: "COPD (Chronisch obstruktive Lungenerkrankung)", definition: "Chronische Lungenerkrankung mit Verengung der Atemwege und oft Lungenemphysem." },
            { term: "Aerosol", definition: "Feinste Verteilung fester oder flüssiger Stoffe in einem Gas (z.B. zur Inhalation von Medikamenten)." },
        ],
        "HK B6: Pflege und Betreuung - Ruhen und Schlafen": [
             { term: "Somnolenz", definition: "Abnorme Schläfrigkeit, Benommenheit; der Patient ist leicht weckbar." },
             { term: "Hypnotika", definition: "Schlafmittel, Medikamente zur Förderung des Schlafes." },
        ],
        "HK C2: Pflege und Betreuung in anspruchsvollen Situationen - Onkologie und Schmerzen": [
            { term: "WHO-Stufenplan", definition: "Schema der Weltgesundheitsorganisation zur medikamentösen Schmerztherapie in drei Stufen." },
            { term: "Metastasen", definition: "Tochtergeschwülste eines bösartigen Tumors, die sich in anderen Körperregionen ansiedeln." },
            { term: "Chemotherapie", definition: "Medikamentöse Behandlung von Krebserkrankungen mit Zytostatika." },
        ],
        "HK C3: Pflege und Betreuung in anspruchsvollen Situationen - Krisensituation": [
            { term: "Copingstrategien", definition: "Bewältigungsmechanismen und Verhaltensweisen im Umgang mit Stress, Belastungen und Krisen." },
            { term: "Suizidalität", definition: "Gefährdung durch Selbsttötungsgedanken, -absichten oder -handlungen." },
        ],
        "HK C4: Pflege und Betreuung in anspruchsvollen Situationen - Chronische Krankheiten": [
            { term: "Adhärenz", definition: "Einhaltung der gemeinsam von Klient und Fachperson vereinbarten Therapieziele und -maßnahmen." },
            { term: "Multimorbidität", definition: "Gleichzeitiges Bestehen mehrerer chronischer Erkrankungen bei einer Person." },
        ],
        "HK C5: Pflege und Betreuung in anspruchsvollen Situationen - Verwirrtheitszuständen": [
            { term: "Demenz", definition: "Fortschreitender Verlust kognitiver Fähigkeiten (Gedächtnis, Orientierung, Sprache, Denken)." },
            { term: "Validation", definition: "Kommunikationsmethode für Menschen mit Demenz, die ihre subjektive Realität und Gefühlswelt anerkennt und bestätigt." },
            { term: "Delir", definition: "Akuter Verwirrtheitszustand mit Bewusstseins-, Aufmerksamkeits- und Wahrnehmungsstörungen." },
        ],
        "HK D4: Ausführen von medizinaltechnischen Verrichtungen - Infusionen richten für den bestehenden peripher venösem Zugang": [
            { term: "Phlebitis", definition: "Venenentzündung, oft als Komplikation bei venösen Zugängen (z.B. Infusionen)." },
            { term: "Isotonische Lösung", definition: "Lösung mit dem gleichen osmotischen Druck wie das Blutplasma." },
        ],
        "HK D5: Ausführen von medizinaltechnischen Verrichtungen - Sondennahrung": [
            { term: "PEG-Sonde (Perkutane endoskopische Gastrostomie)", definition: "Ernährungssonde, die durch die Bauchwand direkt in den Magen gelegt wird." },
            { term: "Enteral", definition: "Verabreichung von Nahrung oder Medikamenten über den Magen-Darm-Trakt." },
        ],
        "HK D7: Ausführen von medizinaltechnischen Verrichtungen - Wundmanagement": [
            { term: "Dekubitus", definition: "Druckgeschwür, eine Schädigung der Haut und des darunterliegenden Gewebes durch langanhaltenden Druck." },
            { term: "Nekrose", definition: "Abgestorbenes Gewebe." },
            { term: "Exsudat", definition: "Flüssigkeitsaustritt aus Gefäßen bei Entzündungen oder Wunden." },
        ],
        "HK E2: Fördern und erhalten von Gesundheit und Hygiene - Impfen, Influenza": [
            { term: "Influenza", definition: "Echte Grippe, eine akute, fieberhafte Viruserkrankung der Atemwege." },
            { term: "Aktive Impfung", definition: "Impfung mit abgeschwächten oder abgetöteten Erregern (oder deren Teilen) zur Anregung der körpereigenen Immunantwort." },
        ],
        "HK E4: Fördern und erhalten von Gesundheit und Hygiene - Ernährung beraten": [
            { term: "Body-Mass-Index (BMI)", definition: "Maßzahl zur Bewertung des Körpergewichts in Relation zur Körpergröße (kg/m²)." },
            { term: "Lebensmittelpyramide", definition: "Grafische Darstellung von Empfehlungen für eine ausgewogene Ernährung." },
        ],
        "HK F3: Gestalten des Alltags - Sexualität": [
            { term: "Sexuelle Orientierung", definition: "Emotionale, romantische und/oder sexuelle Anziehung zu anderen Personen (z.B. hetero-, homo-, bisexuell)." },
            { term: "Primäre Geschlechtsmerkmale", definition: "Angeborene Geschlechtsorgane (z.B. Penis, Hoden bzw. Vagina, Ovarien)." },
        ]
    },
    "Semester 5": {
        "HK A5: Umsetzung von Professionalität und Klientenzentrierung - Leitungserfassung": [
            { term: "SwissDRG", definition: "Fallpauschalensystem zur Abrechnung von stationären Krankenhausleistungen in der Schweiz." },
            { term: "LEP (Leistungserfassung Pflege)", definition: "System zur Erfassung und Dokumentation von Pflegeleistungen." },
        ],
        "HK C1: Pflege und Betreuung in anspruchsvollen Situationen - Notfallsituationen": [
            { term: "Reanimation", definition: "Wiederbelebungsmaßnahmen bei Herz-Kreislauf-Stillstand (Herzdruckmassage, Beatmung)." },
            { term: "Hypovolämischer Schock", definition: "Lebensbedrohlicher Zustand durch massiven Flüssigkeits- oder Blutverlust." },
            { term: "Defibrillator", definition: "Gerät zur Behandlung von Herzrhythmusstörungen durch elektrische Impulse." },
        ],
        "HK C2: Pflege und Betreuung in anspruchsvollen Situationen - Sterbephasen": [
            { term: "Sterbephasen (nach Kübler-Ross)", definition: "Modell zur Beschreibung emotionaler Reaktionen im Sterbeprozess (Leugnen, Zorn, Verhandeln, Depression, Akzeptanz)." },
            { term: "Patientenverfügung", definition: "Schriftliche Willenserklärung für medizinische Behandlungen im Falle eigener Entscheidungsunfähigkeit." },
        ],
        "HK C3: Pflege und Betreuung in anspruchsvollen Situationen - Abhängigkeit": [
            { term: "Entzugssyndrom", definition: "Körperliche und psychische Symptome, die beim Absetzen oder Reduzieren einer suchterzeugenden Substanz auftreten." },
            { term: "Substanzgebundene Abhängigkeit", definition: "Sucht nach psychoaktiven Substanzen (z.B. Alkohol, Drogen, Medikamente)." },
        ],
        "HK C4: Pflege und Betreuung in anspruchsvollen Situationen - Palliative Situation": [
            { term: "Palliative Care", definition: "Umfassende Betreuung zur Verbesserung der Lebensqualität von Patienten und ihren Familien bei unheilbaren, fortschreitenden Krankheiten." },
            { term: "Symptommanagement", definition: "Systematische Erfassung und Behandlung belastender Symptome in der Palliative Care." },
        ],
        "HK F3: Gestalten des Alltags - Sexuell übertragbare Krankheiten": [
            { term: "HI-Viren (HIV)", definition: "Humanes Immundefizienz-Virus, Erreger der Immunschwächekrankheit AIDS." },
            { term: "Chlamydien", definition: "Bakterien, die sexuell übertragbare Infektionen im Urogenitalbereich verursachen können." },
        ]
    }
};

// JavaScript-Logik
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
    if (screenName === 'game') {
        revealInfoDiv.classList.add('hidden');
        revealBtn.classList.remove('hidden');
        replaySamePlayersBtn.classList.add('hidden');
    }
}

function showMessage(message, duration = 3000) {
    messageText.textContent = message;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('fade-in-out');
    setTimeout(() => {
        messageBox.classList.add('hidden');
        messageBox.classList.remove('fade-in-out');
    }, duration);
}

function populateSemesterSelect() {
    semesterSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = "Zufall";
    defaultOption.textContent = "Zufall (Alle Semester)";
    semesterSelect.appendChild(defaultOption);

    Object.keys(termsBySemester).forEach(semesterKey => {
        const option = document.createElement('option');
        option.value = semesterKey;
        option.textContent = semesterKey;
        semesterSelect.appendChild(option);
    });
    populateHkSelect(semesterSelect.value);
}

function populateHkSelect(selectedSemester) {
    hkSelect.innerHTML = '';
    if (selectedSemester === "Zufall" || !termsBySemester[selectedSemester]) {
        hkSelectContainer.classList.add('hidden');
        return;
    }

    hkSelectContainer.classList.remove('hidden');

    const allHkOption = document.createElement('option');
    allHkOption.value = "Alle_HKs";
    allHkOption.textContent = "Alle HKs dieses Semesters";
    hkSelect.appendChild(allHkOption);

    const semesterData = termsBySemester[selectedSemester];
    Object.keys(semesterData).forEach(hkKey => {
        const option = document.createElement('option');
        option.value = hkKey;
        option.textContent = hkKey;
        hkSelect.appendChild(option);
    });
}

semesterSelect.addEventListener('change', (event) => {
    populateHkSelect(event.target.value);
});

startGameBtn.addEventListener('click', () => {
    const selectedSemesterValue = semesterSelect.value;
    const selectedHkValue = hkSelect.value;
    currentTermsList = [];

    if (selectedSemesterValue === "Zufall") {
        Object.values(termsBySemester).forEach(semesterHks => {
            Object.values(semesterHks).forEach(hkTerms => {
                currentTermsList.push(...hkTerms);
            });
        });
    } else if (termsBySemester[selectedSemesterValue]) {
        const semesterHks = termsBySemester[selectedSemesterValue];
        if (!hkSelectContainer.classList.contains('hidden') && selectedHkValue === "Alle_HKs") {
             Object.values(semesterHks).forEach(hkTerms => {
                currentTermsList.push(...hkTerms);
            });
        } else if (!hkSelectContainer.classList.contains('hidden') && semesterHks[selectedHkValue]) {
            currentTermsList = [...semesterHks[selectedHkValue]];
        } else { 
             Object.values(semesterHks).forEach(hkTerms => {
                currentTermsList.push(...hkTerms);
            });
        }
    }

    if (currentTermsList.length === 0) {
        showMessage("Keine Begriffe für die Auswahl gefunden. Bitte die Begriffsliste im Code prüfen.");
        return;
    }
    playerNamesForReplay = [];
    showScreen('playerSetup');
    populatePlayerCountSelect();
    updatePlayerNameInputs(); 
});

backToStartBtn.addEventListener('click', () => {
    showScreen('start');
    hkSelectContainer.classList.add('hidden');
    hkSelect.innerHTML = '';
});

playerCountSelect.addEventListener('change', updatePlayerNameInputs);

submitPlayersBtn.addEventListener('click', () => {
    const numPlayers = parseInt(playerCountSelect.value);
    const names = [];
    let allNamesFilled = true;
    for (let i = 0; i < numPlayers; i++) {
        const input = document.getElementById(`playerName${i}`);
        if (input.value.trim() === '') {
            allNamesFilled = false;
            break;
        }
        names.push(input.value.trim());
    }

    if (!allNamesFilled) {
        showMessage("Bitte gib allen Spielern einen Namen.");
        return;
    }
    if (new Set(names).size !== names.length) {
         showMessage("Spielernamen müssen eindeutig sein.");
         return;
    }
    playerNamesForReplay = [...names];
    initializeGameWithCurrentPlayers();
    showScreen('roleReveal');
    displayPlayerCards();
});

replaySamePlayersBtn.addEventListener('click', () => {
    if (playerNamesForReplay.length > 0) {
        revealInfoDiv.classList.add('hidden');
        replaySamePlayersBtn.classList.add('hidden');
        revealBtn.classList.remove('hidden');

        initializeGameWithCurrentPlayers();
        showScreen('roleReveal');
        displayPlayerCards();
    } else {
        showMessage("Fehler: Keine Spielerdaten für 'Nochmal spielen' gefunden.");
        resetGame();
        showScreen('start');
    }
});

proceedToGameBtn.addEventListener('click', () => {
    showScreen('game');
    determineStartingPlayer();
});

newGameBtn.addEventListener('click', () => {
    resetGame();
    showScreen('start');
});

revealBtn.addEventListener('click', () => {
    if (players.length > 0 && imposterIndex !== -1 && currentWord.term !== '') {
        const imposterPlayer = players[imposterIndex];
        imposterWasText.textContent = `Der Imposter war: ${imposterPlayer.name}`;
        wordWasText.textContent = `Der Begriff war: ${currentWord.term}`;
        revealInfoDiv.classList.remove('hidden');
        revealBtn.classList.add('hidden');
        replaySamePlayersBtn.classList.remove('hidden');
    } else {
        showMessage("Spiel muss erst konfiguriert sein.");
    }
});

function populatePlayerCountSelect() {
    playerCountSelect.innerHTML = ''; 
    for (let i = 2; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Spieler`;
        playerCountSelect.appendChild(option);
    }
    playerCountSelect.value = Math.min(8, Math.max(2, playerNamesForReplay.length > 0 ? playerNamesForReplay.length : 4)).toString();
}

function updatePlayerNameInputs() {
    const numPlayers = parseInt(playerCountSelect.value);
    playerNameInputsContainer.innerHTML = ''; 
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `playerName${i}`;
        input.value = playerNamesForReplay[i] || '';
        input.placeholder = `Name Spieler ${i + 1}`;
        input.className = 'w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg';
        playerNameInputsContainer.appendChild(input);
    }
}

function initializeGameWithCurrentPlayers() {
    players = []; 
    if (currentTermsList.length === 0) {
        const selectedSemesterValue = semesterSelect.value;
        const selectedHkValue = hkSelect.value;
        if (selectedSemesterValue === "Zufall") {
            Object.values(termsBySemester).forEach(semesterHks => {
                Object.values(semesterHks).forEach(hkTerms => currentTermsList.push(...hkTerms));
            });
        } else if (termsBySemester[selectedSemesterValue]) {
            const semesterHks = termsBySemester[selectedSemesterValue];
            if (!hkSelectContainer.classList.contains('hidden') && selectedHkValue === "Alle_HKs") {
                Object.values(semesterHks).forEach(hkTerms => currentTermsList.push(...hkTerms));
            } else if (!hkSelectContainer.classList.contains('hidden') && semesterHks[selectedHkValue]) {
                currentTermsList = [...semesterHks[selectedHkValue]];
            } else {
                Object.values(semesterHks).forEach(hkTerms => currentTermsList.push(...hkTerms));
            }
        }
        if (currentTermsList.length === 0) {
             showMessage("Fehler: Keine Begriffe für die Auswahl gefunden.");
             currentWord = { term: "FEHLER", definition: "Keine Begriffe geladen." };
             resetGame();
             showScreen('start');
             return; 
        }
    }
    
    currentWord = currentTermsList[Math.floor(Math.random() * currentTermsList.length)];
    imposterIndex = Math.floor(Math.random() * playerNamesForReplay.length);
    rolesRevealedCount = 0;
    
    proceedToGameBtn.classList.add('hidden'); 
    revealInfoDiv.classList.add('hidden');
    replaySamePlayersBtn.classList.add('hidden');
    revealBtn.classList.remove('hidden'); 

    playerNamesForReplay.forEach((name, index) => {
        players.push({
            name: name,
            isImposter: index === imposterIndex,
            roleRevealed: false 
        });
    });
}

function displayPlayerCards() {
    playerCardsContainer.innerHTML = '';
    players.forEach((player, index) => {
        // Kartenhöhe für mobile Geräte optimiert
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card h-48'; // Etwas höhere Karte für bessere Bedienbarkeit

        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front flex flex-col justify-center items-center p-2';
        cardFront.innerHTML = `<span class="font-semibold text-xl">${player.name}</span><span class="text-sm mt-1">(Klicken zum Aufdecken)</span>`;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back p-3 break-words flex flex-col justify-center items-center'; 
        
        if (player.isImposter) {
            cardBack.innerHTML = `<span class="font-bold text-2xl">IMPOSTER</span><p class="text-sm mt-1">Du kennst den Begriff nicht!</p>`;
        } else {
            const termContainer = document.createElement('div');
            termContainer.className = 'relative group text-center w-full px-1 flex flex-col items-center justify-center h-full';

            const termText = document.createElement('span');
            termText.className = 'font-semibold term-text-hyphenate text-xl'; // Größere Schriftgröße
            termText.textContent = currentWord.term;
            
            termContainer.appendChild(termText);

            const questionMarkContainer = document.createElement('div');
            questionMarkContainer.className = 'mt-2';

            const questionMark = document.createElement('span');
            questionMark.className = 'text-lg cursor-help opacity-80'; // Größeres Fragezeichen
            questionMark.textContent = '❓ Definition';
            questionMarkContainer.appendChild(questionMark);
            
            const definitionBox = document.createElement('div');
            definitionBox.className = 'definition-tooltip absolute hidden group-hover:block bg-slate-700 text-white text-sm rounded-lg p-3 shadow-xl whitespace-normal text-left';
            definitionBox.textContent = currentWord.definition;
            questionMarkContainer.appendChild(definitionBox);
            
            termContainer.appendChild(questionMarkContainer);
            cardBack.appendChild(termContainer);
        }
        
        const understoodButton = document.createElement('button');
        understoodButton.textContent = "Verstanden";
        understoodButton.className = "absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/25 hover:bg-white/40 text-white text-sm font-semibold py-2 px-4 rounded-lg";
        understoodButton.onclick = (e) => {
            e.stopPropagation(); 
            cardContainer.classList.remove('flipped'); 
            cardFront.innerHTML = `<span class="font-semibold text-xl">${player.name}</span><span class="text-base text-green-200">✔️</span>`;
            cardContainer.onclick = null; 
            player.roleRevealed = true;
            rolesRevealedCount++;
            if (rolesRevealedCount === players.length) {
                proceedToGameBtn.classList.remove('hidden');
            }
        };
        cardBack.appendChild(understoodButton);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardContainer.appendChild(cardInner);

        cardContainer.addEventListener('click', () => {
            if (!cardContainer.classList.contains('flipped') && !player.roleRevealed) {
                cardContainer.classList.add('flipped');
            }
        });
        playerCardsContainer.appendChild(cardContainer);
    });
}

function determineStartingPlayer() {
    let crewmates = players.filter(p => !p.isImposter);
    if (crewmates.length === 0) { 
        if (players.length > 0) { 
             const startingPlayer = players[Math.floor(Math.random() * players.length)];
             startingPlayerText.textContent = `${startingPlayer.name} beginnt!`;
        } else {
            startingPlayerText.textContent = "Fehler: Keine Spieler gefunden.";
        }
        return;
    }
    const startingPlayer = crewmates[Math.floor(Math.random() * crewmates.length)];
    startingPlayerText.textContent = `${startingPlayer.name} beginnt mit dem ersten Hinweis!`;
}

function resetGame() {
    players = [];
    playerNamesForReplay = [];
    currentWord = { term: '', definition: '' };
    imposterIndex = -1;
    rolesRevealedCount = 0;
    currentTermsList = [];
    playerNameInputsContainer.innerHTML = '';
    playerCardsContainer.innerHTML = '';
    proceedToGameBtn.classList.add('hidden');
    semesterSelect.value = "Zufall"; 
    hkSelectContainer.classList.add('hidden');
    hkSelect.innerHTML = '';
    
    revealInfoDiv.classList.add('hidden');
    revealBtn.classList.remove('hidden'); 
    replaySamePlayersBtn.classList.add('hidden'); 
    imposterWasText.textContent = ''; 
    wordWasText.textContent = '';    
}

// Initial Setup
populateSemesterSelect();
showScreen('start');
