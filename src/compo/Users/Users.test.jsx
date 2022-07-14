import { render, screen } from '@testing-library/react';
import Users from "./Users";


let users = [
    {"id":24828,"name":"babken10","photos": {"small": null, "large": null}},
    {"id":24827,"name":"perepeljuk","photos": {"small": null, "large": null}},
    {"id":24825,"name":"solias","photos": {"small": null, "large": null}}
]

describe('users test', () => {
    it('Users.jsx render', () => {
        render(<Users users={users}/>)
    })
})
