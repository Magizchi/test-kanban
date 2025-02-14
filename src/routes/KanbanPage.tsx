import Columns from '@components/organisms/Columns';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { KanbanColumn, KanbanItem, KanbanItemSchema } from '@models/todos';
import { useItemListContext } from '@contexts/item.context';
import todos from '@mocks/todos';

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

const KanbanPage = () => {
  const { items, setItems } = useItemListContext();

  const fetchTasks = () => {
    // fetch tasks
    const { success, data } = KanbanItemSchema.array().safeParse(todos);
    if (!success) {
      // Toast Error
      return [];
    }
    setItems(data);
  };

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
    fetchTasks();
  }, []);

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
};

export default KanbanPage;
