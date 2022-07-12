import usersReducer, {follow, unfollow} from './usersReducer'

let state

beforeEach( () => {
    state = {
        users: [
            {id: 0, name: 'Evgeniy 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 1, name: 'Evgeniy 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 2, name: 'Evgeniy 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 3, name: 'Evgeniy 3', followed: true, photos: {small: null, large: null}, status: 'status 3'}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        isFollowing: []
    }
})

test('follow success', () => {
    const newState = usersReducer(state, follow(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});


test('unfollow success', () => {
    const newState = usersReducer(state, unfollow(3))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeFalsy();
});
