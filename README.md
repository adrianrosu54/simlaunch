# SimLaunch

## FTC DECODE Flywheel Launcher Simulation

Web visualiser application for robot launcher physics in the FTC DECODE Season
(2025-2026) made by team **Clockworks** #19075 from Bucharest, Romania.

Key features:

* **Dynamic charts** and **indicators** for launcher parameters:
  * trajectory plots
  * field view display
  * impact error calculation
* Real time trajectory simulation accounting for **gravity** and basic **drag force**
  ([linear velocity dependent drag](https://en.wikipedia.org/wiki/Drag_(physics)#The_drag_equation))
* **Interactive controls** for launcher parameters:
  * Flywheel velocity slider
  * Launcher heading compass
* Manual drop-down inputs for fine tuning parameter values
  * Tweak-able measurement units

This project was made using **Astro** and **React**, along with **Plotly.js**
for charts.

## Getting started

Prerequisites:

* `Node.js` version 22 or newer

Clone, move to the project directory and install using npm.

```bash
npm install
vim .env    # enter environment variables
npm run dev # run local dev server on port 4321
```

## License

Copyright (c) 2026 Adrian Roșu. All Rights Reserved.

This repository is available for viewing purposes only. See LICENSE for
details.
