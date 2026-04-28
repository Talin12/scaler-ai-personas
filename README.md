# Persona-based AI Chatbot (React + Vite + Tailwind)

A clean, mobile-responsive, ChatGPT-style web app with a Scaler-inspired orange accent. It includes three persona tabs (each with its own system prompt), suggestion chips, typing indicator, timestamps, and friendly error handling.

> Note: This project calls the OpenRouter API directly from the frontend (no backend), as required. This exposes the API key to anyone who can load the app, so **do not** use a production key you care about.

## Live link

[DEPLOYED_URL]

## Screenshots

- (Add screenshots here)

## Setup

1) Clone and install dependencies:

```bash
npm install
```

2) Create a `.env` file (copy from `.env.example`) and set your key:

```bash
cp .env.example .env
```

Set:

- `VITE_OPENROUTER_API_KEY=...`

3) Run the dev server:

```bash
npm run dev
```

## Persona prompts

Fill in the placeholders in:

- `src/prompts/anshumanPrompt.js` → `[ANSHUMAN_SYSTEM_PROMPT]`
- `src/prompts/abhimanyuPrompt.js` → `[ABHIMANYU_SYSTEM_PROMPT]`
- `src/prompts/kshitijPrompt.js` → `[KSHITIJ_SYSTEM_PROMPT]`

## Project structure

```txt
src/
  App.jsx
  components/
    ChatWindow.jsx
    MessageBubble.jsx
    PersonaSwitcher.jsx
    SuggestionChips.jsx
    TypingIndicator.jsx
  prompts/
    anshumanPrompt.js
    abhimanyuPrompt.js
    kshitijPrompt.js
.env.example
README.md
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
