---
title: "How Much Does Facebook Owe You?"
subtitle: "Experimenting with new forms of negotiation for digital labour"
date: 2026-04-05
weight: 3
---

You work for social media: you are their source of revenue. The more people are pigeonholed as *users*, the more these platforms gain in value, influence, and power. Let us have this value recognised. Let us start by calculating how much money Facebook owes us (and the other great platforms of exploitation). It is clear that Meta and no platform considers itself to owe anything to anyone. But this does not mean that pressure cannot be applied — and for that we need to be many!

Based on how many people report their willingness to seek total or partial reimbursement, we will provide options.

## The objective

To explore every possible way of making the quantity of value visible.

## References and numerical inputs

The following analyses provide usable figures for developing the research.

### Instagram

For Instagram, the most useful numbers for attributing or inferring the economic value of user behaviour are: approximately 2 billion monthly active global users, an advertising audience of approximately 1.91 billion people globally, approximately 179.9 million users reachable with advertising in the United States, and an estimate of 143.2 million active users in the United States. On the revenue side, one estimate places US advertising revenues at $42.52 billion in 2026. On the attention side, estimates of time spent diverge: approximately 33.9 minutes per day according to one source and 73 minutes per day according to another; furthermore, the average user reportedly opens the app more than 12 times per day. Other useful signals are the fact that 53% of advertising placements are reportedly on Reels, that 60% of consumers reportedly interact with brand content multiple times per week, that 29% of users reportedly make purchases on the platform, that approximately 130 million users click on shopping posts every month, and that Instagram Shopping is reportedly associated with approximately $40 billion in gross merchandise value (GMV). From these data one can derive synthetic indicators such as approximately $236 per US advertising user per year, approximately $297 per active US user per year, approximately $19.7 per month per monetisable user, approximately $0.65 per day, approximately $0.054 per session, and an attention value of between approximately $0.0089 and $0.0191 per minute depending on the assumption about time spent.

### Facebook

For Facebook, the most useful values exist primarily as proxies, because much data is published by Meta at the ecosystem level rather than per individual platform. Meta reported $200.966 billion in total revenues in 2025, of which $196.175 billion from advertising, 3.58 billion daily active people in the family of apps in December 2025, and a global annual ARPP of $57.03, where ARPP means average revenue per person. For Facebook in the stricter sense, estimates speak of approximately 3.07 billion monthly active global users, a global advertising audience of approximately 2.28 billion people, and approximately 197 million users reachable with advertising in the United States. A secondary estimate places time spent at approximately 31 minutes per day in the United States. If one uses Meta's total advertising revenue relative to Facebook's advertising reach, one obtains a very rough measure of approximately $86 per reachable advertising user per year — but it is important to remember that this is not a "pure" Facebook value: it is an indirect estimate based on multi-platform revenues.

### YouTube

For YouTube, the quantitative base is more solid because advertising revenues are reported directly by quarter: approximately $8.93 billion in Q1 2025, $9.8 billion in Q2, $10.3 billion in Q3, and $11.383 billion in Q4, for an annual total of approximately $40.413 billion in advertising revenues. In addition, Alphabet indicated that YouTube's total revenues from advertising and subscriptions exceeded $60 billion in 2025. On the user side, the global advertising reach is estimated at approximately 2.53 billion people and that in the United States at approximately 253 million; a separate estimate places global active users at approximately 2.58 billion. On the attention side, in the United Kingdom the average daily time was reported at approximately 51 minutes per day. These figures allow the construction of two synthetic indicators: approximately $16 per global advertising user per year if only advertising is considered, and approximately $23.7 per global advertising user per year as a minimum threshold if one uses the "over $60 billion" figure that includes both advertising and subscriptions.

### TikTok

For TikTok, the most important values combine audience breadth, intensity of use, and estimated advertising revenues. The platform communicated a community of over 200 million users in Europe and over 200 million users in the United States, as well as approximately 7.5 million US businesses present in the ecosystem. The global advertising reach is estimated at around 1.59 billion people, while in the United States the adult (18+) advertising reach is estimated at approximately 136 million. The average daily time in the United States is estimated at approximately 52 minutes per day, a value that makes TikTok particularly relevant in attention-based analyses. On the revenue side, a forecast places global advertising revenues 2025 at approximately $32.4 billion, while a US estimate speaks of approximately $11.2 billion. From these values one can infer approximately $20.4 per global advertising user per year and approximately $82 per adult US advertising-reachable user per year. In summary, TikTok appears particularly interesting when one wants to value user behaviour not only in terms of user base, but above all in terms of captured time and advertising monetisation density.

