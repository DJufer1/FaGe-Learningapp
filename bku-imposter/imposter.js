// bku-imposter/imposter.js - Version 3 (mit sauberem Event-Handling)

function ImposterGame() {
    // DOM Elements - Einmalig beim Erstellen des Objekts finden
    this.screens = {
        start: document.getElementById('start-screen'),
        playerSetup: document.getElementById('player-setup-screen'),
        roleReveal: document.getElementById('role-reveal-screen'),
        game: document.getElementById('game-screen'),
    };
    this.startGameBtn = document.getElementById('startGameBtn');
    this.semesterSelect = document.getElementById('semesterSelect');
    this.hkSelectContainer = document.getElementById('hk-select-container');
    this.hkSelect = document.getElementById('hkSelect');
    this.playerCountSelect = document.getElementById('playerCount');
    this.playerNameInputsContainer = document.getElementById('playerNameInputs');
    this.submitPlayersBtn = document.getElementById('submitPlayersBtn');
    this.backToStartBtn = document.getElementById('backToStartBtn');
    this.playerCardsContainer = document.getElementById('playerCardsContainer');
    this.proceedToGameBtn = document.getElementById('proceedToGameBtn');
    this.startingPlayerText = document.getElementById('startingPlayerText');
    this.newGameBtn = document.getElementById('newGameBtn');
    this.messageBox = document.getElementById('message-box');
    this.messageText = document.getElementById('message-text');
    this.revealBtn = document.getElementById('revealBtn');
    this.revealInfoDiv = document.getElementById('reveal-info');
    this.imposterWasText = document.getElementById('imposterWasText');
    this.wordWasText = document.getElementById('wordWasText');
    this.replaySamePlayersBtn = document.getElementById('replaySamePlayersBtn');

// Begriff-Datenbank
   this.termsBySemester = {
    "Semester 1": {
        "HK A1: Umsetzung von Professionalität und Klientenzentrierung - Berufsperson": [
            { term: "Instruktion", definition: "Gezielte Anleitung und Unterweisung in pflegerischen Tätigkeiten." },
            { term: "Reflexion", definition: "Systematisches Nachdenken über berufliche Erfahrungen und Handlungen zur Kompetenzentwicklung." },
            { term: "Lernjournal", definition: "Ein Instrument zur Dokumentation und Reflexion des eigenen Lernprozesses." },
            { term: "Arbeitsplan", definition: "Strukturierte Übersicht der zu erledigenden Aufgaben innerhalb einer bestimmten Zeit." },
            { term: "Anstalten", definition: "Historischer Begriff für Institutionen wie Krankenhäuser oder Pflegeheime." },
            { term: "Pflegerinnenschulen", definition: "Historische Bezeichnung für die ersten Bildungseinrichtungen in der Pflege." },
            { term: "Florence Nightingale", definition: "Britische Krankenschwester, Pionierin der modernen, evidenzbasierten Krankenpflege." },
            { term: "Henry Dunant", definition: "Schweizer Geschäftsmann, Gründer des Internationalen Komitees vom Roten Kreuz (IKRK)." },
            { term: "Schweizerisches Rotes Kreuz", definition: "Nationale Rotkreuz-Gesellschaft der Schweiz, wichtige Organisation im Gesundheits- und Sozialwesen." },
            { term: "Sekundarstufe II", definition: "Bildungsstufe, die auf der obligatorischen Schule aufbaut (z.B. berufliche Grundbildung wie FaGe)." },
            { term: "Tertiärstufe", definition: "Höhere Bildungsstufe nach der Sekundarstufe II (z.B. höhere Fachschulen, Fachhochschulen, Universitäten)." },
            { term: "Eidgenössisches Fähigkeitszeugnis (EFZ)", definition: "Abschlusszeugnis einer beruflichen Grundbildung in der Schweiz." },
            { term: "Datenschutz", definition: "Schutz personenbezogener Daten vor Missbrauch, gesetzlich geregelt." },
            { term: "Berufsgeheimnis", definition: "Gesetzliche Schweigepflicht über Informationen, die in der Berufsausübung anvertraut wurden." },
            { term: "Dokumentation", definition: "Schriftliche Festhaltung von Beobachtungen, Massnahmen und Verläufen zur Sicherung der Pflegequalität und aus rechtlichen Gründen." },
            { term: "Modell des Lebens", definition: "Ein von Liliane Juchli entwickeltes Pflegemodell, das auf den Aktivitäten des täglichen Lebens (ATL) basiert." },
            { term: "Liliane Juchli", definition: "Schweizer Ordensschwester und Pflegewissenschaftlerin, Entwicklerin des einflussreichen ATL-Pflegemodells." },
            { term: "Aktivitäten des täglichen Lebens", definition: "Grundlegende Verrichtungen wie Körperpflege, Essen, Mobilität (ATL), die für die Selbstständigkeit zentral sind." },
            { term: "Lernmethoden", definition: "Verschiedene Strategien und Techniken, um sich Wissen und Fähigkeiten anzueignen." },
            { term: "Prüfungsmethoden", definition: "Verfahren zur Überprüfung des erlernten Wissens und der erworbenen Kompetenzen." },
        ],
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Kommunikation": [
            { term: "4-Ohren-Modell", definition: "Kommunikationsmodell (Sach-, Selbstoffenbarungs-, Beziehungs-, Appell-Ohr) von Friedemann Schulz von Thun." },
            { term: "Appell", definition: "Die Aufforderung oder der Wunsch, der in einer Nachricht enthalten ist; eine der vier Ebenen des 4-Ohren-Modells." },
            { term: "Empathie", definition: "Die Fähigkeit, sich in die Gefühle und die Perspektive einer anderen Person hineinzuversetzen." },
            { term: "Wertschätzung", definition: "Eine respektvolle und anerkennende Haltung gegenüber einer anderen Person." },
            { term: "psychisch", definition: "Die Seele, das Denken und Fühlen betreffend." },
            { term: "physisch", definition: "Den Körper betreffend." },
            { term: "verbal", definition: "Die Kommunikation mit Worten (gesprochen oder geschrieben)." },
            { term: "nonverbal", definition: "Die Kommunikation ohne Worte, z.B. durch Körpersprache, Mimik und Gestik." },
            { term: "paraverbal", definition: "Aspekte der stimmlichen Kommunikation wie Tonfall, Sprechtempo oder Lautstärke." },
            { term: "Feedbackregeln", definition: "Richtlinien für das Geben und Nehmen von Rückmeldungen, um die Kommunikation konstruktiv zu gestalten." },
            { term: "Aktives Zuhören", definition: "Aufmerksames Zuhören mit verbalen (z.B. Paraphrasieren) und nonverbalen Signalen." },
            { term: "Paraphrasieren", definition: "Wiedergeben des Gehörten in eigenen Worten zur Verständnissicherung." },
            { term: "offene Fragen", definition: "Fragen, die nicht mit 'Ja' oder 'Nein' beantwortet werden können (W-Fragen) und zu ausführlichen Antworten anregen." },
            { term: "geschlossene Fragen", definition: "Fragen, die in der Regel mit 'Ja' oder 'Nein' beantwortet werden und zur gezielten Informationsgewinnung dienen." },
            { term: "Nähe und Distanz", definition: "Die Regulation des persönlichen Raums und der emotionalen Beziehung im professionellen Pflegekontext." },
            { term: "interdisziplinär", definition: "Die Zusammenarbeit von Fachpersonen aus verschiedenen Disziplinen (z.B. Pflege, Ärzte, Physiotherapie)." },
            { term: "intradisziplinär", definition: "Die Zusammenarbeit von Fachpersonen innerhalb derselben Disziplin (z.B. FaGe, HF Pflege, Experte)." },
            { term: "Bezugspersonen", definition: "Wichtige Personen im sozialen Umfeld eines Klienten (z.B. Familie, enge Freunde)." },
            { term: "Beziehung", definition: "Das Verhältnis zwischen Pflegenden und Klienten, das auf Vertrauen und Professionalität basiert." },
        ],
        "HK A4: Umsetzung von Professionalität und Klientenzentrierung - Kultur, Entwicklung, Ethik": [
            { term: "Identität", definition: "Das Selbstverständnis einer Person; wer sie ist und wofür sie steht." },
            { term: "Entwicklung", definition: "Der Prozess der Veränderung eines Menschen über die Lebensspanne hinweg (körperlich, kognitiv, sozial)." },
            { term: "Entwicklungspsychologie", definition: "Teilgebiet der Psychologie, das sich mit den altersbezogenen Veränderungen im Erleben und Verhalten beschäftigt." },
            { term: "Ethik", definition: "Die Lehre vom moralischen Handeln; sie fragt, was gutes und richtiges Handeln ist." },
            { term: "Autonomie", definition: "Das Recht auf Selbstbestimmung des Klienten." },
            { term: "Gutes tun", definition: "Ethisches Prinzip (Beneficence), das verpflichtet, zum Wohle des Klienten zu handeln." },
            { term: "Nicht Schaden", definition: "Ethisches Prinzip (Non-Maleficence), das verpflichtet, Schaden vom Klienten abzuwenden." },
            { term: "Gerechtigkeit", definition: "Ethisches Prinzip, das eine faire Verteilung von Ressourcen und eine unparteiische Behandlung fordert." },
            { term: "Moral", definition: "Die Gesamtheit der in einer Gesellschaft gelebten Werte und Normen." },
            { term: "Normen", definition: "Konkrete Verhaltensregeln, die sich aus Werten ableiten." },
            { term: "Werte", definition: "Grundlegende Überzeugungen und Leitvorstellungen, die das Handeln orientieren." },
            { term: "Ethische Prinzipien", definition: "Leitlinien für moralisches Handeln in der Pflege (z.B. Autonomie, Gutes tun, Nicht schaden, Gerechtigkeit)." },
            { term: "Ethisches Dilemma", definition: "Eine Situation, in der zwei oder mehr ethische Prinzipien im Widerspruch zueinander stehen und keine einfache Lösung möglich ist." },
        ],
        "HK B1: Pflege und Betreuung - Körperpflege": [
            { term: "Atome", definition: "Die kleinsten Bausteine der Materie." },
            { term: "Moleküle", definition: "Verbände von zwei oder mehr Atomen." },
            { term: "Zellen", definition: "Die kleinste lebende Einheit des Körpers." },
            { term: "Organsystem", definition: "Eine Gruppe von Organen, die zusammen eine spezifische Funktion erfüllen (z.B. Verdauungssystem)." },
            { term: "Diffusion", definition: "Selbstständige Vermischung von Teilchen entlang eines Konzentrationsgefälles (von hoch zu niedrig)." },
            { term: "Osmose", definition: "Diffusion von Wasser durch eine semipermeable Membran." },
            { term: "Hautturgor", definition: "Spannungszustand der Haut, Indikator für den Flüssigkeitshaushalt." },
            { term: "Hautbeschaffenheit", definition: "Zustand der Hautoberfläche (z.B. glatt, rau, schuppig)." },
            { term: "Hauttypen", definition: "Klassifizierung der Haut nach ihren Eigenschaften (z.B. trockene, fettige, Mischhaut)." },
            { term: "Physiologische Veränderungen der Haut", definition: "Normale, altersbedingte Veränderungen der Haut (z.B. Faltenbildung, Elastizitätsverlust)." },
            { term: "Pathophysiologische Veränderungen der Haut", definition: "Krankhafte Veränderungen der Haut (z.B. Entzündungen, Tumore)." },
            { term: "Exanthem", definition: "Akut auftretender Hautausschlag." },
            { term: "Fissur", definition: "Ein schmaler, schlitzförmiger Einriss der Haut (Rhagade)." },
            { term: "Zyste", definition: "Ein von einer Kapsel umschlossener Hohlraum im Gewebe, oft mit Flüssigkeit gefüllt." },
            { term: "Ulcus", definition: "Ein tiefreichender Gewebedefekt der Haut oder Schleimhaut mit schlechter Heilungstendenz (Geschwür)." },
            { term: "Aphte", definition: "Eine schmerzhafte, kleine, linsenförmige Erosion der Mundschleimhaut." },
            { term: "Dermatitis", definition: "Eine entzündliche Reaktion der Haut." },
            { term: "Ekzem", definition: "Eine nicht-infektiöse entzündliche Hauterkrankung mit Juckreiz, Rötung und Bläschenbildung." },
            { term: "Melanom", definition: "Bösartiger Tumor der pigmentbildenden Zellen der Haut (schwarzer Hautkrebs)." },
            { term: "Hautschuppen", definition: "Abgestorbene Zellen der obersten Hautschicht." },
            { term: "Professionelle Berührung", definition: "Zielgerichtete, respektvolle Berührung im Pflegekontext." },
            { term: "Berührungszonen", definition: "Einteilung des Körpers in öffentliche und intime Zonen, die bei der Pflege beachtet werden muss." },
            { term: "Prinzipien der Hautpflege", definition: "Grundsätze zur Erhaltung einer gesunden Haut (z.B. pH-neutrale Produkte, sparsamer Einsatz von Wasser)." },
            { term: "Hautpflegemittel", definition: "Produkte zur Reinigung und Pflege der Haut (z.B. Lotionen, Cremes)." },
            { term: "Intertrigoprophylaxe", definition: "Vorbeugung von Hautschäden in Hautfalten (z.B. durch Reibung, Feuchtigkeit)." },
            { term: "Prinzipien der Körperpflege", definition: "Grundsätze der Körperpflege, die Ressourcen, Gewohnheiten und Intimsphäre des Klienten berücksichtigen." },
            { term: "W/O", definition: "Wasser-in-Öl-Emulsion; für trockene Haut geeignet, da sie einen Fettfilm hinterlässt." },
            { term: "O/W", definition: "Öl-in-Wasser-Emulsion; für normale bis fettige Haut geeignet, spendet Feuchtigkeit und zieht schnell ein." },
        ],
        "HK B2: Pflege und Betreuung - Mobilität": [
            { term: "Passiver Bewegungsapparat", definition: "Knochen, Gelenke, Bänder, Knorpel; stützt den Körper und ermöglicht Bewegung." },
            { term: "Knochen", definition: "Stabile Teile des Skeletts, die den Körper stützen und schützen." },
            { term: "Gelenke", definition: "Bewegliche Verbindungen zwischen zwei oder mehr Knochen." },
            { term: "Skelett", definition: "Das knöcherne Gerüst des Körpers." },
            { term: "Wirbelsäule", definition: "Die zentrale Achse des Skeletts, die den Rumpf stützt und das Rückenmark schützt." },
            { term: "Thorax", definition: "Der Brustkorb, gebildet aus Brustwirbelsäule, Sternum und Rippen." },
            { term: "Sternum", definition: "Das Brustbein, ein flacher Knochen in der vorderen Mitte des Brustkorbs." },
            { term: "Clavicula", definition: "Das Schlüsselbein." },
            { term: "Humerus", definition: "Der Oberarmknochen." },
            { term: "Radius", definition: "Die Speiche, einer der beiden Unterarmknochen (daumenseitig)." },
            { term: "Femur", definition: "Der Oberschenkelknochen, der längste Knochen des menschlichen Körpers." },
            { term: "Patella", definition: "Die Kniescheibe." },
            { term: "Tibia", definition: "Das Schienbein, der stärkere der beiden Unterschenkelknochen." },
            { term: "Fibula", definition: "Das Wadenbein, der dünnere der beiden Unterschenkelknochen." },
            { term: "Bänder", definition: "Bindegewebsstränge, die Knochen miteinander verbinden und Gelenke stabilisieren." },
            { term: "Aktiver Bewegungsapparat", definition: "Skelettmuskulatur, Sehnen und Faszien; ermöglicht die aktive Bewegung des Körpers." },
            { term: "Muskeln", definition: "Gewebe, das sich zusammenziehen (kontrahieren) kann und so Bewegung erzeugt." },
            { term: "glatte Muskulatur", definition: "Unwillkürlich gesteuerte Muskulatur, die in den Wänden von Hohlorganen (z.B. Darm, Blutgefässe) vorkommt." },
            { term: "quergestreifte Muskulatur", definition: "Skelettmuskulatur, die willkürlich gesteuert werden kann." },
            { term: "Agonist", definition: "Der Muskel, der eine bestimmte Bewegung ausführt (Spieler)." },
            { term: "Antagonist", definition: "Der Muskel, der der Bewegung des Agonisten entgegenwirkt (Gegenspieler)." },
            { term: "Sehnen", definition: "Feste Bindegewebsstränge, die Muskeln mit Knochen verbinden." },
            { term: "Sehnenscheiden", definition: "Mit Gelenkschmiere gefüllte Hüllen, die Sehnen an stark beanspruchten Stellen umgeben." },
            { term: "Schleimbeutel", definition: "Mit Flüssigkeit gefüllte Säckchen, die als Polster zwischen Knochen, Sehnen und Muskeln dienen." },
            { term: "Beobachtungskriterien", definition: "Spezifische Aspekte, auf die bei der Beobachtung der Bewegung geachtet wird (z.B. Gangbild, Koordination, Kraft)." },
            { term: "Physiologische Bewegung", definition: "Normale, gesunde und schmerzfreie Bewegung." },
            { term: "Bewegungseinschränkungen", definition: "Reduzierte Fähigkeit, bestimmte Bewegungen auszuführen." },
            { term: "Bewegungsstörungen", definition: "Abweichungen vom normalen Bewegungsablauf (z.B. Zittern, Lähmungen)." },
            { term: "Mobilität", definition: "Die Fähigkeit, sich frei und gezielt zu bewegen." },
            { term: "Immobilität", definition: "Unfähigkeit zur Bewegung oder stark eingeschränkte Bewegungsfähigkeit." },
            { term: "Sturz", definition: "Ein unfreiwilliges, unkontrolliertes Herabfallen auf eine tiefere Ebene." },
            { term: "Sturzgefahr", definition: "Ein erhöhtes Risiko, zu stürzen, bedingt durch intrinsische (personale) und extrinsische (umgebungsbedingte) Faktoren." },
            { term: "Sturzprophylaxe", definition: "Massnahmen zur Vorbeugung von Stürzen bei gefährdeten Personen." },
            { term: "Ressourcen", definition: "Vorhandene Fähigkeiten, Kräfte und Mittel einer Person, die zur Gesundheitsförderung genutzt werden können." },
        ],
        "HK B5: Pflege und Betreuung - Ernährung": [
            { term: "Verdauungssystem", definition: "Alle Organe, die an der Aufnahme, Zerkleinerung und Verwertung der Nahrung beteiligt sind." },
            { term: "Verdauungstrakt", definition: "Der Weg der Nahrung von der Mundhöhle bis zum After (Mund, Speiseröhre, Magen, Darm)." },
            { term: "Schluckvorgang", definition: "Komplexer, teils willkürlicher, teils unwillkürlicher Vorgang, der die Nahrung vom Mund in die Speiseröhre befördert." },
            { term: "Peristaltik", definition: "Wellenförmige Muskelkontraktion zur Fortbewegung von Nahrung im Verdauungstrakt." },
            { term: "Trachea", definition: "Die Luftröhre." },
            { term: "Ösophagus", definition: "Die Speiseröhre." },
            { term: "Gaster", definition: "Der Magen." },
            { term: "Hepar", definition: "Die Leber, zentrales Stoffwechselorgan." },
            { term: "Pankreas", definition: "Die Bauchspeicheldrüse; produziert Verdauungsenzyme und Hormone (z.B. Insulin)." },
            { term: "Duodenum", definition: "Der Zwölffingerdarm, erster Abschnitt des Dünndarms." },
            { term: "Jejunum", definition: "Der Leerdarm, mittlerer Abschnitt des Dünndarms." },
            { term: "Ileum", definition: "Der Krummdarm, letzter Abschnitt des Dünndarms." },
            { term: "Colon", definition: "Der Dickdarm." },
            { term: "Rektum", definition: "Der Mastdarm, letzter Abschnitt des Dickdarms." },
            { term: "Appendix", definition: "Der Wurmfortsatz (fälschlicherweise oft als 'Blinddarm' bezeichnet)." },
            { term: "Gallenblase", definition: "Speichert und dickt die von der Leber produzierte Gallenflüssigkeit ein." },
            { term: "Resorption", definition: "Die Aufnahme von Nährstoffen aus dem Darm ins Blut." },
            { term: "Adipositas", definition: "Starkes Übergewicht, Fettleibigkeit (BMI ≥ 30)." },
            { term: "Kachexie", definition: "Auszehrung; starker Kräfteverfall und Abbau von Fett- und Muskelmasse bei schweren Erkrankungen." },
            { term: "Reflux", definition: "Rückfluss von Mageninhalt in die Speiseröhre." },
            { term: "Aspiration", definition: "Das Einatmen von Fremdstoffen (z.B. Nahrung, Mageninhalt) in die Atemwege." },
            { term: "Aspirationsprophylaxe", definition: "Massnahmen zur Vermeidung des Einatmens von Fremdstoffen in die Atemwege." },
            { term: "Dehydration", definition: "Flüssigkeitsmangel im Körper." },
            { term: "Dehydrationsprophylaxe", definition: "Massnahmen zur Vorbeugung von Flüssigkeitsmangel." },
            { term: "Malnutrition", definition: "Mangelernährung (qualitativ oder quantitativ)." },
            { term: "Dysphagie", definition: "Schluckstörung." },
            { term: "Appetitlosigkeit", definition: "Fehlendes Verlangen nach Nahrung." },
            { term: "Nahrungsablehnung", definition: "Aktive Weigerung, Nahrung zu sich zu nehmen." },
            { term: "Nahrungskarenz", definition: "Der Verzicht auf Nahrung aus medizinischen Gründen (z.B. vor einer Operation)." },
            { term: "Verdauungsbeschwerden", definition: "Probleme wie Blähungen, Verstopfung oder Durchfall." },
            { term: "Bewusstseinsveränderungen", definition: "Veränderungen der Wachheit oder Klarheit des Denkens, die die Nahrungsaufnahme beeinträchtigen können." },
            { term: "Trinkprotokoll", definition: "Dokumentation der aufgenommenen Flüssigkeitsmenge über einen bestimmten Zeitraum." },
            { term: "Ernährungsprotokoll", definition: "Dokumentation der aufgenommenen Speisen und Getränke." },
            { term: "Fingerfood", definition: "Speisen, die ohne Besteck gegessen werden können, oft bei Demenz oder motorischen Einschränkungen sinnvoll." },
            { term: "Hilfsmittel", definition: "Gegenstände, die die selbstständige Nahrungsaufnahme erleichtern (z.B. spezielles Besteck, Tellerranderhöhung)." },
        ],
        "HK E1: Fördern und Erhalten von Gesundheit und Hygiene - Hygienemassnahmen": [
            { term: "Sozialhygiene", definition: "Befasst sich mit dem Einfluss sozialer und gesellschaftlicher Faktoren auf die Gesundheit." },
            { term: "Umwelthygiene", definition: "Befasst sich mit dem Einfluss von Umweltfaktoren (Luft, Wasser, Boden) auf die Gesundheit." },
            { term: "Arbeitssicherheit", definition: "Massnahmen zur Verhütung von Arbeitsunfällen und Berufskrankheiten." },
            { term: "Hygienemassnahmen", definition: "Alle Massnahmen zur Verhinderung von Infektionen und zur Erhaltung der Gesundheit." },
            { term: "Hygienerichtlinien", definition: "Verbindliche Vorschriften und Empfehlungen zur Umsetzung der Hygiene in einer Institution." },
            { term: "Entsorgungsrichtlinien", definition: "Vorschriften für die sichere und umweltgerechte Entsorgung von Abfällen, insbesondere medizinischem Material." },
            { term: "Mikroorganismen", definition: "Kleinstlebewesen wie Bakterien, Viren, Pilze und Protozoen." },
            { term: "Krankheitsübertragung", definition: "Der Prozess, bei dem ein Krankheitserreger von einem Wirt auf einen anderen übertragen wird." },
            { term: "Entzündung", definition: "Die Reaktion des Körpers auf einen schädigenden Reiz (z.B. Erreger, Verletzung) mit den Zeichen Rötung, Schwellung, Schmerz, Wärme und Funktionsverlust." },
            { term: "Infektion", definition: "Das Eindringen, Anhaften und Vermehren von Krankheitserregern in einem Wirt." },
            { term: "nosokomiale Infektion", definition: "Im Krankenhaus oder einer Pflegeeinrichtung erworbene Infektion." },
            { term: "MRSA", definition: "Methicillin-resistenter Staphylococcus aureus; ein Bakterienstamm, der gegen viele gängige Antibiotika resistent ist." },
            { term: "Spital- und Individualhygiene", definition: "Unterscheidung zwischen Hygienemassnahmen, die die gesamte Einrichtung betreffen (Spitalhygiene) und solchen, die den einzelnen Menschen betreffen (Individualhygiene)." },
            { term: "Infektionskette", definition: "Weg eines Erregers vom Wirt zur Infektion eines neuen Wirts (Quelle, Übertragungsweg, Empfänger)." },
            { term: "Infektionswege", definition: "Die Art und Weise, wie ein Erreger übertragen wird (z.B. Kontakt, Tröpfchen)." },
            { term: "Eingangspforte", definition: "Stelle, an der ein Krankheitserreger in den Körper eindringt (z.B. Wunde, Schleimhäute)." },
            { term: "Ausgangspforte", definition: "Stelle, an der ein Krankheitserreger den Körper des Wirts verlässt (z.B. Atemwege, Stuhl)." },
            { term: "Wirt", definition: "Ein Lebewesen, das einen Krankheitserreger in sich trägt." },
            { term: "direkter Übertragungsweg", definition: "Übertragung von Krankheitserregern durch unmittelbaren Kontakt zwischen Infektionsquelle und Empfänger." },
            { term: "indirekter Übertragungsweg", definition: "Übertragung von Krankheitserregern über ein unbelebtes Zwischenmedium (z.B. kontaminierte Gegenstände, Wasser)." },
            { term: "Kontaktübertragung", definition: "Übertragung durch direkten oder indirekten Kontakt." },
            { term: "Schmierübertragung", definition: "Eine Form der Kontaktübertragung, bei der Erreger über die Hände an Schleimhäute gelangen." },
            { term: "Tröpfchenübertragung", definition: "Übertragung durch grössere, erregerhaltige Tröpfchen, die beim Sprechen, Husten oder Niesen entstehen und über kurze Distanz wirken." },
            { term: "Fäkal-orale Übertragung", definition: "Übertragung von Erregern aus Fäkalien über den Mund (z.B. durch verunreinigtes Wasser oder Lebensmittel)." },
            { term: "Parenterale Übertragung", definition: "Übertragung von Erregern unter Umgehung des Magen-Darm-Trakts, z.B. durch Blut oder Nadelstichverletzungen." },
            { term: "Sexuelle Übertragung", definition: "Übertragung von Krankheitserregern durch sexuellen Kontakt." },
            { term: "Vektorielle Übertragung", definition: "Übertragung durch lebende Organismen wie Insekten (z.B. Zecken, Mücken)." },
            { term: "Reinigung", definition: "Entfernung von Schmutz und Mikroorganismen, ohne diese gezielt abzutöten." },
            { term: "Desinfektion und Sterilisation", definition: "Verfahren zur Keimreduktion (Desinfektion) bzw. zur Erreichung von Keimfreiheit (Sterilisation)." },
            { term: "tumor", definition: "Lateinisch für Schwellung; eines der fünf klassischen Entzündungszeichen." },
            { term: "rubor", definition: "Lateinisch für Rötung; eines der fünf klassischen Entzündungszeichen." },
            { term: "dolor", definition: "Lateinisch für Schmerz; eines der fünf klassischen Entzündungszeichen." },
            { term: "calor", definition: "Lateinisch für Wärme; eines der fünf klassischen Entzündungszeichen." },
            { term: "functio laesa", definition: "Lateinisch für eingeschränkte Funktion; eines der fünf klassischen Entzündungszeichen." },
        ],
        "HK G1: Wahrnehmen hauswirtschaftlicher Aufgaben - Kleidung und Wäsche": [
            { term: "Ökologie", definition: "Die Lehre von den Beziehungen der Lebewesen zu ihrer Umwelt; im Kontext der Wäschepflege z.B. der Einsatz umweltschonender Mittel." },
            { term: "Ökonomie", definition: "Wirtschaftlichkeit; im Kontext der Wäschepflege z.B. der energie- und wassersparende Einsatz von Geräten." },
            { term: "Qualitätskriterien WWWS", definition: "Kriterien zur Beurteilung der Qualität hauswirtschaftlicher Arbeit (Wirtschaftlichkeit, Wohlbefinden, Wirksamkeit, Sicherheit)." },
            { term: "Wäschekreislauf", definition: "Prozess von schmutziger zu sauberer Wäsche inkl. Sortieren, Waschen, Trocknen, Bügeln und Verräumen." },
            { term: "Textilkunde", definition: "Lehre von den Eigenschaften und der Verarbeitung von Textilien." },
            { term: "Arbeitsbedingungen", definition: "Die Umstände, unter denen Arbeit verrichtet wird (z.B. ergonomische Aspekte)." },
            { term: "Ankleiden", definition: "Das Anziehen von Kleidung." },
            { term: "Auskleiden", definition: "Das Ausziehen von Kleidung." },
            { term: "Kleiderwahl", definition: "Auswahl der Kleidung unter Berücksichtigung von Wünschen des Klienten, Wetter, Anlass und Funktionalität." },
            { term: "Textilien", definition: "Stoffe, die zur Herstellung von Kleidung und anderen Heimtextilien verwendet werden." },
            { term: "Wäschesymbole", definition: "Piktogramme auf Textiletiketten, die Pflegehinweise zum Waschen, Trocknen, Bügeln etc. geben." },
            { term: "Wäschepflege", definition: "Der gesamte Prozess der Reinigung und Pflege von Textilien." },
        ],
        "HK G2: Wahrnehmen hauswirtschaftlicher Aufgaben - Sauberes und sicheres Lebensumfeld": [
            { term: "Haushalt", definition: "Die Gesamtheit der Aufgaben, die in einem privaten Wohnbereich anfallen." },
            { term: "Haushaltsführung", definition: "Die Organisation und Durchführung der hauswirtschaftlichen Aufgaben." },
            { term: "Ordnung", definition: "Ein Zustand, in dem Gegenstände einen festen, nachvollziehbaren Platz haben." },
            { term: "Sauberkeit", definition: "Freiheit von Schmutz und Verunreinigungen." },
            { term: "Hygiene", definition: "Massnahmen zur Gesunderhaltung und zur Verhütung von Krankheiten, hier im hauswirtschaftlichen Kontext." },
            { term: "Sicherheit", definition: "Ein Zustand, der frei von unvertretbaren Risiken ist (z.B. Sturz-, Brandgefahr)." },
            { term: "Reinigung", definition: "Das Entfernen von unerwünschten Substanzen wie Schmutz von Oberflächen." },
            { term: "Reinigungsmittel", definition: "Chemische Produkte, die zur Reinigung verwendet werden." },
            { term: "natürliche Reinigungsmittel", definition: "Umweltfreundliche Alternativen zu chemischen Reinigungsmitteln (z.B. Essig, Soda)." },
            { term: "Reinigungsmethoden", definition: "Verschiedene Techniken der Reinigung (z.B. Nasswischen, Trockenreinigung)." },
            { term: "Reinigungsgeräte", definition: "Hilfsmittel für die Reinigung (z.B. Staubsauger, Mikrofasertuch)." },
            { term: "Chemikalien", definition: "Chemische Stoffe, die in Reinigungs- und Desinfektionsmitteln enthalten sind." },
            { term: "Küchenhygiene", definition: "Massnahmen zur Sauberkeit und Vermeidung von Keimübertragung in der Küche." },
            { term: "Gefahrensymbole", definition: "Piktogramme, die auf die von Chemikalien ausgehenden Gefahren hinweisen." },
            { term: "Unfallverhütung", definition: "Massnahmen zur Vermeidung von Unfällen im Haushalt." },
            { term: "Entsorgung", definition: "Das Beseitigen von Abfall." },
            { term: "Entsorgungsrichtlinien", definition: "Vorschriften zur korrekten Trennung und Entsorgung von Abfällen." },
            { term: "Ergonomie", definition: "Anpassung der Arbeitsbedingungen an den Menschen zur Gesundheitsförderung und Effizienzsteigerung." },
        ],
        "HK H2: Durchführen administrativer und logistischer Aufgaben - Informations- und Kommunikationstechnologien": [
            { term: "Dokumentationssysteme", definition: "Elektronische oder papierbasierte Systeme zur Erfassung und Verwaltung von pflegerelevanten Informationen." },
            { term: "E-Health-Strategie", definition: "Einsatz digitaler Technologien zur Unterstützung und Verbesserung des Gesundheitswesens." },
            { term: "Informationsholschuld", definition: "Die Verpflichtung, sich aktiv die für die Arbeit notwendigen Informationen zu beschaffen." },
            { term: "Informationsbringschuld", definition: "Die Verpflichtung, relevante Informationen aktiv an die zuständigen Personen weiterzugeben." },
            { term: "Medien", definition: "Kommunikationsmittel (z.B. Internet, E-Mail, Telefon)." },
            { term: "Leistungserfassungssysteme", definition: "Systeme zur systematischen Erfassung und Abrechnung von erbrachten Leistungen (z.B. LEP, BESA)." },
            { term: "elektronische Kommunikation", definition: "Informationsaustausch über digitale Medien wie E-Mail oder Messenger." },
            { term: "Cybermobbing", definition: "Belästigung, Bedrohung oder Blossstellung anderer über digitale Medien." },
            { term: "Leitbild", definition: "Schriftliche Erklärung einer Organisation über ihre Ziele, Werte und ihre Identität." },
        ],
        "HK H4: Durchführen administrativer und logistischer Aufgaben - Verbrauchsmaterial und Medikamente bewirtschaften": [
            { term: "Warenkreislauf", definition: "Der Weg einer Ware von der Bestellung über die Lagerung bis zum Verbrauch." },
            { term: "Warenbestellung", definition: "Der Prozess der Anforderung von benötigten Materialien." },
            { term: "Lagerung", definition: "Die Aufbewahrung von Materialien unter optimalen Bedingungen." },
            { term: "Lagersysteme", definition: "Methoden der Lagerorganisation (z.B. nach Verfallsdatum, Alphabet)." },
            { term: "Lagerbestände", definition: "Die Menge an Material, die auf Lager ist." },
            { term: "Logistik", definition: "Planung, Steuerung und Kontrolle des Material- und Informationsflusses." },
            { term: "First-in-First-out", definition: "Lagerprinzip (FIFO): Zuerst eingelagerte Ware wird zuerst entnommen, um Verfall zu vermeiden." },
            { term: "Warenannahme", definition: "Die Kontrolle und Entgegennahme von bestellten Waren." },
            { term: "Medikamentenlagerung", definition: "Sichere und vorschriftsgemässe Aufbewahrung von Medikamenten." },
            { term: "Medikamentenentsorgung", definition: "Fachgerechte und sichere Entsorgung von abgelaufenen oder nicht mehr benötigten Medikamenten." },
            { term: "Betäubungsmittelgesetz", definition: "Gesetzliche Regelung zum Umgang mit Betäubungsmitteln, die ein hohes Suchtpotenzial haben." },
            { term: "Reparaturen", definition: "Instandsetzung von defekten Geräten oder Materialien." },
        ],
        "HK H5: Durchführen administrativer und logistischer Aufgaben - Apparate und Mobiliar unterhalten": [
            { term: "Apparate", definition: "Technische Geräte, die in der Pflege verwendet werden (z.B. Blutdruckmessgerät, Patientenlifter)." },
            { term: "Mobiliar", definition: "Einrichtungsgegenstände wie Betten, Stühle und Tische." },
            { term: "Ökologie", definition: "Berücksichtigung von Umweltaspekten bei der Wartung und Entsorgung von Geräten." },
            { term: "Wartung", definition: "Regelmässige Überprüfung und Instandhaltung von Geräten und Mobiliar zur Funktionssicherung." },
            { term: "Unterhaltung", definition: "Synonym für Wartung und Instandhaltung." },
        ],
    },
    "Semester 2": {
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Kommunikation": [
            { term: "Feedbackregeln", definition: "Richtlinien für das Geben und Nehmen von Rückmeldungen, um die Kommunikation konstruktiv zu gestalten." },
            { term: "Transaktionsanalyse", definition: "Theorie der menschlichen Persönlichkeit und Kommunikation (Ich-Zustände: Eltern-Ich, Erwachsenen-Ich, Kind-Ich)." },
        ],
        "HK A3: Umsetzung von Professionalität und Klientenzentrierung - Beobachtungen": [
            { term: "Beobachtung", definition: "Bewusste und gezielte Wahrnehmung von Phänomenen ohne sofortige Interpretation." },
            { term: "Interpretation", definition: "Die Deutung und Bewertung einer Beobachtung." },
            { term: "Wahrnehmung", definition: "Der Prozess der Aufnahme und Verarbeitung von Sinnesreizen." },
            { term: "Orientierung", definition: "Das Wissen über die eigene Person, den Ort, die Zeit und die aktuelle Situation." },
            { term: "Orientierungsstörung", definition: "Beeinträchtigung der Orientierung zu Zeit, Ort, Person oder Situation." },
            { term: "Gedächtnis", definition: "Die Fähigkeit, Informationen zu speichern und abzurufen." },
            { term: "Gedächtnisstörung", definition: "Eine Beeinträchtigung der Gedächtnisfunktionen." },
            { term: "Denken", definition: "Ein kognitiver Prozess, der die Verarbeitung von Informationen umfasst." },
            { term: "Denkstörung", definition: "Eine Beeinträchtigung der Denkabläufe (formal) oder des Denkinhalts (inhaltlich)." },
            { term: "Wahrnehmungsstörung", definition: "Veränderte oder gestörte Aufnahme und Verarbeitung von Sinnesreizen (z.B. Halluzinationen)." },
        ],
        "HK B1: Pflege und Betreuung - Körperpflege": [
            { term: "Epidermis", definition: "Die Oberhaut, die äusserste Schicht der Haut." },
            { term: "Dermis", definition: "Die Lederhaut, die Schicht unter der Epidermis." },
            { term: "Subkutis", definition: "Die Unterhaut, bestehend aus lockerem Bindegewebe und Fettgewebe." },
            { term: "Cornea", definition: "Die Hornhaut des Auges." },
            { term: "Konjunktiva", definition: "Die Bindehaut des Auges." },
            { term: "Lederhaut", definition: "Die Sklera, die weisse, äussere Hülle des Augapfels." },
            { term: "Iris", definition: "Die Regenbogenhaut, die die Pupillengrösse reguliert." },
            { term: "Retina", definition: "Die Netzhaut im Inneren des Auges, die Lichtreize in Nervenimpulse umwandelt." },
            { term: "Linse", definition: "Teil des Auges, der das Licht bündelt, um scharfes Sehen zu ermöglichen." },
            { term: "Glaskörper", definition: "Die gallertartige Masse, die den Augapfel ausfüllt." },
            { term: "Schallleitungsschwerhörigkeit", definition: "Hörstörung, bei der der Schall nicht korrekt zum Innenohr geleitet wird (Problem im Aussen- oder Mittelohr)." },
            { term: "Schallempfindungsschwerhörigkeit", definition: "Hörstörung, bei der die Schallwellen im Innenohr nicht korrekt verarbeitet werden." },
            { term: "Schallwahrnehmungsschwerhörigkeit", definition: "Hörstörung mit Ursache im Hörnerv oder Gehirn." },
            { term: "Hörfunktion", definition: "Die Fähigkeit, Schall wahrzunehmen und zu verarbeiten." },
            { term: "Hammer, Amboss, Steigbügel", definition: "Die drei Gehörknöchelchen im Mittelohr, die den Schall vom Trommelfell zum Innenohr übertragen." },
            { term: "Trommelfell", definition: "Membran, die das Aussenohr vom Mittelohr trennt und durch Schallwellen in Schwingung versetzt wird." },
            { term: "Gleichgewichtssinn", definition: "Sinn zur Wahrnehmung der Körperlage und -bewegung, dessen Organ im Innenohr liegt." },
            { term: "Ohrspeicheldrüse", definition: "Die grösste Speicheldrüse, liegt vor und unter dem Ohr." },
            { term: "Unterzungenspeicheldrüse", definition: "Speicheldrüse, die unter der Zunge liegt." },
            { term: "Unterkieferspeicheldrüse", definition: "Speicheldrüse, die an der Innenseite des Unterkiefers liegt." },
            { term: "Pharynx", definition: "Der Rachenraum." },
            { term: "Schluckreflex", definition: "Unwillkürlicher Reflex, der den Transport der Nahrung vom Rachen in die Speiseröhre sicherstellt." },
            { term: "Psoriasis", definition: "Schuppenflechte; chronisch-entzündliche Hauterkrankung mit starker Schuppung." },
            { term: "Soor", definition: "Pilzinfektion (meist Candida albicans) der Haut oder Schleimhäute." },
            { term: "Pilzerkrankungen", definition: "Infektionen, die durch Pilze verursacht werden (Mykosen)." },
            { term: "Allergie", definition: "Eine Überreaktion des Immunsystems auf an sich harmlose Substanzen (Allergene)." },
            { term: "Kontaktallergie", definition: "Allergische Reaktion der Haut nach direktem Kontakt mit einem Allergen." },
            { term: "Systemische Allergie", definition: "Eine allergische Reaktion, die den ganzen Körper betrifft (z.B. anaphylaktischer Schock)." },
            { term: "Katarakt", definition: "Grauer Star; eine Trübung der Augenlinse." },
            { term: "Glaukom", definition: "Grüner Star; Gruppe von Augenerkrankungen mit Schädigung des Sehnervs, oft durch erhöhten Augeninnendruck." },
            { term: "Makuladegeneration", definition: "Erkrankung der Netzhautmitte (Makula), die zu einem Verlust der zentralen Sehschärfe führt." },
        ],
        "HK B2: Pflege und Betreuung - Mobilität": [
            { term: "Arthrose", definition: "Degenerative Gelenkerkrankung (Gelenkverschleiss) mit Knorpelabbau." },
            { term: "Rheumatoide Arthritis", definition: "Chronisch-entzündliche Autoimmunerkrankung, die vor allem die Gelenke betrifft." },
            { term: "Deformation", definition: "Eine Fehlbildung oder Verformung eines Körperteils oder Organs." },
            { term: "Osteoporose", definition: "Knochenschwund; verringerte Knochendichte und -festigkeit mit erhöhtem Frakturrisiko." },
            { term: "Frakturen", definition: "Knochenbrüche." },
            { term: "Kontrakturen", definition: "Dauerhafte Verkürzung von Muskeln, Sehnen, Bändern mit Bewegungseinschränkung und Versteifung eines Gelenks." },
            { term: "Varikosis", definition: "Krampfaderleiden; Erweiterung und Schlängelung von oberflächlichen Venen." },
            { term: "Phlebothrombose", definition: "Thrombose (Blutgerinnsel) in einer tiefen Vene, meist in den Beinen." },
            { term: "Thrombose", definition: "Die Bildung eines Blutgerinnsels (Thrombus) in einem Blutgefäss." },
            { term: "Prophylaxe", definition: "Vorbeugende Massnahmen zur Verhinderung von Krankheiten." },
            { term: "Thrombosenprophylaxe", definition: "Massnahmen zur Vorbeugung von Thrombosen (z.B. Bewegung, Kompressionsstrümpfe, Antikoagulantien)." },
            { term: "Sturzprophylaxe", definition: "Massnahmen zur Vorbeugung von Stürzen bei gefährdeten Personen." },
            { term: "Sturzrisikomanagement", definition: "Systematischer Prozess zur Identifizierung, Bewertung und Minimierung von Sturzrisiken." },
            { term: "Muskeltonus", definition: "Die Grundspannung der Muskulatur." },
            { term: "Koordination", definition: "Das geordnete Zusammenwirken von Muskeln und Nervensystem für einen gezielten Bewegungsablauf." },
            { term: "Atrophie", definition: "Gewebeschwund, z.B. der Muskulatur bei Inaktivität." },
            { term: "Mobilisation", definition: "Pflegerische Massnahmen zur Förderung und Erhaltung der Bewegungsfähigkeit." },
        ],
        "HK B3: Pflege und Betreuung - Ausscheidung": [
            { term: "Beobachtungskriterien", definition: "Spezifische Merkmale von Urin und Stuhl (Menge, Farbe, Geruch, Konsistenz), die beurteilt werden." },
            { term: "Urininkontinenz", definition: "Unfreiwilliger Verlust von Urin." },
            { term: "Stuhlinkontinenz", definition: "Unfreiwilliger Verlust von Stuhl." },
            { term: "Scham", definition: "Ein Gefühl der Verlegenheit oder Blossstellung, oft im Zusammenhang mit Intimität und Körperfunktionen." },
            { term: "Ekel", definition: "Ein Gefühl des Widerwillens und Abscheus, oft ausgelöst durch Gerüche oder Substanzen." },
            { term: "Reizblase", definition: "Überaktive Blase mit häufigem, starkem Harndrang ohne nachweisbare organische Ursache." },
            { term: "Reflexinkontinenz", definition: "Unwillkürlicher Urinverlust aufgrund einer gestörten Nervenleitung (z.B. bei Querschnittlähmung), ohne dass Harndrang empfunden wird." },
            { term: "Überlaufinkontinenz", definition: "Urinverlust durch eine ständig überfüllte Blase, die sich nicht vollständig entleeren kann." },
            { term: "Dranginkontinenz", definition: "Urinverlust verbunden mit einem plötzlich auftretenden, nicht unterdrückbaren Harndrang." },
            { term: "Stressinkontinenz", definition: "Urinverlust bei körperlicher Belastung (Husten, Niesen, Heben) durch eine schwache Beckenbodenmuskulatur." },
            { term: "Intimsphäre", definition: "Der persönliche, private Bereich eines Menschen, der besonderen Schutz erfordert." },
            { term: "Stuhluntersuchung", definition: "Laboranalyse einer Stuhlprobe zur Diagnostik." },
            { term: "Urinuntersuchung", definition: "Laboranalyse einer Urinprobe zur Diagnostik." },
            { term: "Spontanurin", definition: "Eine zu einem beliebigen Zeitpunkt gelassene Urinprobe." },
            { term: "Sammelurin", definition: "Urin, der über einen bestimmten Zeitraum (z.B. 24 Stunden) gesammelt wird." },
            { term: "Katheter", definition: "Ein Röhrchen oder Schlauch zur Entleerung, Spülung oder Untersuchung von Hohlorganen (z.B. Blasenkatheter)." },
            { term: "Katheterurin", definition: "Urin, der direkt aus einem Blasenkatheter gewonnen wird." },
            { term: "Dehydration", definition: "Flüssigkeitsmangel im Körper." },
            { term: "Exsikkose", definition: "Starke Austrocknung des Körpers, die schwerste Form der Dehydration." },
        ],
        "HK D1: Ausführen von medizinaltechnischen Verrichtungen - Vitalzeichen kontrollieren": [
            { term: "Hypotonie", definition: "Zu niedriger Blutdruck (dauerhaft unter 100/60 mmHg)." },
            { term: "Hypertonie", definition: "Bluthochdruck, dauerhaft erhöhter Blutdruck (systolisch ≥140 mmHg / diastolisch ≥90 mmHg)." },
            { term: "Tachykardie", definition: "Beschleunigter Herzschlag, Pulsfrequenz über 100 Schlägen pro Minute in Ruhe." },
            { term: "Bradykardie", definition: "Verlangsamter Herzschlag, Pulsfrequenz unter 60 Schlägen pro Minute in Ruhe." },
            { term: "Flüssigkeitsbilanz", definition: "Vergleich der Flüssigkeitsaufnahme (Einfuhr) und -ausscheidung (Ausfuhr) über einen bestimmten Zeitraum." },
            { term: "Plusbilanz", definition: "Die Flüssigkeitseinfuhr ist grösser als die Ausfuhr; kann zu Ödemen führen." },
            { term: "Minusbilanz", definition: "Die Flüssigkeitsausfuhr ist grösser als die Einfuhr; führt zu Dehydration." },
            { term: "Antihypertensiva", definition: "Medikamente zur Senkung des Blutdrucks." },
            { term: "Diuretika", definition: "Harntreibende Medikamente, die die Flüssigkeitsausscheidung über die Nieren fördern." },
            { term: "Hypoxie", definition: "Sauerstoffmangel im Gewebe." },
            { term: "Hypothermie", definition: "Unterkühlung; Absinken der Körperkerntemperatur unter 35°C." },
            { term: "Hyperthermie", definition: "Überwärmung; Anstieg der Körperkerntemperatur ohne Verstellung des Sollwerts im Gehirn (z.B. Hitzschlag)." },
            { term: "Systole", definition: "Die Anspannungs- und Auswurfphase des Herzens; der obere Blutdruckwert." },
            { term: "Diastole", definition: "Die Entspannungs- und Füllungsphase des Herzens; der untere Blutdruckwert." },
            { term: "Betablocker", definition: "Medikamentengruppe, die u.a. den Herzschlag verlangsamt und den Blutdruck senkt." },
            { term: "Ödeme", definition: "Sicht- und tastbare Flüssigkeitsansammlungen im Gewebe." },
            { term: "Herzinsuffizienz", definition: "Herzschwäche; das Herz ist nicht mehr in der Lage, die vom Körper benötigte Blutmenge zu fördern." },
            { term: "Rhythmusstörungen", definition: "Unregelmässige oder von der Norm abweichende Herzschlagfolge." },
            { term: "AV-Knoten", definition: "Atrioventrikularknoten; Teil des Reizleitungssystems des Herzens, leitet die Erregung von den Vorhöfen zu den Kammern." },
            { term: "Myokardinfarkt", definition: "Herzinfarkt; Absterben von Herzmuskelgewebe durch einen Verschluss einer Koronararterie." },
            { term: "Koronararterien", definition: "Herzkranzgefässe, die den Herzmuskel mit Sauerstoff versorgen." },
            { term: "Aorta", definition: "Die Hauptschlagader, das grösste arterielle Blutgefäss des Körpers." },
            { term: "Arterien", definition: "Blutgefässe, die das Blut vom Herzen wegführen." },
            { term: "Arteriolen", definition: "Kleinste Arterien, die in die Kapillaren übergehen." },
            { term: "Kapillaren", definition: "Haargefässe; kleinste Blutgefässe, in denen der Stoffaustausch zwischen Blut und Gewebe stattfindet." },
            { term: "Venolen", definition: "Kleinste Venen, die das Blut aus den Kapillaren sammeln." },
            { term: "Venen", definition: "Blutgefässe, die das Blut zum Herzen hinführen." },
            { term: "Hohlvene", definition: "Die obere oder untere Hohlvene, die das sauerstoffarme Blut aus dem Körperkreislauf im rechten Vorhof sammelt." },
            { term: "Trikuspidalklappe", definition: "Herzklappe zwischen dem rechten Vorhof und der rechten Herzkammer." },
            { term: "Pulmonalklappe", definition: "Herzklappe zwischen der rechten Herzkammer und der Lungenarterie." },
            { term: "Mitralklappe", definition: "Herzklappe zwischen dem linken Vorhof und der linken Herzkammer." },
            { term: "Aortenklappe", definition: "Herzklappe zwischen der linken Herzkammer und der Aorta." },
            { term: "Pulmonalvene", definition: "Lungenvene; führt sauerstoffreiches Blut von der Lunge zum linken Vorhof." },
            { term: "Pulmonalarterie", definition: "Lungenarterie; führt sauerstoffarmes Blut von der rechten Herzkammer zur Lunge." },
            { term: "sauerstoffreiches Blut", definition: "Arterielles Blut, das nach der Lungenpassage mit Sauerstoff angereichert ist." },
            { term: "sauerstoffarmes Blut", definition: "Venöses Blut, das den Sauerstoff im Körper abgegeben hat." },
            { term: "Vorhof", definition: "Atrium; einer der beiden Hohlräume des Herzens (rechts/links), die das Blut aufnehmen." },
            { term: "Kammer", definition: "Ventrikel; einer der beiden Hohlräume des Herzens (rechts/links), die das Blut in den Kreislauf pumpen." },
            { term: "Stoffwechsel", definition: "Metabolismus; die Gesamtheit der chemischen Prozesse in Lebewesen zur Umwandlung von Stoffen." },
        ],
        "HK E1: Fördern und erhalten von Gesundheit und Hygiene - Arbeitssicherheit": [
            { term: "Ergonomie", definition: "Anpassung der Arbeitsbedingungen und -mittel an den Menschen zur Vermeidung von Belastungen." },
            { term: "Psychohygiene", definition: "Massnahmen zur Erhaltung und Förderung der seelischen Gesundheit." },
            { term: "Stress", definition: "Eine körperliche und psychische Reaktion auf eine als überfordernd empfundene Situation." },
            { term: "Arbeitsunfälle", definition: "Unfälle, die sich während der beruflichen Tätigkeit ereignen." },
            { term: "Berufskrankheiten", definition: "Krankheiten, die durch die berufliche Tätigkeit verursacht werden." },
            { term: "Entsorgung", definition: "Die fachgerechte Beseitigung von Abfällen." },
            { term: "Entsorgungsrichtlinien", definition: "Verbindliche Vorschriften für die sichere und umweltgerechte Entsorgung von Abfällen, insbesondere medizinischem Material." },
        ],
        "HK E3: Fördern und erhalten von Gesundheit und Hygiene - Nervensystem, Apoplexie": [
            { term: "Zentrales Nervensystem", definition: "ZNS; umfasst Gehirn und Rückenmark." },
            { term: "peripheres Nervensystem", definition: "PNS; umfasst alle Nerven ausserhalb von Gehirn und Rückenmark." },
            { term: "Afferenzen", definition: "Nervenbahnen, die Informationen von der Peripherie zum zentralen Nervensystem leiten (sensorisch)." },
            { term: "Efferenzen", definition: "Nervenbahnen, die Befehle vom zentralen Nervensystem zur Peripherie leiten (motorisch)." },
            { term: "willkürliches Nervensystem", definition: "Somatisches Nervensystem; steuert die bewusst kontrollierbaren Vorgänge, wie die Bewegung der Skelettmuskulatur." },
            { term: "vegetatives Nervensystem", definition: "Autonomes Nervensystem; steuert die unwillkürlichen Körperfunktionen (z.B. Herzschlag, Verdauung)." },
            { term: "Neuron", definition: "Eine Nervenzelle, die grundlegende Einheit des Nervensystems." },
            { term: "Zellmembran", definition: "Die äussere Hülle einer Zelle." },
            { term: "Zellkern", definition: "Enthält die Erbinformation (DNA) der Zelle und steuert ihre Aktivitäten." },
            { term: "Zytoplasma", definition: "Die gesamte Substanz innerhalb der Zellmembran, die den Zellkern umgibt." },
            { term: "Zellorganelle", definition: "Strukturierte Bestandteile im Zytoplasma mit spezifischen Funktionen (z.B. Mitochondrien)." },
            { term: "Dendriten", definition: "Kurze, verästelte Fortsätze eines Neurons, die Signale von anderen Neuronen empfangen." },
            { term: "Axon", definition: "Langer Fortsatz eines Neurons, der Signale zu anderen Neuronen oder Muskelzellen weiterleitet." },
            { term: "Synapse", definition: "Die Verbindungsstelle zwischen zwei Neuronen oder zwischen einem Neuron und einer anderen Zelle (z.B. Muskelzelle)." },
            { term: "synaptischer Spalt", definition: "Der schmale Raum zwischen den Enden zweier kommunizierender Neuronen an einer Synapse." },
            { term: "Neurotransmitter", definition: "Chemische Botenstoffe, die an Synapsen die Erregung von einer Nervenzelle auf eine andere übertragen." },
            { term: "Apoplexie", definition: "Schlaganfall (auch Insult, Stroke); plötzliche Durchblutungsstörung im Gehirn mit neurologischen Ausfällen." },
            { term: "FAST-Test", definition: "Schnelltest zur Erkennung eines Schlaganfalls (Face, Arms, Speech, Time)." },
            { term: "Ischämie", definition: "Minderdurchblutung oder vollständiger Durchblutungsausfall eines Gewebes." },
            { term: "Nekrose", definition: "Das Absterben von Zellen oder Gewebe in einem lebenden Organismus." },
            { term: "Hemiplegie", definition: "Vollständige Lähmung einer Körperhälfte, oft als Folge eines Schlaganfalls." },
        ],
        "HK E4: Fördern und erhalten von Gesundheit und Hygiene - Ernährung": [
            { term: "Schweizerische Lebensmittelpyramide", definition: "Grafische Darstellung von Empfehlungen für eine ausgewogene Ernährung, herausgegeben von der SGE." },
            { term: "Portion", definition: "Eine definierte Menge eines Lebensmittels." },
            { term: "Kostform", definition: "Spezielle Ernährungsweise, die aus medizinischen oder persönlichen Gründen eingehalten wird (z.B. Diabeteskost, vegetarische Kost)." },
            { term: "Kohlenhydrate", definition: "Makronährstoffe, die dem Körper hauptsächlich als Energiequelle dienen (z.B. Zucker, Stärke)." },
            { term: "Proteine", definition: "Makronährstoffe (Eiweisse), die als Baustoffe für Zellen, Muskeln und Enzyme dienen." },
            { term: "Lipide", definition: "Makronährstoffe (Fette), die als Energiereserve, Isolator und Baustein für Hormone dienen." },
            { term: "Nahrungsfasern", definition: "Ballaststoffe; unverdauliche Pflanzenbestandteile, die wichtig für die Darmgesundheit sind." },
            { term: "Mineralstoffe", definition: "Anorganische Nährstoffe, die für viele Körperfunktionen unentbehrlich sind (z.B. Kalzium, Eisen)." },
            { term: "Vitamine", definition: "Organische Verbindungen, die der Körper für lebenswichtige Funktionen benötigt und nicht selbst herstellen kann." },
            { term: "Gesamtenergiebedarf", definition: "Die Summe aus Grundumsatz und Leistungsumsatz; die gesamte Energiemenge, die ein Mensch pro Tag benötigt." },
            { term: "Grundumsatz", definition: "Die Energiemenge, die der Körper in völliger Ruhe zur Aufrechterhaltung seiner Lebensfunktionen benötigt." },
            { term: "Leistungsumsatz", definition: "Die Energiemenge, die der Körper zusätzlich zum Grundumsatz für körperliche Aktivitäten benötigt." },
            { term: "Body-Mass-Index (BMI)", definition: "Masszahl zur Bewertung des Körpergewichts in Relation zur Körpergrösse (kg/m²)." },
            { term: "Perzentilenkurve", definition: "Grafische Darstellung, die das Wachstum (Grösse, Gewicht) von Kindern im Vergleich zu Gleichaltrigen zeigt." },
            { term: "Waist-to-Hip Ratio (WHR)", definition: "Verhältnis von Taillen- zu Hüftumfang; ein Indikator für die Körperfettverteilung und das damit verbundene Gesundheitsrisiko." },
        ],
        "HK F1: Gestalten des Alltags - Alltag gestalten": [
            { term: "Partizipation", definition: "Teilhabe und Mitbestimmung von Klienten an Entscheidungen, die sie betreffen." },
            { term: "Alltag", definition: "Die tägliche Routine und die regelmässig wiederkehrenden Abläufe." },
            { term: "Alltagsrhythmus", definition: "Die individuelle Taktung des Tagesablaufs." },
            { term: "Aktivierung", definition: "Gezielte Anregung und Förderung von körperlichen, geistigen und sozialen Fähigkeiten." },
            { term: "Gewohnheiten", definition: "Regelmässig ausgeführte Verhaltensweisen, die Sicherheit und Orientierung geben." },
            { term: "Aktivitäten des täglichen Lebens", definition: "Grundlegende Verrichtungen wie Körperpflege, Essen, Mobilität (ATL)." },
            { term: "Wohnen", definition: "Die Gestaltung des persönlichen Lebensraums." },
            { term: "Licht", definition: "Wichtiger Faktor für Wohlbefinden, Orientierung und den Tag-Nacht-Rhythmus." },
            { term: "Farbe", definition: "Kann die Stimmung und das Wohlbefinden beeinflussen und zur Orientierung dienen." },
            { term: "Pflanzen", definition: "Können das Raumklima und das psychische Wohlbefinden positiv beeinflussen." },
            { term: "Haustiere", definition: "Können soziale, emotionale und aktivierende Funktionen haben." },
            { term: "Feste", definition: "Besondere Anlässe, die den Alltag unterbrechen und soziale Gemeinschaft fördern." },
            { term: "Bräuche", definition: "Traditionelle, wiederkehrende Handlungen innerhalb einer Gemeinschaft." },
            { term: "Rituale", definition: "Regelmässig wiederkehrende Handlungen mit symbolischer Bedeutung, die Struktur und Sicherheit geben." },
            { term: "Alltagsgestaltung", definition: "Die bewusste Strukturierung und inhaltliche Füllung des Tagesablaufs." },
        ],
        "HK F2: Gestalten des Alltags - Aufbau und Einhalten der Tagesstruktur": [
            { term: "Psychische Gesundheit", definition: "Ein Zustand des Wohlbefindens, in dem eine Person ihre Fähigkeiten ausschöpfen, die normalen Lebensbelastungen bewältigen und produktiv sein kann." },
            { term: "ICD-10", definition: "Internationale statistische Klassifikation der Krankheiten und verwandter Gesundheitsprobleme, 10. Revision; wird zur Diagnosestellung verwendet." },
            { term: "Milieutherapie", definition: "Gestaltung der Umgebung und des sozialen Umfelds zur therapeutischen Unterstützung." },
            { term: "Haltung", definition: "Die innere Einstellung und das daraus resultierende Verhalten einer Pflegeperson." },
            { term: "Partizipation", definition: "Teilhabe und Mitbestimmung von Klienten an Entscheidungen, die sie betreffen." },
            { term: "Kommunikation", definition: "Der Austausch von Informationen, zentrales Element in der psychiatrischen Pflege." },
            { term: "Recovery", definition: "Ein persönlicher Genesungsprozess bei psychischen Erkrankungen, der auf Selbstbestimmung, Hoffnung und Sinnfindung abzielt." },
            { term: "Psychopathologie", definition: "Die Lehre von den psychischen Erkrankungen, ihren Symptomen und Ursachen." },
            { term: "Schizophrenie", definition: "Eine schwere psychische Erkrankung aus der Gruppe der Psychosen, die das Denken, Fühlen und die Wahrnehmung tiefgreifend beeinflusst." },
            { term: "Borderline-Persönlichkeitsstörung", definition: "Eine psychische Störung, die durch Impulsivität, Instabilität in Stimmungen, Beziehungen und Selbstbild gekennzeichnet ist." },
            { term: "Depression", definition: "Psychische Erkrankung mit gedrückter Stimmung, Interessenverlust und Antriebslosigkeit." },
            { term: "postnatale Depression", definition: "Eine depressive Episode, die bei Müttern in den ersten Wochen und Monaten nach der Geburt auftritt." },
            { term: "bipolare Störung", definition: "Eine psychische Erkrankung, die durch extreme Stimmungsschwankungen zwischen manischen und depressiven Phasen gekennzeichnet ist." },
            { term: "Manie", definition: "Eine Phase mit euphorischer oder gereizter Stimmung, gesteigertem Antrieb, Ideenflucht und vermindertem Schlafbedürfnis." },
            { term: "Angststörung", definition: "Eine Gruppe psychischer Störungen, die durch übermässige, irrationale Angst und Sorgen gekennzeichnet sind." },
            { term: "Zwangsstörung", definition: "Eine psychische Störung mit wiederkehrenden Zwangsgedanken und/oder Zwangshandlungen." },
            { term: "Panikattacken", definition: "Plötzlich auftretende, intensive Anfälle von Angst, verbunden mit starken körperlichen Symptomen." },
            { term: "Posttraumatische Belastungsstörung", definition: "PTBS; eine verzögerte psychische Reaktion auf ein extrem belastendes, traumatisches Ereignis." },
            { term: "Psychopharmaka", definition: "Medikamente, die auf die Psyche wirken und zur Behandlung psychischer Erkrankungen eingesetzt werden." },
            { term: "Psychiatrie", definition: "Medizinisches Fachgebiet, das sich mit der Prävention, Diagnose und Behandlung von psychischen Störungen befasst." },
            { term: "Psychologie", definition: "Wissenschaft, die das Erleben und Verhalten des Menschen untersucht." },
        ],
        "HK H1: Durchführen administrativer und logistischer Aufgaben - Ein- und Austritte": [
            { term: "Geplanter Eintritt", definition: "Ein im Voraus terminierter Eintritt in eine Gesundheitsinstitution." },
            { term: "ungeplanter Eintritt", definition: "Ein notfallmässiger, nicht im Voraus geplanter Eintritt." },
            { term: "geplanter Austritt", definition: "Ein vorbereiteter und organisierter Austritt, bei dem die Nachsorge geklärt ist." },
            { term: "ungeplanter Austritt", definition: "Ein plötzlicher Austritt, z.B. auf eigenen Wunsch gegen ärztlichen Rat." },
            { term: "Verlegung", definition: "Der Wechsel eines Klienten von einer Abteilung, einem Zimmer oder einer Institution in eine andere." },
            { term: "Relokationssyndrom", definition: "Stressreaktion bei Verlegung oder Umzug von (meist älteren) Klienten in eine neue Umgebung." },
            { term: "Dokumentation", definition: "Schriftliche Festhaltung aller relevanten Informationen und Massnahmen im Zusammenhang mit dem Ein-, Aus- und Übertritt." },
        ]
    },
    "Semester 3": {
        "HK A1: Umsetzung von Professionalität und Klientenzentrierung - Planung": [
            { term: "Interdisziplinäre Zusammenarbeit", definition: "Die Zusammenarbeit von Fachpersonen aus verschiedenen Disziplinen (z.B. Pflege, Ärzte, Physiotherapie) zur gemeinsamen Zielerreichung." },
            { term: "Koordination", definition: "Das Abstimmen von verschiedenen Aktivitäten und Massnahmen, um einen reibungslosen Ablauf zu gewährleisten." },
            { term: "Dienststellen", definition: "Organisatorische Einheiten innerhalb einer Institution (z.B. Abteilungen, Stationen)." },
            { term: "Aufgabe, Verantwortung, Zuständigkeit", definition: "Klare Zuweisung von Tätigkeiten (Aufgabe), der Verpflichtung zur Rechenschaft (Verantwortung) und dem zugewiesenen Handlungsbereich (Zuständigkeit)." },
            { term: "Rapporte", definition: "Mündliche oder schriftliche Übergabegespräche zur Weitergabe relevanter Informationen über Klienten." },
            { term: "Dokumentation", definition: "Schriftliche Festhaltung von Beobachtungen, Massnahmen und Verläufen zur Sicherung der Pflegequalität." },
            { term: "Ablauf- und Aufbauorganisation", definition: "Regelt die Struktur einer Organisation (Aufbau) und die zeitliche und räumliche Abfolge von Arbeitsprozessen (Ablauf)." },
            { term: "Arbeitsprozesse", definition: "Eine Folge von logisch zusammenhängenden Aktivitäten zur Erreichung eines Arbeitsziels." },
            { term: "Organigramm", definition: "Grafische Darstellung der Aufbauorganisation einer Institution, zeigt Hierarchien und Abteilungen." },
            { term: "Pflegesysteme", definition: "Organisationsformen der Pflegearbeit, z.B. Funktionspflege oder Bezugspflege." },
            { term: "Funktionspflege", definition: "Pflegesystem, bei dem Pflegekräfte auf bestimmte Tätigkeiten spezialisiert sind, die sie bei allen Klienten ausführen." },
            { term: "Patientenorientierte Pflege", definition: "Pflege, die den Klienten mit seinen individuellen Bedürfnissen und Werten in den Mittelpunkt stellt." },
            { term: "Einzelpflege", definition: "Eine Pflegekraft ist für einen einzelnen Klienten umfassend zuständig." },
            { term: "Bereichspflege", definition: "Pflegesystem, bei dem eine Pflegekraft für die gesamte Pflege einer kleinen Gruppe von Klienten in einem räumlichen Bereich zuständig ist." },
            { term: "Bezugspflege (Primary Nursing)", definition: "Pflegesystem, bei dem eine Pflegeperson kontinuierlich für die gesamte Pflege einer kleinen Patientengruppe zuständig ist." },
            { term: "Eisenhower-Prinzip", definition: "Zeitmanagement-Methode zur Priorisierung von Aufgaben nach Wichtigkeit und Dringlichkeit." },
            { term: "Skill-Grade-Mix", definition: "Die Zusammensetzung eines Teams aus Fachpersonen mit unterschiedlichen Qualifikationsstufen (Skills und Grades)." },
        ],
        "HK A2: Umsetzung von Professionalität und Klientenzentrierung - Konflikte": [
            { term: "Konflikt", definition: "Eine Auseinandersetzung, die aus dem Aufeinandertreffen unvereinbarer Interessen, Werte oder Bedürfnisse entsteht." },
            { term: "Eskalation", definition: "Die stufenweise Verschärfung und Zuspitzung eines Konflikts." },
            { term: "Deeskalation", definition: "Massnahmen zur Reduzierung von Spannung und Verhinderung der Zuspitzung eines Konflikts." },
            { term: "Eskalationsstufe", definition: "Eine Phase innerhalb eines Konfliktverlaufs, die eine bestimmte Intensität der Auseinandersetzung beschreibt (z.B. nach Glasl)." },
        ],
        "HK A4: Umsetzung von Professionalität und Klientenzentrierung - Biografie und Religion": [
            { term: "Kultur", definition: "Die Gesamtheit der gemeinsamen Werte, Normen, Traditionen und Lebensweisen einer Gruppe von Menschen." },
            { term: "Religion", definition: "Ein System von Glaubensvorstellungen und Praktiken, das sich auf eine höhere Macht oder transzendente Wirklichkeit bezieht." },
            { term: "Christentum", definition: "Monotheistische Religion, die auf dem Leben und den Lehren von Jesus von Nazareth basiert." },
            { term: "Judentum", definition: "Älteste monotheistische Religion, die auf den Lehren der Tora basiert." },
            { term: "Islam", definition: "Monotheistische Religion, die auf dem Koran und den Lehren des Propheten Mohammed basiert." },
            { term: "Buddhismus", definition: "Eine auf den Lehren von Siddhartha Gautama (Buddha) basierende Religion und Philosophie." },
            { term: "Hinduismus", definition: "Ein Sammelbegriff für verschiedene religiöse Traditionen, die ihren Ursprung auf dem indischen Subkontinent haben." },
            { term: "Biografie", definition: "Die individuelle Lebensgeschichte eines Menschen." },
            { term: "Biografiearbeit", definition: "Auseinandersetzung mit der Lebensgeschichte eines Menschen zur individuellen und verständnisvollen Pflege." },
            { term: "Generation", definition: "Eine Gruppe von Menschen, die in einem ähnlichen Zeitraum geboren wurden und durch gemeinsame Erfahrungen geprägt sind." },
            { term: "Generationenarbeit", definition: "Aktivitäten und Ansätze, die den Austausch und das Verständnis zwischen verschiedenen Generationen fördern." },
        ],
        "HK B3: Pflege und Betreuung - Ausscheidung": [
            { term: "Harnsystem", definition: "Umfasst die Organe, die für die Produktion und Ausscheidung von Urin zuständig sind (Nieren, Harnleiter, Harnblase, Harnröhre)." },
            { term: "Niere", definition: "Paariges Organ, das das Blut filtert, Harn produziert und wichtige Stoffwechsel- und Hormonfunktionen hat." },
            { term: "Nierenrinde", definition: "Die äussere Schicht des Nierengewebes." },
            { term: "Nierenbecken", definition: "Auffangtrichter für den in der Niere produzierten Urin, bevor er in den Harnleiter fliesst." },
            { term: "Nephron", definition: "Die kleinste funktionelle Einheit der Niere, zuständig für die Blutfiltration und Harnbildung." },
            { term: "Tubulussystem", definition: "Röhrensystem im Nephron, in dem aus dem Primärharn durch Resorption und Sekretion der Sekundärharn gebildet wird." },
            { term: "Primärharn", definition: "Das Filtrat des Blutes, das im ersten Schritt in den Nierenkörperchen entsteht (ca. 180 Liter/Tag)." },
            { term: "Sekundärharn", definition: "Der endgültige Urin, der nach Konzentrierung im Tubulussystem übrig bleibt und ausgeschieden wird (ca. 1.5 Liter/Tag)." },
            { term: "Ureter", definition: "Der Harnleiter, der den Urin von der Niere zur Harnblase transportiert." },
            { term: "Harnblase", definition: "Ein muskuläres Hohlorgan, das den Urin speichert." },
            { term: "Urethra", definition: "Die Harnröhre, die den Urin von der Blase nach aussen leitet." },
            { term: "unwillkürlicher Sphinkter", definition: "Innerer Schliessmuskel (z.B. der Blase), der nicht bewusst gesteuert werden kann." },
            { term: "willkürlicher Sphinkter", definition: "Äusserer Schliessmuskel (z.B. der Blase), der bewusst kontrolliert werden kann." },
            { term: "Miktion", definition: "Der Vorgang des Wasserlassens, die Entleerung der Harnblase." },
            { term: "Defäkation", definition: "Der Vorgang der Stuhlentleerung." },
            { term: "Zystitis", definition: "Blasenentzündung, meist eine bakterielle Infektion der Harnblase." },
            { term: "Zystitisprophylaxe", definition: "Massnahmen zur Vorbeugung von Blasenentzündungen (z.B. ausreichende Trinkmenge, richtige Intimhygiene)." },
            { term: "Niereninsuffizienz", definition: "Ungenügende Funktion der Nieren, Abfallstoffe und Flüssigkeit ausreichend auszuscheiden." },
            { term: "Obstipation", definition: "Verstopfung; eine erschwerte und seltene Stuhlentleerung." },
            { term: "Obstipationsprophylaxe", definition: "Massnahmen zur Vorbeugung von Verstopfung (z.B. ballaststoffreiche Ernährung, Bewegung, ausreichend Trinken)." },
            { term: "Diarrhoe", definition: "Durchfall; häufige Entleerung von flüssigem oder ungeformtem Stuhl." },
            { term: "Laxantien", definition: "Abführmittel, die die Darmentleerung fördern." },
            { term: "Oligurie", definition: "Verminderte Urinausscheidung (unter 500 ml/24h)." },
            { term: "Anurie", definition: "Stark verminderte bis fehlende Urinausscheidung (unter 100 ml/24h)." },
            { term: "Pollakisurie", definition: "Häufiger Harndrang mit Entleerung nur kleiner Urinmengen." },
            { term: "Diuretika", definition: "Harntreibende Medikamente, die die Flüssigkeitsausscheidung über die Nieren fördern." },
        ],
        "HK B4: Pflege und Betreuung - Atmung": [
            { term: "Atemfrequenz", definition: "Anzahl der Atemzüge pro Minute." },
            { term: "Tachypnoe", definition: "Beschleunigte Atemfrequenz (mehr als 20 Atemzüge/Minute beim Erwachsenen)." },
            { term: "Bradypnoe", definition: "Verlangsamte Atemfrequenz (weniger als 12 Atemzüge/Minute beim Erwachsenen)." },
            { term: "Apnoe", definition: "Atemstillstand." },
            { term: "Schlafapnoe", definition: "Atemaussetzer während des Schlafs." },
            { term: "Atemtyp", definition: "Art der Atembewegung (z.B. Brust- oder Bauchatmung)." },
            { term: "Brustatmung", definition: "Atmung, die hauptsächlich durch die Zwischenrippenmuskulatur erfolgt." },
            { term: "Bauchatmung", definition: "Atmung, die hauptsächlich durch das Zwerchfell erfolgt (Zwerchfellatmung)." },
            { term: "Atemtiefe", definition: "Das Volumen der eingeatmeten Luft pro Atemzug." },
            { term: "Hyperventilation", definition: "Übermässig schnelle und tiefe Atmung, die zu einem Abfall des CO2-Spiegels im Blut führt." },
            { term: "Hypoventilation", definition: "Zu flache oder zu langsame Atmung, die zu einem Anstieg des CO2-Spiegels im Blut führt." },
            { term: "Atemrhythmus", definition: "Die Regelmässigkeit der Atemzüge." },
            { term: "Atemgeräusche", definition: "Geräusche, die während der Atmung hörbar sind (z.B. Giemen, Rasseln) und auf Krankheiten hinweisen können." },
            { term: "Atemgeruch", definition: "Geruch der Ausatemluft, der auf Stoffwechselstörungen oder Krankheiten hinweisen kann." },
            { term: "Atemanstrengung", definition: "Die sichtbare Mühe, die eine Person beim Atmen hat (z.B. Einsatz der Atemhilfsmuskulatur)." },
            { term: "Dyspnoe", definition: "Atemnot, subjektiv empfundene Erschwerung der Atmung." },
            { term: "Orthopnoe", definition: "Stärkste Form der Atemnot, die nur in aufrechter Haltung erträglich ist." },
            { term: "Husten", definition: "Ein Schutzreflex zur Reinigung der Atemwege." },
            { term: "Sputum", definition: "Auswurf aus den Atemwegen (Schleim, Sekret)." },
            { term: "Sekretolytika", definition: "Medikamente, die zähen Schleim in den Atemwegen verflüssigen und das Abhusten erleichtern." },
            { term: "Antitussiva", definition: "Medikamente, die den Hustenreiz unterdrücken (Hustenstiller)." },
            { term: "Angst", definition: "Ein Gefühl, das oft mit Atemnot einhergeht und diese verstärken kann." },
            { term: "sekretlösende Massnahmen", definition: "Pflegerische Interventionen zur Mobilisierung von Sekret (z.B. Inhalation, Abklopfen, Lagerung)." },
            { term: "Atemunterstützende Lagerung", definition: "Lagerungspositionen, die das Atmen erleichtern (z.B. Oberkörperhochlagerung, Kutschersitz)." },
            { term: "Distress", definition: "Negativer Stress, der als Belastung empfunden wird und krank machen kann." },
        ],
        "HK B6: Pflege und Betreuung - Ruhen und Schlafen": [
            { term: "Ruhen", definition: "Ein Zustand körperlicher und geistiger Entspannung ohne zu schlafen." },
            { term: "Schlafen", definition: "Ein Zustand der äusseren Ruhe mit herabgesetztem Bewusstsein und veränderten Körperfunktionen, der zur Regeneration dient." },
            { term: "Bewusstsein", definition: "Der Zustand des Wachseins und des Wissens um die eigene Existenz und Umgebung." },
            { term: "Gesamtschlafzeit", definition: "Die gesamte Dauer des Schlafs innerhalb von 24 Stunden." },
            { term: "Biorhythmus", definition: "Periodische Schwankungen von Körperfunktionen, die meist von einer inneren Uhr gesteuert werden (z.B. zirkadianer Rhythmus)." },
            { term: "Schlafphysiologie", definition: "Die Lehre von den normalen Abläufen und Funktionen des Schlafs." },
            { term: "Tiefschlaf", definition: "Phase des Non-REM-Schlafs, die für die körperliche Erholung besonders wichtig ist." },
            { term: "REM-Phase", definition: "Schlafphase mit schnellen Augenbewegungen (Rapid Eye Movement), in der intensiv geträumt wird; wichtig für die psychische Erholung." },
            { term: "Schlafbedürfnis", definition: "Die individuelle Dauer des Schlafs, die eine Person benötigt, um sich erholt zu fühlen." },
            { term: "Beobachtungskriterien", definition: "Merkmale des Schlafs und Ruhens, die beobachtet werden (z.B. Dauer, Kontinuität, Verhalten im Schlaf)." },
            { term: "Schlafhygiene", definition: "Verhaltensweisen und Gewohnheiten, die einen gesunden und erholsamen Schlaf fördern." },
            { term: "Ruheverhalten", definition: "Die Art und Weise, wie eine Person Ruhephasen gestaltet." },
            { term: "Schlafverhalten", definition: "Die Gewohnheiten und Muster, die mit dem Schlafen verbunden sind." },
            { term: "Phytotherapie", definition: "Die Anwendung von pflanzlichen Mitteln zur Linderung von Beschwerden (z.B. Baldrian zur Schlafförderung)." },
            { term: "schlaffördernde Massnahmen", definition: "Pflegerische Interventionen zur Unterstützung des Schlafs (z.B. Abendritual, ruhige Umgebung, Entspannungsübungen)." },
        ],
        "HK D2: Ausführen von medizinaltechnischen Verrichtungen - Venöse und kapilläre Blutentnahme": [
            { term: "Blutplasma", definition: "Der flüssige Anteil des Blutes ohne Blutzellen, enthält Gerinnungsfaktoren." },
            { term: "Blutserum", definition: "Der flüssige Anteil des Blutes, der nach der Gerinnung übrig bleibt (Plasma ohne Gerinnungsfaktoren)." },
            { term: "Zusammensetzung des Blutes", definition: "Besteht aus zellulären Bestandteilen (Erythrozyten, Leukozyten, Thrombozyten) und flüssigem Plasma." },
            { term: "Erthrozyten", definition: "Rote Blutkörperchen, zuständig für den Sauerstofftransport." },
            { term: "Leukozyten", definition: "Weisse Blutkörperchen, Teil des Immunsystems zur Abwehr von Krankheitserregern." },
            { term: "Thrombozyten", definition: "Blutplättchen, zuständig für die Blutgerinnung." },
            { term: "Hämostase", definition: "Prozess der Blutstillung nach einer Verletzung, umfasst Gefässverengung, Thrombozytenaggregation und Blutgerinnung." },
            { term: "Vasokontriktion", definition: "Die Verengung von Blutgefässen." },
            { term: "Vasodilatation", definition: "Die Erweiterung von Blutgefässen." },
            { term: "Thrombolyse", definition: "Die Auflösung eines Blutgerinnsels (Thrombus)." },
            { term: "Antikoagulantien", definition: "Medikamente zur Hemmung der Blutgerinnung (Blutverdünner)." },
            { term: "Gerinnungsfaktoren", definition: "Proteine im Blut, die für die Blutgerinnung notwendig sind; werden grösstenteils in der Leber gebildet." },
            { term: "Vitamin K", definition: "Fettlösliches Vitamin, das für die Bildung einiger Gerinnungsfaktoren in der Leber unentbehrlich ist." },
            { term: "INR Wert", definition: "International Normalized Ratio; ein standardisierter Laborwert zur Überprüfung der Blutgerinnung, insbesondere unter Antikoagulantien-Therapie." },
            { term: "Blutzucker", definition: "Die Konzentration von Glucose im Blut." },
            { term: "Glucose", definition: "Traubenzucker, der wichtigste Energielieferant für die Körperzellen." },
            { term: "Elektrolyte", definition: "Mineralstoffe, die in Körperflüssigkeiten gelöst sind und elektrische Ladungen tragen (z.B. Natrium, Kalium)." },
            { term: "Harnstoff", definition: "Ein Endprodukt des Proteinstoffwechsels, das über die Nieren ausgeschieden wird." },
            { term: "Serologie", definition: "Untersuchung von Antikörpern und Antigenen im Blutserum, z.B. zur Diagnostik von Infektionskrankheiten." },
            { term: "Senkung", definition: "Blutsenkungsgeschwindigkeit (BSG); ein unspezifischer Entzündungswert." },
            { term: "Blutgasanalyse", definition: "Messung der Gase (Sauerstoff, Kohlendioxid) und des pH-Wertes im Blut." },
            { term: "Butterfly", definition: "Eine spezielle Kanüle mit Flügeln zur venösen Blutentnahme." },
            { term: "Virchow-Trias", definition: "Beschreibt die drei Hauptursachen einer Thrombose: Gefässwandschädigung, verlangsamter Blutfluss, veränderte Blutzusammensetzung." },
            { term: "PAVK", definition: "Periphere arterielle Verschlusskrankheit; eine Durchblutungsstörung der Arterien, meist in den Beinen ('Schaufensterkrankheit')." },
            { term: "Embolie", definition: "Der Verschluss eines Blutgefässes durch einen mit dem Blutstrom verschleppten Embolus (oft ein abgelöster Thrombus)." },
            { term: "Lymphödem", definition: "Schwellung durch Ansammlung von Lymphflüssigkeit im Gewebe aufgrund einer Störung des Lymphabflusses." },
        ],
        "HK D3: Ausführen von medizinaltechnischen Verrichtungen - Medikamente richten und verabreichen": [
            { term: "6-R-Regel", definition: "Sicherheitsregel bei der Medikamentenverabreichung (Richtig: Patient, Medikament, Dosis, Applikationsform, Zeit, Dokumentation)." },
            { term: "Pharmakologie", definition: "Die Lehre von den Wechselwirkungen zwischen Substanzen und Lebewesen." },
            { term: "Pharmakokinetik", definition: "Lehre davon, was der Körper mit einem Medikament macht (Resorption, Verteilung, Metabolismus, Elimination)." },
            { term: "Pharmakodynamik", definition: "Lehre davon, was ein Medikament mit dem Körper macht (Wirkung und Wirkmechanismus)." },
            { term: "Resorption", definition: "Die Aufnahme eines Wirkstoffs in die Blutbahn." },
            { term: "Elimination", definition: "Die Ausscheidung eines Wirkstoffs aus dem Körper." },
            { term: "Pfortader", definition: "Vene, die das nährstoffreiche Blut aus den Verdauungsorganen zur Leber transportiert." },
            { term: "First-Pass-Effekt", definition: "Die Umwandlung eines oral verabreichten Medikaments bei der ersten Leberpassage, wodurch dessen Wirksamkeit verringert werden kann." },
            { term: "Halbwertszeit", definition: "Die Zeit, in der die Konzentration eines Medikaments im Körper auf die Hälfte absinkt." },
            { term: "Wirkstoff", definition: "Die Substanz in einem Medikament, die die eigentliche Wirkung hervorruft." },
            { term: "Handelsname", definition: "Der geschützte Name, unter dem ein Medikament von einer Firma verkauft wird." },

            { term: "Generika", definition: "Nachahmerpräparate, die den gleichen Wirkstoff wie ein Originalmedikament enthalten und nach Ablauf des Patentschutzes auf den Markt kommen." },
            { term: "Medikamentengruppen", definition: "Zusammenfassung von Medikamenten mit ähnlicher Wirkung oder chemischer Struktur (z.B. Analgetika, Antibiotika)." },
            { term: "Wirkung", definition: "Die durch ein Medikament im Körper hervorgerufene Veränderung." },
            { term: "Nebenwirkungen", definition: "Unerwünschte Wirkungen, die zusätzlich zur beabsichtigten Hauptwirkung eines Medikaments auftreten können." },
            { term: "Wechselwirkungen", definition: "Die gegenseitige Beeinflussung von Medikamenten, wenn sie gleichzeitig verabreicht werden." },
            { term: "Indikation", definition: "Der Grund für den Einsatz einer therapeutischen Massnahme; das Anwendungsgebiet eines Medikaments." },
            { term: "Kontraindikationen", definition: "Umstände oder Zustände, die die Anwendung eines Medikaments verbieten." },
            { term: "Applikationsformen", definition: "Die Art und Weise, wie ein Medikament verabreicht wird (z.B. oral, rektal, transdermal)." },
            { term: "oral", definition: "Die Einnahme über den Mund." },
            { term: "rektal", definition: "Die Verabreichung über den Mastdarm." },
            { term: "transdermal", definition: "Die Aufnahme eines Wirkstoffs durch die Haut (z.B. über ein Pflaster)." },
            { term: "Arzneimittelform", definition: "Die Zubereitungsform eines Medikaments (z.B. Tablette, Kapsel, Salbe)." },
            { term: "Retard", definition: "Eine Arzneiform mit verzögerter Wirkstofffreisetzung." },
            { term: "Suppositorium", definition: "Ein Zäpfchen zur rektalen oder vaginalen Anwendung." },
            { term: "Swissmedic", definition: "Die schweizerische Zulassungs- und Kontrollbehörde für Heilmittel." },
            { term: "Heilmittelgesetz", definition: "Das Gesetz, das den Umgang mit Heilmitteln in der Schweiz regelt." },
            { term: "Betäubungsmittelgesetz", definition: "Das Gesetz, das den Umgang mit abhängigkeitserzeugenden Substanzen regelt." },
            { term: "Lagerungshinweise", definition: "Vorschriften zur korrekten Aufbewahrung von Medikamenten (z.B. bezüglich Temperatur, Licht)." },
        ],
        "HK D6: Ausführen von medizinaltechnischen Verrichtungen - s.c. und i.m. Injektionen": [
            { term: "subkutan", definition: "Verabreichung einer Injektion in das Unterhautfettgewebe (s.c.)." },
            { term: "intramuskulär", definition: "Verabreichung einer Injektion in einen Muskel (i.m.)." },
            { term: "Pankreas", definition: "Die Bauchspeicheldrüse; produziert Verdauungsenzyme (exokrin) und Hormone wie Insulin und Glukagon (endokrin)." },
            { term: "Endokrin", definition: "Hormone direkt ins Blut abgebend." },
            { term: "Exokrin", definition: "Sekrete über einen Ausführungsgang an eine Oberfläche abgebend." },
            { term: "Insulin", definition: "Hormon, das den Blutzuckerspiegel senkt und in den B-Zellen des Pankreas produziert wird." },
            { term: "Glukagon", definition: "Hormon, das den Blutzuckerspiegel anhebt, Gegenspieler des Insulins." },
            { term: "Glykogen", definition: "Die Speicherform von Glucose in Leber und Muskulatur." },
            { term: "Hypoglykämie", definition: "Unterzuckerung, zu niedriger Blutzuckerspiegel." },
            { term: "Hyperglykämie", definition: "Überzuckerung, zu hoher Blutzuckerspiegel." },
            { term: "Diabetes mellitus Typ 1", definition: "Autoimmunerkrankung, bei der die insulinproduzierenden Zellen des Pankreas zerstört werden (absoluter Insulinmangel)." },
            { term: "Diabetes mellitus Typ 2", definition: "Erkrankung, die durch eine Insulinresistenz und/oder einen relativen Insulinmangel gekennzeichnet ist." },
            { term: "Ketonkörper", definition: "Stoffwechselprodukte, die bei Insulinmangel aus dem Fettabbau entstehen." },
            { term: "Azidose", definition: "Eine Übersäuerung des Blutes (pH-Wert < 7,35)." },
            { term: "Diabetisches Koma", definition: "Lebensbedrohliche Bewusstlosigkeit bei extrem hohen oder niedrigen Blutzuckerwerten." },
            { term: "Humaninsulin", definition: "Künstlich hergestelltes Insulin, das in seiner Struktur dem menschlichen Insulin identisch ist." },
            { term: "Normalinsulin", definition: "Kurz wirksames Insulin, das schnell den Blutzucker senkt." },
            { term: "Verzögerungsinsulin", definition: "Lang wirksames Insulin, das den Grundbedarf an Insulin über viele Stunden deckt." },
            { term: "Depotpräparat", definition: "Arzneimittel, bei dem der Wirkstoff langsam und über einen längeren Zeitraum freigesetzt wird (z.B. Verzögerungsinsulin)." },
            { term: "Metabolisches Syndrom", definition: "Kombination verschiedener Risikofaktoren für Herz-Kreislauf-Erkrankungen (Übergewicht, Bluthochdruck, erhöhter Blutzucker, Fettstoffwechselstörung)." },
            { term: "Neuropathie", definition: "Schädigung von Nerven, eine häufige Folgeerkrankung bei Diabetes." },
            { term: "Nephropathie", definition: "Schädigung der Nieren, eine häufige Folgeerkrankung bei Diabetes." },
            { term: "Angiopathie", definition: "Schädigung der Blutgefässe, eine häufige Folgeerkrankung bei Diabetes." },
            { term: "Mikroangiopathie", definition: "Erkrankung der kleinen Blutgefässe (Kapillaren)." },
            { term: "Retinopathie", definition: "Schädigung der Netzhaut des Auges durch Diabetes." },
            { term: "Diabetischer Fuss", definition: "Komplexes Syndrom am Fuss als Folge von Nerven- und Gefässschädigungen bei Diabetes." },
        ],
        "HK E1: Fördern und erhalten von Gesundheit und Hygiene - Immunsystem und Infektionskrankheiten": [
            { term: "Unspezifisches Immunsystem", definition: "Angeborene Immunabwehr, die sich schnell und unspezifisch gegen alle Arten von Fremdkörpern richtet." },
            { term: "Spezifisches Immunsystem", definition: "Erworbene Immunabwehr, die sich gezielt gegen bekannte Erreger richtet und ein Gedächtnis entwickelt." },
            { term: "Antigen", definition: "Substanz, die eine spezifische Immunantwort im Körper auslöst (z.B. Bildung von Antikörpern)." },
            { term: "Antikörper", definition: "Vom Immunsystem produzierte Proteine, die gezielt an Antigene binden und diese unschädlich machen." },
            { term: "Phagozytose", definition: "Der Prozess, bei dem Zellen (Phagozyten) Fremdpartikel wie Bakterien 'auffressen' und verdauen." },
            { term: "Leukozyten", definition: "Weisse Blutkörperchen, die Zellen des Immunsystems." },
            { term: "Granulozyten", definition: "Eine Art von weissen Blutkörperchen, die zur unspezifischen Abwehr gehören." },
            { term: "Makrophagen", definition: "'Fresszellen', die zur unspezifischen Abwehr gehören und Fremdmaterial phagozytieren." },
            { term: "B-Lymphozyten", definition: "Zellen des spezifischen Immunsystems, die für die Produktion von Antikörpern verantwortlich sind." },
            { term: "T-Lymphozyten", definition: "Zellen des spezifischen Immunsystems mit verschiedenen Aufgaben (z.B. T-Helferzellen, T-Killerzellen)." },
            { term: "Schutzbarrieren", definition: "Mechanische, chemische und biologische Barrieren des Körpers, die das Eindringen von Erregern verhindern (z.B. Haut, Magensäure)." },
            { term: "Lymphsystem", definition: "Transportsystem für die Lymphflüssigkeit; wichtiger Teil des Immunsystems mit Organen wie Lymphknoten und Milz." },
            { term: "Invasion", definition: "Das Eindringen von Krankheitserregern in den Körper." },
            { term: "Inkubation", definition: "Die Zeit zwischen der Ansteckung und dem Ausbruch der ersten Symptome einer Krankheit." },
            { term: "Immunisierung", definition: "Herbeiführung von Unempfänglichkeit (Immunität) gegenüber einem Krankheitserreger (aktiv oder passiv)." },
        ],
        "HK E2: Fördern und erhalten von Gesundheit und Hygiene - Isolation": [
            { term: "Isolation", definition: "Massnahmen zur räumlichen Absonderung von ansteckenden Personen, um eine Weiterverbreitung von Krankheitserregern zu verhindern." },
            { term: "Kontaktisolierung", definition: "Isolationsmassnahme bei Übertragung von Krankheitserregern durch direkten oder indirekten Kontakt." },
            { term: "Tröpfchenisolierung", definition: "Isolationsmassnahme bei Übertragung durch grössere Tröpfchen (z.B. bei Grippe)." },
            { term: "Aerogene Isolierung", definition: "Strikteste Isolationsmassnahme bei Übertragung durch kleinste, in der Luft schwebende Partikel (Aerosole, z.B. bei Tuberkulose)." },
            { term: "Schutz- und Umkehrisolierung", definition: "Massnahmen zum Schutz von stark immungeschwächten Patienten vor Keimen aus der Umgebung." },
            { term: "Primärprävention", definition: "Massnahmen zur Verhinderung des erstmaligen Auftretens einer Krankheit (z.B. Impfungen)." },
            { term: "Sekundärprävention", definition: "Massnahmen zur Früherkennung und rechtzeitigen Behandlung von Krankheiten (z.B. Screening-Untersuchungen)." },
            { term: "Tertiärprävention", definition: "Massnahmen zur Verhinderung von Folgeschäden und Rückfällen bei einer bestehenden Krankheit (z.B. Rehabilitation)." },
            { term: "Präventionskampagnen", definition: "Öffentliche Aktionen zur Aufklärung der Bevölkerung über Gesundheitsrisiken und Präventionsmöglichkeiten." },
            { term: "Salutogenese", definition: "Modell der Gesundheitsentstehung und -erhaltung (Fokus auf Ressourcen und Schutzfaktoren)." },
            { term: "Pathogenese", definition: "Modell der Krankheitsentstehung (Fokus auf Risikofaktoren und Ursachen)." },
            { term: "Kohärenz", definition: "Kohärenzgefühl; zentrales Konzept der Salutogenese, beschreibt eine Grundhaltung der Zuversicht (Gefühl von Verstehbarkeit, Handhabbarkeit, Sinnhaftigkeit)." },
            { term: "Fieberanstieg", definition: "Phase, in der die Körpertemperatur auf den neuen, höheren Sollwert ansteigt; oft begleitet von Frieren und Schüttelfrost." },
            { term: "Fieberhöhe", definition: "Phase, in der das Fieber seinen höchsten Punkt erreicht hat und stagniert; die Haut ist heiss und trocken." },
            { term: "Fieberabfall", definition: "Phase, in der die Körpertemperatur wieder auf den Normalwert sinkt; oft begleitet von starkem Schwitzen." },
        ],
        "HK E3: Fördern und erhalten von Gesundheit und Hygiene - Morbus Parkinson, Multiple Sklerose": [
            { term: "Multiple Sklerose (MS)", definition: "Chronisch-entzündliche Autoimmunerkrankung des zentralen Nervensystems, die die Myelinscheiden schädigt." },
            { term: "Autoimmunerkrankung", definition: "Erkrankung, bei der das Immunsystem körpereigenes Gewebe angreift." },
            { term: "Myelinschicht", definition: "Isolierschicht um Nervenfasern, die eine schnelle Weiterleitung von Nervenimpulsen ermöglicht." },
            { term: "Cortison", definition: "Ein stark entzündungshemmendes Medikament, das oft zur Behandlung von MS-Schüben eingesetzt wird." },
            { term: "Immunsuppressiva", definition: "Medikamente, die die Aktivität des Immunsystems unterdrücken." },
            { term: "Morbus Parkinson", definition: "Neurodegenerative Erkrankung mit Dopaminmangel, führt zu Bewegungsstörungen (Tremor, Rigor, Akinese)." },
            { term: "Dopamin", definition: "Ein Neurotransmitter, der für die Steuerung von Bewegungen wichtig ist; bei M. Parkinson mangelhaft." },
            { term: "motorische Hirnregion", definition: "Bereiche in der Grosshirnrinde, die für die Planung und Ausführung von Bewegungen zuständig sind." },
            { term: "Akinese", definition: "Bewegungsarmut bis Bewegungslosigkeit, ein Hauptsymptom von M. Parkinson." },
            { term: "Tremor", definition: "Unwillkürliches Zittern, oft als Ruhetremor bei M. Parkinson." },
            { term: "Rigor", definition: "Muskelsteifheit, erhöhter Widerstand bei passiver Bewegung; ein Hauptsymptom von M. Parkinson." },
            { term: "Freezing", definition: "Plötzliches 'Einfrieren' der Bewegung, als ob die Füsse am Boden kleben würden; ein Symptom bei M. Parkinson." },
        ],
        "HK F1: Gestalten des Alltags - Alltag gestalten": [
            { term: "Alltag", definition: "Die tägliche Routine und die regelmässig wiederkehrenden Abläufe." },
            { term: "Aktivierung", definition: "Gezielte Anregung und Förderung von körperlichen, geistigen und sozialen Fähigkeiten." },
            { term: "Feste", definition: "Besondere Anlässe, die den Alltag unterbrechen und soziale Gemeinschaft fördern." },
            { term: "Bräuche", definition: "Traditionelle, wiederkehrende Handlungen innerhalb einer Gemeinschaft." },
            { term: "Rituale", definition: "Regelmässig wiederkehrende Handlungen mit symbolischer Bedeutung, die Struktur und Sicherheit geben." },
        ],
        "HK H3: Durchführen administrativer und logistischer Aufgaben - Transporte": [
            { term: "Transporte", definition: "Die Beförderung von Klienten von einem Ort zum anderen." },
            { term: "Transportwahl", definition: "Die Entscheidung für das am besten geeignete Transportmittel basierend auf dem Zustand des Klienten." },
            { term: "interne Transporte", definition: "Transporte innerhalb einer Institution (z.B. vom Zimmer zum Röntgen)." },
            { term: "externe Transporte", definition: "Transporte ausserhalb einer Institution (z.B. zu einem Spezialisten, nach Hause)." },
            { term: "Rotkreuzfahrzeuge", definition: "Fahrzeuge des Schweizerischen Roten Kreuzes, die für Krankentransporte eingesetzt werden." },
            { term: "Ambulanzfahrzeuge", definition: "Rettungswagen für Notfall- und Verlegungstransporte." },
            { term: "Behindertentransporte", definition: "Spezialisierte Transportdienste für Menschen mit Mobilitätseinschränkungen." },
            { term: "Lufttransporte", definition: "Transport mit einem Helikopter oder Flugzeug (z.B. durch die REGA)." },
            { term: "Organisation", definition: "Die Planung und Koordination eines Transports." },
            { term: "Transportvorbereitung", definition: "Massnahmen, die vor einem Transport getroffen werden müssen (z.B. Information, Material bereitstellen)." },
            { term: "Information", definition: "Die Aufklärung des Klienten und der Angehörigen über den bevorstehenden Transport." },
            { term: "Begleitung", definition: "Die Anwesenheit einer Fachperson während des Transports, falls erforderlich." },
            { term: "spezialisierte Transportdienste", definition: "Anbieter, die auf bestimmte Arten von Transporten (z.B. Intensivtransporte) spezialisiert sind." },
            { term: "freiwillige Transportdienste", definition: "Oft von gemeinnützigen Organisationen angebotene Fahrdienste für nicht dringliche Fahrten." },
        ]
    },
    "Semester 4": {
        "HK A4: Umsetzung von Professionalität und Klientenzentrierung - Transkulturelle Pflege": [
            { term: "Transkulturelle Pflege", definition: "Pflege, die kulturelle Unterschiede, Werte und Bedürfnisse von Klienten berücksichtigt und respektiert." },
            { term: "Transkulturelle Kommunikation", definition: "Kommunikation zwischen Menschen aus unterschiedlichen Kulturen, die besondere Sensibilität erfordert." },
            { term: "Migration", definition: "Dauerhafter Wechsel des Wohnsitzes über Staatsgrenzen hinweg." },
            { term: "Immigration", definition: "Die Einwanderung in ein neues Land mit dem Ziel, dort dauerhaft zu leben." },
            { term: "Integration", definition: "Der Prozess der Einbindung von Migranten in die Gesellschaft des Aufnahmelandes." },
            { term: "Ethik", definition: "Die Lehre vom moralischen Handeln, die auch in transkulturellen Kontexten von Bedeutung ist." },
            { term: "Ethische Prinzipien", definition: "Universelle Leitlinien wie Autonomie, Gutes tun, Nicht schaden und Gerechtigkeit, die kultursensibel angewendet werden müssen." },
            { term: "Ethisches Dilemma", definition: "Eine Situation, in der ethische Prinzipien im Widerspruch zueinander oder zu kulturellen Werten stehen." },
            { term: "Kommunikation", definition: "Der Austausch von Informationen, der in transkulturellen Settings durch Sprachbarrieren oder unterschiedliche Kommunikationsstile erschwert sein kann." },
            { term: "Kultur", definition: "Ein System von gemeinsamen Werten, Normen und Traditionen, das das Denken und Handeln von Menschen prägt." },
            { term: "Multikulturalität", definition: "Das Zusammenleben von Menschen aus verschiedenen Kulturen in einer Gesellschaft." },
        ],
        "HK A5: Umsetzung von Professionalität und Klientenzentrierung - Qualitätssicherung": [
            { term: "Pflegeprozess", definition: "Systematischer Problemlösungsansatz in der Pflege (Informationssammlung, Diagnose, Zielsetzung, Planung, Durchführung, Evaluation)." },
            { term: "Pflegestandards", definition: "Definierte Normen und Richtlinien, die ein professionelles Niveau der Pflege festlegen und die Qualität sichern." },
            { term: "Pflegediagnosen", definition: "Klinische Beurteilung der Reaktionen eines Klienten auf aktuelle oder potenzielle Gesundheitsprobleme (z.B. nach NANDA)." },
            { term: "Pflegedokumentation", definition: "Schriftliche Festhaltung des Pflegeprozesses zur Gewährleistung von Kontinuität, Nachvollziehbarkeit und rechtlicher Absicherung." },
            { term: "Pflegeplanung", definition: "Der Schritt im Pflegeprozess, bei dem Ziele festgelegt und konkrete Pflegemassnahmen geplant werden." },
            { term: "Qualität", definition: "Der Grad, in dem eine Dienstleistung (z.B. Pflege) festgelegte Anforderungen erfüllt." },
            { term: "Qualitätssicherung", definition: "Alle Massnahmen, die dazu dienen, die Qualität von Produkten oder Dienstleistungen zu gewährleisten und zu verbessern." },
            { term: "Fehlermanagement", definition: "Systematischer Umgang mit Fehlern mit dem Ziel, aus ihnen zu lernen und zukünftige Fehler zu vermeiden." },
            { term: "WWWS Kriterien", definition: "Kriterien zur Beurteilung der Qualität hauswirtschaftlicher Arbeit (Wirtschaftlichkeit, Wohlbefinden, Wirksamkeit, Sicherheit)." },
        ],
        "HK B4: Pflege und Betreuung - Atmung": [
            { term: "Respiration", definition: "Die Atmung; umfasst die äussere Atmung (Gasaustausch in der Lunge) und die innere Atmung (Zellatmung)." },
            { term: "Inspiration", definition: "Die Einatmung." },
            { term: "Exspiration", definition: "Die Ausatmung." },
            { term: "Ventilation", definition: "Die Belüftung der Lunge; der Vorgang des Ein- und Ausatmens." },
            { term: "Atmungssystem", definition: "Umfasst die oberen und unteren Atemwege sowie die Lunge." },
            { term: "obere Atemwege", definition: "Nase, Nasennebenhöhlen und Rachen." },
            { term: "untere Atemwege", definition: "Kehlkopf, Luftröhre, Bronchien und Lunge." },
            { term: "Nasenschleimhaut", definition: "Kleidet die Nase aus, befeuchtet, erwärmt und reinigt die eingeatmete Luft." },
            { term: "Trachea", definition: "Die Luftröhre." },
            { term: "Bronchien", definition: "Die Verästelungen der Luftröhre, die die Luft in die Lungenflügel leiten." },
            { term: "Alveolen", definition: "Lungenbläschen, in denen der Gasaustausch zwischen Luft und Blut stattfindet." },
            { term: "Gasaustausch", definition: "Der Prozess, bei dem Sauerstoff aus den Alveolen ins Blut und Kohlendioxid aus dem Blut in die Alveolen übertritt." },
            { term: "Atemmechanik", definition: "Die physikalischen Vorgänge, die die Ein- und Ausatmung ermöglichen." },
            { term: "Zwerchfell", definition: "Der wichtigste Atemmuskel, der Brust- und Bauchraum voneinander trennt." },
            { term: "Atembewegung", definition: "Die Bewegung des Brustkorbs und des Zwerchfells während der Atmung." },
            { term: "Sauerstoff", definition: "Ein Gas, das für die Energiegewinnung in den Körperzellen unerlässlich ist." },
            { term: "Kohlendioxid", definition: "Ein Abfallprodukt der Zellatmung, das über die Lunge ausgeatmet wird." },
            { term: "Zyanose", definition: "Bläuliche Verfärbung der Haut und Schleimhäute aufgrund von Sauerstoffmangel im Blut." },
            { term: "Pneumonie", definition: "Lungenentzündung, eine Infektion des Lungengewebes." },
            { term: "Pneumokokken", definition: "Bakterien, die eine häufige Ursache für Lungenentzündungen sind." },
            { term: "Asthma bronchiale", definition: "Chronisch-entzündliche Erkrankung der Atemwege mit anfallsartiger Atemnot durch Verengung der Bronchien." },
            { term: "COPD (Chronisch obstruktive Lungenerkrankung)", definition: "Chronische Lungenerkrankung mit Verengung der Atemwege und oft Lungenemphysem." },
            { term: "Bronchitis", definition: "Entzündung der Schleimhaut in den Bronchien." },
            { term: "Lungenembolie", definition: "Verschluss einer Lungenarterie durch einen Embolus, meist einen abgelösten Thrombus aus den Beinvenen." },
            { term: "Sekret", definition: "Flüssigkeit (Schleim), die von Drüsen in den Atemwegen produziert wird." },
            { term: "Aerosol", definition: "Feinste Verteilung fester oder flüssiger Stoffe in einem Gas (z.B. zur Inhalation von Medikamenten)." },
            { term: "Sauerstoffverabreichung", definition: "Die Zufuhr von Sauerstoff über eine Nasensonde, Maske oder Brille." },
            { term: "Verabreichung von Inhalation", definition: "Das Einatmen von Medikamenten in Form von Aerosolen, um sie direkt in die Lunge zu bringen." },
        ],
        "HK B6: Pflege und Betreuung - Ruhen und Schlafen": [
            { term: "Bewusstsein", definition: "Der Zustand des Wachseins und des Wissens um die eigene Existenz und Umgebung." },
            { term: "Bewusstseinsstufen", definition: "Abstufungen des Wachheitsgrades (z.B. Benommenheit, Somnolenz, Sopor, Koma)." },
            { term: "quantitative Bewusstseinsstörungen", definition: "Störungen der Wachheit (Vigilanz), von Benommenheit bis zum Koma." },
            { term: "qualitative Bewusstseinsstörungen", definition: "Störungen der Bewusstseinsklarheit und des Denkens (z.B. Verwirrtheit, Delir)." },
            { term: "Benommenheit", definition: "Leichte Störung des Bewusstseins; der Patient ist schläfrig, aber leicht weckbar und orientiert." },
            { term: "Somnolenz", definition: "Abnorme Schläfrigkeit; der Patient ist durch Ansprache oder leichte Reize weckbar." },
            { term: "Sopor", definition: "Tiefer Schlaf; der Patient ist nur durch starke Reize (z.B. Schmerzreiz) weckbar." },
            { term: "Koma", definition: "Zustand tiefer Bewusstlosigkeit; der Patient ist nicht weckbar." },
            { term: "Wachkoma", definition: "Zustand, in dem der Patient die Augen geöffnet hat und wach erscheint, aber keine bewussten Reaktionen zeigt." },
            { term: "Tag-Nacht-Rhythmus", definition: "Der zirkadiane Rhythmus, der Schlaf- und Wachphasen über 24 Stunden steuert." },
            { term: "Dyssomnie", definition: "Eine Gruppe von Schlafstörungen, die die Dauer, Qualität oder den Zeitpunkt des Schlafs betreffen (z.B. Insomnie)." },
            { term: "Parasomnie", definition: "Auffällige Verhaltensweisen oder Ereignisse, die während des Schlafs auftreten (z.B. Schlafwandeln, Albträume)." },
            { term: "Schlafapnoe", definition: "Atemaussetzer während des Schlafs." },
            { term: "Schlafprotokoll", definition: "Tagebuch zur systematischen Erfassung von Schlafgewohnheiten und -störungen." },
            { term: "Phytotherapie", definition: "Die Anwendung von pflanzlichen Mitteln zur Linderung von Beschwerden (z.B. Baldrian bei Schlafstörungen)." },
            { term: "Hypnotika", definition: "Schlafmittel, Medikamente zur Einleitung und Aufrechterhaltung des Schlafes." },
            { term: "Benzodiazepine", definition: "Eine Gruppe von Psychopharmaka, die beruhigend, angstlösend und schlaffördernd wirken, aber ein hohes Abhängigkeitspotenzial haben." },
        ],
        "HK C2: Pflege und Betreuung in anspruchsvollen Situationen - Onkologie und Schmerzen": [
            { term: "Onkologie", definition: "Das Fachgebiet der Medizin, das sich mit der Prävention, Diagnose und Behandlung von Krebserkrankungen befasst." },
            { term: "benigne", definition: "Gutartig; ein Tumor, der nicht in umliegendes Gewebe einwächst und keine Metastasen bildet." },
            { term: "maligne", definition: "Bösartig; ein Tumor (Krebs), der in umliegendes Gewebe einwächst und Metastasen bilden kann." },
            { term: "Proliferation", definition: "Schnelles Wachstum und Vermehrung von Zellen." },
            { term: "Genmutation", definition: "Eine dauerhafte Veränderung im Erbgut, die zur Entstehung von Krebs führen kann." },
            { term: "Metastasen", definition: "Tochtergeschwülste eines bösartigen Tumors, die sich durch Verschleppung von Krebszellen in anderen Körperregionen ansiedeln." },
            { term: "Metastasierung", definition: "Der Prozess der Bildung von Metastasen." },
            { term: "Prostatakarzinom", definition: "Bösartiger Tumor der Vorsteherdrüse (Prostata)." },
            { term: "Mammakarzinom", definition: "Brustkrebs; ein bösartiger Tumor der Brustdrüse." },
            { term: "Chemotherapie", definition: "Medikamentöse Behandlung von Krebserkrankungen mit Zytostatika, die das Zellwachstum hemmen." },
            { term: "Strahlentherapie", definition: "Behandlung von Krebserkrankungen mit ionisierenden Strahlen, um Tumorzellen zu zerstören." },
            { term: "bestrahlte Haut", definition: "Haut, die im Rahmen einer Strahlentherapie behandelt wurde und besondere Pflege benötigt (z.B. Rötung, Trockenheit)." },
            { term: "Mastektomie", definition: "Chirurgische Entfernung der Brustdrüse." },
            { term: "Prostataektomie", definition: "Chirurgische Entfernung der Prostata." },
            { term: "Lymphödem", definition: "Schwellung durch Ansammlung von Lymphflüssigkeit, oft nach Entfernung von Lymphknoten bei Krebsoperationen." },
            { term: "Haarausfall", definition: "Eine häufige Nebenwirkung der Chemotherapie (Alopezie)." },
            { term: "Schmerzen", definition: "Ein unangenehmes Sinnes- und Gefühlserlebnis, das mit aktueller oder potenzieller Gewebeschädigung verknüpft ist." },
            { term: "Schmerzphysiologie", definition: "Die Lehre von der Entstehung, Weiterleitung und Verarbeitung von Schmerz." },
            { term: "Nozizeptoren", definition: "Spezialisierte Schmerzrezeptoren, die auf schädigende Reize reagieren." },
            { term: "Schmerzempfindung", definition: "Die subjektive Wahrnehmung von Schmerz." },
            { term: "Schmerzmanagement", definition: "Systematischer Ansatz zur Erfassung, Beurteilung und Behandlung von Schmerzen." },
            { term: "Schmerzkriterien", definition: "Merkmale zur Beschreibung von Schmerz (z.B. Lokalisation, Intensität, Qualität, Zeitverlauf)." },
            { term: "Schmerzassessment", definition: "Die systematische Erfassung und Beurteilung von Schmerzen mithilfe von Skalen und Beobachtung." },
            { term: "Schmerzskala", definition: "Instrument zur Messung der Schmerzintensität (z.B. Numerische Rangskala NRS, Visuelle Analogskala VAS)." },
            { term: "nichtmedikamentöse Schmerztherapie", definition: "Massnahmen zur Schmerzlinderung ohne Medikamente (z.B. Kälte-/Wärmeanwendungen, Lagerung, Ablenkung)." },
            { term: "medikamentöse Schmerztherapie", definition: "Behandlung von Schmerzen mit Medikamenten (Analgetika)." },
            { term: "WHO-Stufenplan", definition: "Schema der Weltgesundheitsorganisation zur medikamentösen Schmerztherapie in drei Stufen, je nach Schmerzstärke." },
            { term: "Opioide", definition: "Stark wirksame Schmerzmittel, die an Opioidrezeptoren wirken (z.B. Morphin); Stufe 2 und 3 des WHO-Schemas." },
        ],
        "HK C3: Pflege und Betreuung in anspruchsvollen Situationen - Krisensituationen": [
            { term: "Krise", definition: "Ein belastender Zustand oder eine schwierige Lebenssituation, die mit den üblichen Bewältigungsstrategien nicht mehr gemeistert werden kann." },
            { term: "Entwicklungskrise", definition: "Krisen, die im normalen Lebenslauf an Übergängen zu neuen Lebensphasen auftreten (z.B. Pubertät, Pensionierung)." },
            { term: "Verlustkrise", definition: "Krise, die durch den Verlust einer wichtigen Person, eines Objekts oder einer Fähigkeit ausgelöst wird." },
            { term: "Zwischenmenschliche Krise", definition: "Krise, die durch Konflikte oder Probleme in Beziehungen entsteht." },
            { term: "Leistungskrise", definition: "Krise, die durch berufliche oder private Über- oder Unterforderung entsteht." },
            { term: "Krisenmerkmale", definition: "Typische Anzeichen einer Krise, wie z.B. Gefühl der Überforderung, Anspannung, Kontrollverlust." },
            { term: "Krisenmodell", definition: "Theoretisches Modell zur Beschreibung des Verlaufs einer Krise in verschiedenen Phasen (z.B. nach Caplan)." },
            { term: "Copingstrategien", definition: "Bewältigungsmechanismen und Verhaltensweisen im Umgang mit Stress, Belastungen und Krisen." },
            { term: "geeignete Copingstrategien", definition: "Konstruktive Bewältigungsstrategien, die langfristig zur Lösung des Problems beitragen (z.B. soziale Unterstützung suchen, aktiv Probleme lösen)." },
            { term: "ungeeignete Copingstrategien", definition: "Destruktive Bewältigungsstrategien, die kurzfristig Entlastung bringen, aber langfristig schaden (z.B. Substanzmissbrauch, sozialer Rückzug)." },
            { term: "psychiatrische Notfälle", definition: "Akute psychische Krisen, die eine sofortige Intervention erfordern (z.B. Suizidalität, akute Psychose)." },
            { term: "psychische Krise", definition: "Ein Zustand akuter seelischer Not." },
            { term: "Suizidalität", definition: "Gefährdung durch Selbsttötungsgedanken, -absichten oder -handlungen." },
            { term: "Suizidgedanken", definition: "Gedanken, sich das Leben zu nehmen." },
            { term: "Suizidabsichten", definition: "Konkrete Pläne, sich das Leben zu nehmen." },
            { term: "aktive Suizidalität", definition: "Vorhandensein von konkreten Plänen und Absichten zur Selbsttötung." },
            { term: "passive Suizidalität", definition: "Vorhandensein von Todeswünschen, aber ohne konkrete Pläne oder Absichten." },
            { term: "Kurzschluss-Suizid", definition: "Impulsive Selbsttötung aus einer unerträglichen emotionalen Anspannung heraus." },
            { term: "erweiterter Suizid", definition: "Selbsttötung, bei der eine Person andere (oft nahestehende) Menschen mit in den Tod nimmt." },
            { term: "Bilanz-Suizid", definition: "Selbsttötung nach reiflicher Überlegung und Abwägung der Lebensumstände." },
            { term: "Suizidale Entwicklung", definition: "Prozess der zunehmenden Einengung von Wahrnehmung, Gefühlswelt und Handlungsoptionen, der in Suizidalität münden kann." },
            { term: "Aggression", definition: "Ein Verhalten, das darauf abzielt, einer anderen Person oder einem Gegenstand zu schaden." },
            { term: "Gewalt", definition: "Die Anwendung von physischem oder psychischem Zwang." },
            { term: "Deeskalation", definition: "Massnahmen zur Reduzierung von Spannung und zur Verhinderung der Zuspitzung von Aggression und Gewalt." },
        ],
        "HK C4: Pflege und Betreuung in anspruchsvollen Situationen - Chronische Krankheiten": [
            { term: "chronische Erkrankung", definition: "Eine lang andauernde Krankheit, die in der Regel nicht vollständig heilbar ist und eine kontinuierliche Behandlung erfordert." },
            { term: "Multimorbidität", definition: "Das gleichzeitige Bestehen mehrerer chronischer Erkrankungen bei einer Person." },
            { term: "Polymedikation", definition: "Die gleichzeitige Einnahme von fünf oder mehr verschiedenen Medikamenten." },
            { term: "Adhärenz", definition: "Die Einhaltung der gemeinsam von Klient und Fachperson vereinbarten Therapieziele und -massnahmen." },
            { term: "Compliance", definition: "Historischer Begriff, der die Befolgung ärztlicher Anweisungen durch den Patienten beschreibt (wird heute durch Adhärenz ersetzt)." },
            // Hinweis: Viele Nervensystem-Begriffe wiederholen sich hier. Sie werden zur Vollständigkeit erneut aufgeführt.
            { term: "Nervensystem", definition: "Das Steuerungs- und Kommunikationssystem des Körpers, bestehend aus ZNS und PNS." },
            { term: "zentrales Nervensystem", definition: "ZNS; umfasst Gehirn und Rückenmark." },
            { term: "peripheres Nervensystem", definition: "PNS; umfasst alle Nerven ausserhalb von Gehirn und Rückenmark." },
            { term: "willkürliches Nervensystem", definition: "Somatisches Nervensystem; steuert die bewusst kontrollierbaren Vorgänge." },
            { term: "vegetatives Nervensystem", definition: "Autonomes Nervensystem; steuert die unwillkürlichen Körperfunktionen." },
            { term: "Sympathikus", definition: "Teil des vegetativen Nervensystems, zuständig für Leistungssteigerung ('Kampf oder Flucht')." },
            { term: "Parasympathikus", definition: "Teil des vegetativen Nervensystems, zuständig für Erholung und Regeneration ('Ruhe und Verdauung')." },
            { term: "Neuron", definition: "Nervenzelle, die grundlegende Einheit des Nervensystems." },
            { term: "Dendrit", definition: "Fortsatz eines Neurons, der Signale empfängt." },
            { term: "Axon", definition: "Fortsatz eines Neurons, der Signale weiterleitet." },
            { term: "Markscheide", definition: "Isolierende Hülle um ein Axon (Myelinscheide), ermöglicht schnelle Signalübertragung." },
            { term: "Synapse", definition: "Verbindungsstelle zwischen zwei Neuronen." },
            { term: "Neurotransmitter", definition: "Chemische Botenstoffe an der Synapse." },
            { term: "Gehirn", definition: "Die Steuerzentrale des Körpers, Teil des ZNS." },
            { term: "Grosshirn", definition: "Grösster Teil des Gehirns, verantwortlich für höhere kognitive Funktionen." },
            { term: "Zwischenhirn", definition: "Teil des Gehirns, u.a. mit Thalamus und Hypothalamus, filtert Informationen und steuert vegetative Funktionen." },
            { term: "Kleinhirn", definition: "Teil des Gehirns, zuständig für Koordination, Gleichgewicht und Bewegung." },
            { term: "Hirnstamm", definition: "Ältester Teil des Gehirns, steuert lebenswichtige Reflexe und Funktionen wie Atmung und Herzschlag." },
            { term: "Hirnlappen", definition: "Die vier grossen Bereiche des Grosshirns (Stirn-, Scheitel-, Schläfen-, Hinterhauptlappen)." },
            { term: "graue Hirnsubstanz", definition: "Bereiche des ZNS, die hauptsächlich aus Nervenzellkörpern bestehen." },
            { term: "weisse Hirnsubstanz", definition: "Bereiche des ZNS, die hauptsächlich aus Nervenfasern (Axonen) mit Myelinscheiden bestehen." },
            { term: "Rückenmark", definition: "Teil des ZNS, leitet Informationen zwischen Gehirn und Peripherie und steuert Reflexe." },
            { term: "Reflexe", definition: "Unwillkürliche, schnelle Reaktionen des Körpers auf einen Reiz." },
            { term: "Hirnnerven", definition: "12 Paar Nerven, die direkt aus dem Gehirn entspringen." },
            { term: "Hirnhäute", definition: "Drei Membranen, die das ZNS umhüllen und schützen." },
        ],
        "HK C5: Pflege und Betreuung in anspruchsvollen Situationen - Verwirrtheitszuständen": [
            { term: "Verwirrtheit", definition: "Ein Zustand, in dem Denken, Wahrnehmung und Orientierung gestört sind." },
            { term: "akute Verwirrtheit", definition: "Ein plötzlich auftretender, meist reversibler Verwirrtheitszustand (Delir)." },
            { term: "chronische Verwirrtheit", definition: "Ein langsam fortschreitender, meist irreversibler Verwirrtheitszustand (typisch für Demenz)." },
            { term: "Orientierung", definition: "Das Wissen über die eigene Person, den Ort, die Zeit und die aktuelle Situation." },
            { term: "Orientierungsstörungen", definition: "Beeinträchtigung der Orientierung." },
            { term: "Desorientiertheit", definition: "Zustand der Orientierungslosigkeit." },
            { term: "Kognition", definition: "Die Gesamtheit der geistigen Prozesse wie Denken, Wahrnehmen, Erinnern und Lernen." },
            { term: "Gedächtnisstörungen", definition: "Beeinträchtigung der Fähigkeit, Informationen zu speichern oder abzurufen." },
            { term: "Sprachstörungen", definition: "Beeinträchtigung der Fähigkeit zu sprechen oder Sprache zu verstehen (Aphasie)." },
            { term: "Hirnleistungsstörungen", definition: "Umfassender Begriff für Beeinträchtigungen der kognitiven Funktionen." },
            { term: "Demenz", definition: "Fortschreitender Verlust kognitiver Fähigkeiten (Gedächtnis, Orientierung, Sprache, Denken), der die Alltagsbewältigung beeinträchtigt." },
            { term: "Alzheimer Demenz", definition: "Häufigste Form der Demenz, eine neurodegenerative Erkrankung mit Ablagerungen von Plaques und Fibrillen im Gehirn." },
            { term: "vaskuläre Demenz", definition: "Zweithäufigste Demenzform, verursacht durch Durchblutungsstörungen im Gehirn." },
            { term: "Demenzstadien", definition: "Einteilung des Demenzverlaufs in verschiedene Schweregrade (leicht, mittel, schwer)." },
            { term: "Delir", definition: "Akuter Verwirrtheitszustand mit Bewusstseins-, Aufmerksamkeits- und Wahrnehmungsstörungen, oft reversibel." },
            { term: "Validation", definition: "Kommunikationsmethode für Menschen mit Demenz, die ihre subjektive Realität und Gefühlswelt anerkennt und bestätigt." },
            { term: "Milieutherapie", definition: "Gestaltung der Umgebung und des sozialen Umfelds zur therapeutischen Unterstützung und Förderung des Wohlbefindens." },
            { term: "Aktivierung", definition: "Gezielte Anregung, um vorhandene Fähigkeiten von Menschen mit Demenz zu erhalten und zu fördern." },
            { term: "Primärsymptome", definition: "Direkte Folgen der Gehirnschädigung bei Demenz (z.B. Gedächtnisverlust, Aphasie)." },
            { term: "Sekundärsymptome", definition: "Psychische Symptome und Verhaltensweisen als Reaktion auf die Primärsymptome (z.B. Angst, Aggression, Depression)." },
            { term: "Amnesie", definition: "Gedächtnisverlust." },
            { term: "Aphasie", definition: "Erworbene Sprachstörung." },
            { term: "Apraxie", definition: "Unfähigkeit, zielgerichtete Bewegungen trotz intakter Motorik auszuführen." },
            { term: "Agnosie", definition: "Unfähigkeit, Objekte, Personen oder Geräusche trotz intakter Sinnesorgane zu erkennen." },
            { term: "Abstraktionsfähigkeitsverlust", definition: "Unfähigkeit, über den konkreten Kontext hinaus zu denken oder Zusammenhänge zu erkennen." },
            { term: "Assessmentstörung", definition: "Verlust der Urteils- und Kritikfähigkeit." },
            { term: "Acetylcholin", definition: "Ein Neurotransmitter, der für Gedächtnis und Lernen wichtig ist und bei Alzheimer-Demenz reduziert ist." },
            { term: "Antidementiva", definition: "Medikamente, die das Fortschreiten der Demenzsymptome verlangsamen sollen." },
            { term: "reversibel", definition: "Umkehrbar, heilbar." },
            { term: "irreversibel", definition: "Nicht umkehrbar, nicht heilbar." },
            { term: "degenerativ", definition: "Durch den fortschreitenden Verfall von Zellen oder Geweben bedingt." },
            { term: "Urteilsfähigkeit", definition: "Die Fähigkeit, eine Situation zu verstehen und vernunftgemäss zu handeln; kann bei Demenz eingeschränkt sein." },
            { term: "KESB", definition: "Kindes- und Erwachsenenschutzbehörde; zuständig für Massnahmen bei Urteilsunfähigkeit." },
        ],
        "HK D4: Ausführen von medizinaltechnischen Verrichtungen - Infusionen richten": [
            { term: "Isotonische Lösung", definition: "Lösung mit dem gleichen osmotischen Druck wie das Blutplasma (z.B. NaCl 0.9%)." },
            { term: "Hypotone Lösung", definition: "Lösung mit einem geringeren osmotischen Druck als das Blutplasma." },
            { term: "Hypertone Lösung", definition: "Lösung mit einem höheren osmotischen Druck als das Blutplasma." },
            { term: "Osmose", definition: "Die Bewegung von Wasser durch eine semipermeable Membran in Richtung der höheren Konzentration gelöster Teilchen." },
            { term: "Diffusion", definition: "Die Bewegung von gelösten Teilchen von einem Ort hoher Konzentration zu einem Ort niedriger Konzentration." },
            { term: "Flüssigkeitsbilanz", definition: "Vergleich der Flüssigkeitsaufnahme (Einfuhr) und -ausscheidung (Ausfuhr)." },
            { term: "intrazellulärer Raum", definition: "Der Raum innerhalb der Körperzellen." },
            { term: "extrazellulärer Raum", definition: "Der Raum ausserhalb der Körperzellen." },
            { term: "intravasal", definition: "Innerhalb eines Blut- oder Lymphgefässes." },
            { term: "Plasma", definition: "Der flüssige, zellfreie Teil des Blutes." },
            { term: "Elektrolythaushalt", definition: "Die Regulation der Konzentration von Elektrolyten in den Körperflüssigkeiten." },
            { term: "Calcium, Kalium, Natrium, Magnesium", definition: "Wichtige Elektrolyte mit zentralen Funktionen im Körper (z.B. Nervenleitung, Muskelkontraktion)." },
            { term: "Glucose", definition: "Traubenzucker, wird in Infusionen als Energielieferant verwendet." },
            { term: "Dehydratation", definition: "Flüssigkeitsmangel im Körper." },
            { term: "Ödeme", definition: "Flüssigkeitsansammlungen im Gewebe." },
            { term: "Phlebitis", definition: "Venenentzündung, oft als Komplikation bei venösen Zugängen." },
            { term: "Entzündungszeichen", definition: "Rötung, Schwellung, Schmerz, Wärme, Funktionsverlust." },
            { term: "Anaphylaktische Reaktion", definition: "Eine schwere, lebensbedrohliche allergische Reaktion." },
            { term: "Erhaltungstherapie", definition: "Infusionstherapie zur Deckung des täglichen Grundbedarfs an Flüssigkeit und Elektrolyten." },
            { term: "Ersatztherapie", definition: "Infusionstherapie zum Ausgleich von bereits bestehenden Verlusten." },
            { term: "Korrekturtherapie", definition: "Infusionstherapie zur Korrektur von spezifischen Störungen (z.B. Elektrolytstörungen)." },
            { term: "periphere venöse Infusion", definition: "Infusion über eine Vene, die weit vom Körperstamm entfernt ist (z.B. am Arm)." },
            { term: "zentral venöse Infusion", definition: "Infusion über einen Katheter, dessen Spitze in einer grossen, herznahen Vene liegt (ZVK)." },
            { term: "Portkatheter", definition: "Ein unter die Haut implantiertes System für einen dauerhaften Zugang zu einer zentralen Vene." },
            { term: "subkutane Infusion", definition: "Infusion in das Unterhautfettgewebe." },
            { term: "intraossäre Infusion", definition: "Notfallmässige Infusion direkt in den Knochenmarkraum." },
        ],
        "HK D5: Ausführen von medizinaltechnischen Verrichtungen - Sondennahrung": [
            { term: "enteral", definition: "Verabreichung von Nahrung oder Medikamenten über den Magen-Darm-Trakt." },
            { term: "parenteral", definition: "Verabreichung unter Umgehung des Magen-Darm-Trakts, z.B. intravenös." },
            { term: "transnasal", definition: "Durch die Nase; z.B. eine transnasale Magensonde." },
            { term: "perkutan", definition: "Durch die Haut; z.B. eine perkutan angelegte Ernährungssonde (PEG)." },
            { term: "PEG-Sonde (Perkutane endoskopische Gastrostomie)", definition: "Ernährungssonde, die durch die Bauchwand direkt in den Magen gelegt wird." },
            { term: "Duodenalsonde", definition: "Sonde, deren Spitze im Zwölffingerdarm (Duodenum) liegt." },
            { term: "Sondenkost", definition: "Speziell hergestellte Flüssignahrung für die enterale Ernährung." },
            { term: "hoch-/niedermolekulare Sondenkost", definition: "Unterscheidung nach dem Aufbereitungsgrad der Nährstoffe (niedermolekular = bereits aufgespalten)." },
            { term: "Applikationsformen", definition: "Art der Verabreichung der Sondennahrung (z.B. Bolusapplikation, kontinuierliche Applikation)." },
            { term: "Bolusapplikation", definition: "Portionsweise Verabreichung von Sondennahrung mit einer Spritze." },
            { term: "Aspiration", definition: "Das Einatmen von Fremdstoffen (hier: Sondennahrung) in die Atemwege; eine gefürchtete Komplikation." },
            { term: "Reflux", definition: "Rückfluss von Mageninhalt in die Speiseröhre, erhöht das Aspirationsrisiko." },
            { term: "Malabsorption", definition: "Gestörte Aufnahme von Nährstoffen aus dem Darm." },
            { term: "Dysphagie", definition: "Schluckstörung, eine häufige Indikation für eine Ernährungssonde." },
            { term: "Mundpflege", definition: "Besonders wichtig bei Sondenernährung, da die natürliche Selbstreinigung des Mundes durch Kauen fehlt." },
            { term: "Zwangsernährung", definition: "Ernährung gegen den Willen einer Person; ein ethisch komplexes Thema." },
            { term: "ethische Aspekte", definition: "Moralische Fragestellungen im Zusammenhang mit der Anlage und dem Betrieb einer Ernährungssonde (z.B. Lebensqualität, Patientenwille)." },
        ],
        "HK D7: Ausführen von medizinaltechnischen Verrichtungen - Wundmanagement": [
            { term: "Primäre Wundheilung", definition: "Heilung einer sauberen, glatt aneinanderliegenden Wunde mit minimaler Narbenbildung." },
            { term: "Sekundäre Wundheilung", definition: "Heilung einer klaffenden Wunde mit Gewebeverlust, bei der sich die Wunde vom Grund her mit Granulationsgewebe auffüllt." },
            { term: "feuchte Wundbehandlung", definition: "Moderne Wundbehandlung, bei der ein feuchtes Wundmilieu geschaffen wird, um die Heilung zu fördern." },
            { term: "aseptische Wunden", definition: "Keimarme Wunden, z.B. Operationswunden." },
            { term: "septische Wunden", definition: "Mit Krankheitserregern infizierte Wunden." },
            { term: "Exudationsphase", definition: "Reinigungsphase; erste Phase der Wundheilung mit Austritt von Wundsekret (Exsudat)." },
            { term: "Granulationsphase", definition: "Proliferationsphase; zweite Phase der Wundheilung mit Bildung von neuem Bindegewebe (Granulationsgewebe)." },
            { term: "Epithelisierungsphase", definition: "Regenerationsphase; dritte Phase der Wundheilung mit Überwachsen der Wunde durch neue Hautzellen." },
            { term: "Exsudat", definition: "Flüssigkeitsaustritt aus Gefässen bei Entzündungen oder Wunden." },
            { term: "Fibrin", definition: "Ein klebriges Protein, das bei der Blutgerinnung entsteht und ein Wundgerüst bildet." },
            { term: "Nekrose", definition: "Abgestorbenes, meist schwarz verfärbtes Gewebe." },
            { term: "Dekubitus", definition: "Druckgeschwür, eine Schädigung der Haut und des darunterliegenden Gewebes durch langanhaltenden Druck." },
            { term: "Ulcus Cruris", definition: "'Offenes Bein'; ein schlecht heilendes Geschwür am Unterschenkel, meist infolge einer Venenschwäche oder pAVK." },
            { term: "Gangrän", definition: "Eine Form der Nekrose durch mangelnde Blutversorgung, oft mit bakterieller Zersetzung." },
            { term: "Wundhämatom", definition: "Ein Bluterguss in oder um eine Wunde." },
            { term: "Wundinfektion", definition: "Besiedlung einer Wunde mit Krankheitserregern, die zu einer Entzündungsreaktion führt." },
            { term: "Wundheilungsstörungen", definition: "Faktoren oder Zustände, die den normalen Heilungsprozess einer Wunde verzögern oder verhindern." },
            { term: "Hydrokolloide Verbände", definition: "Selbsthaftende Verbände, die mit Wundexsudat ein Gel bilden und ein feuchtes Milieu schaffen." },
            { term: "Hydrogele", definition: "Gele mit hohem Wassergehalt, die trockene Wunden befeuchten und Nekrosen aufweichen können." },
        ],
        "HK E2: Fördern und erhalten von Gesundheit und Hygiene - Impfen, Influenza": [
            { term: "Aktive Impfung", definition: "Impfung mit abgeschwächten oder abgetöteten Erregern (oder deren Teilen) zur Anregung der körpereigenen Immunantwort und Bildung von Gedächtniszellen." },
            { term: "passive Impfung", definition: "Gabe von fertigen Antikörpern als Sofortschutz nach einer möglichen Ansteckung." },
            { term: "Antigen", definition: "Substanz, die eine spezifische Immunantwort im Körper auslöst." },
            { term: "Antikörper", definition: "Vom Immunsystem produzierte Proteine, die gezielt an Antigene binden." },
            { term: "Mikroorganismen", definition: "Kleinstlebewesen wie Bakterien und Viren." },
            { term: "Immunisierung", definition: "Das Herbeiführen von Immunität (Schutz) gegenüber einem Krankheitserreger." },
            { term: "BAG-Impfplan", definition: "Der vom Bundesamt für Gesundheit (BAG) empfohlene Impfkalender für die Schweiz." },
            { term: "Influenza", definition: "Echte Grippe, eine akute, fieberhafte Viruserkrankung der Atemwege, die schwer verlaufen kann." },
            { term: "Erkältung", definition: "Grippaler Infekt; eine meist harmlose Infektion der oberen Atemwege, verursacht durch verschiedene Viren." },
        ],
        "HK E4: Fördern und erhalten von Gesundheit und Hygiene - Ernährung beraten": [
            { term: "Ernährungszustand", definition: "Der Zustand des Körpers in Bezug auf die Nährstoffversorgung (z.B. gut ernährt, mangelernährt, übergewichtig)." },
            { term: "Kostform", definition: "Spezielle Ernährungsweise (z.B. salzarm, kalorienreduziert), die zur Beratung gehört." },
            { term: "Portion", definition: "Eine definierte Menge eines Lebensmittels; die Vermittlung von Portionsgrössen ist Teil der Beratung." },
            { term: "Lebensmittelpyramide", definition: "Grafische Darstellung von Empfehlungen für eine ausgewogene Ernährung, ein wichtiges Beratungsinstrument." },
            { term: "Nährstoffe", definition: "Die für den Körper notwendigen Bestandteile der Nahrung (Kohlenhydrate, Fette, Proteine, Vitamine, Mineralstoffe)." },
            { term: "Body-Mass-Index (BMI)", definition: "Masszahl zur Bewertung des Körpergewichts, die in der Beratung zur Einschätzung des Ernährungszustandes verwendet wird." },
        ],
        "HK F3: Gestalten des Alltags - Sexualität": [
            { term: "Sexualität", definition: "Ein umfassender Aspekt des Menschseins, der Geschlecht, Identität, sexuelle Orientierung, Erotik, Intimität und Fortpflanzung umfasst." },
            { term: "Sexuelle Entwicklung", definition: "Der lebenslange Prozess der Entwicklung der eigenen Sexualität." },
            { term: "Adoleszenz", definition: "Die Lebensphase des Jugendalters, eine prägende Zeit für die sexuelle Entwicklung." },
            { term: "sexuelle Orientierung", definition: "Emotionale, romantische und/oder sexuelle Anziehung zu anderen Personen (z.B. hetero-, homo-, bisexuell)." },
            { term: "Homosexualität", definition: "Sexuelle Orientierung, die auf Personen des gleichen Geschlechts ausgerichtet ist." },
            { term: "Bisexualität", definition: "Sexuelle Orientierung, die auf Personen beiderlei Geschlechts ausgerichtet ist." },
            { term: "Asexualität", definition: "Das Fehlen sexueller Anziehung zu anderen Personen." },
            { term: "Cissexualität", definition: "Bezeichnung für Menschen, deren Geschlechtsidentität mit dem bei der Geburt zugewiesenen Geschlecht übereinstimmt." },
            { term: "Transsexualität/Transidentität", definition: "Bezeichnung für Menschen, deren Geschlechtsidentität nicht mit dem bei der Geburt zugewiesenen Geschlecht übereinstimmt." },
            { term: "Intersexualität/Intergeschlechtlichkeit", definition: "Bezeichnung für Menschen, deren angeborene körperliche Geschlechtsmerkmale nicht eindeutig männlich oder weiblich sind." },
            { term: "Transgender", definition: "Überbegriff für Personen, die sich nicht mit dem bei der Geburt zugewiesenen Geschlecht identifizieren." },
            { term: "Queer", definition: "Sammelbegriff für Personen, deren sexuelle Orientierung oder Geschlechtsidentität von der heteronormativen Norm abweicht." },
            { term: "Nähe und Distanz", definition: "Die Regulation von körperlicher und emotionaler Nähe, die in der Pflege die Intimsphäre und sexuellen Grenzen respektieren muss." },
            { term: "Intimität", definition: "Ein Zustand tiefer Verbundenheit und Vertrautheit mit einer anderen Person." },
            { term: "öffentliche und intime Berührungszonen", definition: "Konzept zur Wahrung der Grenzen; intime Zonen dürfen nur mit ausdrücklicher Zustimmung berührt werden." },
            { term: "sexuelle Belästigung", definition: "Jedes sexuell bestimmte Verhalten, das von der betroffenen Person als unerwünscht und herabwürdigend empfunden wird." },
            { term: "sexueller Übergriff", definition: "Sexuelle Handlungen, die ohne oder gegen den Willen einer Person vorgenommen werden." },
            { term: "primäre Geschlechtsmerkmale", definition: "Angeborene Geschlechtsorgane (z.B. Penis, Hoden bzw. Vagina, Ovarien)." },
            { term: "sekundäre Geschlechtsmerkmale", definition: "Geschlechtsmerkmale, die sich in der Pubertät entwickeln (z.B. Bartwuchs, Brustwachstum)." },
            { term: "Chromosomen", definition: "Träger der Erbinformation; bestimmen das genetische Geschlecht (XX für weiblich, XY für männlich)." },
            { term: "Penis", definition: "Das männliche Glied." },
            { term: "Hoden (Testis)", definition: "Männliche Keimdrüsen, produzieren Spermien und Testosteron." },
            { term: "Prostata", definition: "Vorsteherdrüse, produziert einen Teil der Samenflüssigkeit." },
            { term: "Samenleiter", definition: "Transportiert die Spermien von den Nebenhoden zur Harnröhre." },
            { term: "Testosteron", definition: "Das wichtigste männliche Sexualhormon." },
            { term: "Sperma", definition: "Samenflüssigkeit, die die Spermien enthält." },
            { term: "Erektion", definition: "Die Versteifung des Penis." },
            { term: "Ejakulation", definition: "Der Samenerguss." },
            { term: "Vagina", definition: "Die Scheide." },
            { term: "Uterus", definition: "Die Gebärmutter." },
            { term: "Ovarien (Eierstöcke)", definition: "Weibliche Keimdrüsen, produzieren Eizellen und weibliche Hormone." },
            { term: "Eileiter (Tuben)", definition: "Transportieren die Eizelle vom Eierstock zur Gebärmutter; Ort der Befruchtung." },
            { term: "Östrogen und Progesteron", definition: "Die wichtigsten weiblichen Sexualhormone." },
            { term: "Menstruationszyklus", definition: "Der monatliche Zyklus der Frau, der zur Reifung einer Eizelle und zur Vorbereitung der Gebärmutter auf eine Schwangerschaft führt." },
        ],
    },
            
