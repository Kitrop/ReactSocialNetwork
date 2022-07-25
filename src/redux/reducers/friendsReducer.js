import ava3 from '../../img/ava3.jpg'
import ava1 from '../../img/ava1.jpg'
import ava2 from '../../img/ava2.jpg'

let initialState = {
    friendsData: [
        {username: 'Evgeniy', id: 1, ava:{ava3}},{username: 'Svetlana', id: 2, ava:{ava1}},{username: 'Dmitryi', id: 3, ava:{ava2}},
    ],
};

const friendsReducer = (state = initialState, action) => {
    return state;
}

export default friendsReducer;