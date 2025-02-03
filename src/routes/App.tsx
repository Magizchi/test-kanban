import { ItemListProvider } from '@contexts/item.context';
import KanbanPage from '@routes/KanbanPage';

function App() {
  return (
    <ItemListProvider>
      <KanbanPage />
    </ItemListProvider>
  );
}

export default App;
