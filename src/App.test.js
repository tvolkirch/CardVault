import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title and header and search overlay element', () => {

  const { getByText } = render(<App />);
  const linkElement = getByText(/Elder Scrolls Card Vault/i);
  expect(linkElement).toBeInTheDocument();
  
  var elem = document.getElementById("head");
  expect(elem).toBeInTheDocument();
  
  elem = document.getElementById("search-overlay");
  expect(elem).toBeInTheDocument();
});
