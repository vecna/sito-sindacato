---
title: "Il fuzzer di Ghostmaxxing cerca Ghostyle sul tuo volto: beta tecnica"
description: Come provare il Local Fuzzer 1.1.0, leggere escape rate e pose atlas, condividere statistiche anonime e Ghostyle selezionati senza inviare video o descrittori.
url: /it/blog/fuzzer-ghostmaxxing-beta/
translationKey: ghostmaxxing-local-fuzzer-beta
initiative: ghostati
image: /images/ghostati/fuzzer/fuzzer-candidates.png
date: 2026-11-12T20:00:00+01:00
tags:
  - Ghostmaxxing
  - fuzzer
  - beta
  - face recognition
---

La versione **1.1.0** introduce il **Local Fuzzer**. Il software gira localmente via Docker, prende un breve video di un volto pulito in movimento e prova molti trucchi seguendo ricette prestabilite. Poi propone i risultati migliori.

Nel nostro gergo, il trucco usato per mettere in difficoltà il riconoscimento si chiama **Ghostyle**. Il Ghostyle selezionato si può scaricare e caricare nel laboratorio. Per trovarlo, il fuzzer costruisce un atlante delle pose pulite, genera molti candidati da una o più ricette e li misura su tutte le pose riconoscibili.

Stiamo cercando persone tecniche per un **beta test**. Ci interessa sapere cosa si capisce senza spiegazioni preventive, dove l’interfaccia è ambigua e quali risultati sono utili. Il calcolo avviene in locale.

## Cosa cerca

Per ogni prova, **face-api** trasforma il volto dipinto in un descrittore e lo confronta con tutte le pose pulite della stessa persona. Una posa evade quando il rilevatore perde il volto oppure quando la distanza dal riferimento pulito più vicino raggiunge la soglia del laboratorio.

I numeri descrivono:

- un modello aperto, con i pesi distribuiti dal progetto;
- un volto e un video specifici;
- quella luce, quella fotocamera e quelle pose;
- una ricetta, un seed e un insieme di parametri precisi.

Non possiamo garantire che il trucco prodotto funzioni su una telecamera stradale o su un altro sistema. Per capire cosa succede nei sistemi realmente installati servono prove documentate, che possono essere inviate attraverso le [segnalazioni Ghòstati!](/it/ghostati/segnalazioni/).

Per noi il valore del fuzzer è permettere a molte persone di ripetere la stessa famiglia di esperimenti e confrontarne le condizioni. La domanda di ricerca è se una simulazione digitale possa anticipare ciò che succede quando il disegno viene dipinto davvero.

## Come provarlo con Docker

Serve Docker Desktop su macOS o Windows, oppure Docker Engine su Linux. Il container include Node, Chromium, ffmpeg, modelli, ricette e interfaccia.

```bash
docker pull ghcr.io/vecna/ghostmaxxing:latest

docker run -d --name ghostmaxxing \
  -p 127.0.0.1:11111:11111 \
  --shm-size=1g --stop-timeout 120 \
  -v ghostmaxxing-data:/data \
  ghcr.io/vecna/ghostmaxxing:latest
```

