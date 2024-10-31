import { Kanban } from "./pages/Kanban";
import CardsProvider from "./providers/CardsProvider";

function App() {
  return (
    <CardsProvider>
      <Kanban />
    </CardsProvider>
  );
}

export default App;
