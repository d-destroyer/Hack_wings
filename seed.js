import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Story from './models/Story.js';
import Thought from './models/Thought.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wingsdb';

const sampleUsers = [
  {
    username: 'aesthetic_soul',
    email: 'aesthetic@example.com',
    password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN', // password: password123
    displayName: 'Aesthetic Soul',
    bio: 'Finding beauty in everything ✨',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
    website: 'https://example.com',
    isPrivate: false
  },
  {
    username: 'wanderlust_ explorer',
    email: 'wanderlust@example.com',
    password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN',
    displayName: 'Wanderlust Explorer',
    bio: 'Travel ✈️ Adventure 🌍',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    website: '',
    isPrivate: false
  },
  {
    username: 'creative_mind',
    email: 'creative@example.com',
    password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN',
    displayName: 'Creative Mind',
    bio: 'Design | Art | Music 🎨',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
    website: 'https://creative.com',
    isPrivate: false
  },
  {
    username: 'fitness_guru',
    email: 'fitness@example.com',
    password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN',
    displayName: 'Fitness Guru',
    bio: 'Health is wealth 💪',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    coverImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    website: '',
    isPrivate: false
  },
  {
    username: 'foodie_paradise',
    email: 'foodie@example.com',
    password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN',
    displayName: 'Foodie Paradise',
    bio: 'Food is life 🍕',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    website: '',
    isPrivate: false
  }
];

const samplePosts = [
  {
    caption: 'Beautiful sunset at the beach 🌅 #aesthetic #sunset',
    media: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', type: 'image' }
    ],
    location: 'Miami Beach',
    tags: ['aesthetic', 'sunset', 'beach']
  },
  {
    caption: 'Morning coffee vibes ☕',
    media: [
      { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', type: 'image' }
    ],
    location: '',
    tags: ['coffee', 'morning']
  },
  {
    caption: 'Urban exploration in the city 🌆',
    media: [
      { url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', type: 'image' }
    ],
    location: 'New York City',
    tags: ['urban', 'city', 'explore']
  },
  {
    caption: 'Nature therapy 🌲🌿',
    media: [
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', type: 'image' }
    ],
    location: 'Forest Park',
    tags: ['nature', 'forest', 'peace']
  },
  {
    caption: 'Mountain adventures await 🏔️',
    media: [
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', type: 'image' }
    ],
    location: 'Rocky Mountains',
    tags: ['mountain', 'adventure', 'hiking']
  },
  {
    caption: 'Street art discovery 🎨',
    media: [
      { url: 'https://images.unsplash.com/photo-1487452066049-a710f7296400?w=800', type: 'image' }
    ],
    location: 'Berlin',
    tags: ['art', 'street', 'creative']
  },
  {
    caption: 'Ocean waves 🌊',
    media: [
      { url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800', type: 'image' }
    ],
    location: 'Pacific Coast',
    tags: ['ocean', 'waves', 'peace']
  },
  {
    caption: 'City lights at night 🌃',
    media: [
      { url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800', type: 'image' }
    ],
    location: 'Tokyo',
    tags: ['night', 'city', 'lights']
  }
];

const sampleThoughts = [
  {
    text: 'The best things in life are free - sunshine, laughter, and good company ☀️',
    isPublic: true
  },
  {
    text: 'Every day is a new opportunity to create something beautiful ✨',
    isPublic: true
  },
  {
    text: 'Simplicity is the ultimate sophistication 🌿',
    isPublic: true
  },
  {
    text: 'Dream big, work hard, stay focused 🚀',
    isPublic: true
  },
  {
    text: 'Happiness depends upon ourselves 🎭',
    isPublic: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Story.deleteMany({});
    await Thought.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create users
    console.log('Creating users...');
    const users = await User.create(sampleUsers);
    console.log(`✅ Created ${users.length} users`);

    // Create posts (distributed among users)
    console.log('Creating posts...');
    const posts = [];
    for (let i = 0; i < samplePosts.length; i++) {
      const userIndex = i % users.length;
      const post = new Post({
        ...samplePosts[i],
        user: users[userIndex]._id,
        likes: [],
        saves: [],
        comments: [],
        isStory: false
      });
      posts.push(post);
    }
    await Post.insertMany(posts);
    console.log(`✅ Created ${posts.length} posts`);

    // Create stories
    console.log('Creating stories...');
    const stories = [];
    for (let i = 0; i < 5; i++) {
      const story = new Story({
        user: users[i]._id,
        media: {
          url: samplePosts[i].media[0].url,
          type: 'image'
        },
        caption: `Story ${i + 1}`,
        views: [],
        likes: [],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isActive: true
      });
      stories.push(story);
    }
    await Story.insertMany(stories);
    console.log(`✅ Created ${stories.length} stories`);

    // Create thoughts
    console.log('Creating thoughts...');
    const thoughts = [];
    for (let i = 0; i < sampleThoughts.length; i++) {
      const thought = new Thought({
        ...sampleThoughts[i],
        user: users[i % users.length]._id,
        likes: [],
        comments: []
      });
      thoughts.push(thought);
    }
    await Thought.insertMany(thoughts);
    console.log(`✅ Created ${thoughts.length} thoughts`);

    // Add some follows
    console.log('Setting up follows...');
    await User.findByIdAndUpdate(users[0]._id, {
      $addToSet: {
        followers: users[1]._id,
        following: users[1]._id
      }
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $addToSet: {
        followers: users[0]._id,
        following: users[0]._id
      }
    });
    console.log('✅ Follows set up');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('Email: aesthetic@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
