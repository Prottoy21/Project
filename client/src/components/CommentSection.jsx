import { useState } from "react";
import CommentForm from "./CommentForm";

function CommentSection({ roadmapId }) {
  const [comments, setComments] = useState([]);

  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      parentId,
      replies: [],
    };
    setComments((prev) =>
      parentId
        ? prev.map((comment) =>
            comment.id === parentId
              ? { ...comment, replies: [...comment.replies, newComment] }
              : comment
          )
        : [...prev, newComment]
    );
  };

  const editComment = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, text: newText }
        : { ...comment, replies: comment.replies.map((reply) => {
            return reply.id === commentId ? { ...reply, text: newText } : reply;
          }) }
    );
    setComments(updatedComments);
  };

  const deleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const renderComments = (commentList, level = 0) =>
    commentList.map((comment) => (
      <div key={comment.id} className={`ml-${level * 4} mt-2`}>
        <p className="text-sm">{comment.text}</p>
        <div className="text-xs flex gap-2">
          <button
            onClick={() => editComment(comment.id, prompt("Edit your comment:", comment.text))}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => deleteComment(comment.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
        {level < 2 && (
          <CommentForm
            placeholder="Reply..."
            onSubmit={(text) => addComment(text, comment.id)}
          />
        )}
        {comment.replies && renderComments(comment.replies, level + 1)}
      </div>
    ));

  return (
    <div className="mt-4">
      <CommentForm onSubmit={addComment} />
      <div className="mt-2">{renderComments(comments)}</div>
    </div>
  );
}

export default CommentSection;