"Semester 5": {
    "HK A5: Umsetzung von Professionalität und Klientenzentrierung - Leistungserfassung": [
        { term: "Leistung", definition: "Eine erbrachte Tätigkeit oder Dienstleistung im Rahmen der Pflege." },
        { term: "Leistungserfassung", definition: "Systematische Dokumentation und Quantifizierung von erbrachten Pflegeleistungen zu Abrechnungs- und Planungszwecken." },
        { term: "BESA", definition: "Bewohner-Einstufungs- und Abrechnungssystem; ein System zur Erfassung des Pflegebedarfs in der Schweizer Langzeitpflege." },
        { term: "RAI", definition: "Resident Assessment Instrument; ein umfassendes Beurteilungsinstrument zur systematischen Erfassung des Zustands und der Bedürfnisse von Bewohnern in der Langzeitpflege." },
        { term: "LEP", definition: "Leistungserfassung Pflege; Methode zur detaillierten Erfassung und Auswertung von Pflegeleistungen nach einzelnen Tätigkeiten." },
        { term: "SwissDRG", definition: "Fallpauschalensystem zur Abrechnung von stationären Krankenhausleistungen in der Schweiz, bei dem pro Behandlungsfall eine Pauschale vergütet wird." }
    ],
    "HK C1: Pflege und Betreuung in anspruchsvollen Situationen - Notfallsituationen": [
        { term: "Alarmierungskonzept", definition: "Ein festgelegter Plan, der regelt, wie und wer im Notfall alarmiert wird." },
        { term: "Notfallnummern", definition: "Wichtige Telefonnummern für den Notfall (z.B. 144 für die Ambulanz, interne Notrufnummern)." },
        { term: "Notfallkonzept", definition: "Ein Plan, der das Vorgehen und die Zuständigkeiten in verschiedenen Notfallsituationen regelt." },
        { term: "Verbrennung", definition: "Gewebeschädigung durch übermässige Hitzeeinwirkung, Strahlung oder Chemikalien." },
        { term: "Verbrennungsgrade", definition: "Einteilung der Verbrennung nach ihrer Tiefe und dem Ausmass der Gewebeschädigung (Grad 1, 2a, 2b, 3, 4)." },
        { term: "Herzstillstand", definition: "Plötzliches Aufhören der mechanischen Herzaktion, führt zum Kreislaufstillstand." },
        { term: "Hypovolämischer Schock", definition: "Lebensbedrohlicher Zustand durch massiven Flüssigkeits- oder Blutverlust, der zu unzureichender Organperfusion führt." },
        { term: "Hypoglykämie", definition: "Unterzuckerung, ein zu niedriger Blutzuckerspiegel, der zu einem Notfall führen kann." },
        { term: "Epilepsie", definition: "Chronische Erkrankung des Gehirns, die durch wiederkehrende, unprovozierte epileptische Anfälle gekennzeichnet ist." },
        { term: "epileptischer Anfall", definition: "Eine vorübergehende Funktionsstörung des Gehirns durch plötzliche, übermässige elektrische Entladungen von Nervenzellen." },
        { term: "Defibrillator", definition: "Gerät zur Behandlung von lebensbedrohlichen Herzrhythmusstörungen (Kammerflimmern) durch elektrische Impulse." },
        { term: "Notfallmassnahmen", definition: "Unmittelbare Handlungen zur Abwendung lebensbedrohlicher Zustände und zur Versorgung von Verletzungen." },
        { term: "Reanimation", definition: "Wiederbelebungsmassnahmen bei Herz-Kreislauf-Stillstand (Herzdruckmassage, Beatmung)." },
        { term: "Schocklagerung", definition: "Lagerungsmassnahme bei Schockzuständen, bei der die Beine hochgelagert werden, um Blut ins Zentrum zu verlagern." },
        { term: "Thoraxkompression", definition: "Herzdruckmassage; rhythmische Kompressionen des Brustkorbs zur Aufrechterhaltung eines minimalen Blutkreislaufs." },
        { term: "Fremdkörperaspiration", definition: "Das Einatmen eines Fremdkörpers in die Atemwege, was zu Erstickungsgefahr führen kann." },
        { term: "Apnoe", definition: "Atemstillstand." }
    ],
    "HK C2: Pflege und Betreuung in anspruchsvollen Situationen - Sterbephasen": [
        { term: "Sterben", definition: "Der biologische und psychosoziale Prozess am Ende des Lebens, der zum Tod führt." },
        { term: "Sterbephasen", definition: "Modell (z.B. nach Kübler-Ross) zur Beschreibung emotionaler Reaktionen im Sterbeprozess (Leugnen, Zorn, Verhandeln, Depression, Akzeptanz)." },
        { term: "Sterbebegleitung", definition: "Umfassende, lindernde und unterstützende Betreuung eines sterbenden Menschen und seiner Angehörigen." },
        { term: "Verlust", definition: "Das Erleben des Endes einer Beziehung, des Verlusts von Fähigkeiten oder des nahenden Lebensendes." },
        { term: "Trauer", definition: "Die normale emotionale Reaktion auf einen bedeutenden Verlust." },
        { term: "Tod", definition: "Das endgültige Erlöschen aller Lebensfunktionen." },
        { term: "Angehörigenbegleitung", definition: "Die Unterstützung und Betreuung der Familie und nahestehenden Personen eines sterbenden oder verstorbenen Menschen." },
        { term: "verstorbene Menschen", definition: "Die pflegerische Versorgung und der würdevolle Umgang mit dem Körper nach dem Tod (postmortale Pflege)." },
        { term: "Testament", definition: "Eine letztwillige Verfügung, in der eine Person die Verteilung ihres Vermögens nach dem Tod regelt." },
        { term: "Patientenverfügung", definition: "Schriftliche Willenserklärung für medizinische Behandlungen im Falle eigener Entscheidungsunfähigkeit." },
        { term: "eigene Grenzen", definition: "Die persönliche Belastbarkeit und die Grenzen der eigenen emotionalen und physischen Ressourcen in der Auseinandersetzung mit Sterben und Tod." },
        { term: "Euthanasie", definition: "Umgangssprachlich 'Sterbehilfe'; umfasst verschiedene Handlungen zur Lebensbeendigung und wird rechtlich und ethisch differenziert (z.B. aktive, passive, indirekte Sterbehilfe)." },
        { term: "Ethik", definition: "Die Reflexion über moralische Fragen am Lebensende, wie z.B. Therapiezieländerung oder Behandlungsabbruch." },
        { term: "kurativ", definition: "Auf Heilung einer Krankheit ausgerichtet." },
        { term: "palliativ", definition: "Auf die Linderung von Symptomen und die Verbesserung der Lebensqualität bei unheilbaren Krankheiten ausgerichtet." }
    ],
    "HK C3: Pflege und Betreuung in anspruchsvollen Situationen - Abhängigkeit": [
        { term: "Abhängigkeit", definition: "Ein zwanghaftes Verlangen nach einer bestimmten Substanz oder einem bestimmten Verhalten, trotz negativer Konsequenzen." },
        { term: "Sucht", definition: "Umgangssprachlicher, oft stigmatisierender Begriff für Abhängigkeit." },
        { term: "Abhängigkeitsspirale", definition: "Modell, das die fortschreitende Entwicklung einer Abhängigkeit von Genuss über Gewöhnung bis hin zur Sucht beschreibt." },
        { term: "psychische Entzugssymptome", definition: "Seelische Symptome beim Absetzen einer Substanz, wie z.B. Unruhe, Angst, Depression, Schlafstörungen." },
        { term: "physische Entzugssymptome", definition: "Körperliche Symptome beim Absetzen einer Substanz, wie z.B. Zittern, Schwitzen, Schmerzen, Krampfanfälle." },
        { term: "Konflikttrinker", definition: "Person, die Alkohol zur Bewältigung von Problemen und Konflikten konsumiert." },
        { term: "Gelegenheitstrinker", definition: "Person, die Alkohol in sozialen Situationen und in Massen konsumiert." },
        { term: "Süchtiger Trinker", definition: "Person mit Kontrollverlust, Toleranzentwicklung und Entzugserscheinungen bei Alkoholkonsum." },
        { term: "Gewohnheitstrinker", definition: "Person, die regelmässig und aus Gewohnheit Alkohol trinkt, oft um eine bestimmte Wirkung zu erzielen." },
        { term: "Episodischer Trinker", definition: "Person, die phasenweise exzessiv Alkohol konsumiert, aber auch längere abstinente Phasen hat (Quartalssäufer)." },
        { term: "Medikamentenabhängigkeit", definition: "Abhängigkeit von psychoaktiven Medikamenten (z.B. Schlafmittel, Beruhigungsmittel, starke Schmerzmittel)." },
        { term: "Drogenabhängigkeit", definition: "Abhängigkeit von illegalen psychoaktiven Substanzen." },
        { term: "Opioide", definition: "Substanzgruppe mit stark schmerzlindernder und euphorisierender Wirkung und hohem Abhängigkeitspotenzial (z.B. Heroin, Morphin)." },
        { term: "Cannabinoid", definition: "Wirkstoffe der Hanfpflanze (Cannabis) mit berauschender Wirkung." },
        { term: "Sedativa/Hypnotika", definition: "Beruhigungs- und Schlafmittel." },
        { term: "Kokain", definition: "Ein starkes Stimulans mit aufputschender Wirkung und hohem psychischem Abhängigkeitspotenzial." },
        { term: "Stimulantien", definition: "Substanzen, die anregend und aufputschend wirken (z.B. Amphetamine, Kokain)." },
        { term: "Halluzinogene", definition: "Substanzen, die intensive Wahrnehmungsveränderungen (Halluzinationen) hervorrufen (z.B. LSD, Psilocybin)." },
        { term: "nichtsubstanzgebundene Abhängigkeit", definition: "Verhaltenssüchte, bei denen das zwanghafte Verhalten im Mittelpunkt steht (z.B. Spielsucht, Kaufsucht)." },
        { term: "substanzgebundene Abhängigkeit", definition: "Abhängigkeit von psychoaktiven Substanzen (z.B. Alkohol, Drogen, Medikamente)." },
        { term: "Entzug", definition: "Der Prozess des Absetzens oder der Reduzierung einer suchterzeugenden Substanz." },
        { term: "Entzugssyndrom", definition: "Die Gesamtheit der körperlichen und psychischen Symptome, die beim Entzug auftreten." },
        { term: "Alkoholdelir", definition: "Eine lebensbedrohliche Komplikation des Alkoholentzugs mit Verwirrtheit, Halluzinationen und vegetativen Störungen." },
        { term: "Anorexia nervosa", definition: "Magersucht; eine Essstörung mit starkem selbstverursachtem Gewichtsverlust und einer Körperschemastörung." },
        { term: "Bulimia nervosa", definition: "Ess-Brech-Sucht; eine Essstörung mit wiederkehrenden Heisshungeranfällen und gegensteuernden Massnahmen (z.B. Erbrechen)." },
        { term: "Binge-Eating-Disorder", definition: "Essstörung mit wiederkehrenden Heisshungeranfällen ohne gegensteuernde Massnahmen." },
        { term: "Abusus", definition: "Schädlicher Gebrauch oder Missbrauch einer Substanz." }
    ],
    "HK C4: Pflege und Betreuung in anspruchsvollen Situationen - Palliative Situation": [
        { term: "Palliative Care", definition: "Umfassende Betreuung zur Verbesserung der Lebensqualität von Patienten und ihren Familien bei unheilbaren, fortschreitenden Krankheiten." },
        { term: "Symptommanagement", definition: "Systematische Erfassung und Behandlung belastender Symptome wie Schmerz, Atemnot oder Übelkeit in der Palliative Care." },
        { term: "Patientenverfügung", definition: "Schriftliche Willenserklärung, mit der eine Person im Voraus festlegt, welche medizinischen Massnahmen sie wünscht oder ablehnt, falls sie entscheidungsunfähig wird." },
        { term: "Vorsorgeauftrag", definition: "Dokument, mit dem eine handlungsfähige Person eine andere Person beauftragt, im Falle ihrer Urteilsunfähigkeit die Personen- und/oder Vermögenssorge zu übernehmen." },
        { term: "kurativ", definition: "Auf Heilung einer Krankheit ausgerichtet." },
        { term: "palliativ", definition: "Auf die Linderung von Symptomen und die Verbesserung der Lebensqualität ausgerichtet, wenn Heilung nicht mehr möglich ist." },
        { term: "Lebensqualität", definition: "Das subjektive Wohlbefinden einer Person in verschiedenen Lebensbereichen; das zentrale Ziel der Palliative Care." },
        { term: "Hoffnungslosigkeit", definition: "Ein Zustand des Verzweifelns und der Perspektivlosigkeit, der in palliativen Situationen auftreten kann." },
        { term: "ethische Entscheidungsfindung", definition: "Der Prozess des Abwägens von Werten und Prinzipien, um in moralisch schwierigen Situationen am Lebensende zu einer guten Entscheidung zu kommen." },
        { term: "Fatique", definition: "Eine aussergewöhnliche, lähmende Müdigkeit und Erschöpfung, die sich durch Schlaf nicht bessert; ein häufiges Symptom in der Onkologie und Palliative Care." },
        { term: "Dyspnoe", definition: "Subjektiv empfundene Atemnot; ein sehr belastendes Symptom am Lebensende." },
        { term: "Schmerzen", definition: "Ein häufiges und belastendes Symptom, dessen konsequente Behandlung in der Palliative Care oberste Priorität hat." },
        { term: "Angst", definition: "Ein häufiges Gefühl in palliativen Situationen, z.B. Angst vor Schmerzen, dem Sterben oder dem Alleinsein." },
        { term: "Schlafstörungen", definition: "Ein- und Durchschlafprobleme, die die Lebensqualität stark beeinträchtigen und behandelt werden müssen." }
    ],
    "HK F3: Gestalten des Alltags - Sexuell übertragbare Krankheiten": [
        { term: "Geschlechtskrankheiten", definition: "Sexuell übertragbare Infektionen (STI); Krankheiten, die hauptsächlich durch sexuellen Kontakt übertragen werden." },
        { term: "Chlamydien", definition: "Eine häufige, bakteriell verursachte STI, die oft symptomlos verläuft, aber zu Unfruchtbarkeit führen kann." },
        { term: "Gonorrhö", definition: "Tripper; eine bakteriell verursachte STI, die zu Entzündungen der Harn- und Geschlechtsorgane führt." },
        { term: "HI-Viren (HIV)", definition: "Humanes Immundefizienz-Virus; ein Virus, das die T-Helferzellen des Immunsystems zerstört und unbehandelt zu AIDS führt." },
        { term: "AIDS", definition: "Acquired Immune Deficiency Syndrome; das fortgeschrittene Stadium einer HIV-Infektion mit Auftreten von schweren, lebensbedrohlichen Infektionen und Tumoren." },
        { term: "Bakterien", definition: "Einzellige Mikroorganismen, von denen einige STIs verursachen (z.B. Chlamydien, Gonokokken); können mit Antibiotika behandelt werden." },
        { term: "Viren", definition: "Kleinste Krankheitserreger, die sich nur in lebenden Zellen vermehren können (z.B. HIV, Herpes); werden mit Virostatika behandelt." },
        { term: "Antibiotika", definition: "Medikamente, die gegen bakterielle Infektionen wirksam sind." },
        { term: "Virostatika", definition: "Medikamente, die die Vermehrung von Viren hemmen." },
        { term: "Impfungen", definition: "Können vor einigen STIs schützen, z.B. die HPV-Impfung vor Gebärmutterhalskrebs." },
        { term: "Schleimhaut", definition: "Die feuchte Haut, die Hohlorgane wie Mund, Vagina und Harnröhre auskleidet; eine häufige Eintrittspforte für STI-Erreger." },
        { term: "Urogenitalbereich", definition: "Die Harn- und Geschlechtsorgane." },
        { term: "Gonokokken", definition: "Die Bakterienart, die Gonorrhö (Tripper) verursacht." },
        { term: "Ping-Pong-Effekt", definition: "Die gegenseitige Wiederansteckung von Sexualpartnern, wenn nicht beide gleichzeitig behandelt werden." },
        { term: "T-Lymphozyten", definition: "Spezifische weisse Blutkörperchen (T-Helferzellen), die für die Steuerung der Immunabwehr zentral sind und von HIV befallen werden." }
    ]
}
};

 // Binde alle Methoden an die `this`-Instanz
    this.startNewGame = this.startNewGame.bind(this);
    this.showScreen = this.showScreen.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.populateSemesterSelect = this.populateSemesterSelect.bind(this);
    this.populateHkSelect = this.populateHkSelect.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleSubmitPlayers = this.handleSubmitPlayers.bind(this);
    this.initializeGameWithCurrentPlayers = this.initializeGameWithCurrentPlayers.bind(this);
    this.displayPlayerCards = this.displayPlayerCards.bind(this);
    this.determineStartingPlayer = this.determineStartingPlayer.bind(this);
    this.updatePlayerNameInputs = this.updatePlayerNameInputs.bind(this);
    this.populatePlayerCountSelect = this.populatePlayerCountSelect.bind(this);
    
    // Event Listeners - Werden nur EINMALIG hier gesetzt
    this.semesterSelect.addEventListener('change', (event) => this.populateHkSelect(event.target.value));
    this.startGameBtn.addEventListener('click', this.handleStartGame);
    this.backToStartBtn.addEventListener('click', () => this.showScreen('start'));
    this.playerCountSelect.addEventListener('change', this.updatePlayerNameInputs);
    this.submitPlayersBtn.addEventListener('click', this.handleSubmitPlayers);
    this.proceedToGameBtn.addEventListener('click', () => {
        this.showScreen('game');
        this.determineStartingPlayer();
    });
    this.newGameBtn.addEventListener('click', this.startNewGame);
    this.replaySamePlayersBtn.addEventListener('click', () => {
        if (this.playerNamesForReplay.length > 0) {
            this.showScreen('roleReveal');
            this.initializeGameWithCurrentPlayers();
            this.displayPlayerCards();
        }
    });
    this.revealBtn.addEventListener('click', () => {
        if (this.players.length > 0 && this.imposterIndex !== -1 && this.currentWord.term !== '') {
            const imposterPlayer = this.players[this.imposterIndex];
            this.imposterWasText.textContent = `Der Imposter war: ${imposterPlayer.name}`;
            this.wordWasText.textContent = `Der Begriff war: ${this.currentWord.term}`;
            this.revealInfoDiv.classList.remove('hidden');
            this.revealBtn.classList.add('hidden');
            this.replaySamePlayersBtn.classList.remove('hidden');
        }
    });
}

