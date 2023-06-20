import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
