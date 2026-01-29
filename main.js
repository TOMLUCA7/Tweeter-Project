// Handles user interactions and connects Model and View
import {
  addComment,
  addPost,
  removeComment,
  removePost,
  getPosts,
} from "./model.js";

import { Renderer } from "./render.js";

// Controller - handles user interactions
const Controller = (() => {
  // Re-render posts after any data change
  const refresh = () => {
    Renderer.renderPosts(getPosts());
  };

  // Handle creating a new post
  const handleAddPost = () => {
    const $input = $("#post-input");
    const text = $input.val().trim();

    if (text) {
      addPost(text);
      $input.val(""); // Clear input
      refresh();
    }
  };

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    removePost(postId);
    refresh();
  };

  // Handle adding a comment to a post
  const handleAddComment = (postId, $postElement) => {
    const $input = $postElement.find(".comment-input");
    const text = $input.val().trim();

    if (text) {
      addComment(postId, text);
      $input.val(""); // Clear input
      refresh();
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (postId, commentId) => {
    removeComment(postId, commentId);
    refresh();
  };

  // Initialize all event listeners
  const init = () => {
    // Twit button - creates new posts
    $(".twit-button").on("click", handleAddPost);

    // Allow pressing Enter in post input
    $("#post-input").on("keypress", (e) => {
      if (e.key === "Enter") {
        handleAddPost();
      }
    });

    // Event delegation for dynamically created elements
    $("#posts").on("click", ".delete-post", function () {
      const postId = $(this).data("id");
      handleDeletePost(postId);
    });

    $("#posts").on("click", ".comment-button", function () {
      const postId = $(this).data("post-id");
      const $postElement = $(this).closest(".post");
      handleAddComment(postId, $postElement);
    });

    $("#posts").on("click", ".delete-comment", function () {
      const commentId = $(this).data("id");
      const postId = $(this).data("post-id");
      handleDeleteComment(postId, commentId);
    });

    // Allow pressing Enter in comment input
    $("#posts").on("keypress", ".comment-input", function (e) {
      if (e.key === "Enter") {
        const $postElement = $(this).closest(".post");
        const postId = $postElement.data("id");
        handleAddComment(postId, $postElement);
      }
    });
  };

  return {
    init,
    refresh,
  };
})();

// Initialize the app
$(document).ready(() => {
  Controller.init();
  Controller.refresh();
});