// === Methoden des ImposterGame Objekts ===

ImposterGame.prototype.startNewGame = function() {
    // Setzt den Spielzustand komplett zurück
    this.players = [];
    this.playerNamesForReplay = [];
    this.currentWord = { term: '', definition: '' };
    this.imposterIndex = -1;
    this.rolesRevealedCount = 0;
    this.currentTermsList = [];
    this.playerNameInputsContainer.innerHTML = '';
    this.playerCardsContainer.innerHTML = '';
    
    // Setzt die UI zurück
    this.populateSemesterSelect();
    this.showScreen('start');
};

ImposterGame.prototype.showScreen = function(screenName) {
    Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
    if (this.screens[screenName]) {
        this.screens[screenName].classList.remove('hidden');
    }
    if (screenName === 'game' || screenName === 'roleReveal') {
        this.revealInfoDiv.classList.add('hidden');
        this.revealBtn.classList.remove('hidden');
        this.replaySamePlayersBtn.classList.add('hidden');
    }
     if (screenName === 'start') {
        this.hkSelectContainer.classList.add('hidden');
        this.hkSelect.innerHTML = '';
    }
};

ImposterGame.prototype.showMessage = function(message, duration = 3000) {
    this.messageText.textContent = message;
    this.messageBox.classList.remove('hidden');
    this.messageBox.classList.add('fade-in-out');
    setTimeout(() => {
        this.messageBox.classList.add('hidden');
        this.messageBox.classList.remove('fade-in-out');
    }, duration);
};

