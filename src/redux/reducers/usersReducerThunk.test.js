import {follow, followThunk, switchIsFollowing, unfollow, unfollowThunk} from './usersReducer'
import {userApi} from '../../compo/api/api'

jest.mock('../../compo/api/api')
const userApiMock = userApi
const result = {
    resultCode: 0,
    messages: ['sss'],
    data: {}
}


test('Thunk follow', async () => {
    userApiMock.postUserApi.mockReturnValue(Promise.resolve(result))
    const thunk = followThunk(1)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
    // Проверка последовательности
    expect(dispatchMock).toHaveBeenNthCalledWith(1, (switchIsFollowing(true, 1)))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,  follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,  switchIsFollowing(false, 1))
})

test('Thunk unfollow', async () => {
    userApiMock.deleteUserApi.mockReturnValue(Promise.resolve(result))
    const thunk = unfollowThunk(1)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
    // Проверка последовательности
    expect(dispatchMock).toHaveBeenNthCalledWith(1, (switchIsFollowing(true, 1)))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,  unfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,  switchIsFollowing(false, 1))
})