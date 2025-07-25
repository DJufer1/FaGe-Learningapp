// =================================================================
// === RECHENTRAINER.JS - FINALE VERSION (INSTANCE MODE) - TEIL 1 ===
// =================================================================

const rechentrainerSketch = (p) => {

    // --- Globale Variablen für diesen Sketch ---
    let currentAppState = 'menu';
    let currentMainCategory = null;
    let currentDifficulty = null;
    let currentTask = null;
    let deferredPrompt;

    // --- Referenzen zu HTML Elementen ---
    let mainNavDiv, categorySelectionDiv, difficultySelectionDiv, taskControlsDiv, explanationSectionDiv, canvasHolder, selectedCategoryNameSpan, taskCategoryDifficultySpan, scenarioArea, questionArea, inputAnswer, inputUnitSpan, btnCheck, feedbackArea, solutionArea, btnNextTask, explanationSelectionArea, explanationContentArea, explanationContentTitle, explanationContentBody, btnBackFromContent, btnShowExplanation;

    // --- DATENBANKEN UND KONSTANTEN ---
    const mainCategoryMapping = {
        medikamente: ['dosage_liquid', 'tablets', 'dosage_percent', 'dosage_drops'],
        infusionen: ['infusion_drip', 'infusion_rate', 'infusion_duration'],
        sauerstoff: ['oxygen_content', 'oxygen_duration']
    };
    const mainCategoryDisplayNames = {
        medikamente: "Medikamente",
        infusionen: "Infusionen",
        sauerstoff: "Sauerstoffverabreichung"
    };
    const taskToExplanationMap = {
        'dosage_liquid': { category: 'medikamente', type: 'med_mg_ml' },
        'tablets': { category: 'medikamente', type: 'med_mg_ml' },
        'dosage_percent': { category: 'medikamente', type: 'med_percent' },
        'dosage_drops': { category: 'medikamente', type: 'med_ml_tropf' },
        'infusion_drip': { category: 'infusionen', type: 'inf_rate_conv' },
        'infusion_rate': { category: 'infusionen', type: 'inf_rate_conv' },
        'infusion_duration': { category: 'infusionen', type: 'inf_duration' },
        'oxygen_content': { category: 'o2', type: 'o2_content' },
        'oxygen_duration': { category: 'o2', type: 'o2_duration' }
    };
    const tasksDatabase = {
        dosage_liquid: {
            name: "Dosierung (flüssig)",
            unit: "ml",
            levels: {
                grundlagen: [{
                    scenario: "Ein Patient benötigt ein Beruhigungsmittel.",
                    generate: () => {
                        const med = {
                            name: "Haldol",
                            concentration: 2
                        };
                        const volume = p.random([5, 10, 15]);
                        const totalMg = volume * med.concentration;
                        return {
                            question: `Sie richten <strong>${volume} ml ${med.name}</strong> mit der Dosierung <strong>${med.concentration} mg/ml</strong>.<br>Wie viele mg ${med.name} haben Sie vorbereitet?`,
                            answer: totalMg,
                            solution: `${volume} ml &times; ${med.concentration} mg/ml = <strong>${totalMg} mg</strong>`,
                            unit: 'mg'
                        };
                    }
                }, {
                    scenario: "Ein Patient benötigt ein Schmerzmittel.",
                    generate: () => {
                        const med = {
                            name: "Voltaren",
                            concentration: 25
                        };
                        const totalMg = p.random([25, 50, 75]);
                        const volume = roundToDecimal(totalMg / med.concentration, 2);
                        return {
                            question: `Sie müssen <strong>${totalMg} mg ${med.name}</strong> vorbereiten.<br>Die Lösung hat <strong>${med.concentration} mg/ml</strong>.<br>Wie viele ml müssen Sie vorbereiten?`,
                            answer: volume,
                            solution: `${totalMg} mg / ${med.concentration} mg/ml = <strong>${volume} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }, {
                    scenario: "Ein Kind bekommt Fiebersaft.",
                    generate: () => {
                        const med = {
                            name: "Dafalgan Sirup",
                            concentration: 32
                        };
                        const volume = p.random([2.5, 5]);
                        const totalMg = volume * med.concentration;
                        return {
                            question: `Sie geben <strong>${volume} ml ${med.name}</strong> Sirup (<strong>${med.concentration} mg/ml</strong>).<br>Wie viele mg Wirkstoff sind das?`,
                            answer: totalMg,
                            solution: `${volume} ml &times; ${med.concentration} mg/ml = <strong>${totalMg} mg</strong>`,
                            unit: 'mg'
                        };
                    }
                }, {
                    scenario: "Vorbereitung einer Injektion.",
                    generate: () => {
                        const med = {
                            name: "Haldol Lösung",
                            concentration: 5
                        };
                        const totalMg = p.random([5, 10, 15, 20]);
                        const volume = roundToDecimal(totalMg / med.concentration, 1);
                        return {
                            question: `Sie sollen <strong>${totalMg} mg ${med.name}</strong> i.m. spritzen.<br>Die Lösung hat <strong>${med.concentration} mg/ml</strong>.<br>Wie viele ml ziehen Sie auf?`,
                            answer: volume,
                            solution: `${totalMg} mg / ${med.concentration} mg/ml = <strong>${volume} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Gewichtsbasiertes Medikament für Erwachsene.",
                    generate: () => {
                        const med = {
                            name: "Medikament Z",
                            concentration: 50
                        };
                        const weight = p.random([60, 70, 75, 80]);
                        const dosePerKg = p.random([2, 3]);
                        const totalDoseMg = weight * dosePerKg;
                        const volumeMl = roundToDecimal(totalDoseMg / med.concentration, 2);
                        return {
                            question: `Ein ${weight} kg schwerer Patient benötigt ${dosePerKg} mg/kg KG von ${med.name}.<br>Die Lösung hat <strong>${med.concentration} mg/ml</strong>.<br>Wie viele ml müssen Sie vorbereiten?`,
                            answer: volumeMl,
                            solution: `Gesamtdosis: ${weight} kg &times; ${dosePerKg} mg/kg = ${totalDoseMg} mg<br>Volumen: ${totalDoseMg} mg / ${med.concentration} mg/ml = <strong>${volumeMl} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }, {
                    scenario: "Umrechnung von Gramm nach Milliliter.",
                    generate: () => {
                        const med = {
                            name: "Wirkstoff A",
                            concentration: 25
                        };
                        const doseG = p.random([0.1, 0.15, 0.2]);
                        const doseMg = doseG * 1000;
                        const volumeMl = roundToDecimal(doseMg / med.concentration, 1);
                        return {
                            question: `Verordnet sind <strong>${doseG} g ${med.name}</strong>.<br>Die verfügbare Lösung hat <strong>${med.concentration} mg/ml</strong>.<br>Wie viele ml benötigen Sie?`,
                            answer: volumeMl,
                            solution: `Umrechnung: ${doseG} g = ${doseMg} mg<br>Volumen: ${doseMg} mg / ${med.concentration} mg/ml = <strong>${volumeMl} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }, ]
            }
        },
        tablets: {
            name: "Tabletten",
            unit: "Tablette(n)",
            levels: {
                grundlagen: [{
                    scenario: "Ein Patient nimmt ein Schlafmittel.",
                    generate: () => {
                        const med = {
                            name: "Temesta",
                            strength: 1
                        };
                        const dose = p.random([0.5, 1, 1.5, 2]);
                        const tabs = roundToDecimal(dose / med.strength, 1);
                        return {
                            question: `Verordnet sind <strong>${dose} mg ${med.name}</strong>.<br>Verfügbar sind <strong>${med.strength} mg</strong> Tabletten (teilbar).<br>Wie viele Tabletten geben Sie?`,
                            answer: tabs,
                            solution: `${dose} mg / ${med.strength} mg/Tbl. = <strong>${tabs} Tbl.</strong>`,
                            unit: 'Tablette(n)'
                        };
                    }
                }, {
                    scenario: "Ein Patient hat Schmerzen.",
                    generate: () => {
                        const med = {
                            name: "Dafalgan",
                            strength: 500
                        };
                        const dose = p.random([500, 1000]);
                        const tabs = roundToDecimal(dose / med.strength, 1);
                        return {
                            question: `Verordnet sind <strong>${dose} mg ${med.name}</strong>.<br>Verfügbar sind <strong>${med.strength} mg</strong> Tabletten.<br>Wie viele Tabletten geben Sie?`,
                            answer: tabs,
                            solution: `${dose} mg / ${med.strength} mg/Tbl. = <strong>${tabs} Tbl.</strong>`,
                            unit: 'Tablette(n)'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Umrechnung von Gramm bei Tablettengabe.",
                    generate: () => {
                        const med = {
                            name: "Dafalgan",
                            strength: 500
                        };
                        const doseG = p.random([1, 1.5]);
                        const doseMg = doseG * 1000;
                        const tabs = roundToDecimal(doseMg / med.strength, 1);
                        return {
                            question: `Ein Patient soll <strong>${doseG} g ${med.name}</strong> erhalten.<br>Sie haben Tabletten à <strong>${med.strength} mg</strong>.<br>Wie viele Tabletten verabreichen Sie?`,
                            answer: tabs,
                            solution: `Umrechnung: ${doseG} g = ${doseMg} mg<br>Anzahl: ${doseMg} mg / ${med.strength} mg/Tbl. = <strong>${tabs} Tbl.</strong>`,
                            unit: 'Tablette(n)'
                        };
                    }
                }, {
                    scenario: "Bedarf für mehrere Tage berechnen.",
                    generate: () => {
                        const med = {
                            name: "Temesta",
                            strength: 1
                        };
                        const dailyDoseMg = p.random([1.5, 2, 2.5]);
                        const days = p.random([3, 5, 7]);
                        const totalMg = dailyDoseMg * days;
                        const totalTabs = roundToDecimal(totalMg / med.strength, 1);
                        return {
                            question: `Ein Patient nimmt <strong>${dailyDoseMg} mg ${med.name}</strong> pro Tag für <strong>${days} Tage</strong>.<br>Sie haben <strong>${med.strength} mg</strong> Tabletten (teilbar).<br>Wie viele Tabletten braucht der Patient insgesamt?`,
                            answer: totalTabs,
                            solution: `Gesamtdosis: ${dailyDoseMg} mg/Tag &times; ${days} Tage = ${totalMg} mg<br>Gesamtzahl: ${totalMg} mg / ${med.strength} mg/Tbl. = <strong>${totalTabs} Tbl.</strong>`,
                            unit: 'Tablette(n)'
                        };
                    }
                }]
            }
        },
        dosage_percent: {
            name: "% Dosierung (z.B. NaCl g)",
            unit: "g",
            levels: {
                grundlagen: [{
                    scenario: "Berechnung der Salzmenge in einer Infusion.",
                    generate: () => {
                        const solution = {
                            name: "NaCl",
                            percent: 0.9
                        };
                        const volume = p.random([250, 500, 1000]);
                        const amountG = roundToDecimal((solution.percent / 100) * volume, 2);
                        return {
                            question: `Ein Infusionsbeutel enthält <strong>${volume} ml</strong> einer <strong>${solution.percent}% ${solution.name}</strong> Lösung.<br>Wie viel Gramm ${solution.name} sind enthalten?`,
                            answer: amountG,
                            solution: `(${solution.percent} / 100) * ${volume} ml = <strong>${amountG} g</strong>`,
                            unit: 'g'
                        };
                    }
                }, {
                    scenario: "Berechnung der Glukosemenge.",
                    generate: () => {
                        const solution = {
                            name: "Glukose",
                            percent: 5
                        };
                        const volume = p.random([100, 250, 500]);
                        const amountG = roundToDecimal((solution.percent / 100) * volume, 1);
                        return {
                            question: `Sie haben <strong>${volume} ml</strong> einer <strong>${solution.percent}% ${solution.name}</strong> Lösung.<br>Wie viel Gramm ${solution.name} sind darin?`,
                            answer: amountG,
                            solution: `(${solution.percent} / 100) * ${volume} ml = <strong>${amountG} g</strong>`,
                            unit: 'g'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Berechnung der Milligramm-Menge in einer Lösung.",
                    generate: () => {
                        const solution = {
                            name: "Glukose",
                            percent: p.random([5, 10])
                        };
                        const volume = p.random([250, 500]);
                        const amountG = roundToDecimal((solution.percent / 100) * volume, 1);
                        const amountMg = amountG * 1000;
                        return {
                            question: `In einem <strong>${volume} ml</strong> Beutel <strong>${solution.percent}% ${solution.name}</strong> Lösung,<br>wie viele <strong>Milligramm</strong> (mg) ${solution.name} sind enthalten?`,
                            answer: amountMg,
                            solution: `Gramm: (${solution.percent}/100) * ${volume}ml = ${amountG} g<br>Milligramm: ${amountG} g &times; 1000 = <strong>${amountMg} mg</strong>`,
                            unit: 'mg'
                        };
                    }
                }, {
                    scenario: "Benötigtes Volumen für eine bestimmte Salzmenge.",
                    generate: () => {
                        const solution = {
                            name: "NaCl",
                            percent: 0.9
                        };
                        const neededG = p.random([9, 13.5, 18]);
                        const volumeMl = roundToDecimal(neededG * 100 / solution.percent, 0);
                        return {
                            question: `Sie benötigen genau <strong>${neededG} g ${solution.name}</strong>.<br>Wie viele ml einer <strong>${solution.percent}% ${solution.name}</strong> Lösung müssen Sie verwenden?`,
                            answer: volumeMl,
                            solution: `Volumen = (${neededG} g &times; 100) / ${solution.percent} = <strong>${volumeMl} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }]
            }
        },
        dosage_drops: {
            name: "Dosierung (Tropfen)",
            unit: "gtts",
            levels: {
                grundlagen: [{
                    scenario: "Vorbereitung von Haldol Tropfen.",
                    generate: () => {
                        const med = {
                            name: "Haldol",
                            concentration: "2mg/ml"
                        };
                        const factor = 20;
                        const volume = p.random([5, 10, 15, 20]);
                        const drops = volume * factor;
                        return {
                            question: `Sie müssen <strong>${volume} ml ${med.name}</strong> (${med.concentration}) vorbereiten.<br>1 ml sind ${factor} gtts (Tropfen).<br>Wie viele Tropfen müssen Sie vorbereiten?`,
                            answer: drops,
                            solution: `${volume} ml &times; ${factor} gtts/ml = <strong>${drops} gtts</strong>`,
                            unit: 'gtts'
                        };
                    }
                }, {
                    scenario: "Kontrolle der vorbereiteten Tropfenmenge.",
                    generate: () => {
                        const med = {
                            name: "Novalgin",
                            concentration: "500mg/ml"
                        };
                        const factor = 20;
                        const drops = p.random([100, 160, 200, 300]);
                        const volume = roundToDecimal(drops / factor, 1);
                        return {
                            question: `Sie haben <strong>${drops} gtts ${med.name}</strong> (${med.concentration}) vorbereitet.<br>${factor} gtts sind 1 ml.<br>Wie viele ml haben Sie vorbereitet?`,
                            answer: volume,
                            solution: `${drops} gtts / ${factor} gtts/ml = <strong>${volume} ml</strong>`,
                            unit: 'ml'
                        };
                    }
                }, {
                    scenario: "Vorbereitung von Temesta Tropfen.",
                    generate: () => {
                        const med = {
                            name: "Temesta",
                            concentration: "2.5mg/ml"
                        };
                        const factor = 20;
                        const volume = p.random([1, 2, 2.5, 3]);
                        const drops = volume * factor;
                        return {
                            question: `Sie sollen <strong>${volume} ml ${med.name}</strong> (${med.concentration}) richten.<br>Der Tropfer gibt ${factor} gtts/ml.<br>Wie viele Tropfen sind das?`,
                            answer: drops,
                            solution: `${volume} ml &times; ${factor} gtts/ml = <strong>${drops} gtts</strong>`,
                            unit: 'gtts'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Tropfenanzahl für eine bestimmte Wirkstoffmenge berechnen.",
                    generate: () => {
                        const med = {
                            name: "Haldol",
                            concentration: 2
                        };
                        const doseMg = p.random([5, 10, 15]);
                        const factor = 20;
                        const volumeMl = roundToDecimal(doseMg / med.concentration, 2);
                        const drops = Math.round(volumeMl * factor);
                        return {
                            question: `Ein Patient soll <strong>${doseMg} mg ${med.name}</strong> erhalten.<br>Die Tropfen haben <strong>${med.concentration} mg/ml</strong> (1ml = ${factor} gtts).<br>Wie viele Tropfen geben Sie (gerundet)?`,
                            answer: drops,
                            solution: `Volumen: ${doseMg} mg / ${med.concentration} mg/ml = ${volumeMl} ml<br>Tropfen: ${volumeMl} ml &times; ${factor} gtts/ml = <strong>${drops} gtts</strong> (gerundet)`,
                            unit: 'gtts'
                        };
                    }
                }, {
                    scenario: "Wirkstoffmenge aus Tropfenanzahl berechnen.",
                    generate: () => {
                        const med = {
                            name: "Novalgin",
                            concentration: 500
                        };
                        const factor = 20;
                        const drops = p.random([15, 20, 25, 30]);
                        const volumeMl = roundToDecimal(drops / factor, 2);
                        const doseMg = Math.round(volumeMl * med.concentration);
                        return {
                            question: `Sie verabreichen <strong>${drops} gtts ${med.name}</strong> Tropfen.<br>Konzentration: <strong>${med.concentration} mg/ml</strong>, Tropfenfaktor: ${factor} gtts/ml.<br>Wie viele mg Wirkstoff sind das (ca.)?`,
                            answer: doseMg,
                            solution: `Volumen: ${drops} gtts / ${factor} gtts/ml = ${volumeMl} ml<br>Dosis: ${volumeMl} ml &times; ${med.concentration} mg/ml = <strong>${doseMg} mg</strong> (gerundet)`,
                            unit: 'mg'
                        };
                    }
                }]
            }
        },
        infusion_drip: {
            name: "Infusion (Tropf./min)",
            unit: "Trpf/min",
            levels: {
                grundlagen: [{
                    scenario: "Standard-Infusion einstellen.",
                    generate: () => {
                        const volumeMl = p.random([500, 1000]);
                        const timeH = p.random([4, 6, 8]);
                        const factor = 20;
                        const timeMin = timeH * 60;
                        const rate = Math.round((volumeMl * factor) / timeMin);
                        return {
                            question: `<strong>${volumeMl} ml</strong> Infusionslösung sollen über <strong>${timeH} Stunden</strong> laufen.<br>Der Tropfenfaktor ist ${factor} Trpf/ml.<br>Wie viele Tropfen pro Minute (Trpf/min) stellen Sie ein?`,
                            answer: rate,
                            solution: `Zeit: ${timeH} h = ${timeMin} min<br>Formel: (Volumen [ml] * Faktor [Trpf/ml]) / Zeit [min]<br>(${volumeMl} ml * ${factor} Trpf/ml) / ${timeMin} min = <strong>${rate} Trpf/min</strong> (gerundet)`,
                            unit: "Trpf/min"
                        };
                    }
                }, {
                    scenario: "Tropfenzahl aus Laufrate berechnen.",
                    generate: () => {
                        const rateMlH = p.random([60, 80, 100, 120, 150]);
                        const factor = 20;
                        const rate = Math.round((rateMlH * factor) / 60);
                        return {
                            question: `Eine Infusion läuft mit <strong>${rateMlH} ml/h</strong>.<br>Der Tropfenfaktor beträgt ${factor} Trpf/ml.<br>Berechnen Sie die Tropfgeschwindigkeit (Trpf/min).`,
                            answer: rate,
                            solution: `Formel: (Rate [ml/h] * Faktor [Trpf/ml]) / 60 [min/h]<br>(${rateMlH} ml/h * ${factor} Trpf/ml) / 60 min/h = <strong>${rate} Trpf/min</strong> (gerundet)`,
                            unit: "Trpf/min"
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Infusion über ungerade Zeit einstellen.",
                    generate: () => {
                        const volumeMl = p.random([250, 500]);
                        const timeH = p.random([3, 5, 7]);
                        const timeM_extra = p.random([15, 30, 45]);
                        const factor = 20;
                        const totalTimeMin = timeH * 60 + timeM_extra;
                        const rate = Math.round((volumeMl * factor) / totalTimeMin);
                        return {
                            question: `<strong>${volumeMl} ml</strong> Infusionslösung sollen über <strong>${timeH} Stunden und ${timeM_extra} Minuten</strong> laufen.<br>Tropfenfaktor: ${factor} Trpf/ml.<br>Wie viele Tropfen pro Minute (Trpf/min) sind das (gerundet)?`,
                            answer: rate,
                            solution: `Gesamtzeit: (${timeH} * 60) + ${timeM_extra} = ${totalTimeMin} min<br>(${volumeMl} ml * ${factor} Trpf/ml) / ${totalTimeMin} min = <strong>${rate} Trpf/min</strong> (gerundet)`,
                            unit: "Trpf/min"
                        };
                    }
                }, {
                    scenario: "Medikamenten-Infusion mit genauer Rate.",
                    generate: () => {
                        const rateMlH = p.random([42, 83, 105, 166]);
                        const factor = 20;
                        const rate = Math.round((rateMlH * factor) / 60);
                        return {
                            question: `Eine Perfusor-Pumpe läuft mit <strong>${rateMlH} ml/h</strong>.<br>Sie müssen die Tropfenzahl (TF ${factor} Trpf/ml) als Kontrolle einstellen.<br>Wie viele Trpf/min entspricht dies (gerundet)?`,
                            answer: rate,
                            solution: `(${rateMlH} ml/h * ${factor} Trpf/ml) / 60 min/h = <strong>${rate} Trpf/min</strong> (gerundet)`,
                            unit: "Trpf/min"
                        };
                    }
                }]
            }
        },
        infusion_rate: {
            name: "Infusion Ratenumrechnung",
            unit: "ml/h",
            levels: {
                grundlagen: [{
                    scenario: "Planung einer 24-Stunden-Infusion.",
                    generate: () => {
                        const volumeMl24 = p.random([1000, 1500, 2000, 2400, 3000]);
                        const rateMlH = roundToDecimal(volumeMl24 / 24, 1);
                        return {
                            question: `Ein Patient soll <strong>${volumeMl24} ml</strong> Flüssigkeit über 24 Stunden erhalten.<br>Wie hoch muss die Laufrate in ml/h sein?`,
                            answer: rateMlH,
                            solution: `${volumeMl24} ml / 24 h = <strong>${rateMlH} ml/h</strong>`,
                            unit: 'ml/h'
                        };
                    }
                }, {
                    scenario: "Umrechnung für die Dokumentation.",
                    generate: () => {
                        const rateMlH = p.random([60, 90, 120, 150]);
                        const rateMlMin = roundToDecimal(rateMlH / 60, 1);
                        return {
                            question: `Eine Infusionspumpe läuft mit <strong>${rateMlH} ml/h</strong>.<br>Wie viele ml pro Minute (ml/min) sind das?`,
                            answer: rateMlMin,
                            solution: `${rateMlH} ml/h / 60 min/h = <strong>${rateMlMin} ml/min</strong>`,
                            unit: 'ml/min'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Kurzinfusion vorbereiten.",
                    generate: () => {
                        const volumeMl = p.random([100, 250]);
                        const timeMin = p.random([30, 45, 60, 90]);
                        const rateMlH = Math.round((volumeMl * 60) / timeMin);
                        return {
                            question: `Sie sollen <strong>${volumeMl} ml</strong> eines Medikaments über <strong>${timeMin} Minuten</strong> infundieren.<br>Welche Laufrate (ml/h) stellen Sie an der Pumpe ein (gerundet)?`,
                            answer: rateMlH,
                            solution: `Zeit in h: ${timeMin} min / 60 min/h = ${roundToDecimal(timeMin/60, 2)} h<br>Rate: ${volumeMl} ml / ${roundToDecimal(timeMin/60, 2)} h = <strong>${rateMlH} ml/h</strong> (gerundet)<br><i>Oder: (${volumeMl} ml * 60 min/h) / ${timeMin} min = ${rateMlH} ml/h</i>`,
                            unit: 'ml/h'
                        };
                    }
                }, {
                    scenario: "Pumpenrate aus Tropfenzahl ermitteln.",
                    generate: () => {
                        const rateTrpfMin = p.random([15, 25, 33, 42]);
                        const factor = 20;
                        const rateMlH = Math.round((rateTrpfMin * 60) / factor);
                        return {
                            question: `Sie zählen eine Tropfgeschwindigkeit von <strong>${rateTrpfMin} Trpf/min</strong> (TF ${factor} Trpf/ml).<br>Welcher Laufrate in ml/h an einer Pumpe entspricht das ungefähr (gerundet)?`,
                            answer: rateMlH,
                            solution: `(${rateTrpfMin} Trpf/min * 60 min/h) / ${factor} Trpf/ml = <strong>${rateMlH} ml/h</strong> (gerundet)`,
                            unit: 'ml/h'
                        };
                    }
                }]
            }
        },
        infusion_duration: {
            name: "Infusion Dauer",
            unit: "h",
            levels: {
                grundlagen: [{
                    scenario: "Infusionswechsel planen.",
                    generate: () => {
                        const volumeMl = p.random([500, 1000]);
                        const rateMlH = p.random([50, 100, 125]);
                        const durationH = roundToDecimal(volumeMl / rateMlH, 1);
                        return {
                            question: `Ein <strong>${volumeMl} ml</strong> Infusionsbeutel läuft mit <strong>${rateMlH} ml/h</strong>.<br>Wie viele Stunden dauert die Infusion?`,
                            answer: durationH,
                            solution: `${volumeMl} ml / ${rateMlH} ml/h = <strong>${durationH} h</strong>`,
                            unit: 'h'
                        };
                    }
                }, {
                    scenario: "Dauer einer Kurzinfusion.",
                    generate: () => {
                        const volumeMl = 100;
                        const rateMlMin = p.random([1, 2, 4, 5]);
                        const durationMin = Math.round(volumeMl / rateMlMin);
                        return {
                            question: `<strong>${volumeMl} ml</strong> Antibiotikum sollen mit <strong>${rateMlMin} ml/min</strong> laufen.<br>Wie viele Minuten dauert die Infusion?`,
                            answer: durationMin,
                            solution: `${volumeMl} ml / ${rateMlMin} ml/min = <strong>${durationMin} min</strong>`,
                            unit: 'min'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Genaue Laufzeit berechnen.",
                    generate: () => {
                        const volumeMl = p.random([250, 500]);
                        const rateMlH = p.random([40, 60, 80, 110]);
                        const durationH_decimal = volumeMl / rateMlH;
                        const hours = Math.floor(durationH_decimal);
                        const minutes = Math.round((durationH_decimal - hours) * 60);
                        const answerH = roundToDecimal(durationH_decimal, 1);
                        return {
                            question: `Eine Infusion mit <strong>${volumeMl} ml</strong> läuft mit <strong>${rateMlH} ml/h</strong>.<br>Wie viele Stunden dauert sie (auf 1 Dezimalstelle runden)?`,
                            answer: answerH,
                            solution: `${volumeMl} ml / ${rateMlH} ml/h = ${durationH_decimal.toFixed(2)} h<br>Gerundet: <strong>${answerH} h</strong><br>(Das entspricht ${hours} Stunden und ${minutes} Minuten)`,
                            unit: 'h'
                        };
                    }
                }, {
                    scenario: "Laufzeit aus Tropfenzahl berechnen.",
                    generate: () => {
                        const volumeMl = p.random([500, 1000]);
                        const rateTrpfMin = p.random([25, 33, 42]);
                        const factor = 20;
                        const totalDrops = volumeMl * factor;
                        const durationMin = Math.round(totalDrops / rateTrpfMin);
                        const hours = Math.floor(durationMin / 60);
                        const minutes = durationMin % 60;
                        const durationFormatted = `${hours}h ${minutes}min`;
                        return {
                            question: `Ein <strong>${volumeMl} ml</strong> Beutel wird mit <strong>${rateTrpfMin} Trpf/min</strong> infundiert (TF ${factor} Trpf/ml).<br>Wie viele Minuten dauert die Infusion (gerundet)?`,
                            answer: durationMin,
                            solution: `Ges. Tropfen: ${volumeMl}ml * ${factor}Trpf/ml = ${totalDrops} Trpf<br>Dauer: ${totalDrops} Trpf / ${rateTrpfMin} Trpf/min = <strong>${durationMin} min</strong><br>(Das entspricht ${durationFormatted})`,
                            unit: 'min'
                        };
                    }
                }]
            }
        },
        oxygen_content: {
            name: "O2 Inhalt",
            unit: "L",
            levels: {
                grundlagen: [{
                    scenario: "Prüfen des Sauerstoffvorrats vor einem Einsatz.",
                    generate: () => {
                        const flaschenvolumenL = p.random([5, 10]);
                        const druckBar = p.random([100, 150, 200]);
                        const inhaltL = flaschenvolumenL * druckBar;
                        return {
                            question: `Eine <strong>${flaschenvolumenL} L</strong> O2-Flasche zeigt <strong>${druckBar} bar</strong> Druck.<br>Wie viele Liter O2 sind (ca.) verfügbar?`,
                            answer: inhaltL,
                            solution: `Formel: Inhalt (L) ≈ Flaschenvolumen (L) &times; Druck (bar)<br>${flaschenvolumenL} L &times; ${druckBar} bar = <strong>${inhaltL} L</strong>`,
                            unit: 'L'
                        };
                    }
                }, {
                    scenario: "Dokumentation des Flascheninhalts.",
                    generate: () => {
                        const flaschenvolumenL = p.random([2, 5]);
                        const druckBar = p.random([80, 100, 120]);
                        const inhaltL = flaschenvolumenL * druckBar;
                        return {
                            question: `Eine kleine <strong>${flaschenvolumenL} L</strong> O2-Flasche hat einen Druck von <strong>${druckBar} bar</strong>.<br>Berechnen Sie den ungefähren Inhalt in Litern.`,
                            answer: inhaltL,
                            solution: `${flaschenvolumenL} L &times; ${druckBar} bar = <strong>${inhaltL} L</strong>`,
                            unit: 'L'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "Berechnung des *verbleibenden nutzbaren* Sauerstoffs.",
                    generate: () => {
                        const flaschenvolumenL = p.random([5, 10, 12]);
                        const druckBar = p.random([75, 110, 135, 160]);
                        const restdruckBar = 10;
                        const nutzbarerDruck = druckBar - restdruckBar;
                        const nutzbarerInhaltL = Math.max(0, flaschenvolumenL * nutzbarerDruck);
                        return {
                            question: `Eine <strong>${flaschenvolumenL} L</strong> O2-Flasche zeigt <strong>${druckBar} bar</strong>.<br>Wie viele Liter O2 können Sie noch entnehmen, wenn ein Restdruck von ${restdruckBar} bar benötigt wird?`,
                            answer: nutzbarerInhaltL,
                            solution: `Nutzbarer Druck: ${druckBar} bar - ${restdruckBar} bar = ${nutzbarerDruck} bar<br>Nutzbarer Inhalt: ${flaschenvolumenL} L &times; ${nutzbarerDruck} bar = <strong>${nutzbarerInhaltL} L</strong>`,
                            unit: 'L'
                        };
                    }
                }, {
                    scenario: "Mindestdruck für benötigte Menge ermitteln.",
                    generate: () => {
                        const flaschenvolumenL = p.random([5, 10, 12, 15]);
                        const benoetigtL = p.random([800, 1000, 1250, 1500]);
                        const minDruckBar = Math.ceil(benoetigtL / flaschenvolumenL);
                        return {
                            question: `Sie benötigen mindestens <strong>${benoetigtL} L</strong> Sauerstoff für einen Transport.<br>Sie verwenden eine <strong>${flaschenvolumenL} L</strong> Flasche.<br>Welchen Mindestdruck (in bar) muss das Manometer anzeigen?`,
                            answer: minDruckBar,
                            solution: `Benötigter Druck = ${benoetigtL} L / ${flaschenvolumenL} L = ${roundToDecimal(benoetigtL/flaschenvolumenL,1)} bar<br>Mindestdruck (aufgerundet): <strong>${minDruckBar} bar</strong>`,
                            unit: 'bar'
                        };
                    }
                }]
            }
        },
        oxygen_duration: {
            name: "O2 Dauer",
            unit: "Minuten",
            levels: {
                grundlagen: [{
                    scenario: "Schnelle Abschätzung der O2-Reichweite.",
                    generate: () => {
                        const inhaltL = p.random([600, 800, 1000, 1200]);
                        const flussrateLM = p.random([2, 4, 5, 10]);
                        const dauerMin = Math.floor(inhaltL / flussrateLM);
                        return {
                            question: `Sie haben ca. <strong>${inhaltL} L</strong> Sauerstoff verfügbar.<br>Die Flussrate ist auf <strong>${flussrateLM} L/min</strong> eingestellt.<br>Wie viele Minuten reicht der Vorrat ungefähr?`,
                            answer: dauerMin,
                            solution: `Formel: Dauer (min) = Inhalt (L) / Flussrate (L/min)<br>${inhaltL} L / ${flussrateLM} L/min = <strong>${dauerMin} min</strong> (abgerundet)`,
                            unit: 'min'
                        };
                    }
                }, {
                    scenario: "Berechnung für eine kurze O2-Gabe.",
                    generate: () => {
                        const flaschenvolumenL = p.random([2, 5]);
                        const druckBar = p.random([100, 120, 150]);
                        const inhaltL = flaschenvolumenL * druckBar;
                        const flussrateLM = p.random([2, 4, 5, 10]);
                        const dauerMin = Math.floor(inhaltL / flussrateLM);
                        return {
                            question: `Eine <strong>${flaschenvolumenL} L</strong> Flasche mit <strong>${druckBar} bar</strong> (${inhaltL} L Inhalt) wird verwendet.<br>Flussrate: <strong>${flussrateLM} L/min</strong>.<br>Berechnen Sie die ungefähre Dauer in Minuten.`,
                            answer: dauerMin,
                            solution: `Inhalt: ${flaschenvolumenL}L &times; ${druckBar}bar = ${inhaltL}L<br>Dauer = ${inhaltL} L / ${flussrateLM} L/min = <strong>${dauerMin} min</strong> (abgerundet)`,
                            unit: 'min'
                        };
                    }
                }],
                fortgeschritten: [{
                    scenario: "O2 für einen längeren Transport planen (Stunden & Minuten).",
                    generate: () => {
                        const flaschenvolumenL = p.random([10, 12, 15]);
                        const druckBar = p.random([120, 150, 180, 195]);
                        const flussrateLM = p.random([3, 4, 6, 7, 8]);
                        const inhaltL = flaschenvolumenL * druckBar;
                        const dauerMin_exact = inhaltL / flussrateLM;
                        const dauerMin_safe = Math.floor(dauerMin_exact);
                        const hours = Math.floor(dauerMin_safe / 60);
                        const minutes = dauerMin_safe % 60;
                        const dauerFormatted = `${hours}h ${minutes}min`;
                        return {
                            question: `Eine <strong>${flaschenvolumenL} L</strong> Flasche hat <strong>${druckBar} bar</strong> Druck.<br>Die Flussrate beträgt <strong>${flussrateLM} L/min</strong>.<br>Wie lange reicht der Sauerstoff (Antwort in Minuten)?`,
                            answer: dauerMin_safe,
                            solution: `Inhalt: ${flaschenvolumenL}L * ${druckBar}bar = ${inhaltL} L<br>Dauer: ${inhaltL}L / ${flussrateLM}L/min = ${dauerMin_exact.toFixed(1)} min<br>Abgerundet: <strong>${dauerMin_safe} min</strong><br>Das entspricht: <strong>${dauerFormatted}</strong>`,
                            unit: 'min'
                        };
                    }
                }, {
                    scenario: "Maximale Flussrate für geplante Dauer.",
                    generate: () => {
                        const flaschenvolumenL = p.random([5, 10, 12]);
                        const druckBar = p.random([100, 130, 155]);
                        const inhaltL = flaschenvolumenL * druckBar;
                        const dauerMin = p.random([60, 90, 120, 180]);
                        const maxFlussLM = roundToDecimal(inhaltL / dauerMin, 1);
                        return {
                            question: `Sie haben eine <strong>${flaschenvolumenL} L</strong> Flasche mit <strong>${druckBar} bar</strong> (${inhaltL} L Inhalt).<br>Der Sauerstoff muss für <strong>${dauerMin} Minuten</strong> reichen.<br>Welche maximale Flussrate (L/min) können Sie einstellen?`,
                            answer: maxFlussLM,
                            solution: `Max. Flussrate = ${inhaltL} L / ${dauerMin} min = <strong>${maxFlussLM} L/min</strong>`,
                            unit: 'L/min'
                        };
                    }
                }, {
                    scenario: "Dauer unter Berücksichtigung des Restdrucks.",
                    generate: () => {
                        const flaschenvolumenL = p.random([10, 12, 15]);
                        const druckBar = p.random([85, 115, 140]);
                        const restdruckBar = 10;
                        const flussrateLM = p.random([4, 5, 7, 9]);
                        const nutzbarerInhaltL = Math.max(0, flaschenvolumenL * (druckBar - restdruckBar));
                        const dauerMin = Math.floor(nutzbarerInhaltL / flussrateLM);
                        const hours = Math.floor(dauerMin / 60);
                        const minutes = dauerMin % 60;
                        const dauerFormatted = `${hours}h ${minutes}min`;
                        return {
                            question: `Eine <strong>${flaschenvolumenL} L</strong> Flasche zeigt <strong>${druckBar} bar</strong> an (Restdruck ${restdruckBar} bar).<br>Die Flussrate ist <strong>${flussrateLM} L/min</strong>.<br>Wie viele Minuten reicht der *nutzbare* Sauerstoff?`,
                            answer: dauerMin,
                            solution: `Nutzbarer Inhalt: ${flaschenvolumenL}L * (${druckBar}bar - ${restdruckBar}bar) = ${nutzbarerInhaltL} L<br>Dauer: ${nutzbarerInhaltL}L / ${flussrateLM}L/min = <strong>${dauerMin} min</strong> (abgerundet)<br>(${dauerFormatted})`,
                            unit: 'min'
                        };
                    }
                }]
            }
        },
    };
    const rechenwegeErklaerungen = {
        medikamente: {
            title: "Medikamentendosierungen",
            types: {
                'med_mg_ml': {
                    shortTitle: "mg/ml (Wirkstoffmenge pro Volumen)",
                    title: "Typ 1: mg/ml (Wirkstoffmenge pro Volumen)",
                    was: "Du musst herausfinden, wie viel Flüssigkeit (in ml) du aufziehen musst, um genau die Menge an Wirkstoff (in mg) zu bekommen, die der Arzt oder die Ärztin verordnet hat.",
                    erklaerung: "Schau auf die Ampulle oder das Fläschchen: Dort steht, wie viel Milligramm (mg) Wirkstoff in einem Milliliter (ml) Lösung enthalten sind (z.B. 10 mg/ml). Das ist die Konzentration.\nSchau auf die Verordnung: Dort steht, wie viel Milligramm (mg) Wirkstoff der Patient bekommen soll. Das ist die verordnete Dosis.\nTeile die verordnete Dosis (mg) durch die Konzentration (mg/ml). Das Ergebnis sagt dir, wie viele Milliliter (ml) du aufziehen musst.",
                    formel: `Benötigtes Volumen <span class="unit">(ml)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Verordnete Dosis <span class="unit">(mg)</span></span><span class="denominator">Konzentration <span class="unit">(mg/ml)</span></span></span>`,
                    beispiel: {
                        text: "Arzt verordnet 40 mg eines Medikaments. Die Ampulle enthält 20 mg pro ml (20 mg/ml). Wie viel ml musst du aufziehen?",
                        rechnung: "40 mg / 20 mg/ml = 2 ml",
                        antwort: "Du musst 2 ml aufziehen."
                    }
                },
                'med_percent': {
                    shortTitle: "%-Lösungen (Menge/Volumen berechnen)",
                    title: "Typ 2: %-Lösungen (Menge/Volumen berechnen)",
                    was: "Du musst verstehen, wie viel Gramm (g) oder Milligramm (mg) eines Stoffes (z.B. Salz) in einer bestimmten Menge einer prozentigen Lösung (z.B. NaCl 0.9%) enthalten sind.",
                    erklaerung: "Eine Prozentangabe (%) bei Lösungen bedeutet immer \"Gramm pro 100 Milliliter\". Also: 0.9% NaCl heisst 0.9 Gramm NaCl in 100 ml Lösung. 5% Glukose heisst 5 Gramm Glukose in 100 ml Lösung.\nUm zu wissen, wie viel Gramm in einer anderen Menge (z.B. 500 ml Beutel) sind, rechnest du: Teile den Prozentsatz durch 100 und multipliziere das Ergebnis mit dem Gesamtvolumen der Lösung in ml.\nWenn du das Ergebnis in Milligramm (mg) brauchst, multipliziere das Ergebnis in Gramm (g) noch mit 1000.",
                    formel: `Menge <span class="unit">(g)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Prozentsatz</span><span class="denominator">100</span></span> <span class="op">&times;</span> Gesamtvolumen <span class="unit">(ml)</span><br> Menge <span class="unit">(mg)</span> <span class="op">=</span> Menge <span class="unit">(g)</span> <span class="op">&times;</span> 1000`,
                    beispiel: {
                        text: "Du hast einen 500 ml Beutel mit 0.9% NaCl-Lösung (Kochsalzlösung). Wie viel Gramm Salz (NaCl) sind darin?",
                        rechnung: "(0.9 / 100) * 500 ml = 0.009 * 500 = 4.5 g",
                        antwort: "Es sind 4.5 Gramm NaCl im Beutel."
                    }
                },
                'med_ml_tropf': {
                    shortTitle: "ml in Tropfen (Umrechnungsfaktor)",
                    title: "Typ 3: ml in Tropfen (Umrechnungsfaktor)",
                    was: "Du rechnest aus, wie viele Tropfen einer bestimmten Menge Flüssigkeit (in ml) entsprechen. Das ist wichtig, wenn du eine Infusion über Tropfenzahl steuern musst.",
                    erklaerung: "Jedes Infusionsbesteck hat einen eigenen Tropfenfaktor. Der steht auf der Verpackung und sagt dir, wie viele Tropfen genau einem Milliliter (ml) entsprechen (z.B. 20 Trpf/ml).\nNimm die Menge an Flüssigkeit in Millilitern (ml), die du als Tropfen wissen willst.\nMultipliziere diese Menge (ml) mit dem Tropfenfaktor (Trpf/ml) des Besteckes. Das Ergebnis ist die Gesamtanzahl der Tropfen.",
                    formel: `Anzahl Tropfen <span class="op">=</span> Menge <span class="unit">(ml)</span> <span class="op">&times;</span> Tropfenfaktor <span class="unit">(Trpf/ml)</span>`,
                    beispiel: {
                        text: "Du sollst 50 ml einer Lösung als Tropfen verabreichen. Das Infusionsbesteck hat einen Tropfenfaktor von 20 Trpf/ml. Wie viele Tropfen sind das?",
                        rechnung: "50 ml * 20 Trpf/ml = 1000 Tropfen",
                        antwort: "Das sind 1000 Tropfen."
                    }
                }
            }
        },
        infusionen: {
            title: "Infusionen",
            types: {
                'inf_rate_conv': {
                    shortTitle: "Ratenumrechnung",
                    title: "Typ 1: Ratenumrechnung (ml/24h -> ml/h; ml/h -> Trpf/min)",
                    was: "Du passt die Geschwindigkeit (Laufrate) einer Infusion an verschiedene Zeiteinheiten an.",
                    erklaerung: "Von ml/24h zu ml/h: Wenn du weisst, wie viel Infusion in 24 Stunden laufen soll, teile diese Gesamtmenge (ml) einfach durch 24. Das Ergebnis ist die Menge pro Stunde (ml/h).\nVon ml/h zu Trpf/min: Wenn du die Rate in Milliliter pro Stunde (ml/h) kennst und sie in Tropfen pro Minute (Trpf/min) brauchst:\n1. Nimm die Rate in ml/h.\n2. Multipliziere sie mit dem Tropfenfaktor (Trpf/ml) des Infusionsbestecks (Standard meist 20 Trpf/ml). Jetzt weisst du, wie viele Tropfen pro Stunde laufen sollen.\n3. Teile dieses Ergebnis durch 60 (weil eine Stunde 60 Minuten hat). Das Ergebnis ist die Rate in Tropfen pro Minute (Trpf/min).",
                    formel: `Rate <span class="unit">(ml/h)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Gesamtvolumen <span class="unit">(ml)</span></span><span class="denominator">24 <span class="unit">h</span></span></span><br><br> Rate <span class="unit">(Trpf/min)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Rate <span class="unit">(ml/h)</span> <span class="op">&times;</span> Tropfenfaktor <span class="unit">(Trpf/ml)</span></span><span class="denominator">60 <span class="unit">min/h</span></span></span>`,
                    beispiel: {
                        text: "ml/24h -> ml/h: Eine Infusion von 2400 ml soll über 24 Stunden laufen. Wie viele ml pro Stunde sind das?\nml/h -> Trpf/min: Die Infusion läuft mit 100 ml/h. Das Besteck hat einen Tropfenfaktor von 20 Trpf/ml. Wie viele Tropfen pro Minute sind das?",
                        rechnung: "1. 2400 ml / 24 h = 100 ml/h\n2. (100 ml/h * 20 Trpf/ml) / 60 min/h = 2000 Trpf/h / 60 min/h ≈ 33 Trpf/min",
                        antwort: "1. Die Rate ist 100 ml/h.\n2. Du stellst etwa 33 Tropfen pro Minute ein."
                    }
                },
                'inf_percent': {
                    shortTitle: "%-Lösungen (Infusionskontext)",
                    title: "Typ 2: %-Lösungen (im Infusionskontext, z.B. Laufrate berechnen)",
                    was: "Oft geht es hier darum, auszurechnen, wie schnell eine Infusion (ml/h oder Trpf/min) laufen muss, um eine bestimmte Menge an Wirkstoff (z.B. mg pro Stunde) zu verabreichen, wenn man die Konzentration als Prozent (%) kennt.",
                    erklaerung: "Zuerst brauchst du die Konzentration in mg/ml. Wandle die Prozentangabe (%) um: Multipliziere den Prozentsatz mit 10. (Beispiel: 5% Glukose = 5 * 10 = 50 mg/ml).\nSchau auf die Verordnung: Wie viel Wirkstoff soll pro Zeit (z.B. mg/Stunde) gegeben werden? Das ist die gewünschte Dosisrate (z.B. mg/h).\nTeile die gewünschte Dosisrate (mg/h) durch die Konzentration (mg/ml), die du in Schritt 1 berechnet hast. Das Ergebnis ist die benötigte Laufrate in ml/h.\nWenn du die Rate in Trpf/min brauchst, rechne sie wie bei Infusionen Typ 1 um.",
                    formel: `Konzentration <span class="unit">(mg/ml)</span> <span class="op">=</span> Prozentsatz <span class="op">&times;</span> 10<br><br> Laufrate <span class="unit">(ml/h)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Gewünschte Dosisrate <span class="unit">(mg/h)</span></span><span class="denominator">Konzentration <span class="unit">(mg/ml)</span></span></span>`,
                    beispiel: {
                        text: "Ein Patient soll 1000 mg eines Medikaments pro Stunde erhalten. Die Infusionslösung hat eine Konzentration von 10%. Wie schnell muss die Infusion laufen (ml/h)?",
                        rechnung: "Konzentration in mg/ml: 10% * 10 = 100 mg/ml.\nLaufrate berechnen: 1000 mg/h / 100 mg/ml = 10 ml/h.",
                        antwort: "Die Infusion muss mit 10 ml/h laufen."
                    }
                },
                'inf_duration': {
                    shortTitle: "Dauer berechnen",
                    title: "Typ 3: Dauer berechnen (\"Wie lange hält die Flasche?\")",
                    was: "Du findest heraus, wie viele Stunden oder Minuten eine Infusionsflasche oder ein Beutel bei einer bestimmten Laufrate reicht.",
                    erklaerung: "Schau nach, wie viel Flüssigkeit insgesamt in der Flasche/im Beutel ist (Gesamtvolumen (ml)).\nSchau nach, wie schnell die Infusion läuft (Rate). Wichtig ist die Einheit der Rate (ml/h oder ml/min oder Trpf/min).\nTeile das Gesamtvolumen (ml) durch die Rate. Achte auf die Einheiten!\n- Wenn die Rate in ml/h ist, ist das Ergebnis die Dauer in Stunden (h).\n- Wenn die Rate in ml/min ist, ist das Ergebnis die Dauer in Minuten (min).\n- Wenn die Rate in Trpf/min ist: Rechne zuerst das Gesamtvolumen in Tropfen um (Gesamtvolumen (ml) * Tropfenfaktor (Trpf/ml)). Teile dann diese Gesamttropfenzahl durch die Rate (Trpf/min). Das Ergebnis ist die Dauer in Minuten (min).",
                    formel: `Dauer <span class="unit">(h)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Gesamtvolumen <span class="unit">(ml)</span></span><span class="denominator">Rate <span class="unit">(ml/h)</span></span></span><br><br> Dauer <span class="unit">(min)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Gesamtvolumen <span class="unit">(ml)</span></span><span class="denominator">Rate <span class="unit">(ml/min)</span></span></span>`,
                    beispiel: {
                        text: "Du hast einen Infusionsbeutel mit 500 ml Inhalt. Die Laufrate ist auf 125 ml/h eingestellt. Wie lange reicht der Beutel?",
                        rechnung: "500 ml / 125 ml/h = 4 h",
                        antwort: "Der Beutel reicht für 4 Stunden."
                    }
                }
            }
        },
        o2: {
            title: "O2-Verabreichung (Sauerstoff)",
            types: {
                'o2_content': {
                    shortTitle: "Inhalt berechnen",
                    title: "Typ 1: Inhalt berechnen (Liter in Flasche bei x bar Druck)",
                    was: "Du ermittelst, wie viele Liter Sauerstoff effektiv in einer Druckgasflasche enthalten sind.",
                    erklaerung: "Finde das Flaschenvolumen heraus. Das ist die Grösse der Stahlflasche selbst (steht meist drauf, z.B. 10 Liter).\nLies den Druck (in bar) vom Manometer (Druckanzeige) ab.\nMultipliziere das Flaschenvolumen (L) mit dem Druck (bar). Das Ergebnis ist ungefähr die Menge an Sauerstoff in Litern (L), die du verwenden kannst. (Manchmal zieht man noch einen kleinen Restdruck ab, aber für eine schnelle Schätzung reicht diese Rechnung oft aus).",
                    formel: `Verfügbarer Inhalt <span class="unit">(L)</span> <span class="op">≈</span> Flaschenvolumen <span class="unit">(L)</span> <span class="op">&times;</span> Angezeigter Druck <span class="unit">(bar)</span>`,
                    beispiel: {
                        text: "Du hast eine 10-Liter-Sauerstoffflasche. Das Manometer zeigt 100 bar Druck an. Wie viele Liter Sauerstoff sind etwa verfügbar?",
                        rechnung: "10 L * 100 bar = 1000 L",
                        antwort: "Es sind ungefähr 1000 Liter Sauerstoff verfügbar."
                    }
                },
                'o2_duration': {
                    shortTitle: "Dauer berechnen",
                    title: "Typ 2: Dauer berechnen (Wie lange reicht Inhalt bei x L/min Fluss)",
                    was: "Du findest heraus, wie viele Minuten der Sauerstoff aus der Flasche bei einer bestimmten Einstellung (Flussrate) reicht.",
                    erklaerung: "Berechne zuerst den verfügbaren Inhalt (L) der Flasche wie bei O2 Typ 1 beschrieben.\nSchau nach, wie viel Sauerstoff pro Minute fliesst (Flussrate (L/min)). Diese stellst du am Flowmeter ein.\nTeile den verfügbaren Inhalt (L) durch die Flussrate (L/min).\nDas Ergebnis ist die Zeit in Minuten (min), die der Sauerstoff noch reicht.",
                    formel: `Dauer <span class="unit">(min)</span> <span class="op">=</span> <span class="fraction"><span class="numerator">Verfügbarer Inhalt <span class="unit">(L)</span></span><span class="denominator">Flussrate <span class="unit">(L/min)</span></span></span>`,
                    beispiel: {
                        text: "In deiner 10-Liter-Flasche sind noch 1000 Liter Sauerstoff (siehe Beispiel Typ 1). Der Patient bekommt Sauerstoff mit einer Flussrate von 4 L/min. Wie lange reicht der Sauerstoff?",
                        rechnung: "1000 L / 4 L/min = 250 min",
                        antwort: "Der Sauerstoff reicht für 250 Minuten (das sind 4 Stunden und 10 Minuten)."
                    }
                }
            }
        }
    };

    // ==================
    // P5.JS SETUP & DRAW
    // ==================
    p.setup = () => {
        p.noCanvas(); // Wir brauchen keine p5-Leinwand zum Zeichnen
        fetchAllDOMElements();
        // Kurzer Check, ob die HTML-Elemente überhaupt gefunden wurden.
        if (!mainNavDiv) {
            console.error("HTML-Elemente des Rechentrainers nicht gefunden. Setup wird abgebrochen.");
            return; // Verhindert weitere Fehler
        }
        attachStaticEventListeners();
        setupPwaInstall();
        navigateToState('menu');
        console.log("Rechentrainer-Sketch initialisiert im Instance-Mode.");
    };

    p.draw = () => {
        // Leer, da wir keine Animationen haben
    };
};
// =================================================================
// === RECHENTRAINER.JS - FINALE VERSION (INSTANCE MODE) - TEIL 2 ===
// =================================================================

    // ==================
    // INITIALISIERUNG
    // ==================
    function fetchAllDOMElements() {
        mainNavDiv = p.select('#main-nav');
        categorySelectionDiv = p.select('#category-selection');
        difficultySelectionDiv = p.select('#difficulty-selection');
        taskControlsDiv = p.select('#task-controls');
        explanationSectionDiv = p.select('#explanation-section');
        canvasHolder = p.select('#canvas-holder');
        selectedCategoryNameSpan = p.select('#selected-category-name');
        taskCategoryDifficultySpan = p.select('#task-category-difficulty');
        scenarioArea = p.select('#scenario-area');
        questionArea = p.select('#question-area');
        inputAnswer = p.select('#input-answer');
        inputUnitSpan = p.select('#input-unit');
        btnCheck = p.select('#btn-check');
        feedbackArea = p.select('#feedback-area');
        solutionArea = p.select('#solution-area');
        btnNextTask = p.select('#btn-next-task');
        explanationSelectionArea = p.select('#explanation-selection-area');
        explanationContentArea = p.select('#explanation-content-area');
        explanationContentTitle = p.select('#explanation-content-title');
        explanationContentBody = p.select('#explanation-content-body');
        btnBackFromContent = p.select('#btn-back-from-content');
        btnShowExplanation = p.select('#btn-show-explanation');
    }

    function attachStaticEventListeners() {
        p.select('#btn-start-practice').mousePressed(() => navigateToState('category_selection'));
        p.select('#btn-show-explanations').mousePressed(() => navigateToState('explanation_overview'));
        btnCheck.mousePressed(checkAnswer);
        btnNextTask.mousePressed(startNewTask);
        btnShowExplanation.mousePressed(showExplanationForCurrentTask);
        p.select('#category-selection .btn-back').mousePressed(goBack);
        p.select('#difficulty-selection .btn-back').mousePressed(goBack);
        p.select('#task-controls .btn-back').mousePressed(goBack);
        p.select('#explanation-section #btn-back-from-explanation').mousePressed(goBack);
        btnBackFromContent.mousePressed(() => navigateToState('explanation_overview'));
    }

    function navigateToState(newState) {
        console.log(`Navigiere von ${currentAppState} zu ${newState}`);
        let previousState = currentAppState;
        currentAppState = newState;
        mainNavDiv.addClass('hidden');
        categorySelectionDiv.addClass('hidden');
        difficultySelectionDiv.addClass('hidden');
        taskControlsDiv.addClass('hidden');
        explanationSectionDiv.addClass('hidden');
        explanationContentArea.addClass('hidden');
        explanationSelectionArea.removeClass('hidden');
        switch (currentAppState) {
            case 'menu':
                mainNavDiv.removeClass('hidden');
                currentMainCategory = null;
                currentDifficulty = null;
                break;
            case 'category_selection':
                categorySelectionDiv.removeClass('hidden');
                addDynamicEventListeners('#category-selection .button-group button', 'mousePressed', (button) => {
                    currentMainCategory = button.attribute('data-main-category');
                    if (!mainCategoryMapping[currentMainCategory]) {
                        console.error(`Hauptkategorie "${currentMainCategory}" nicht im Mapping gefunden!`);
                        alert(`Fehler: Hauptkategorie "${currentMainCategory}" ist noch nicht implementiert.`);
                        return;
                    }
                    navigateToState('difficulty_selection');
                });
                break;
            case 'difficulty_selection':
                selectedCategoryNameSpan.html(mainCategoryDisplayNames[currentMainCategory] || currentMainCategory);
                difficultySelectionDiv.removeClass('hidden');
                addDynamicEventListeners('#difficulty-selection .button-group button', 'mousePressed', (button) => {
                    currentDifficulty = button.attribute('data-difficulty');
                    navigateToState('task');
                });
                break;
            case 'task':
                taskControlsDiv.removeClass('hidden');
                if (previousState !== 'task') {
                    startNewTask();
                } else {
                    inputAnswer.elt.focus();
                }
                break;
            case 'explanation_overview':
                explanationSectionDiv.removeClass('hidden');
                explanationSelectionArea.removeClass('hidden');
                explanationContentArea.addClass('hidden');
                displayExplanationOverview();
                break;
            case 'explanation_content_view':
                explanationSectionDiv.removeClass('hidden');
                explanationSelectionArea.addClass('hidden');
                explanationContentArea.removeClass('hidden');
                break;
        }
        window.scrollTo(0, 0);
    }

    function goBack() {
        console.log(`goBack aufgerufen aus Zustand: ${currentAppState}`);
        switch (currentAppState) {
            case 'category_selection':
            case 'explanation_overview':
                navigateToState('menu');
                break;
            case 'difficulty_selection':
                currentMainCategory = null;
                navigateToState('category_selection');
                break;
            case 'task':
                navigateToState('difficulty_selection');
                break;
            default:
                currentMainCategory = null;
                currentDifficulty = null;
                navigateToState('menu');
        }
    }

    function startNewTask() {
        if (currentAppState !== 'task') {
            console.warn("startNewTask sollte nur im 'task' Zustand aufgerufen werden.");
            navigateToState('task');
            return;
        }
        if (!currentMainCategory || !currentDifficulty) {
            console.error("Hauptkategorie oder Schwierigkeit nicht gesetzt für neue Aufgabe.");
            navigateToState('category_selection');
            return;
        }
        generateAndDisplayTask();
    }

    function generateAndDisplayTask() {
        clearTaskFields();
        let taskData;
        let taskInfo = {};
        try {
            if (currentAppState === 'task') {
                const subCategoryKeys = mainCategoryMapping[currentMainCategory];
                if (!subCategoryKeys || subCategoryKeys.length === 0) {
                    throw new Error(`Keine spezifischen Rechentypen für Hauptkategorie "${currentMainCategory}" definiert.`);
                }
                let validSubCategoryKeys = [];
                subCategoryKeys.forEach(subKey => {
                    if (tasksDatabase[subKey] ? .levels[currentDifficulty] ? .length > 0) {
                        validSubCategoryKeys.push(subKey);
                    } else {
                        console.warn(`Keine Aufgaben gefunden für ${subKey} [${currentDifficulty}]`);
                    }
                });
                if (validSubCategoryKeys.length === 0) {
                    throw new Error(`Keine Aufgaben für "${mainCategoryDisplayNames[currentMainCategory]} (${currentDifficulty})" verfügbar.`);
                }
                let chosenSubCategoryKey = p.random(validSubCategoryKeys);
                console.log(`Gewählter Sub-Typ für Aufgabe: ${chosenSubCategoryKey}`);
                const availableTasks = tasksDatabase[chosenSubCategoryKey].levels[currentDifficulty];
                let taskGenerator = p.random(availableTasks).generate;
                if (typeof taskGenerator !== 'function') throw new Error(`Ungültiger Generator für ${chosenSubCategoryKey} (${currentDifficulty}).`);
                taskData = taskGenerator();
                taskInfo = {
                    category: chosenSubCategoryKey,
                    level: currentDifficulty,
                    unit: taskData.unit || tasksDatabase[chosenSubCategoryKey] ? .unit || ''
                };
            } else {
                throw new Error("generateAndDisplayTask nur im 'task' Modus aufrufen.");
            }
            if (!taskData || typeof taskData.answer === 'undefined' || !taskData.question || !taskData.solution) {
                throw new Error(`Unvollständige Task-Daten erhalten: ${JSON.stringify(taskData)}`);
            }
            const explanationKeys = taskToExplanationMap[taskInfo.category];
            if (!explanationKeys) {
                console.warn(`Kein Mapping zu Erklärung für Aufgabentyp "${taskInfo.category}" gefunden.`);
            }
            currentTask = {
                scenario: taskData.scenario || "",
                question: taskData.question,
                correctAnswer: taskData.answer,
                solutionSteps: taskData.solution,
                unit: taskInfo.unit || '',
                explanationKeys: explanationKeys
            };
            scenarioArea.html(currentTask.scenario);
            questionArea.html(currentTask.question);
            inputUnitSpan.html(currentTask.unit);
            taskCategoryDifficultySpan.html(`${mainCategoryDisplayNames[currentMainCategory]} (${currentDifficulty})`);
            if (currentTask.explanationKeys) {
                btnShowExplanation.removeClass('hidden');
            } else {
                btnShowExplanation.addClass('hidden');
            }
            inputAnswer.elt.focus();
        } catch (error) {
            displayError(`Fehler beim Generieren der Aufgabe: ${error.message}`);
            console.error(error);
        }
    }

    function showExplanationForCurrentTask() {
        if (!currentTask || !currentTask.explanationKeys) {
            console.warn("Keine Erklärung für die aktuelle Aufgabe verfügbar.");
            alert("Für diese spezielle Aufgabe ist leider keine direkte Erklärung verlinkt.");
            return;
        }
        displayExplanationContent(currentTask.explanationKeys.category, currentTask.explanationKeys.type);
    }

    function checkAnswer() {
        if (!currentTask) {
            console.error("checkAnswer aufgerufen ohne currentTask!");
            return;
        }
        if (btnShowExplanation) {
            btnShowExplanation.removeClass('highlight-error');
        } else {
            console.error("Button btnShowExplanation nicht gefunden!");
        }
        let userAnswerStr = inputAnswer.value();
        let cleanedInput = userAnswerStr.replace(/\s/g, '').replace(',', '.');
        let userAnswerNum = parseFloat(cleanedInput);
        if (feedbackArea) {
            feedbackArea.removeClass('correct');
            feedbackArea.removeClass('incorrect');
            feedbackArea.html('');
        } else {
            console.error("Feedback Area nicht gefunden!");
        }
        if (solutionArea) {
            solutionArea.addClass('hidden');
            solutionArea.html('');
        } else {
            console.error("Solution Area nicht gefunden!");
        }
        if (userAnswerStr.trim() === "") {
            feedbackArea.html("Bitte geben Sie eine Antwort ein.");
            feedbackArea.addClass('incorrect');
            if (currentTask.explanationKeys && btnShowExplanation) btnShowExplanation.addClass('highlight-error');
            return;
        }
        if (isNaN(userAnswerNum)) {
            feedbackArea.html("Ungültige Eingabe. Bitte geben Sie eine Zahl ein.");
            feedbackArea.addClass('incorrect');
            if (currentTask.explanationKeys && btnShowExplanation) btnShowExplanation.addClass('highlight-error');
            return;
        }
        let correctAnswerNum = parseFloat(currentTask.correctAnswer);
        if (isNaN(correctAnswerNum)) {
            console.error("Korrekte Antwort in currentTask ist keine gültige Zahl!", currentTask);
            displayError("Interner Fehler: Korrekte Antwort ist ungültig.");
            return;
        }
        let tolerance = 0;
        if (p.abs(correctAnswerNum - Math.round(correctAnswerNum)) > 0.001 && currentTask.unit !== 'Trpf/min' && currentTask.unit !== 'Tablette(n)') {
            tolerance = 0.01;
        }
        if (currentTask.unit === 'Tablette(n)') {
            if (correctAnswerNum % 0.5 !== 0) {
                tolerance = 0.01;
            }
        }
        if (p.abs(userAnswerNum - correctAnswerNum) <= tolerance) {
            feedbackArea.html("<strong>Richtig!</strong>");
            feedbackArea.addClass('correct');
            solutionArea.addClass('hidden');
            if (btnNextTask) setTimeout(() => {
                btnNextTask.elt.focus();
            }, 100);
        } else {
            feedbackArea.html(`<strong>Leider falsch.</strong> Korrekt wäre: <strong>${currentTask.correctAnswer} ${currentTask.unit || ''}</strong>`);
            feedbackArea.addClass('incorrect');
            if (currentTask.solutionSteps) {
                solutionArea.html(currentTask.solutionSteps);
                solutionArea.removeClass('hidden');
            } else {
                console.warn("Keine Lösungsschritte für diese Aufgabe vorhanden.");
                solutionArea.addClass('hidden');
            }
            if (currentTask.explanationKeys && btnShowExplanation) {
                btnShowExplanation.addClass('highlight-error');
            }
        }
    }

    function clearTaskFields() {
        inputAnswer.value('');
        feedbackArea.html('');
        feedbackArea.removeClass('correct');
        feedbackArea.removeClass('incorrect');
        solutionArea.html('');
        solutionArea.addClass('hidden');
        scenarioArea.html('');
        questionArea.html('');
        inputUnitSpan.html('');
        if (btnShowExplanation) {
            btnShowExplanation.removeClass('highlight-error');
            btnShowExplanation.addClass('hidden');
        }
        currentTask = null;
    }

    function displayError(message) {
        console.error(message);
        feedbackArea.html(`FEHLER: ${message}`);
        feedbackArea.addClass('incorrect');
        taskControlsDiv.addClass('hidden');
        if (currentAppState !== 'menu') {
            if (!p.select('#temp-back-button')) {
                let backButton = p.createButton('Zurück zum Hauptmenü');
                backButton.id('temp-back-button');
                backButton.parent(feedbackArea);
                backButton.style('margin-top', '10px');
                backButton.mousePressed(() => {
                    p.select('#temp-back-button').remove();
                    navigateToState('menu');
                });
            }
        }
    }

    function displayExplanationOverview() {
        explanationSelectionArea.html('');
        for (const categoryKey in rechenwegeErklaerungen) {
            const category = rechenwegeErklaerungen[categoryKey];
            let categoryTitle = p.createElement('h3', category.title);
            categoryTitle.addClass('explanation-category-title');
            categoryTitle.parent(explanationSelectionArea);
            let typeListDiv = p.createDiv();
            typeListDiv.addClass('type-list');
            typeListDiv.parent(explanationSelectionArea);
            for (const typeKey in category.types) {
                const type = category.types[typeKey];
                let typeButton = p.createButton(type.shortTitle);
                typeButton.addClass('type-button');
                typeButton.attribute('data-category-key', categoryKey);
                typeButton.attribute('data-type-key', typeKey);
                typeButton.parent(typeListDiv);
                typeButton.mousePressed(() => {
                    displayExplanationContent(categoryKey, typeKey);
                });
            }
        }
    }

    function displayExplanationContent(categoryKey, typeKey) {
        const explData = rechenwegeErklaerungen[categoryKey] ? .types[typeKey];
        if (!explData) {
            displayError("Erklärungsinhalt nicht gefunden.");
            navigateToState('explanation_overview');
            return;
        }
        explanationContentTitle.html(explData.title);
        const formatText = (text) => text ? text.replace(/\n/g, '<br>') : '';
        let contentHTML = `<h4>Was wird berechnet?</h4><p>${formatText(explData.was)}</p><h4>Schriftliche Erklärung</h4><p>${formatText(explData.erklaerung)}</p><h4>Formel(n)</h4><p class="formula">${formatText(explData.formel)}</p>`;
        if (explData.beispiel) {
            contentHTML += `<div class="beispiel"><h4>Beispiel</h4><p>${formatText(explData.beispiel.text)}</p><p><strong>Rechnung:</strong> ${formatText(explData.beispiel.rechnung)}</p><p><strong>Antwort:</strong> ${formatText(explData.beispiel.antwort)}</p></div>`;
        }
        explanationContentBody.html(contentHTML);
        navigateToState('explanation_content_view');
    }

    function roundToDecimal(num, decimals) {
        if (typeof num !== 'number' || isNaN(num)) return NaN;
        let factor = Math.pow(10, decimals);
        return Math.round((num + Number.EPSILON) * factor) / factor;
    }
    
    let listenerMemory = {};

    function addDynamicEventListeners(selector, eventType, callback) {
        let elements = p.selectAll(selector);
        elements.forEach((element, index) => {
            let elementId = element.id() || `${selector.replace(/[^a-zA-Z0-9]/g,'_')}_${index}`;
            let listenerKey = `${elementId}_${eventType}`;
            if (!element.elt[`_${listenerKey}`]) {
                element[eventType](() => callback(element));
                element.elt[`_${listenerKey}`] = true;
            }
        });
    }

    function clearSpecificListeners(prefixSelector) {
        let elements = p.selectAll(prefixSelector + ' button');
        elements.forEach((element, index) => {
            let elementId = element.id() || `${prefixSelector.replace(/[^a-zA-Z0-9]/g,'_')}_button_${index}`;
            for (const prop in element.elt) {
                if (prop.startsWith(`_${elementId}_`)) {
                    delete element.elt[prop];
                }
            }
        });
    }

    function setupPwaInstall() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('`beforeinstallprompt` event was fired.');
            const installButtonElement = document.getElementById('btn-install');
            if (installButtonElement) {
                installButtonElement.classList.remove('hidden');
                installButtonElement.addEventListener('click', async () => {
                    installButtonElement.classList.add('hidden');
                    deferredPrompt.prompt();
                    const {
                        outcome
                    } = await deferredPrompt.userChoice;
                    console.log(`User response to the install prompt: ${outcome}`);
                    deferredPrompt = null;
                });
            }
        });
        window.addEventListener('appinstalled', () => {
            const installButtonElement = document.getElementById('btn-install');
            if (installButtonElement) {
                installButtonElement.classList.add('hidden');
            }
            deferredPrompt = null;
            console.log('PWA was installed');
        });
    }
};
