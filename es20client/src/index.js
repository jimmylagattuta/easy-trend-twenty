import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
  </StrictMode>
);