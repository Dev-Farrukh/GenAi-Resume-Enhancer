# GenAI Resume Enhancer 📄
An AI-powered web application that tailors resumes to specific job descriptions. It rewrites and optimizes resume content in real time, renders ATS-friendly PDFs, and generates tailored interview preparation plans to help job seekers stand out.

🔗 **Live Demo:** [genai-resume-enhancer.vercel.app](https://genai-resume-enhancer.vercel.app/)

## Features ✨
- AI-powered resume analysis and content enhancement
- Automated job-description tailoring — matches resume content to a target JD
- ATS-friendly PDF rendering and export
- Tailored interview preparation plans based on the target role
- Real-time resume optimization and suggestions
- Clean, responsive UI for editing and previewing resumes

## Technologies Used 🛠️
### Frontend 💻
- React.js
- Modern CSS / Tailwind CSS
- Axios (API requests)

### Backend ⚙️
- Node.js
- Express.js
- Generative AI API integration (e.g. Gemini / OpenAI) for content enhancement
- PDF generation library for ATS-friendly export

> Note: Adjust the exact package names above to match `Backend/package.json` and `Frontend/package.json` if they differ.

## Project Structure 📁
```text
Backend/    Express API, AI integration, and PDF generation logic
Frontend/   React client application
```

## Installation and Setup 🚀
### Prerequisites
- Node.js 18 or later
- An API key for the generative AI provider used by the backend (e.g. Gemini or OpenAI)

### Clone the Repository
```bash
git clone https://github.com/Dev-Farrukh/GenAi-Resume-Enhancer.git
cd GenAi-Resume-Enhancer
```

### Install Dependencies
Install the frontend and backend dependencies separately:
```bash
cd Backend
npm install
cd ../Frontend
npm install
```

### Configure the Backend
Create a `.env` file inside `Backend/` with the following values:
```env
PORT=5000
AI_API_KEY=your_generative_ai_api_key
FRONTEND_URL=http://localhost:5173
```
Do not commit `.env` files or other secrets.

### Run the Backend
```bash
cd Backend
npm run dev
```

### Run the Frontend
Open a second terminal:
```bash
cd Frontend
npm run dev
```
Open the local URL shown by the dev server in your browser.

## Available Scripts 📜
### Frontend 💻
- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint

### Backend ⚙️
- `npm run dev` - Start the backend in development mode

## How It Works 🔍
1. Upload or paste your resume content.
2. Paste the target job description.
3. The AI engine analyzes both and suggests tailored, ATS-optimized content.
4. Export the enhanced resume as an ATS-friendly PDF.
5. Get a personalized interview preparation plan for the target role.

## Contact 📞
For questions or suggestions, open an issue in the [project repository](https://github.com/Dev-Farrukh/GenAi-Resume-Enhancer) or connect on [LinkedIn](https://linkedin.com/in/dev-farrukh).
