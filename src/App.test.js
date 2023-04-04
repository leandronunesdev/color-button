import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color, and updates when clicked', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  //expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('checkbox disabling and enabling button', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled;

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled;
});

test('if the button color is gray when disabled', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorButton);

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});

describe('spaces before camel-case capital letters', () => {
  test('Work for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
