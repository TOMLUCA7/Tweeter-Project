// Manages the display and rendering of posts

export const Renderer = (() => {
  // Creates jQuery element for a single comment
  const createCommentElement = (comment, postId) => {
    const $commentWrapper = $("<div>").addClass("comment-wrapper");

    const $commentDiv = $("<div>")
      .addClass("comment")
      .attr("data-id", comment.id)
      .text(comment.text);

    const $deleteBtn = $("<button>")
      .addClass("delete-comment")
      .attr("data-id", comment.id)
      .attr("data-post-id", postId)
      .text("X");

    $commentWrapper.append($commentDiv).append($deleteBtn);

    return $commentWrapper;
  };

  // Creates jQuery element for a single post
  const createPostElement = (post) => {
    const $postDiv = $("<div>").addClass("post").attr("data-id", post.id);

    // Post text
    const $postText = $("<div>").addClass("post-text").text(post.text);

    // Delete post button
    const $deleteBtn = $("<button>")
      .addClass("delete-post")
      .attr("data-id", post.id)
      .text("Delete Post");

    // Comments container
    const $commentsDiv = $("<div>").addClass("comments");

    // Render all comments for this post
    post.comments.forEach((comment) => {
      const $commentEl = createCommentElement(comment, post.id);
      $commentsDiv.append($commentEl);
    });

    // Comment input
    const $commentInput = $("<input>")
      .attr("type", "text")
      .attr("placeholder", "Got something to say?")
      .addClass("comment-input");

    // Comment button
    const $commentBtn = $("<button>")
      .addClass("comment-button")
      .attr("data-post-id", post.id)
      .text("Comment");

    // Assemble the post
    $postDiv
      .append($postText)
      .append($deleteBtn)
      .append($commentsDiv)
      .append($commentInput)
      .append($commentBtn);

    return $postDiv;
  };

  // Public function: renders all posts to the DOM
  const renderPosts = (posts) => {
    const $postsContainer = $("#posts");

    // First empty the #posts element
    $postsContainer.empty();

    // Handle empty posts or error message
    if (!Array.isArray(posts)) {
      const $messageDiv = $("<div>").addClass("no-posts-message").text(posts);
      $postsContainer.append($messageDiv);
      return;
    }

    // Loop through each post and append HTML to #posts
    posts.forEach((post) => {
      const $postElement = createPostElement(post);
      $postsContainer.append($postElement);
    });
  };

  // Expose public API
  return {
    renderPosts,
  };
})();
