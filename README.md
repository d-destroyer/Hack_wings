# WINGS - Social Media Platform

A full-stack social media platform built with the MERN stack (MongoDB, Express, React, Node.js) and YouTube API integration.

## Features

### 1. Home Section (Instagram-like)
- Photo and video feed posts from followed users
- Like, comment, and share functionality
- User profile pictures and usernames
- Infinite scroll pagination
- Stories section at the top
- Navigation bottom bar

### 2. Entertainment Section (YouTube Integration)
- Search YouTube videos using YouTube API
- Display trending and recommended videos
- Video preview thumbnails and titles
- Embedded video player for playback
- Category-based video browsing

### 3. Thoughts Section (Twitter-like Microblogging)
- Create text-based posts called "Thoughts"
- Character limit indicator (280 characters)
- Like, retweet, and reply functionality
- Hashtag and mention support
- Timeline of thoughts from followed users

### 4. Profile Section
- User profile with avatar and bio
- Grid display of user's posts
- Follower and following counts
- Edit profile functionality

### 5. Additional Features
- User authentication and authorization (JWT)
- Real-time notifications
- Direct messaging
- Search functionality for users
- Dark mode support

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB for data persistence
- JWT for authentication
- Socket.io for real-time features

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Framer Motion for animations

## Project Structure

```
wings101/
├── backend/
│   ├── models/          # MongoDB models
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Thought.js
│   │   ├── Message.js
│   │   ├── Notification.js
│   │   └── Story.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── thoughts.js
│   │   ├── youtube.js
│   │   ├── messages.js
│   │   └── notifications.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   ├── config/         # Configuration
│   ├── server.js       # Main server file
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   │   ├── BottomNav.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── ...
│   │   ├── contexts/   # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/      # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Entertainment.jsx
│   │   │   ├── Thoughts.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)
- YouTube Data API Key (for Entertainment section)

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wingsdb
JWT_SECRET=your_jwt_secret_key
YOUTUBE_API_KEY=your_youtube_api_key
```

Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update current user

### Users
- `GET /api/users/search` - Search users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/:id/follow` - Follow/unfollow user
- `GET /api/users/:id/posts` - Get user's posts

### Posts
- `GET /api/posts/feed` - Get feed posts
- `POST /api/posts` - Create a post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Comment on post

### Thoughts
- `GET /api/thoughts/timeline` - Get timeline
- `POST /api/thoughts` - Create a thought
- `PUT /api/thoughts/:id/like` - Like thought
- `PUT /api/thoughts/:id/retweet` - Retweet

### YouTube
- `GET /api/youtube/search` - Search videos
- `GET /api/youtube/trending` - Get trending
- `GET /api/youtube/video/:id` - Get video details

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages
- `POST /api/messages` - Send message

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/read-all` - Mark all as read

## License

MIT
