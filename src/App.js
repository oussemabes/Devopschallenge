import './App.css';
import { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify'; // Corrected import statement
import { generateClient } from 'aws-amplify/api';

import { listPosts } from './graphql/queries';
import { CreatePost } from './graphql/mutations'; // Adjusted for camelCase
Amplify.configure({
  aws_appsync_graphqlEndpoint: 'https://g34rub7bafecnogfpnagdi7rni.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-psug4upnwjb27jlqghfrzmgfhq'
});

function App() {
  const client = generateClient();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", author: "" });

  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const todoData = await client.graphql({
        query: listPosts
      });
      const todos = todoData.data.listPosts;
      setPosts(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }
  async function addPost() {
    try {
      if (!newPost.title || !newPost.author) {
        alert("Please enter both title and author.");
        return;
      }
      console.log(newPost)
      // Use GraphQLAPI for the GraphQL call
      const result= await client.graphql({
        query: CreatePost, variables: { title: newPost.title, author: newPost.author }
      },);
      console.log(result)
      await fetchPosts(); // Refresh the posts after adding a new one
    } catch (error) {
      console.error("Error adding post:", error);
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Articles</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p className="post-author">{post.author}</p>
          </article>
        ))}
      </div>
      <div>
        <h2>Add New Post</h2>
        <label>Title:</label>
        <input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <br />
        <label>Author:</label>
        <input
          type="text"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <br />
        <button onClick={addPost}>Add Post</button>
      </div>
    </div>

  );
}

export default App;
