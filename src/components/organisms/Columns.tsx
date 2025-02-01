import { Icon } from '@iconify/react';
import { FunctionComponent } from 'react';
import Card from '@components/organisms/Card';
import { useDroppable } from '@dnd-kit/core';
import { KanbanColumn, KanbanItem } from '@models/todos';
import { useItemListContext } from '@contexts/item.context';

interface ColumnsProps {
  column: KanbanColumn;
  data: KanbanItem[];
}

const Columns: FunctionComponent<ColumnsProps> = ({ column, data }) => {
  const { items, addItem: addForm } = useItemListContext();

  const { setNodeRef } = useDroppable({
    id: column.status,
  });
  return (
    <div
      ref={setNodeRef}
      className="min-h-96 w-96 rounded-lg border border-indigo-700"
    >
      <div className="flex items-center justify-between rounded-t-lg bg-indigo-300 px-2 py-4">
        <div className="flex items-center gap-x-3">
          <h2>{column.label}</h2>
          <span className="h-5 w-5 rounded-full bg-indigo-200 text-center text-sm text-indigo-700">
            {data.length}
          </span>
        </div>
        <div className="flex gap-x-3">
          <button
            className="cursor-pointer"
            onClick={() =>
              addForm({
                id: items.length + 1,
                title: '',
                description: ' ',
                cost: 0,
                status: column.status,
                updateMode: true,
              })
            }
          >
            <Icon icon="ri:add-line" />
          </button>
        </div>
      </div>
      <div className="my-2 flex flex-col gap-3">
        {data.map((card) => {
          return <Card key={card.id} {...card} />;
        })}
      </div>
    </div>
  );
};
export default Columns;
