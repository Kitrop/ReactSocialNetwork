import {followThunk} from './usersReducer'
import {userApi} from '../../api/usersApi'
import {ResponseType, ResultCodesEnum} from '../../api/api'

// Create mock
jest.mock('../../compo/api/usersApi')
const userApiMock = userApi as jest.Mocked<typeof userApi>
// create result has been returned
const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
}

test ('thunk', async () => {
    userApiMock.postUserApi.mockReturnValue(Promise.resolve(result))
    const thunk = followThunk(1)
    const dispatch = jest.fn()

    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(3)
})