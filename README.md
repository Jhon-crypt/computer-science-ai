# Computer Science AI Chatbot

A computer science focused AI chatbot built with React and OpenAI's GPT API. This application provides interactive learning assistance for computer science topics, with code syntax highlighting and suggested follow-up topics.

## Features

- 💬 Real-time chat interface
- 🖥️ Computer science focused responses
- 📝 Code syntax highlighting
- 📚 Suggested follow-up topics
- 🎨 Clean, modern UI with dark mode support

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (comes with Node.js)
- An OpenAI API key ([Get one here](https://platform.openai.com/account/api-keys))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jhon-crypt/computer-science-ai.git
cd computer-science-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

## Running Locally

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

## Hosting

### Hosting on Replit

1. Create a new Replit from your GitHub repo
2. Add your OpenAI API key to Replit's secrets:
   - Go to "Tools" > "Secrets"
   - Add a new secret with key `OPENAI_API_KEY` and your API key as the value
3. Click "Run" to start the application

### Hosting on Other Platforms

The application can be hosted on any platform that supports Node.js applications. Here are the general steps:

1. Build the application:
```bash
npm run build
```

2. Set the environment variables:
- Set `OPENAI_API_KEY` to your OpenAI API key
- Set `NODE_ENV=production`

3. Start the production server:
```bash
npm start
```

## Usage

1. Open the application in your browser
2. Type your computer science related question in the input field
3. Press enter or click the send button
4. The AI will respond with:
   - A detailed answer
   - Code examples when relevant
   - Suggested follow-up topics

## Technology Stack

- Frontend: React, TailwindCSS, shadcn/ui
- Backend: Express.js
- API: OpenAI GPT-4
- State Management: TanStack Query
- Routing: Wouter
- Code Highlighting: react-syntax-highlighter

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.