import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

test('validar si la tabla se monta', async () => {
  const linkElement = await screen.findByTestId(/step-1/i);
  screen.debug()
  expect(linkElement).toBeInTheDocument();
});
