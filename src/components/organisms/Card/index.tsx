import { useDraggable } from '@dnd-kit/core';
import { FunctionComponent } from 'react';
import { KanbanItem } from '@models/todos';
import { Icon } from '@iconify/react';
import { useItemListContext } from '@contexts/item.context';
import Button from '@components/atoms/Button';
import CardUpdatable from './CardUpdatebable';

type CardProps = KanbanItem;

const Columns: FunctionComponent<CardProps> = ({
  description,
  id,
  title,
  updateMode,
  ...props
}) => {
  const { removeItem, patchItem, allowUpdate } = useItemListContext();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <article className="group relative" ref={setNodeRef} style={style}>
      {updateMode ? (
        <CardUpdatable
          removeItem={removeItem}
          patchItem={patchItem}
          {...{ description, id, title, updateMode, ...props }}
        />
      ) : (
        <>
          <div className="absolute top-1 right-1 z-10 hidden gap-1 p-1 group-hover:flex">
            <Button onClick={() => removeItem(id)}>
              <Icon icon="ri:delete-bin-6-fill" />
            </Button>
            <Button type="button" onClick={() => allowUpdate(id)}>
              <Icon icon="ri:pencil-fill" />
            </Button>
          </div>
          <div className="cursor-grab rounded-lg border border-gray-200 p-2 shadow hover:bg-gray-100">
            <div
              className="absolute top-0 left-0 z-0 h-full w-full"
              {...attributes}
              {...listeners}
            />
            <h2 className="font-semibold">{title}</h2>
            <div>{description}</div>
          </div>
        </>
      )}
    </article>
  );
};
export default Columns;
