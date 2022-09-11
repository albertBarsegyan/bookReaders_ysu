import SpinnerLoader from "./components/loaders/spinner.loader";
import { useAuth } from "./hooks/useAuth.hooks";
import AuthenticatedApp from "./routes/authenticatedApp";
import UnauthenticatedApp from "./routes/unauthenticatedApp";

function App() {
  const { user, isAccessibleAuthApp } = useAuth();

  if (user === null) {
    return <SpinnerLoader isFullScreen />;
  }

  if (isAccessibleAuthApp) {
    return <AuthenticatedApp />;
  }

  return <UnauthenticatedApp />;
}

export default App;
