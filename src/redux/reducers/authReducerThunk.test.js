import {loginApi} from '../../compo/api/api'
import {loginThunk} from './authReducer'

jest.mock('../../compo/api/api')
const authApiMock = loginApi 

const result = {
    resultCode: 0,
    messages: [],
    data: {},
}

test('login', async () => {
    authApiMock.loginApi.mockReturnValue(Promise.resolve(result))
    const thunk = loginThunk('free@samuraijs.com', 'free', false)
    const dispatchMock = jest.fn()
    await thunk(dispatchMock)
})
