Tenés toda la razón, es un detalle clave para que cualquier IA que procese el documento no asuma que el sitio debe ser en inglés por el idioma de la especificación. La localización nativa (`es-AR`) es fundamental para la experiencia de usuario y el SEO local.

Aquí tenés el documento modificado e integrado con esta regla estricta:

---

# AI-READY SPECIFICATION BLUEPRINT: PROJECT PHYGITAL

## 1. Executive Summary & Context

You are an expert AI Full-Stack Engineer and Software Architect. Your mission is to implement a high-performance, ultra-lightweight, zero-maintenance web application for a business model called **"Phygital"**.

**The Business Model:** The company sells high-quality, handcrafted physical items (frames, canvases, educational panels) containing unique QR codes. The software is a value-added service; the monetization comes from the physical product. The app must cost **$0/month** to scale initially.

**User Experience Flow:**

1. The user scans a physical QR code using a native smartphone camera.
2. The browser opens a unique URL with a query parameter (e.g., `?foto=y-un-dia-crecimos-2026-06-13-at-16.32.22`).
3. The app instantly renders the image in high-fidelity full screen.
4. A discrete, translucent floating button sits at the bottom right.
5. Clicking the button opens a modal (`<dialog>`) with native sharing options, a theme toggle, and a conversion link.

---

## 2. Architectural Pillars & Constraints

Every line of code you suggest must strictly respect the following engineering principles:

* **Strict Localization (Spanish - Argentina):** **CRITICAL:** Although this technical specification blueprint and instructions are written in English for optimal LLM processing, the frontend code, text content, and interface **MUST be entirely in Spanish**. The root element configuration is non-negotiable: it must explicitly use **`<html lang="es-AR">`**.
* **Zero-Cost & Serverless:** Infrastructure consists of a static frontend (GitHub Pages or Netlify Free) and media assets stored in **Cloudflare R2** (utilizing the 10 GB free tier with $0 egress fees). No custom database or backend execution for the user client.
* **Separation of Concerns:** * **HTML5:** 100% semantic structure. No wrapper-hell or excessive `div` usage.
* **CSS3:** Modern properties only. Use `:root` variables, modern viewports (`100dvh`), and native color scheme control.
* **Vanilla JS:** Pure JavaScript using modern native Web APIs.


* **Zero Bloatware (No Junk Code):** Absolute ban on external CSS/JS libraries (No Bootstrap CDN, No jQuery, No Tailwind). Font icons are strictly forbidden. Use **Inline SVGs** directly embedded in the HTML to minimize network requests.
* **DRY Principle:** One single static template handles 1 or 10,000 different QR codes dynamically through URL parsing.

---

## 3. Technical Requirements Specification

### A. Frontend Layout & CSS Architecture

* Use dynamic viewport units (`100dvh` and `100vw`) to prevent mobile browser chrome navigation bars from breaking the image frame.
* The image canvas must use `object-fit: contain;` and preserve original aspect ratios (such as 3:2, 4:3, 5:4) preventing distortion or pixelation on zoom.
* Implement the modern CSS function `light-dark()` to manage themes. Declaring `color-scheme: light dark;` in `:root` is mandatory.
* Variables to implement:
```css
--main-clr: tomato;
--light-clr: #ffffff;
--dark-clr: #000000;

```



### B. JavaScript Native API Integration

1. **`URLSearchParams`**: Read the `foto` parameter directly from the window location. Compute the target URL matching the Cloudflare R2 public bucket address.
2. **HTML5 `<dialog>` API**: Toggle the interaction modal natively via `.showModal()` and `.close()`. Do not manipulate `display: none/block` through class toggles.
3. **Web Storage (`localStorage`)**: Persist the user's Dark Mode preference (`light` vs `dark`). On page load, evaluate the storage state and apply the corresponding `color-scheme` attribute to the `<html>` document root.

---

## 4. Current State of Implementation

The semantic HTML structure (`index.html`) has already been validated and locked. It includes inline SVGs from Bootstrap Icons, a structured `<dialog>` node, and the mandatory regional localization attribute:

```html
<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phygital Experience</title>
</head>
<body>
  <main id="app-container">
    <figure class="canvas-container">
      <img id="phygital-pic" src="" alt="Tu recuerdo Phygital" loading="eager">
    </figure>
    <button id="open-menu-btn" class="floating-btn"></button>
  </main>
  <dialog id="interaction-dialog">
    <h2>Compartir</h2>
    </dialog>
</body>
</html>

```

---

## 5. Instructions for the AI Implementation Step-by-Step

When asked to continue this project, your execution order must be:

### Step 1: CSS Architecture (`styles.css`)

Write a modern, responsive mobile-first stylesheet. You must implement the CSS custom properties, apply `light-dark()` on the `<dialog>` and background containers, ensure full viewport lockdown (`100dvh` with `overflow: hidden`), style the sliding switch container, and position the floating action button at the bottom-right corner.

### Step 2: Behavior Engine (`app.js`)

Write clean Vanilla JS.

1. Extract the query string value. (Test Case string: `"y un dia crecimos - 2026-06-13 at 16.32.22"`).
2. Attach listeners to the custom `<dialog>` controls.
3. Write the theme toggle handler that updates `localStorage` and flips the document's native `color-scheme`.

### Step 3: Deployment & Edge Configuration

Provide instructions for setting up the Cloudflare R2 bucket as a public asset server and link it seamlessly into the JavaScript URL constructor.