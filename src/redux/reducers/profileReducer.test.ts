import profileReducer, {initialStateType, profileActions} from './profileReducer'

let state: initialStateType

beforeEach(() => {
    state = {
        postsData: [
            {name: 'Evgeniy', text: 'I need more React', like: '16'},
            {name: 'Evgeniy', text: 'I love REACT!!!', like: '45'}],
        profile: {
            userId: 'test1',
            lookingForAJob: true,
            lookingForAJobDescription: 'test job description1',
            fullName: 'test fullname 1',
            contacts: {
                github: 'g1',
                vk: "string",
                facebook: "string",
                instagram: "string",
                twitter: "string",
                website: "string",
                youtube: "string",
                mainLink: "string",
            },
            photos: {small: null, large: null}
        },
        status: 'status1',
        newPostText: '',
    }
})

test('new post text', () => {
    const newState = profileReducer(state, profileActions.addPostActionCreater('true'))
    expect(newState.postsData[2].text).toBe(String(true))
})