### Snapchat

Snapchat is useful because it combines revenue, usage, and subscription metrics in a fairly transparent manner. Snap reported approximately $5.93 billion in total revenues in 2025, of which $1.72 billion in Q4 and approximately $1.48 billion in advertising revenues in the same quarter. In Q4 2025 the platform reported 946 million MAU (monthly active users), 474 million DAU (daily active users), 24 million Snapchat+ subscribers, and an ARPU of $3.62, where ARPU means average revenue per user. The global advertising reach is estimated at approximately 709 million people, with approximately 106 million in the United States. Average usage time is placed at around 30 minutes per day. These data allow the construction of at least three levels of analysis of behavioural value: approximately $6.27 per monthly active user per year, approximately $12.51 per daily active user per year, and a direct willingness-to-pay component represented by the 24 million paying Snapchat+ users.

### X / Twitter

For X, the available figures are more fragmented, but still useful for inferring the value of user behaviour. Estimates place global 2025 advertising revenues at approximately $2.26 billion and US revenues at approximately $1.31 billion. The global advertising reach is estimated at approximately 586 million people, while that in the United States is approximately 104 million. On the attention side, one estimate places average US usage at approximately 34.1 minutes per day. X also provides a very useful signal on willingness to pay through its subscription tiers: $3 per month or $32 per year for Basic, $8 per month or $84 per year for Premium, and $40 per month or $395 per year for Premium+. Combining reach and advertising revenues yields approximate values of approximately $3.86 per global advertising user per year and approximately $12.6 per US advertising user per year. In this case, the value of behaviour can be read both as advertising value per reachable user and as a signal of propensity to pay for advanced features, visibility, and status.

## Monetary value data

Files ending in `-monetary.csv` collect variables in which the expressed value is monetary (predominantly in dollars): revenues, prices, annual value per user, value per minute or session, ARPU/ARPP, and estimates derived from explicit formulas.

Main columns, read from an analytical perspective:

- `currency`: currency or monetary unit of the value (e.g. `USD`).
- `unit`: economic metric scale (e.g. `annual revenue`, `per user-year`, `CPC`, `per minute`).
- `name`: technical identifier of the variable.
- `explanation`: operational definition of the measure and, where needed, formula/proxy used.
- `value`: observed or derived numerical value.
- `platform`: platform the measure refers to.
- `geography_year`: geographical scope and year/quarter/scenario.
- `variable_class`: distinguishes `raw` data from `derived` data.
- `reliability`: estimated reliability level (`reliable` or `exploratory`).
- `source`: source or set of sources used.

{{< csv_table src="/data/instagram-monetary.csv" title="Instagram monetary (CSV)" maxRows="4" >}}

{{< csv_table src="/data/social-platforms-monetary.csv" title="Other platforms monetary (CSV)" maxRows="4" >}}

## Other non-monetary measurements

Files ending in `-other.csv` maintain almost the same structure, but the focus is not money: here you find user bases, ad reach, time-on-platform, percentages, coefficients, and other non-monetary indicators used to contextualise economic valuation.

Key differences from the previous files:

- the first column is `subject` (not `currency`) to indicate the nature of the data (`users`, `minutes`, `percent`, `coefficient`, etc.);
- the values describe volume, frequency, intensity, or statistical relationships, not direct prices or revenues;
- they serve as contextual base for subsequently constructing derived monetary indicators.

{{< csv_table src="/data/instagram-other.csv" title="Instagram other (CSV)" maxRows="4" >}}

{{< csv_table src="/data/social-platforms-other.csv" title="Other platforms other (CSV)" maxRows="4" >}}

## How to design a questionnaire for mapping behavioural value?

What we want to measure, in order to then critique or reclaim it, is:
how much time one surrenders to the platform,
how much free content labour one provides,
how much traffic and attention one attracts from others,
how monetisable one is as an advertising and commercial target.

The question sequence could proceed from:
presence → intensity → production → audience → monetisation → dependency.

Here is a proposal:

### Section 1 — Presence

year of registration
years of regular use
any breaks

### Section 2 — Time

days/week
sessions/day
minutes/day

### Section 3 — Activity

consumption
interaction
production

### Section 4 — Output

number of contents
creation time
management time

### Section 5 — Reach

followers/friends/subscribers
average views
average engagement

### Section 6 — Indirect monetisation

ads viewed
clicks
purchases
subscriptions/payments

### Section 7 — Centrality

social/professional use
dependency
replaceability
