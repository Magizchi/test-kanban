import Columns from '@components/organisms/Columns';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { KanbanColumn, KanbanItem } from '@models/todos';
import { useItemListContext } from '@contexts/item.context';

const listCard: KanbanItem[] = [
  {
    id: 0,
    title: 'Title',
    description: 'description ',
    cost: 50,
    status: 'todo',
    updateMode: false,
  },
  {
    id: 1,
    title: 'Title 2',
    description: 'description 2',
    cost: 50,
    status: 'todo',
    updateMode: false,
  },
  {
    id: 2,
    title: 'Title 3',
    description: 'description 3',
    cost: 50,
    status: 'done',
    updateMode: false,
  },
];

const ColumnsType: KanbanColumn[] = [
  {
    status: 'todo',
    label: 'To-Do',
  },
  {
    status: 'in_progress',
    label: 'In Progress',
  },
  {
    status: 'done',
    label: 'Review Ready',
  },
];

function App() {
  const { items, setItems } = useItemListContext();

  const handleDradEnd = (dnd: DragEndEvent) => {
    const { active, over } = dnd;

    if (!over) return;
    const itemId = active.id as number;
    const newStatus = over.id as KanbanItem['status'];

    setItems(() =>
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item,
      ),
    );
  };

  useEffect(() => {
    setItems(listCard);
  }, [setItems]);

  return (
    <>
      <section className="m-10 flex flex-col gap-10">
        <h1 className="text-5xl font-bold">KANBAN</h1>
        <div className="flex gap-x-5">
          <DndContext onDragEnd={handleDradEnd}>
            {ColumnsType.map((column) => (
              <Columns
                key={column.status}
                column={column}
                data={items.filter((item) => item.status === column.status)}
              />
            ))}
          </DndContext>
        </div>
      </section>
    </>
  );
}

export default App;
