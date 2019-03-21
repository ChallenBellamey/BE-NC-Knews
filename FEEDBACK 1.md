# General

- DO NOT delete in your seed function, create a new object instead
- Could extract logic inside the seed function to a `formatComments` function in utils
- I would argue that if there is only one thing being exported from a file, there is no need to wrap it in an object
- Could extract logic inside the seed function to a `formatComments` function in utils

## Test results

### /api/articles/:article_id

13. DELETE status:404 when given a non-existent article_id

    - **expected 404 "Not Found", got 204 "No Content"**

14. DELETE responds with 400 on invalid article_id

    - **expected 400 "Bad Request", got 500 "Internal Server Error"**

### /api/articles/:article_id/comments

16. GET status:200 responds with an array of comment objects

    - **don't necessarily need the article_id on each comment, but not worth changing**

### /api/comments/:comment_id

27. DELETE status:404 client uses non-existent comment_id

    - **expected 404 "Not Found", got 204 "No Content"**
