import App from "./App";
import Authentication from "./Contexts/AuthContext";
function RootApp() {
  return (
    <Authentication>
      <App />
    </Authentication>
  );
}

export default RootApp;
