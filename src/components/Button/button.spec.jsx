/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
    it('should render the button with the text "Load More"', () => {
        const fn = jest.fn();
        render(<Button text="Load more" disabled={false} onClick={fn} />);
        expect.assertions(1);

        const button = screen.getByRole('button', { name: /Load More/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);

        const button = screen.getByRole('button', { name: /Load More/i });

        userEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        const fn = jest.fn();
        render(<Button text="Load more" disabled={true} onClick={fn} />);
        const button = screen.getByRole('button', { name: /Load More/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false} />);
        const button = screen.getByRole('button', { name: /Load More/i });
        expect(button).toBeEnabled();
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<Button text="Load more" disabled={false} onClick={fn} />);
        expect(container.firstChild).toMatchSnapshot();
      });
});
