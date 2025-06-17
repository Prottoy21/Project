import { useState, useEffect } from 'react';
import roadmapItemsData from './data/roadmapItems';
import RoadmapItem from './components/RoadmapItem';
import { useUser } from './context/UserContext';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [items, setItems] = useState(roadmapItemsData);
  const { user } = useUser();

  const handleUpvote = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    );
    setItems(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Product Roadmap</h1>

      {/* Show Login or Signup based on user status */}
      {!user ? (
        <div className="space-y-4">
          <Login />
          <Signup />
        </div>
      ) : (
        <div>
          <h2 className="text-xl mb-4">Welcome, {user.email}</h2>
          {items.map(item => (
            <RoadmapItem key={item.id} item={item} onUpvote={handleUpvote} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
