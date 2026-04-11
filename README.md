# AgriPio - Smart Farming with IP Protection

** 2026 AgriPio Team**  
**Rwanda National IP Club Winners 2026 – Competing at ARIPO Regional**

**Team:** KWIZERA Elissa · INEZA Elyon Ivo · INEZA Aliza · ISHIMWE Ornella

## 🌱 About AgriPio

AgriPio is a clean, production-grade full-stack web application designed primarily for farmers and people interested in agriculture. It helps farmers improve productivity by learning about Intellectual Property Rights — especially Copyright and Related Rights — so they understand how to protect their own creative agricultural works (farming guides, videos, photos, new methods, software, etc.).

This directly supports the ARIPO theme: **"Intellectual Property and the Creative Industries: a perfect tool for development"**.

## 🚀 Features

### Core Features
- **Landing Page** - Non-scrollable hero with glowing "Agripio" branding
- **Onboarding** - Account creation with mandatory IP Terms & EULA
- **Farmer Dashboard** - Quick AI Guide preview and prominent Club Hub button
- **AI Farm Guide** - Real streaming conversational AI with IP integration
- **My Projects** - AI turns conversations into trackable farming projects with IP protection
- **IP Learning (Copyright Shield)** - Farmer-friendly lessons on Copyright and Related Rights
- **IoT Module** - Bluetooth pairing simulation, plant camera, live sensor dashboard
- **Club Hub** - Team page showing 20 club members and resources

### Key Features
- Multi-language support (English + Kinyarwanda + French + Swahili)
- Mobile-first, low-bandwidth friendly design
- Emerald green + gold accent theme
- Strong but natural IP respect visible everywhere
- All data from Supabase (real data, no fake)
- Clean, farmer-friendly design — big buttons, simple language

## 🛠 Tech Stack

- **Frontend:** React 18.3.1 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth + Postgres + Realtime + Storage)
- **AI:** Anthropic Claude for AI chat
- **Deployment:** Production-ready with environment variables

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project
- Anthropic Claude API key

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd agripio-intelligent-farm-systems
npm install
```

### 2. Environment Setup
Create a `.env.local` file in root:
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Anthropic Claude
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 3. Database Setup
Run Supabase migrations:
```bash
supabase db push
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:5173` to see AgriPio running.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (App, Auth)
├── hooks/             # Custom React hooks
├── integrations/       # Supabase integration
├── lib/              # Utilities and AI functions
├── pages/             # Main application pages
├── test/             # Test files
└── types/            # TypeScript type definitions
```

## 🌍 Multi-Language Support

AgriPio supports 6 languages:
- English
- Kinyarwanda  
- Français
- Kiswahili
- Luganda
- isiZulu

Language files are located in `src/lib/translations.ts`.

## 🛡️ IP Protection Features

### Copyright Shield
- Automatic copyright notices on all content
- IP education integrated throughout the app
- Copyright protection checklists for projects
- Watermarked PDF generation for project exports

### IP Learning Module
- Farmer-friendly lessons on Copyright and Related Rights
- Real farming scenarios and examples
- Interactive quizzes and certificates
- IP Respect Pledge option

## 📱 Mobile-First Design

- Responsive design optimized for mobile devices
- Low-bandwidth friendly with shimmer loaders
- Touch-friendly buttons and interactions
- Progressive Web App ready

## 🤖 AI Integration

### AgriGuide AI Assistant
- Streaming conversational AI powered by Claude
- Natural IP rights guidance in every response
- Project creation and tracking
- Practical farming advice + IP protection tips

### Plant Scanner
- Camera-based plant disease detection
- AI-powered analysis with recommendations
- IP tips for protecting farming innovations

## 🔧 IoT Features

### Bluetooth Integration
- Real Web Bluetooth API support
- Fallback simulation for testing
- Sensor data visualization
- Live connection status

### Arduino Data Flow
- Real-time sensor data (moisture, pH)
- Historical data visualization
- Sync status and alerts

## 👥 Club Hub

### Team Members
- 20 club members with profiles
- Core team highlighted (4 members)
- Session attendance tracking
- Expertise areas displayed

### Resources
- IP learning materials
- ARIPO competition information
- Community video sharing
- Extra learning resources

## 📊 Data Management

### Supabase Integration
- Authentication with role-based access
- Real-time data synchronization
- File storage for images and videos
- PostgreSQL database with proper relationships

### Key Tables
- `profiles` - User profiles and farm data
- `projects` - Farming projects with IP status
- `community_videos` - User-generated content
- `ip_learning_progress` - Learning module progress

## 🎨 Design System

### Theme
- **Primary:** Emerald Green (#10b981)
- **Accent:** Gold (#f59e0b)
- **Clean:** White and gray backgrounds
- **Farmer-friendly:** Large buttons, simple language

### Components
- shadcn/ui component library
- Custom glass-card effects
- Gradient backgrounds and buttons
- Smooth animations and transitions

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Environment Variables
Required for production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ANTHROPIC_API_KEY`

### Build and Deploy
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🔒 Security

- Supabase Row Level Security (RLS) enabled
- API keys stored in environment variables
- IP protection notices throughout
- Copyright watermarks on exports
- Secure file uploads with validation

## 📈 Performance

- Optimized React components with memo
- Lazy loading for heavy components
- Image optimization and compression
- Efficient state management
- Progressive loading with skeleton screens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

 2026 AgriPio Team. All rights reserved.

This application itself is protected by copyright and demonstrates IP protection principles throughout.

## 📞 Support

For support or questions:
- Team: KWIZERA Elissa · INEZA Elyon Ivo · INEZA Aliza · ISHIMWE Ornella
- Competition: Rwanda National IP Club Winners 2026 – Competing at ARIPO Regional

---

** Smart farming tools + Copyright education for better productivity**
