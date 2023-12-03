const { Client } = require('pg');

const dbConfig = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
};

exports.handler = async (event) => {
  const client = new Client(dbConfig);

  await client.connect();
  try {
    console.log("Received event:", event);

    let result;
    if (event.action === 'CreatePost') {
      // Replace this SQL with the actual SQL to insert a new post
      const insertQuery = 'INSERT INTO posts (title, author) VALUES ($1, $2) RETURNING *';
      result = await client.query(insertQuery, [event.title, event.author]);



      return {
        id: result.rows[0].id, // Assuming 'id' is returned by the INSERT operation
        title: result.rows[0].title,
        author: result.rows[0].author
      };
    }
    else if (event.action === 'ListPosts') {
      // List all posts
      const selectQuery = 'SELECT * FROM posts';
      const result = await client.query(selectQuery);

      return result.rows;}
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await client.end();
  }
};
