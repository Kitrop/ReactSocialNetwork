import FriendListElement from "./FriendListElement/FriendListElement";

function Friend(props) {
    let friendElement = props.friendsPage.friendsData.map(f => <FriendListElement key={f.id} id={f.id} username={f.username}/>)
    return (
        <div>
            {friendElement}
        </div>
    );
}

export default Friend;