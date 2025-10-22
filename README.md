# Safety Induction Chatbot

A React-based Safety Induction Chatbot that helps users learn about safety policies and procedures through an interactive chat interface.

## Features

- **Interactive Chat Interface**: Clean, modern chat UI with message bubbles and timestamps
- **Keyword-based Search**: Type safety-related keywords to get instant information
- **JSON Server Backend**: Mock API server serving safety policy data
- **Smart Keyword Matching**: Fuzzy matching and synonym support for better user experience
- **Help System**: Built-in help to show available topics
- **Real-time Responses**: Instant responses with loading indicators

## Available Safety Topics

- Personal Protective Equipment (PPE)
- Speed Limit
- Emergency Siren
- Assembly Point
- Health Safety Policy
- Alcohol Policy
- Fire Safety
- Safety Breach
- SWA (Stop Work Authority)
- TTTC (Take Time Take Charge)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the JSON Server (in a separate terminal):
```bash
npm run json-server
```
This will start the mock API server on `http://localhost:3001`

3. Start the development server:
```bash
npm run dev
```
This will start the React app on `http://localhost:5173`

## Usage

### Example Queries

- Type "speed" → Get speed limit information
- Type "fire safety" → Learn about fire safety procedures
- Type "ppe" → Get PPE requirements
- Type "alcohol" → Learn about alcohol policy
- Type "emergency" → Get emergency procedures
- Type "swa" → Learn about Stop Work Authority
- Type "tttc" → Understand Take Time Take Charge

### Help System

Click the help icon (?) in the chat input to see all available topics.

## API Endpoints

The JSON Server provides the following endpoint:

- `GET http://localhost:3001/safety` - Returns all safety policy data

## Project Structure

```
src/
├── components/
│   ├── ChatInput.tsx      # Chat input component with send functionality
│   ├── ChatMessage.tsx    # Individual message bubble component
│   └── ui/               # Reusable UI components
├── hooks/
│   └── useChat.ts        # Custom hook for chat functionality
├── services/
│   └── safetyService.ts  # API service for safety data
├── types/
│   └── chat.ts           # TypeScript type definitions
└── screens/
    └── SignIn/
        └── SignIn.tsx    # Main chat interface
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: JSON Server (mock API)
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Customization

### Adding New Safety Topics

1. Update `db.json` with new safety information
2. Add keyword mappings in `SafetyService.keywordMap` if needed
3. The chatbot will automatically recognize new topics

### Styling

The app uses Tailwind CSS with a dark theme. Modify the classes in components to change the appearance.

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.