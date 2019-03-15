### Step 1 - Seeding

Data has been provided for both testing and development environments so you will need to write a seed function to seed your database. You should think about how you will write your seed file to use either test data or dev data depending on the environment that you're running in.

1. You should have separate tables for topics, articles, users and comments, and you will need to think carefully about the order in which you seed your data.

- Each topic should have:

  * `slug` field which is a unique string that acts as the table's primary key
  * `description` field which is a string giving a brief description of a given topic

- Each user should have:

  * `username` which is the primary key & unique
  * `avatar_url`
  * `name`

- Each article should have:
  * `article_id` which is the primary key
  * `title`
  * `body`
  * `votes` defaults to 0
  * `topic` field which references the slug in the topics table
  * `author` field that references a user's primary key (username)
  * `created_at` defaults to the current date

* Each comment should have:
  * `comment_id` which is the primary key
  * `author` field that references a user's primary key (username)
  * `article_id` field that references an article's primary key
  * `votes` defaults to 0
  * `created_at` defaults to the current date
  * `body`

- **NOTE:** psql expects Date types to be in a date format - not a timestamp! However, you can easily turn a timestamp into a date using JS...

***

### Step 2 - Building and Testing

1.  Build your Express app
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes.
5.  Use proper project configuration from the offset, being sure to treat development and test differently.
6.  Test each route **as you go**, checking both successful requests and the variety of errors you could expect to encounter.

**HINT** You will need to take advantage of knex migrations in order to efficiently test your application.

***

#### Routes

Your server should have the following end-points:

```http
<!-- GET /api/topics
POST /api/topics -->

<!-- GET /api/articles
POST /api/articles -->

<!-- GET /api/users
POST /api/users -->

<!-- GET /api/users/:username -->

<!-- GET /api/articles/:article_id -->
<!-- PATCH /api/articles/:article_id -->
<!-- DELETE /api/articles/:article_id -->

<!-- GET /api/articles/:article_id/comments -->
<!-- POST /api/articles/:article_id/comments -->

<!-- PATCH /api/comments/:comment_id -->
<!-- DELETE /api/comments/:comment_id -->



GET /api
```

***

#### Route Requirements

These have been split into **must haves** and some slightly more advanced _nice to have / if time_. The _if time_ tasks should be **left until you have tested and implemented all other functionality**.

***






```http
GET /api/articles/:article_id/comments
```

##### If time  (the following will make pagination easier when you get to building your front-end application)
- accept the following queries:
  * `limit`, which limits the number of responses (defaults to 10)
  * `p`, stands for page which specifies the page at which to start (calculated using limit)





```http
GET /api
```
##### Responds with
- JSON describing all the available endpoints on your API

***

### Step 3 - Hosting

Make sure your application and your database is hosted using heroku

### Step 4 - Preparing for your review and portfolio

Finally, you should write a README for this project (and remove this one). The README should be broken down like this: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

It should also include the link where your heroku app is hosted.
