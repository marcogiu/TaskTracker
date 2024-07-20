import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App.tsx';
import './index.css';
import { extendTheme } from '@chakra-ui/react';
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const theme = extendTheme({
  colors: {
    background: '#fffffe',
    headline: '#232323',
    paragraph: '#222525',
    button: '#078080',
    buttonText: '#232323',
    cardBackground: '#f8f5f2'
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