ImposterGame.prototype.populateSemesterSelect = function() {
    this.semesterSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = "Zufall";
    defaultOption.textContent = "Zufall (Alle Semester)";
    this.semesterSelect.appendChild(defaultOption);

    Object.keys(this.termsBySemester).forEach(semesterKey => {
        const option = document.createElement('option');
        option.value = semesterKey;
        option.textContent = semesterKey;
        this.semesterSelect.appendChild(option);
    });
    this.populateHkSelect(this.semesterSelect.value);
};

ImposterGame.prototype.populateHkSelect = function(selectedSemester) {
    this.hkSelect.innerHTML = '';
    if (selectedSemester === "Zufall" || !this.termsBySemester[selectedSemester]) {
        this.hkSelectContainer.classList.add('hidden');
        return;
    }

    this.hkSelectContainer.classList.remove('hidden');

    const allHkOption = document.createElement('option');
    allHkOption.value = "Alle_HKs";
    allHkOption.textContent = "Alle HKs dieses Semesters";
    this.hkSelect.appendChild(allHkOption);

    const semesterData = this.termsBySemester[selectedSemester];
    Object.keys(semesterData).forEach(hkKey => {
        const option = document.createElement('option');
        option.value = hkKey;
        option.textContent = hkKey;
        this.hkSelect.appendChild(option);
    });
};

