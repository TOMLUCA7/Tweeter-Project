// Handles user interactions and connects Model and View
import {
  addComment,
  addPost,
  removeComment,
  removePost,
  getPosts,
} from "./model.js";

import { Renderer } from "./render.js";

// test all functions

// // Test adding a post
// addPost("This is my own post!");
// console.log(getPosts());
// // Should add: {text: "This is my own post!", id: "p3", comments: []}

// // Test removing a post
// removePost("p1");
// console.log(getPosts());
// // Should only have two posts left

// // Test adding comments
// addComment("p3", "Damn straight it is!");
// addComment("p2", "Second the best!");
// console.log(getPosts());

// // Test removing comments
// removeComment("p2", "c6");
// console.log(getPosts());

Renderer.renderPosts(getPosts());
