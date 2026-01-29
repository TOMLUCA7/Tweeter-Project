// Manages the display and rendering of posts

export const Renderer = (() => {
  // Creates the HTML for a single comment
  const createCommentElement = (comment, postId) => {
    const commentWrapper = document.createElement("div");
    commentWrapper.className = "comment-wrapper";

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.dataset.id = comment.id;
    commentDiv.textContent = comment.text;

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-comment";
    deleteBtn.dataset.id = comment.id;
    deleteBtn.dataset.postId = postId;
    deleteBtn.textContent = "X";

    commentWrapper.appendChild(commentDiv);
    commentWrapper.appendChild(deleteBtn);

    return commentWrapper;
  };

  // Creates the HTML for a single post
  const createPostElement = (post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.dataset.id = post.id;

    // Post text
    const postText = document.createElement("div");
    postText.className = "post-text";
    postText.textContent = post.text;

    // Delete post button
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete";
    deleteBtn.dataset.id = post.id;
    deleteBtn.textContent = "Delete Post";

    // Comments container
    const commentsDiv = document.createElement("div");
    commentsDiv.className = "comments";

    // Render all comments for this post
    post.comments.forEach((comment) => {
      const commentEl = createCommentElement(comment, post.id);
      commentsDiv.appendChild(commentEl);
    });

    // Comment input
    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Got something to say?";
    commentInput.className = "comment-input";

    // Comment button
    const commentBtn = document.createElement("button");
    commentBtn.className = "comment-button";
    commentBtn.dataset.postId = post.id;
    commentBtn.textContent = "Comment";

    // Assemble the post
    postDiv.appendChild(postText);
    postDiv.appendChild(deleteBtn);
    postDiv.appendChild(commentsDiv);
    postDiv.appendChild(commentInput);
    postDiv.appendChild(commentBtn);

    return postDiv;
  };

  // Public function: renders all posts to the DOM
  const renderPosts = (posts) => {
    const main = document.querySelector("main");

    // Keep the input section (first child of main)
    const inputSection = main.querySelector("div:first-child");

    // Clear existing posts (everything after the input section)
    const existingPosts = main.querySelectorAll(".post");
    existingPosts.forEach((post) => post.remove());

    // Handle empty posts or error message
    if (!Array.isArray(posts)) {
      const messageDiv = document.createElement("div");
      messageDiv.className = "no-posts-message";
      messageDiv.textContent = posts;
      main.appendChild(messageDiv);
      return;
    }

    // Render each post
    posts.forEach((post) => {
      const postElement = createPostElement(post);
      main.appendChild(postElement);
    });
  };

  // Expose public API
  return {
    renderPosts,
  };
})();
