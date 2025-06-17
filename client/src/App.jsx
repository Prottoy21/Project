import { useState } from 'react';
import roadmapItemsData from './data/roadmapItems';
import RoadmapItem from './components/RoadmapItem';

function App() {
  const [items, setItems] = useState(roadmapItemsData);

  const handleUpvote = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    );
    setItems(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Product Roadmap</h1>
      {items.map(item => (
        <RoadmapItem key={item.id} item={item} onUpvote={handleUpvote} />
      ))}
    </div>
  );
}

export default App;
