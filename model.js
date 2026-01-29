// Handles data operations for posts and comments

const postIdCounter = 0; // to count total posts
const commentIdCounter = 0; // to count total comments

const Posts = [
  {
    text: "First post!",
    id: "p1",
    comments: [
      { id: "c1", text: "First comment on first post!" },
      { id: "c2", text: "Second comment on first post!!" },
      { id: "c3", text: "Third comment on first post!!!" },
    ],
  },
  {
    text: "Aw man, I wanted to be first",
    id: "p2",
    comments: [
      { id: "c4", text: "Don't worry second poster, you'll be first one day." },
      { id: "c5", text: "Yeah, believe in yourself!" },
      { id: "c6", text: "Haha second place what a joke." },
    ],
  },
];

// Public functions

// returns the posts array
export const getPosts = () => {
  if (Posts.length === 0) return "You Have No Posts !";
  return Posts;
};

// adds a new post object to posts
export const addPost = (text) => {
  // Generate unique post ID
  const newIdNumber = Posts.length + 1;
  const newPostId = `p${newIdNumber}`;

  // Create the new post object
  const newPost = {
    text: text,
    id: newPostId,
    comments: [],
  };

  // Add to the Posts array
  Posts.push(newPost);
};

// removes a post by ID
export const removePost = (postID) => {
  const index = Posts.findIndex((post) => post.id === postID);
  if (index !== -1) {
    Posts.splice(index, 1);
  }
};

// adds a comment to a specific post
export const addComment = (postID, text) => {
  const post = Posts.find((p) => postID === p);
  if (post) {
    const newCommentId = `c${++commentIdCounter}`;
    post.comments.push({
      id: newCommentId,
      text: text,
    });
  }
};

// removes a comment from a post
export const removeComment = (postID, commentID) => {
  const remove = Posts.find((r) => postID === r.id);
  if (remove) {
    remove.comments = remove.comments.filter((c) => c.id !== commentID);
  }
};
