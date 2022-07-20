import FriendListElement from "./FriendListElement/FriendListElement";
import {useSelector} from 'react-redux'

const Friend = () => {
    // STATE
    const friendsPage = useSelector(state => state.friendsPage)
    let friendElement = friendsPage.friendsData.map(f => <FriendListElement key={f.id} id={f.id} username={f.username}/>)
    return (
        <div>
            {friendElement}
        </div>
    );
}

export default Friend;