import { useState } from "react";
import roadmapItemsData from "./data/roadmapItems";
import RoadmapItem from "./components/RoadmapItem";
import { useUser } from "./context/UserContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
// {user && <Logout />}


function App() {
  const [items, setItems] = useState(roadmapItemsData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("upvotes");
  const { user } = useUser();

  const handleUpvote = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
    );
    setItems(updated);
  };

  // Filter items based on selected status
  const filteredItems = items.filter(
    (item) => filterStatus === "All" || item.status === filterStatus
  );

  // Sort items based on selected criteria
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortBy === "upvotes") {
      return b.upvotes - a.upvotes; // Sort by upvotes descending
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status); // Sort by status alphabetically
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
          🚀Roadmap Application
        </h1>

        {/* Filter and Sort */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
            className="p-2 border rounded"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
            className="p-2 border rounded"
          >
            <option value="upvotes">Sort by Upvotes</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Show Login/Signup if no user, else show roadmap */}
        {!user ? (
          <div className="space-y-4">
            <Login />
            <Signup />
            {user && <Logout />}
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">Welcome, {user.email}</h2>
            {sortedItems.map((item) => (
              <RoadmapItem key={item.id} item={item} onUpvote={handleUpvote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
