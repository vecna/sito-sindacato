---
title: "Ghòstati!: un nuovo laboratorio per sperimentare con il riconoscimento facciale"
description: "Due percorsi di analisi, trucchi programmabili e documentazione aperta: le novità del software usato nei workshop Ghòstati! di NINA."
url: "/it/blog/ghostati-new-software/"
translationKey: "ghostati-new-software"
image: "/images/ghostati/workshops/ws1-painting-1.jpg"
date: 2026-10-01
---

Il laboratorio di **Ghòstati!** si rinnova. Puoi salvare il tuo volto, cambiare il trucco, disegnare un intervento digitale e osservare dove un sistema di analisi del viso smette di seguirti o di riconoscerti.

Il software si chiama [Ghostmaxxing](https://ghostmaxxing.vecna.eu/): è un progetto libero, utilizzabile anche da altre realtà. **Ghòstati!** è l’iniziativa del Sindacato Universale di NINA che organizza i workshop e raccoglie segnalazioni riservate sulla sorveglianza biometrica. Questa divisione permette di sviluppare uno strumento condiviso e, insieme, costruire percorsi collettivi di sperimentazione e intervento politico.

<a href="/ghostati/" target="_blank" rel="noopener noreferrer">Apri il laboratorio e prova con il tuo volto.</a>

## Individuare un volto e riconoscerlo sono passaggi diversi

Un riquadro intorno alla faccia significa che il software ha trovato un volto. Per stabilire se quel volto corrisponde a uno già registrato servono altre operazioni. Nel laboratorio possiamo osservare questa catena:

1. **Individuazione.** Il rilevatore cerca un volto nell’immagine e ne delimita la posizione.
2. **Mappatura e allineamento.** Il sistema localizza punti di riferimento — occhi, naso, bocca — utili per descrivere la geometria del viso e rendere confrontabili le immagini.
3. **Estrazione delle caratteristiche.** Una rete trasforma l’immagine del volto in un vettore di numeri, detto *embedding* o descrittore. Estrarre le caratteristiche e rappresentarle come vettore fanno parte di questo stesso passaggio.
4. **Confronto.** Il descrittore viene confrontato con quelli dei volti salvati nel database locale.
5. **Decisione.** Una soglia sulla distanza tra i vettori determina se il sistema considera il volto corrispondente a uno dei riferimenti.

Un trucco può intervenire in punti diversi: impedire di trovare il volto, disturbare i punti di riferimento oppure cambiare abbastanza il descrittore da interrompere una corrispondenza. Distinguere questi esiti aiuta a capire cosa stiamo sperimentando. La [spiegazione della pipeline](https://ghostmaxxing.vecna.eu/docs/understand/face-recognition.html) entra nel dettaglio.

## Due percorsi di analisi, con compiti diversi

Il laboratorio affianca **face-api.js** e **MediaPipe**. Face-api.js individua il volto, ne calcola i punti di riferimento e produce un descrittore di 128 numeri per confrontarlo con le identità salvate. È il percorso di riconoscimento facciale del laboratorio.

MediaPipe aggiunge il tracciamento di una mesh del volto: una geometria tridimensionale stimata a partire dalla fotocamera, utile per ancorare il trucco digitale mentre muovi la testa. Questa mesh, da sola, non identifica una persona.

Nel codice è presente anche un percorso sperimentale con **MediaPipe ImageEmbedder e MobileNetV3 Small**. Produce vettori e li confronta usando la similarità coseno, ma è stato addestrato per la somiglianza generica tra immagini. Può reagire molto allo sfondo, ai colori o alla luce: i suoi risultati vanno letti come esperimenti sulle caratteristiche visive, senza attribuirgli la stessa funzione del riconoscitore facciale.

I due percorsi permettono quindi di osservare aspetti diversi dello stesso intervento. La [guida ai risultati](https://ghostmaxxing.vecna.eu/docs/understand/) spiega come interpretare le misure.

## I Ghostyle: disegnare, modificare, riprovare

I trucchi digitali del laboratorio si chiamano **Ghostyle**. Sono moduli JavaScript che possono disegnare sull’immagine 2D, sulla superficie del volto tracciata in 3D, oppure su entrambe. Puoi applicare un pattern esistente, modificarne i parametri e verificare come reagisce il sistema.

Con [Face Brush](https://ghostmaxxing.vecna.eu/docs/guides/face-brush.html) puoi abbozzare un trucco direttamente sul volto e trasformare un esperimento promettente in un modulo riutilizzabile. La [guida per creare Ghostyle](https://ghostmaxxing.vecna.eu/docs/jsdoc/tutorial-ghostyle-authoring.html) descrive come scriverli e condividerli.

L’obiettivo è passare dalla prova isolata a un esperimento che altre persone possano ripetere: cambiando volto, fotocamera, illuminazione e quantità di trucco, per capire quanto il risultato dipenda dalle condizioni iniziali.

## Un laboratorio da esplorare e ispezionare

Il sito del software raccoglie anche strumenti per orientarsi in questo campo:

* I [progetti](https://ghostmaxxing.vecna.eu/projects/) riuniscono pratiche artistiche, ricerca e prodotti che intervengono sulla visione artificiale: trucco, abiti, maschere, luce e altri approcci.
* I [riferimenti](https://ghostmaxxing.vecna.eu/references/) raccolgono studi, documentazione e lavori culturali per approfondire metodi e risultati.
* La [genealogia](https://ghostmaxxing.vecna.eu/genealogy.html) mette in relazione famiglie di sistemi e interventi nel tempo. Aiuta a capire perché un metodo pensato per un vecchio rilevatore possa non funzionare su un sistema più recente.
* La [documentazione](https://ghostmaxxing.vecna.eu/docs/) accompagna l’uso degli strumenti; la [sezione per sviluppare](https://ghostmaxxing.vecna.eu/docs/develop/) e il [riferimento delle API](https://ghostmaxxing.vecna.eu/docs/jsdoc/) permettono di esaminare ed estendere il codice.

Il codice è disponibile in due repository: [Ghostmaxxing](https://github.com/vecna/ghostmaxxing), per il laboratorio nel browser, e [gstmxx-backend](https://github.com/vecna/gstmxx-backend), per la ricezione dei contributi, la moderazione e la pubblicazione nel Fediverso.

Il riconoscimento viene elaborato sul dispositivo. Le clip vengono inviate al server soltanto quando scegli di condividerle e dai il consenso; le segnalazioni riservate seguono il [canale separato gestito da NINA](/it/ghostati/segnalazioni/).

Un risultato positivo descrive ciò che è successo con quel modello e in quelle condizioni. Per sapere se un trucco funziona su un altro sistema occorre provarlo. È il lavoro che vogliamo fare insieme: [organizzare workshop Ghòstati!](/it/blog/ghostati-workshop-ottobre-2026/), confrontare gli esperimenti e rendere verificabili i risultati.
