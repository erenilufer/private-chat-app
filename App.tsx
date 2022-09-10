import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import "./src/firebase/config";
import Router from "./Router";

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
