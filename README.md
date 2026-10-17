# PixelHub Café — Gaming Café Website

A single-page website for a fictional gaming café, built with **vanilla JavaScript,
HTML5 and CSS3** (no frameworks) for the **Web Technologies** course
(Faculty of Mathematics and Computer Science, University of Bucharest, 2025).

## Features
- Dropdown navigation and sections for services, gear, prices and contact, with a neon CSS theme
- Member login with regex validation (`^[a-zA-Z0-9]{3,}$`), session kept in `localStorage`, plus logout
- Events and partners loaded asynchronously from `date.json` with the Fetch API
- DOM events: random neon logo colour on click (with `stopPropagation`), Enter-to-login,
  section highlight on hover, timed promo pop-up, small logo animation
- A glowing shape drawn with the Canvas API

## Run it locally
`fetch()` does not work when the page is opened directly as a file, so serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
