---
title: "Ghòstati!: a new lab for experimenting with face recognition"
description: "Two analysis paths, programmable makeup and open documentation: what’s new in the software used for NINA’s Ghòstati! workshops."
url: "/en/blog/ghostati-new-software/"
translationKey: "ghostati-new-software"
image: "/images/ghostati/workshops/ws1-painting-1.jpg"
date: 2026-10-01
---

The **Ghòstati!** laboratory has been updated. You can save your face, change your makeup, draw a digital intervention and watch where a face-analysis system stops tracking or recognising you.

The software is called [Ghostmaxxing](https://ghostmaxxing.vecna.eu/): a free software project that other groups can also use. **Ghòstati!** is the initiative of NINA’s Universal Union that organises workshops and collects confidential reports about biometric surveillance. This division lets us develop a shared tool while building collective practices of experimentation and political action.

<a href="/ghostati/" target="_blank" rel="noopener noreferrer">Open the lab and try it with your face.</a>

## Finding a face and recognising it are different steps

A box around a face means the software has found one. Deciding whether that face matches someone already enrolled takes several more operations. The laboratory lets us observe this sequence:

1. **Detection.** The detector looks for a face in the image and locates it within a bounding box.
2. **Landmarks and alignment.** The system locates reference points — eyes, nose and mouth — that help describe facial geometry and make images comparable.
3. **Feature extraction.** A network turns the face image into a vector of numbers, called an *embedding* or descriptor. Extracting features and representing them as a vector are part of this same step.
4. **Comparison.** The descriptor is compared with those of the faces saved in the local database.
5. **Decision.** A threshold on the distance between vectors determines whether the system considers the face a match for one of the references.

Makeup can affect different points in this sequence: prevent a face from being found, disturb its landmarks or change the descriptor enough to break a match. Distinguishing these outcomes helps us understand what we are testing. The [pipeline explainer](https://ghostmaxxing.vecna.eu/docs/understand/face-recognition.html) goes into more detail.

## Two analysis paths, with different roles

The lab brings together **face-api.js** and **MediaPipe**. Face-api.js detects a face, calculates its landmarks and produces a descriptor of 128 numbers to compare against saved identities. This is the lab’s face-recognition pipeline.

MediaPipe adds face-mesh tracking: estimated three-dimensional geometry derived from the camera image, useful for anchoring digital makeup as you move your head. That mesh alone does not identify a person.

The code also includes an experimental path using **MediaPipe ImageEmbedder and MobileNetV3 Small**. It produces vectors and compares them using cosine similarity, but it was trained for general image similarity. Backgrounds, colours and lighting can strongly affect it: its results should be read as experiments with visual features, without assigning it the same role as the face recogniser.

The two paths let us observe different aspects of the same intervention. The [results guide](https://ghostmaxxing.vecna.eu/docs/understand/) explains how to interpret the measurements.

## Ghostyles: draw, change, retest

The lab’s digital makeup patterns are called **Ghostyles**. They are JavaScript modules that can draw on the 2D image, on the surface of the face tracked in 3D, or on both. You can apply an existing pattern, adjust its parameters and check how the system reacts.

[Face Brush](https://ghostmaxxing.vecna.eu/docs/guides/face-brush.html) lets you sketch makeup directly on your face and turn a promising experiment into a reusable module. The [Ghostyle authoring guide](https://ghostmaxxing.vecna.eu/docs/jsdoc/tutorial-ghostyle-authoring.html) explains how to write and share one.

The aim is to turn an isolated test into an experiment other people can repeat: changing the face, camera, lighting and amount of makeup to understand how much the result depends on its initial conditions.

## A laboratory to explore and inspect

The software website also provides ways to find your bearings in this field:

* The [projects catalogue](https://ghostmaxxing.vecna.eu/projects/) brings together artistic practices, research and products that intervene in computer vision: makeup, clothing, masks, light and other approaches.
* The [references archive](https://ghostmaxxing.vecna.eu/references/) collects studies, documentation and cultural work to explore methods and results.
* The [genealogy](https://ghostmaxxing.vecna.eu/genealogy.html) connects families of systems and interventions over time. It helps explain why a method designed for an older detector may fail against a newer system.
* The [documentation](https://ghostmaxxing.vecna.eu/docs/) guides you through the tools; the [developer section](https://ghostmaxxing.vecna.eu/docs/develop/) and [API reference](https://ghostmaxxing.vecna.eu/docs/jsdoc/) let you inspect and extend the code.

The code is available in two repositories: [Ghostmaxxing](https://github.com/vecna/ghostmaxxing), for the browser laboratory, and [gstmxx-backend](https://github.com/vecna/gstmxx-backend), for receiving contributions, moderation and Fediverse publication.

Recognition is processed on your device. Clips are sent to the server only when you choose to share them and give consent; confidential reports use the [separate channel managed by NINA](/en/ghostati/report/).

A successful result describes what happened with that model under those conditions. Finding out whether a pattern works on another system requires testing it. That is the work we want to do together: [run Ghòstati! workshops](/en/blog/ghostati-workshop-october-2026/), compare experiments and make the results verifiable.
