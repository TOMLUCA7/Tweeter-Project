// Manages the display and rendering of posts

export const Renderer = (() => {
  // Creates HTML string for a single comment
  const createCommentHTML = (comment, postId) => {
    return `
      <div class="comment-wrapper">
        <div class="comment" data-id="${comment.id}">${comment.text}</div>
        <button class="delete-comment" data-id="${comment.id}" data-post-id="${postId}">X</button>
      </div>
    `;
  };

  // Creates HTML string for a single post
  const createPostHTML = (post) => {
    const commentsHTML = post.comments
      .map((comment) => createCommentHTML(comment, post.id))
      .join("");

    return `
      <div class="post" data-id="${post.id}">
        <div class="post-text">${post.text}</div>
        <button class="delete-post" data-id="${post.id}">Delete Post</button>
        <div class="comments">
          ${commentsHTML}
        </div>
        <input type="text" class="comment-input" placeholder="Got something to say?">
        <button class="comment-button" data-post-id="${post.id}">Comment</button>
      </div>
    `;
  };

  // Public function: renders all posts to the DOM
  const renderPosts = (posts) => {
    const $postsContainer = $("#posts");

    // First empty the #posts element
    $postsContainer.empty();

    // Handle empty posts or error message
    if (!Array.isArray(posts)) {
      $postsContainer.append(`<div class="no-posts-message">${posts}</div>`);
      return;
    }

    // Loop through each post and append HTML to #posts
    const postsHTML = posts.map((post) => createPostHTML(post)).join("");
    $postsContainer.append(postsHTML);
  };

  // Expose public API
  return {
    renderPosts,
  };
})();
