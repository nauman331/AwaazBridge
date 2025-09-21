# 🚀 AwazBridge Development Setup

## Quick Start Instructions

### 1. Backend Server Setup

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Frontend Client Setup

```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:5173`

### 3. Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awaazbridge
OPENAI_API_KEY=your_openrouter_api_key_here
JWT_SECRET=your_jwt_secret_here
```

### 4. Test the Application

1. Open two browser windows/tabs to `http://localhost:5173`
2. Navigate to Video Call section in both windows
3. Set language preferences:
   - User 1: I speak English, I want to hear Urdu
   - User 2: I speak Urdu, I want to hear English
4. Copy the socket ID from one window and paste in the other to make a call
5. Start speaking and watch real-time translation!

## Features Implemented ✅

### Real-time Voice Translation

- Speech Recognition (STT) with Web Speech API
- AI-powered translation using OpenAI GPT-4o-mini
- Text-to-Speech (TTS) playback
- Support for 15+ languages including Urdu, English, Arabic, Hindi

### Video Calling

- WebRTC peer-to-peer video calls
- Audio/video controls (mute/unmute, camera on/off)
- Connection state monitoring
- Proper cleanup on call end

### UI/UX

- Modern shadcn/ui components
- Responsive design with Tailwind CSS
- Real-time translation history display
- Language selector with flags
- Beautiful gradients and animations

### Backend Services

- Socket.io for real-time communication
- Enhanced translation service with fallbacks
- Error handling and logging
- MongoDB integration ready

## How It Works

1. **Call Initiation**: User A calls User B using socket ID
2. **Language Setup**: Both users select their input/output languages
3. **Speech Recognition**: When User A speaks, STT converts speech to text
4. **Translation**: Text is sent to backend, translated via AI
5. **Audio Playback**: Translated text is converted to speech for User B
6. **Bidirectional**: Same process works in reverse for User B

## Technical Architecture

```
Frontend (React + TypeScript)
├── WebRTC Service (Peer-to-peer calls)
├── STT Hook (Speech recognition)
├── TTS Hook (Text-to-speech)
├── Socket.io Client (Real-time messaging)
└── shadcn/ui Components

Backend (Node.js + Express)
├── Socket.io Server (Real-time events)
├── OpenAI Translation Service
├── MongoDB Models
└── Authentication (JWT)
```

## Development Notes

- The system supports real-time continuous speech recognition
- Translation happens only for final speech results to avoid spam
- Fallback to Google Translate if OpenAI fails
- Automatic speech recognition restart for continuous listening
- Proper WebRTC cleanup prevents memory leaks

## Next Steps for Production

1. Add user authentication and registration
2. Implement call recording and transcript storage
3. Add mobile app support
4. Implement TURN servers for better connectivity
5. Add call quality metrics and analytics
6. Implement group calling features

Happy coding! 🎉
