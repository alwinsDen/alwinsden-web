---
slug: compose-previews
title: Compose Previews - A Relaxed Development.
authors: [Alwin]
tags: [kotlin, android, jetpack compose]
description: Article No. 2 of the KMP series.
draft: true
---

:::info
This is the 2nd article in **Understanding KMP** series. Checkout the previous one [here](/articles/kmp-gauth-multiplatform)!
:::

Since the last post, a lot has changed on Project Dino, now renamed to [Synapse](https://github.com/alwinsDen/synapse-ai). The intense white theme has shifted to (or more like in process) adopting a bright, calm <span style={{
background: "#F3DB00", color: "#000000"}}> yellow</span> inspired from [_Pluribus(2025)_](<https://en.wikipedia.org/wiki/Pluribus_(TV_series)>). Last article's code references have been updated.

### Difference between @Preview & Live Edits

Android Studio comes with manual/automated live edits, which when user makes changes to code, reflects those in a running emulator, without needing recompliation (\*generally).

But what if the component is nested deep in a parent page that can be accessed only by authentication? What if its visible only on a specific user action like a pop-up or a toast? So, if only using Live Edits, as a dev I would have to manually trigger these flows _every single time_ or add in testing code to make this specific component always visible, not forgetting the huge resource footprint with a running emulator at all times.

The biggest sell of Previews? _**Isolation.**_

![Synapse login preview](./login_preview.png)
The above shows login page in Preview mode. Since Previews are purely UX related feature, they don't have to rely any kind of developer added component conditions.

#### Some things that Compose Previews resolves:

- **Build-and-Deploy Time Sink**: No longer need to build your app to check the backgorund changing from grey to turquoise. Previews reflect instantly.

* **UI Edge Cases and States**: As aforementioned, rather than hardcoding conditions to see error/success states of UI elements, these can be mocked with Previews, completely isolated from the core programme.

* **Display size fragmentation**: Same screen, but want to see previews for desktops and tablets? Compose has got you covered.

* **Helps you write better code**: Hmm how? Well, since Previews are decoupled from the memory states & backend, **YOUR CODE** needs to be clean enough to mock UI by just passing parameters. This comes with incredible amount of reusability for the components.

Let's go over some of these.

### Build-and-Deploy Time Sink

I deal with React for web at most times. So, cuz of this I never imagined that instant preview (or hot-reload) wasn't a gold standard on android side until very recently.

Let me show a very practical comparison.

![Synapse compile time preview](./compile_time.gif)

Since Synapse supports a shared UI, I run most of my builds on iOS simulators (much smaller memory footprint). As shown, a simple color change needed a few seconds for rebuild & installation (_though this would much faster for android builds, but still needs the same process_).

What about **Previews**?

![Synapse preview time preview](./preview_time.gif)

Bamm! Instant because preview compilation doesn't care about the rest other than the element at hand.
