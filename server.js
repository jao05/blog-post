// Import Express
const express = require("express");

// Import Morgan
// ********** I had to manually 'npm install morgan' after 'npm install'. Is that normal?
const morgan = require("morgan");

// Import the router file
const blogPostsRouter = require("./blogPostsRouter");

// Instantiate an Express app
const app = express();

// To use HTTP logging
app.use(morgan("common"));

// To parse JSON sent in request
app.use(express.json());

// you need to import `blogPostsRouter` router and route
// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`
app.use("/blog-posts", blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});