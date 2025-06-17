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
    setComments(prev =>
      parentId
        ? prev.map(comment =>
            comment.id === parentId
              ? { ...comment, replies: [...comment.replies, newComment] }
              : comment
          )
        : [...prev, newComment]
    );
  };

  const renderComments = (commentList, level = 0) =>
    commentList.map(comment => (
      <div key={comment.id} className={`ml-${level * 4} mt-2`}>
        <p className="text-sm">{comment.text}</p>
        {level < 2 && (
          <CommentForm
            placeholder="Reply..."
            onSubmit={text => addComment(text, comment.id)}
          />
        )}
        {comment.replies && renderComments(comment.replies, level + 1)}
      </div>
    ));

  return (
    <div className="mt-4">
      <CommentForm onSubmit={text => addComment(text)} />
      <div className="mt-2">{renderComments(comments)}</div>
    </div>
  );
}

export default CommentSection;
