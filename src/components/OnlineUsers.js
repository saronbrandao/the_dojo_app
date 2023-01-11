import { useCollection } from '../hooks/useCollection';

// components
import Avatar from './Avatar';
// styles
import './OnlineUsers.css';

const OnlineUSers = () => {
  const { documents, error } = useCollection('users');

  // Bellow, where you see user.id, that value exists only in our interface. That actually corresponds
  // to the ide of the document and is created inside useCollection.
  // It causes a bit of confusion because initially we think we are drilling inside the firebase collection
  // but we are actually drilling inside our documents state managed inside useCollection.

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUSers;
