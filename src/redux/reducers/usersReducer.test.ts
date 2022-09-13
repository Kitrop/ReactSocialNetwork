import usersReducer, {InitialStateInterface, userActions} from './usersReducer'

/*
let state: InitialStateInterface

beforeEach( () => {
    state = {
        users: [
            {id: 0, name: 'Evgeniy 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Evgeniy 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Evgeniy 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Evgeniy 3', followed: true, photos: {small: null, large: null}, status: 'status 3'}
        ],
        pageSize: 10,
        portionSize: 10,
        ifFetching: false,
        totalUsersCount: 0,
        currentPage: 1,
        isFollowing: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, userActions.follow(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
    const newState = usersReducer(state, userActions.unfollow(3))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeFalsy();
});
*/
