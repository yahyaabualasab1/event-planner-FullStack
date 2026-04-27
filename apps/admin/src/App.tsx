import { AppProviders } from "./app/providers/app.provider";
import { AppRouter } from "./app/router/app.router";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