ImposterGame.prototype.handleStartGame = function() {
    const selectedSemesterValue = this.semesterSelect.value;
    const selectedHkValue = this.hkSelect.value;
    this.currentTermsList = [];

    if (selectedSemesterValue === "Zufall") {
        Object.values(this.termsBySemester).forEach(semesterHks => {
            Object.values(semesterHks).forEach(hkTerms => this.currentTermsList.push(...hkTerms));
        });
    } else if (this.termsBySemester[selectedSemesterValue]) {
        const semesterHks = this.termsBySemester[selectedSemesterValue];
        if (selectedHkValue === "Alle_HKs" || !selectedHkValue) {
             Object.values(semesterHks).forEach(hkTerms => this.currentTermsList.push(...hkTerms));
        } else if (semesterHks[selectedHkValue]) {
            this.currentTermsList = [...semesterHks[selectedHkValue]];
        }
    }

    if (this.currentTermsList.length === 0) {
        this.showMessage("Keine Begriffe für die Auswahl gefunden.");
        return;
    }
    
    this.playerNamesForReplay = [];
    this.showScreen('playerSetup');
    this.populatePlayerCountSelect();
    this.updatePlayerNameInputs();
};

ImposterGame.prototype.handleSubmitPlayers = function() {
    const numPlayers = parseInt(this.playerCountSelect.value);
    const names = [];
    for (let i = 0; i < numPlayers; i++) {
        const input = document.getElementById(`playerName${i}`);
        if (input.value.trim() === '') {
            this.showMessage("Bitte gib allen Spielern einen Namen.");
            return;
        }
        names.push(input.value.trim());
    }
    if (new Set(names).size !== names.length) {
        this.showMessage("Spielernamen müssen eindeutig sein.");
        return;
    }
    
    this.playerNamesForReplay = [...names];
    this.showScreen('roleReveal');
    this.initializeGameWithCurrentPlayers();
    this.displayPlayerCards();
};

