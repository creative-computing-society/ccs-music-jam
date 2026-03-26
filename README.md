# ccs-music-jam

a **spotify jam–like realtime sync system** by creative computing society

---

## what's going on?

this project has two parts:

* **frontend (vite)** → plays the video
* **backend (bun)** → fetches stream URLs from youtube

flow:

```
frontend → /manifest → backend → youtube → stream url → frontend → video plays
```

---

## getting started

### 0. make a good choice today
* [install bun](https://bun.sh/docs/installation)

### 1. fork the repo

* click **fork** (top right on github)
* clone *your fork*:

```bash
git clone https://github.com/<your-username>/ccs-music-jam.git
cd ccs-music-jam
```

---

### 2. install dependencies

```bash
bun install
```

---

### 3. run the project

```bash
bun dev
```

this starts:

* backend → http://localhost:8080
* frontend → http://localhost:5173

open the frontend in your browser.

---

## making your first change (don’t overthink it)

start small:

### change the video being played

go to:

```
src/frontend/main.ts
```

replace:

```ts
const videoId = "dQw4w9WgXcQ";
```

with any youtube video id of your choice.

refresh → it should play your video

---

## project structure

```
src/
  frontend/     → (vite)
  backend/      → (bun)
  shared/       → (shared types/utilities)
```

* frontend talks to backend using `/manifest`
* vite proxy forwards frontend requests to bun server
* note: frontend never talks to youtube directly (cors will destroy you)

---

## important things to know

* `/manifest` → gives you a playable stream URL
* if `/manifest` fails → video won’t play
* backend handles youtube signature + deciphering
* frontend just plays whatever URL it gets

you don’t need to touch everything at once

---

## how to approach this project

don’t try to understand everything at once

instead:

1. change something small
2. break something
3. try and fix it
4. repeat

that’s the fastest way to move around this project and learn

---

## where this idea is going

i’ve set up just the base.

you’ll be building:

* shared playback state
* syncing between users
* realtime updates (via websockets)

think: spotify jam, but built from scratch and better (cuz you made it)

---

## common mistakes

* running only frontend (backend is required)
* editing random files without clearly knowing what it does
* trying to make things “perfect” before they work

---

## final note

if something breaks, good. it can be fixed.
and you’re probably closer to understanding it than before.
