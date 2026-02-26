import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Story from './models/Story.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wingsdb';

// Media files from uploads folder
const videoFiles = [
  '1759981409137.mp4', '1759981696555.mp4', '1759982941998.mp4',
  '1759983240163.mp4', '1759983526834.mp4', '1759991510134.mp4',
  '1759993114047.mp4', '1759993128556.mp4', '1760130132159.mp4',
  '1760130144172.mp4', '1760130179092.mp4', '1760130780470.mp4',
  '1760130792014.mp4', '1760130975140.mp4', '1760131211142.mp4',
  '1760133137084.mp4', '1760133171881.mp4', '1760133201641.mp4',
  '1760154606058.mp4', '1760244778486.mp4', '1760253088863.mp4',
  '1760253173240.mp4', '1760459891415.mp4'
];

const imageFiles = [
  '1759980602406.jpg', '1759980672240.jpeg', '1759981395229.jpg',
  '1759983216874.jpeg', '1759990187468.jpg', '1759990730777.png',
  '1759990961097.jpeg', '1759990998419.gif', '1759991021809.jpeg',
  '1759991091202.jpeg', '1759991149701.jpeg', '1759991226433.jpeg',
  '1759991239663.jpeg', '1759991306799.jpeg', '1759991382348.jpeg',
  '1759991637631.jpeg', '1759992405389.png', '1759992451131.jpeg',
  '1759992462450.jpg', '1759992476982.jpeg', '1759992500122.jpeg',
  '1759992679389.jpg', '1759992739177.jpg', '1759992776083.jpeg',
  '1759992798087.jpeg', '1759992822190.jpeg', '1759992970497.jpeg',
  '1759993077137.jpg', '1759993114047.mp4', '1759993128556.mp4',
  '1759997428488.jpg', '1760114381021.jpeg', '1760114692201.jpeg',
  '1760133105408.gif', '1760133113167.jpg', '1760141899063.jpeg',
  '1760141922240.jpeg', '1760141937899.jpg', '1760145185382.png',
  '1760153981597.jpeg', '1760156730203.png', '1760156950622.png',
  '1760162540159.jpeg', '1760163167692.jpeg', '1760163339903.jpeg',
  '1760163611029.png', '1760244352915.jpeg', '1760244722800.jpeg',
  '1760244730132.jpeg', '1760244737830.jpeg', '1760244770753.jpeg',
  '1760244778486.mp4', '1760245013804.jpeg', '1760245022479.jpeg',
  '1760245152491.jpeg', '1760245165367.jpeg', '1760245173308.jpeg',
  '1760253088863.mp4', '1760253173240.mp4', '1760253196121.jpeg',
  '1760260314003.png', '1760459544234.jpeg', '1760459558148.jpeg',
  '1760459734498.png', '1760459891415.mp4', '1765251841110.png',
  'post1.jpg', 'post2.jpg', 'post3.jpg', 'post4.jpg', 'post5.jpg', 'post6.jpg',
  'profile.jpg', 'profile2.jpg'
];

const captions = [
  'Beautiful moment captured 📸',
  'Living my best life ✨',
  'Adventures await 🌍',
  'Making memories 💫',
  'Simply beautiful 🌸',
  'Grateful for today 🙏',
  'New day, new possibilities 🌅',
  'Finding beauty in the ordinary 🌿',
  'Chasing dreams 🚀',
  'Life is beautiful 🎭',
  'Creating memories 📸',
  'Good vibes only ✌️',
  'Stay positive, stay happy 😊',
  'Nature therapy 🌲',
  'City lights 🌃',
  'Ocean vibes 🌊',
  'Mountain hiking 🏔️',
  'Sunset dreams 🌅',
  'Morning coffee ☕',
  'Weekend vibes 🎉'
];

async function seedMedia() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get existing users or create one
    let users = await User.find({});
    if (users.length === 0) {
      console.log('No users found. Creating default user...');
      const defaultUser = await User.create({
        username: 'media_user',
        email: 'media@example.com',
        password: '$2a$10$xJwK5Q2Vhz1qP5qN5qN5qO5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN5qN',
        displayName: 'Media User',
        bio: 'Sharing beautiful moments',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        isPrivate: false
      });
      users = [defaultUser];
    }
    console.log(`✅ Found ${users.length} users`);

    // Clear existing posts and stories
    await Post.deleteMany({});
    await Story.deleteMany({});
    console.log('✅ Cleared existing posts and stories');

    // Create posts from images
    console.log('Creating posts from images...');
    const posts = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const userIndex = i % users.length;
      const isVideo = imageFiles[i].endsWith('.mp4') || imageFiles[i].endsWith('.gif');
      
      const post = new Post({
        user: users[userIndex]._id,
        caption: captions[i % captions.length],
        media: [{
          url: `http://localhost:5000/uploads/${imageFiles[i]}`,
          type: isVideo ? 'video' : 'image'
        }],
        location: '',
        tags: [],
        likes: [],
        saves: [],
        comments: [],
        isStory: false
      });
      posts.push(post);
    }
    await Post.insertMany(posts);
    console.log(`✅ Created ${posts.length} posts`);

    // Create stories from images
    console.log('Creating stories...');
    const stories = [];
    for (let i = 0; i < Math.min(10, imageFiles.length); i++) {
      const userIndex = i % users.length;
      const isVideo = imageFiles[i].endsWith('.mp4') || imageFiles[i].endsWith('.gif');
      
      const story = new Story({
        user: users[userIndex]._id,
        media: {
          url: `http://localhost:5000/uploads/${imageFiles[i]}`,
          type: isVideo ? 'video' : 'image'
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

    // Store video files list for reels
    console.log(`✅ Video files available: ${videoFiles.length}`);

    console.log('\n🎉 Media seeding completed!');
    console.log(`Total posts: ${posts.length}`);
    console.log(`Total stories: ${stories.length}`);
    console.log(`Video files: ${videoFiles.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding media:', error);
    process.exit(1);
  }
}

seedMedia();
