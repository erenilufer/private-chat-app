import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import "./src/firebase/config";
import Router from "./Router";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
