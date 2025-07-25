import { AuthenticatedApp } from "./AuthenticatedApp";
import { Loading } from "./components/Loading";
import { useLoading } from "./hooks/useLoading";
import { useToken } from "./hooks/useToken";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";

function App() {
  const { token } = useToken();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Loading />;
  }

  if (!token) {
    return <UnAuthenticatedApp />;
  } else {
    return <AuthenticatedApp />;
  }
}

export default App;