Poi apri [http://localhost:11111](http://localhost:11111). L’interfaccia non ha autenticazione e non deve essere esposta sulla rete.

Per fermare e riprendere:

```bash
docker stop ghostmaxxing
docker start ghostmaxxing
```

I job e i risultati rimangono nel volume `ghostmaxxing-data`. Un job interrotto riparte dal punto sicuro successivo.

## Dal video al pose atlas

Registra 15–60 secondi con una sola persona consenziente. Il volto deve essere grande, nitido e illuminato in modo uniforme. Parti frontalmente, poi gira lentamente la testa a destra, a sinistra, in alto e in basso.

Il fuzzer divide le rotazioni in celle di yaw e pitch, seleziona fotogrammi rappresentativi e crea un’**impronta pulita** per ogni posa che face-api riesce a descrivere. L’insieme è il *pose atlas*. Le pose viste dal tracciatore ma non riconosciute dal modello restano conteggiate come non misurabili: non vengono nascoste dal report.

{{< article_figure src="/images/ghostati/fuzzer/fuzzer-job-summary.png" alt="Riepilogo di un job del Local Fuzzer con pose atlas, ricetta, trial ed escape rate" caption="Il riepilogo di un job completato mostra il pose atlas, il numero di trial e la separazione tra volto perso e identità oltre soglia." >}}

Video, fotogrammi, descrittori, immagini generate, log e report restano nel volume locale. Il report completo è quindi materiale sensibile, anche se non viene caricato automaticamente da nessuna parte.

## Ricette, tentativi e Ghostyle

Una ricetta definisce una famiglia di interventi: numero e forma dei tratti, dimensioni, opacità, palette, contrasto, zone del volto e vincoli. Il seed sceglie una singola realizzazione. La stessa coppia **ricetta + seed**, nelle stesse condizioni, riproduce lo stesso disegno.

Puoi usare le ricette incluse oppure crearne una tua. Le ricette personalizzate non vengono ridotte al nome: nei risultati condivisibili compare la **definizione completa**, accompagnata dall’identificatore stabile derivato dal suo hash. Un singolo Ghostyle è un campione; la ricetta è l’ipotesi che possiamo riprovare su altri volti.

L’interfaccia offre tre preset:

- **Quick**, per controllare il flusso e ottenere un primo confronto;
- **Standard**, per confrontare palette, zone, forme e vincoli;
- **Deep**, per una ricerca più lunga e senza pruning.

Il tempo dipende dal numero di pose, ricette e tentativi e dalla macchina. Inizia da Quick: dopo i primi trial, la stima del tempo residuo diventa più realistica.

## Come leggere i risultati

Il report separa due modi di evasione:

- **lost rate**: quota di pose in cui il rilevatore non trova più un volto;
- **descriptor escape rate**: quota di pose in cui il volto viene trovato, ma il descrittore supera la soglia rispetto a tutte le impronte pulite.

La loro somma è l’**escape rate**. È una misura di copertura: indica su quale parte delle pose il candidato evade. Non basta però un valore medio alto. Una sequenza video può riconoscere la persona da un solo fotogramma favorevole; per questo il report mostra anche il **worst case**, cioè la posa più debole del candidato, e la mappa yaw/pitch.

{{< article_figure src="/images/ghostati/fuzzer/fuzzer-candidates.png" alt="Quattro candidati Ghostyle generati dal fuzzer con escape rate differenti" caption="Quattro candidati della stessa ricetta. Il fuzzer conserva seed, copertura, worst case e contributo dei due modi di evasione." >}}

I migliori candidati vengono materializzati come veri moduli Ghostyle `.js`, con ricetta, palette, seed e punteggi. Il percorso del video e il suo nome non vengono scritti nei nuovi moduli condivisibili.

## Il pacchetto anonimo di beta testing

Alla fine del job compare la sezione **Help test the beta**. Prima di inviare puoi scaricare il JSON e leggerlo. Contiene soltanto:

- versione del fuzzer, sistema operativo, architettura e backend grafico;
- preset e durata del calcolo;
- quantità e intervallo delle pose, più indicatori aggregati di qualità dell’atlas;
- numero totale di tentativi, completati e potati;
- definizione completa, hash, numero di trial e risultati aggregati di ogni ricetta;
- facoltativamente, i moduli Ghostyle `.js` che selezioni uno per uno;
- un breve feedback testuale e un codice partecipante facoltativo. Se vuoi collegare più prove, può bastare l’iniziale del nome.

Non contiene video, fotogrammi, immagini del volto, descrittori, misura del colore della pelle, nome del file, nome del job, percorsi locali, log o risultati posa per posa.

L’invio avviene con una `POST` a `https://ghostmaxxing.vecna.eu/api/fuzzer-results` soltanto dopo aver selezionato la casella di consenso e premuto il pulsante. La risposta produce una ricevuta con un ID e un token di cancellazione; la pagina la scarica e ne conserva una copia nel browser.

## Che feedback ci serve

Dopo una prova, raccontaci soprattutto:

1. cosa pensavi sarebbe successo prima di premere **Start**;
2. quali termini o grafici non erano comprensibili;
3. se era chiaro che i dati sensibili restavano locali;
4. quale preset hai usato e se la stima dei tempi era credibile;
5. se hai creato una ricetta diversa da quelle incluse;
6. quali Ghostyle vorresti far provare su altri volti.

### Hai svolto l’esperimento?

[Scrivici a info@nina.watch](mailto:info@nina.watch) con questi feedback. Grazie!

---

Le statistiche aggregate servono a confrontare ricette e condizioni, non a costruire un dataset di volti. I moduli selezionati potranno essere provati su altri atlas; le ricette che ricorrono con buoni risultati su persone diverse sono più interessanti del singolo candidato migliore.

Codice, issue e ricette sono nel repository [Ghostmaxxing](https://github.com/vecna/ghostmaxxing). La [guida del Local Fuzzer](https://ghostmaxxing.vecna.eu/docs/guides/localfuzzer.html) copre installazione e flusso; la [guida al report](https://ghostmaxxing.vecna.eu/docs/guides/localfuzzer-report.html) entra nel dettaglio delle misure.
