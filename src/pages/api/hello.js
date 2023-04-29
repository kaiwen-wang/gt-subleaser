// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })


}



// APIs I probably need:


// Login
// Logout
// Create sublease -> post to backend
// Filter -> Fetch matching posts from backend

// Currently filtering is client side--which doesn't make sense as if I just have a global state then I'd have to download everything
// Sort can be done client side