ImposterGame.prototype.initializeGameWithCurrentPlayers = function() {
    this.players = [];
    this.currentWord = this.currentTermsList[Math.floor(Math.random() * this.currentTermsList.length)];
    this.imposterIndex = Math.floor(Math.random() * this.playerNamesForReplay.length);
    this.rolesRevealedCount = 0;
    
    this.proceedToGameBtn.classList.add('hidden');

    this.playerNamesForReplay.forEach((name, index) => {
        this.players.push({
            name: name,
            isImposter: index === this.imposterIndex,
            roleRevealed: false 
        });
    });
};

ImposterGame.prototype.displayPlayerCards = function() {
    this.playerCardsContainer.innerHTML = '';
    this.players.forEach((player, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card h-48';
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
            cardBack.innerHTML = `<span class="font-semibold text-xl">${this.currentWord.term}</span><div class="mt-2 text-lg opacity-80 cursor-help relative group">❓ Definition<div class="definition-tooltip absolute hidden group-hover:block bg-slate-700 text-white text-sm rounded-lg p-3 shadow-xl whitespace-normal text-left">${this.currentWord.definition}</div></div>`;
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
            this.rolesRevealedCount++;
            if (this.rolesRevealedCount === this.players.length) {
                this.proceedToGameBtn.classList.remove('hidden');
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
        this.playerCardsContainer.appendChild(cardContainer);
    });
};

ImposterGame.prototype.determineStartingPlayer = function() {
    const crewmates = this.players.filter(p => !p.isImposter);
    const startingPlayer = crewmates.length > 0
        ? crewmates[Math.floor(Math.random() * crewmates.length)]
        : this.players[Math.floor(Math.random() * this.players.length)];
    this.startingPlayerText.textContent = `${startingPlayer.name} beginnt mit dem ersten Hinweis!`;
};

ImposterGame.prototype.populatePlayerCountSelect = function() {
    this.playerCountSelect.innerHTML = '';
    for (let i = 2; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Spieler`;
        this.playerCountSelect.appendChild(option);
    }
    this.playerCountSelect.value = Math.min(8, Math.max(2, this.playerNamesForReplay.length > 0 ? this.playerNamesForReplay.length : 4)).toString();
};

ImposterGame.prototype.updatePlayerNameInputs = function() {
    const numPlayers = parseInt(this.playerCountSelect.value);
    this.playerNameInputsContainer.innerHTML = '';
    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `playerName${i}`;
        input.value = this.playerNamesForReplay[i] || '';
        input.placeholder = `Name Spieler ${i + 1}`;
        input.className = 'w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg';
        this.playerNameInputsContainer.appendChild(input);
    }
};

// === STARTPUNKT ===
// Erstelle eine neue Spiel-Instanz und starte sie.
// Dieser Code wird jedes Mal ausgeführt, wenn imposter.js geladen wird.
window.ImposterGame = ImposterGame;
