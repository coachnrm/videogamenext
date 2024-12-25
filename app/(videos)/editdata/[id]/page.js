'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostForm() {
  const router = useRouter(); // Initialize useRouter
  const params = useParams(); // Get route parameters (e.g., ID)
  const { id } = params; // Extract the ID parameter

  const [formData, setFormData] = useState({
    Title: '',
    Platform: '',
    Developer: '',
    Publisher: '',
  });
  const [message, setMessage] = useState('');

  // Fetch the existing data for the specific ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFormData({
          Title: data.Title || '',
          Platform: data.Platform || '',
          Developer: data.Developer || '',
          Publisher: data.Publisher || '',
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Navigate to the "/getdata" route after a successful update
      router.push('/getdata');
    } catch (error) {
      console.error('Error updating post:', error);
      setMessage('Failed to update post.');
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
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
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
