import { render, screen } from '@testing-library/react';
import ProfileStatus from './ProfileStatus'
import userEvent from '@testing-library/user-event'
describe('some', () => {
    test('render profile-status', () => {
        render( <ProfileStatus status={'testing status help'}/>)
        expect(screen.getByText(/testing status help/i)).toBeInTheDocument()
    })
    test('span display  in start', () => {
        render( <ProfileStatus />)
        const component = screen.getByTestId('status_span')
        expect(component).toBeInTheDocument()
    })
    test('input not display in start', () => {
        render( <ProfileStatus />)
        const component = screen.queryByTestId('status_input')
        expect(component).not.toBeInTheDocument()
    })
    test('display input in edit mode', () => {
        render( <ProfileStatus />)
        let span = screen.getByTestId('status_span')
        userEvent.dblClick(span)
        expect(screen.getByTestId('status_input')).toBeInTheDocument()
    })
})