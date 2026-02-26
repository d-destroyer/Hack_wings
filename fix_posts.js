const mongoose = require('mongoose');
const Post = require('./backend/models/Post');

async function fixPosts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/instagram'); // adjust if different

    const posts = await Post.find();
    for (let post of posts) {
      if (!Array.isArray(post.comments) || post.comments.some(c => typeof c !== 'object' || c === null)) {
        post.comments = [];
        await post.save();
        console.log('Fixed post:', post._id);
      }
    }
    console.log('All posts fixed');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing posts:', error);
    process.exit(1);
  }
}

fixPosts();