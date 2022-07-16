import React from "react";
import { Typography } from "@mui/material";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div>
      <Typography variant="h3">Comments</Typography>
      <div className="">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="">
              <div className="">
                <Typography variant="h5" className="card-header">
                  {comment.commentAuthor} commented{" "}
                  <span style={{ fontSize: "0.825rem" }}>
                    on {comment.createdAt}
                  </span>
                </Typography>
                <Typography variant="body2" className="card-body">
                  {comment.commentText}
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
