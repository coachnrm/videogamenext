'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    fetch('/api/videos')
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const handleAdd = () => {
    router.push('/adddata'); // Navigate to the add data page
  };

  const handleEdit = (id) => {
    router.push(`/editdata/${id}`); // Navigate to the edit page with the video's ID
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      // Remove the deleted video from the local state
      setVideos((prevVideos) => prevVideos.filter((video) => video.Id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div>
      <h1>Video List</h1>
      <button onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Add New Video
      </button>
      <ul>
        {videos.map((video) => (
          <li key={video.Id}>
            {video.Title} - {video.Platform}, Developed by {video.Developer}, Published by {video.Publisher}
            <button onClick={() => handleEdit(video.Id)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
            <button onClick={() => handleDelete(video.Id)} style={{ marginLeft: '10px', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


