import PropTypes from 'prop-types';
import Button, { Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteComment } from '../api/commentData';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisComment = () => {
    if (window.confirm(`Delete this Comment from ${commentObj.authorName}?`)) {
      deleteComment(commentObj.id).then(() => onUpdate);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Author Name: {commentObj.authorName}</Card.Title>
        <p>{commentObj.content}</p>

        {user[0].id === commentObj.authorId ? (
          <div className="buttonWrap">
            <Link href={`/comments/edit/${commentObj.id}`} passHref>
              <Button className="editBtn m-2" variant="outline-info">Edit</Button>
            </Link>
            <div>
              <Button variant="outline-warning" size="sm" onClick={deleteThisComment} className="deleteBtn m-2">Delete</Button>
            </div>
          </div>
        ) : (
          ''
        )}
      </Card.Body>
    </Card>
  );
}
CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    authorId: PropTypes.number,
    postId: PropTypes.number,
    content: PropTypes.string,
    authorName: PropTypes.string,
    createdOn: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
