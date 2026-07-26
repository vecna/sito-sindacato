---
title: "Guida allo Stile"
subtitle: "Tutti gli elementi del design system in una sola pagina"
date: 2026-04-30
draft: false
weight: 99
---

## Palette colori

I colori del sito sono definiti come variabili CSS in `assets/css/main.css`. Per cambiarli, modifica le variabili `:root` in cima al file.

<table>
<tr>
<td class="color-demo">
  <div><span class="color-swatch" style="background:#0a0a0a"></span> <code>--black</code> #0a0a0a</div>
</td>
<td class="color-demo">
  <div><span class="color-swatch" style="background:#f5f0e8"></span> <code>--white</code> #f5f0e8</div>
  </td>
</tr>
<tr>
<td class="color-demo">
  <div><span class="color-swatch" style="background:#c8f500"></span> <code>--lime</code> #c8f500</div>
</td><td class="color-demo">
  <div><span class="color-swatch" style="background:#ff2d6b"></span> <code>--pink</code> #ff2d6b</div>
</td>
</tr>
<tr>
<td class="color-demo">
  <div><span class="color-swatch" style="background:#b48cff"></span> <code>--purple</code> #b48cff</div>
</td><td class="color-demo">
  <div><span class="color-swatch" style="background:#00e5ff"></span> <code>--cyan</code> #00e5ff</div>
</td>
</tr>
<tr>
<td class="color-demo">
  <div><span class="color-swatch" style="background:#ffe600"></span> <code>--yellow</code> #ffe600</div>
</td>

</tr>
</table>

I colori delle initiative cards ciclano automaticamente: pink → purple → lime → cyan. Per sovrascrivere il colore di una card specifica, aggiungi nel front matter dell'iniziativa:

```yaml
card_color: "#ffe600"
```

---

## Tipografia

# Heading 1 — Hanken Grotesk 800

## Heading 2 — Hanken Grotesk italic

### Heading 3 — Hanken Grotesk uppercase

#### Heading 4 — Hanken Grotesk uppercase

Questo è un paragrafo di corpo. Il font è **Hanken Grotesk** weight 300, dimensione fluida `clamp(1rem, 1.3vw, 1.15rem)`. Il testo è pensato per essere leggibile a qualunque viewport. Le parole in **grassetto** usano weight 700. Le parole in *corsivo* usano lo stile italic.

Il font monospazio è `Space Mono`, usato per la navigazione, le etichette, i bottoni e il codice inline come `questo esempio`. Il font `Fragment Mono` è disponibile come alternativa per code blocks.

---

## Label

<div class="label">Etichetta in stile nina.watch</div>

Le label si usano per categorizzare sezioni. Sono automaticamente applicate nelle pagine singole (mostrano il nome della sezione) e possono essere aggiunte in HTML con `<div class="label">testo</div>`.

---

## Link e bottoni

Questo è un [link normale](#) nel testo. Al passaggio del mouse diventa rosa.

<a href="#" class="btn">Bottone CTA &rarr;</a>

Il bottone CTA si aggiunge in HTML con `<a href="#" class="btn">Testo &rarr;</a>`. Lo sfondo si inverte al hover.

---

## Citazioni

> «Il sindacalismo del futuro sarà digitale, o non sarà.»
>
> — Attribuzione fittizia

---

## Liste

- Primo elemento di una lista non ordinata
- Secondo elemento con testo più lungo per vedere come va a capo su righe multiple che superano la larghezza del contenitore
- Terzo elemento

1. Primo passo di una lista ordinata
2. Secondo passo
3. Terzo passo

---

## Codice

Inline: `const x = 42;`

Blocco:

```javascript
function greet(name) {
  console.log(`Ciao, ${name}!`);
}
```

---

## Sidenotes

Le sidenotes sono il cuore del layout. Si scrivono come normali footnote Markdown, e il JavaScript le riposiziona a lato del testo.[^1]

[^1]: Questa è una sidenote di esempio. Usa il font Space Mono in dimensione ridotta. Il bordo sinistro usa il colore di accento (lime). Il numero della nota è in rosa (pink).

Quando ci sono più note vicine, il sistema le distanzia automaticamente per evitare sovrapposizioni.[^2] Su mobile, le sidenotes collassano in blocchi sotto il paragrafo con sfondo leggermente diverso.

[^2]: Seconda sidenote. Nota come si posiziona sotto la prima senza sovrapporsi. Il gap minimo è di 12px.

Le sidenote possono contenere anche *corsivi*, **grassetti** e [link](#).[^3]

[^3]: Terza sidenote con formattazione mista. I link nelle sidenotes funzionano normalmente. Cfr. un ipotetico riferimento: Autore, A. (2025), *Titolo del libro*, Editore.

---

## Separatore

Il separatore `---` in Markdown produce una riga sottile come quella qui sopra.

---

## Sezione con sfondo accento

Per creare una sezione con sfondo colorato (come la vision/mission su nina.watch), usa HTML raw nel Markdown:

<div class="text-section">
  <div class="label">Visione</div>
  <p>Questa sezione ha sfondo lime (il colore di accento). Il testo è scuro per contrasto. Funziona bene per blocchi di dichiarazione, citazioni importanti o call-to-action.</p>
</div>

---

## Sezione con sfondo controllato

Usando lo shortcode `sezione` puoi creare blocchi con sfondo controllato.

Parametri disponibili:

- `sfondo`: usa un colore con il codice #000000.
- `titolo`: etichetta mostrata in alto nella sezione
- contenuto interno: blocco Markdown (testo, link, liste, enfasi)

Esempio 1:

{{< sezione sfondo="#ff2d6b" titolo="Missione" >}}
Questo blocco usa uno sfondo e supporta **Markdown**.

Puoi inserire anche [link](#) e testo su piu righe.
{{< /sezione >}}

Esempio 2:

{{< sezione sfondo="#c8f500" titolo="Call to Action" >}}
ecco un esempio di markdown:

- Punto chiave 1
- Punto chiave 2
{{< /sezione >}}

---

## Initiative cards

Le card colorate appaiono automaticamente nella pagina lista delle iniziative (`/it/iniziative/`). Ciascuna card mostra titolo, sottotitolo e una freccia. I colori ciclano: pink → purple → lime → cyan.

Per personalizzare, nel front matter di una iniziativa:

```yaml
card_color: "#ffe600"   # giallo al posto del colore ciclico
```

Se `card_color` è vuoto o assente, il colore segue il ciclo automatico basato sulla posizione della card nella griglia.

---

## Layout sidenotes vs. layout pieno

Le pagine singole (`single.html`) usano il layout sidenotes: il contenuto occupa il 72% della larghezza, e le note a margine vivono nel restante 28%.

La pagina lista (`list.html`) usa il layout pieno (`content-body-wide`) perché non ha sidenotes ma mostra le project-cards.

---

## Struttura dei file

```
assets/css/main.css        ← tutto lo stile, modifica qui i colori
assets/js/sidenotes.js     ← riposiziona le footnote Markdown a lato
assets/js/nav.js           ← toggle hamburger menu mobile
layouts/_default/baseof.html  ← template base con i font Google
layouts/_default/single.html  ← pagina singola con sidenotes
layouts/_default/list.html    ← pagina lista con project-cards
layouts/partials/header.html  ← nav bar fissa
layouts/partials/footer.html  ← footer mono
```

---

## Note per i contributori

Per visualizzare questa pagina in locale, rimuovi `draft: true` dal front matter oppure lancia Hugo con il flag `--buildDrafts`:

```bash
hugo server --buildDrafts
```
