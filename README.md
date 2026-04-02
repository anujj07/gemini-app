# Gemini App

A modern Gemini-inspired AI chat application built with React, Vite, and a secure serverless API layer for Gemini integration.

## Live Demo

Deployed on Vercel:

`https://gemini-app-lwao.vercel.app/`

## Overview

This project is a responsive AI chat interface that allows users to send prompts and receive answers powered by Google's Gemini model. The frontend is built with React and Vite, while the backend logic is handled through a serverless API route designed for Vercel deployment.

## Features

- Clean Gemini-style chat interface
- Prompt history with quick re-run support
- Theme toggle for light and dark modes
- Typing effect for responses
- Secure server-side Gemini API integration
- Vercel-ready deployment structure

## Tech Stack

- React 19
- Vite 6
- ESLint 9
- Google Generative AI SDK
- Vercel Serverless Functions

## Project Structure

```text
gemini-clone/
|- api/
|  |- chat.js
|- lib/
|  |- gemini.js
|- public/
|- src/
|  |- components/
|  |- Context/
|  |- assets/
|  |- App.jsx
|  |- main.jsx
|- .env.example
|- package.json
|- vite.config.js
```

## Local Setup

1. Clone the repository.
2. Open the project folder:

```bash
cd gemini-clone
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is configured for Vercel deployment.

- Set the project root directory to `gemini-clone`
- Add `GEMINI_API_KEY` in Vercel environment variables
- Deploy the project

## Author

Anuj Gawande  
Information Technology  
JSPM Rajarshi Shahu College of Engineering

