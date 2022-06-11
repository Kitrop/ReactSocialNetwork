import friend from '../Friend.module.css';

function FriendListElement(props) {
    return (
        <div>
            <div className={friend.avatar}> <span className={friend.friend_username}> {props.username} </span></div>
        </div>
    );
}

export default FriendListElement;