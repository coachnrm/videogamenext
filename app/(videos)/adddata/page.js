'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPostForm() {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    Title: '',
    Platform: '',
    Developer: '',
    Publisher: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Navigate to the "/getdata" route after a successful submission
      router.push('/getdata');
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Failed to create post.');
    }
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Platform">Platform:</label>
          <input
            type="text"
            id="Platform"
            name="Platform"
            value={formData.Platform}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Developer">Developer:</label>
          <input
            type="text"
            id="Developer"
            name="Developer"
            value={formData.Developer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Publisher">Publisher:</label>
          <input
            type="text"
            id="Publisher"
            name="Publisher"
            value={formData.Publisher}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
