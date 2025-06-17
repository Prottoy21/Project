import CommentSection from "./CommentSection";

function RoadmapItem({ item, onUpvote }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Status: <span className="font-medium text-blue-500">{item.status}</span></p>
        </div>
        <button
          onClick={() => onUpvote(item.id)}
          className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-200 transition"
        >
          👍 {item.upvotes}
        </button>
      </div>
      <CommentSection roadmapId={item.id} />
    </div>
  );
}


export default RoadmapItem;
