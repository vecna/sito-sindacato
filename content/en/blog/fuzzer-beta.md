---
title: "The new fuzzer tries endless makeup patterns on a face video: a new experiment"
description: "How to try Local Fuzzer 1.1.0, read escape rate and pose atlas, and share anonymous statistics and selected Ghostyles without sending videos or descriptors."
url: /en/blog/fuzzer-beta/
translationKey: ghostmaxxing-local-fuzzer-beta
initiative: ghostati
image: /images/ghostati/fuzzer/fuzzer-candidates.png
date: 2026-11-12T20:00:00+01:00
tags:
  - Ghòstati!
  - fuzzer
  - beta
  - face recognition
---

Version **1.1.0** introduces the **Local Fuzzer**. It runs locally through Docker, takes a short video of a clean face in motion and tries many makeup patterns based on predefined recipes. It then presents the best results.

In our vocabulary, a makeup pattern designed to challenge recognition is called a **Ghostyle**. You can download the selected Ghostyle and load it into the lab. To find it, the fuzzer builds an atlas of clean poses, generates many candidates from one or more recipes and measures them across every recognisable pose.

We are looking for technical users to join a **beta test**. We want to know what makes sense without prior explanation, where the interface is ambiguous and which results are useful. All computation happens locally.

## What it is looking for

For every test, **face-api** turns the painted face into a descriptor and compares it with all the clean poses of the same person. A pose escapes when the detector loses the face, or when its distance from the nearest clean reference reaches the lab’s threshold.

The numbers describe:

- an open model whose weights are distributed with the project;
- one particular face and video;
- that lighting, that camera and those poses;
- one exact recipe, seed and set of parameters.

We cannot guarantee that the resulting makeup will work against a street camera or another system. Understanding what happens in systems that are actually deployed requires documented tests, which can be submitted through [Ghòstati! reports](/en/ghostati/report/).

For us, the value of the fuzzer is that it lets many people repeat the same family of experiments and compare their conditions. The research question is whether a digital simulation can anticipate what happens when the design is actually painted on a face.

## Trying it with Docker

You need Docker Desktop on macOS or Windows, or Docker Engine on Linux. The container includes Node, Chromium, ffmpeg, models, recipes and the interface.

```bash
docker pull ghcr.io/vecna/ghostmaxxing:latest

docker run -d --name ghostmaxxing \
  -p 127.0.0.1:11111:11111 \
  --shm-size=1g --stop-timeout 120 \
  -v ghostmaxxing-data:/data \
  ghcr.io/vecna/ghostmaxxing:latest
```

Then open [http://localhost:11111](http://localhost:11111). The interface has no authentication and must not be exposed to the network.

To stop and resume it:

```bash
docker stop ghostmaxxing
docker start ghostmaxxing
```

Jobs and results remain in the `ghostmaxxing-data` volume. An interrupted job resumes from the next safe point.

## From video to pose atlas

Record 15–60 seconds with one consenting person. The face should be large, sharp and evenly lit. Start facing forwards, then slowly turn the head right, left, up and down.

The fuzzer divides these rotations into yaw and pitch cells, selects representative frames and creates a **clean fingerprint** for every pose that face-api can describe. Together, these make up the *pose atlas*. Poses seen by the tracker but not recognised by the model remain counted as unmeasurable: the report does not hide them.

{{< article_figure src="/images/ghostati/fuzzer/fuzzer-job-summary.png" alt="Summary of a Local Fuzzer job with its pose atlas, recipe, trials and escape rate" caption="The summary of a completed job shows the pose atlas, the number of trials and the split between a lost face and an identity beyond the threshold." >}}

Videos, frames, descriptors, generated images, logs and reports remain in the local volume. The full report is therefore sensitive material, even though it is not automatically uploaded anywhere.

## Recipes, trials and Ghostyles

A recipe defines a family of interventions: the number and shape of strokes, dimensions, opacity, palette, contrast, areas of the face and constraints. The seed selects one particular realisation. Under the same conditions, the same **recipe + seed** pair reproduces the same design.

You can use the included recipes or make your own. Custom recipes are not reduced to a name: shared results include their **complete definition**, along with a stable identifier derived from its hash. A single Ghostyle is a sample; the recipe is the hypothesis we can test again on other faces.

The interface has three presets:

- **Quick**, to check the workflow and get an initial comparison;
- **Standard**, to compare palettes, regions, shapes and constraints;
- **Deep**, for a longer search without pruning.

The time required depends on the number of poses, recipes and trials, as well as the machine. Start with Quick: after the first trials, the estimated time remaining becomes more realistic.

## Reading the results

The report separates two forms of escape:

- **lost rate**: the share of poses in which the detector no longer finds a face;
- **descriptor escape rate**: the share of poses in which a face is found, but its descriptor crosses the threshold relative to every clean fingerprint.

Their sum is the **escape rate**. This is a coverage measurement: it tells us across how much of the pose range a candidate escapes. A high average is not enough, however. A video sequence can recognise a person from a single favourable frame; the report therefore also shows the **worst case** — the candidate’s weakest pose — and the yaw/pitch map.

{{< article_figure src="/images/ghostati/fuzzer/fuzzer-candidates.png" alt="Four Ghostyle candidates generated by the fuzzer with different escape rates" caption="Four candidates from the same recipe. The fuzzer retains the seed, coverage, worst case and contribution of both forms of escape." >}}

The best candidates are materialised as real Ghostyle `.js` modules, including their recipe, palette, seed and scores. The video path and filename are not written into the new shareable modules.

## The anonymous beta-testing package

At the end of a job, the **Help test the beta** section appears. Before sending anything, you can download and inspect the JSON. It contains only:

- the fuzzer version, operating system, architecture and graphics backend;
- preset and computation time;
- the number and range of poses, plus aggregate indicators of atlas quality;
- the total number of attempted, completed and pruned trials;
- the complete definition, hash, number of trials and aggregate results for each recipe;
- optionally, the individual Ghostyle `.js` modules you select;
- a short written comment and an optional participant code. If you want to connect several tests, an initial can be enough.

It does not contain videos, frames, images of the face, descriptors, skin-colour measurements, filenames, job names, local paths, logs or pose-by-pose results.

The package is sent with a `POST` to `https://ghostmaxxing.vecna.eu/api/fuzzer-results` only after you tick the consent box and press the button. The response generates a receipt with an ID and a deletion token; the page downloads it and keeps a copy in the browser.

## What feedback do we need?

After a test, tell us in particular:

1. what you expected to happen before pressing **Start**;
2. which terms or charts were difficult to understand;
3. whether it was clear that sensitive data remained local;
4. which preset you used and whether the time estimate was credible;
5. whether you created a recipe different from those included;
6. which Ghostyles you would like to test on other faces.

### Have you run the experiment?

[Write to us at info@nina.watch](mailto:info@nina.watch) with your feedback. Thank you!

---

Aggregate statistics help compare recipes and conditions; they are not used to build a dataset of faces. Selected modules can be tested on other atlases, and recipes that repeatedly work well across different people are more interesting than one isolated best candidate.

Code, issues and recipes are in the [fuzzer repository](https://github.com/vecna/ghostmaxxing). The [Local Fuzzer guide](https://ghostmaxxing.vecna.eu/docs/guides/localfuzzer.html) covers installation and workflow; the [report guide](https://ghostmaxxing.vecna.eu/docs/guides/localfuzzer-report.html) explains the measurements in detail.
