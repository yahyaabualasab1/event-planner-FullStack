import { AppProviders } from "@/providers/react-query.provider";
import { AppRouter } from "@/router/app.router";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
