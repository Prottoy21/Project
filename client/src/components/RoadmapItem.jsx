import CommentSection from "./CommentSection";

function RoadmapItem({ item, onUpvote }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <button
          onClick={() => onUpvote(item.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          👍 {item.upvotes}
        </button>
      </div>
      <p className="text-sm text-gray-500">Status: {item.status}</p>
      <CommentSection roadmapId={item.id} />
    </div>
  );
}

export default RoadmapItem;
