import { useDraggable } from '@dnd-kit/core';
import { FunctionComponent } from 'react';
import { KanbanItem } from '@models/todos';
import { Icon } from '@iconify/react';
import { useItemListContext } from '@contexts/item.context';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@components/atoms/Button';

type CardProps = KanbanItem;

type Inputs = {
  title: string;
  description: string;
};

const Columns: FunctionComponent<CardProps> = ({
  description,
  id,
  title,
  updateMode,
  cost,
  status,
}) => {
  const { removeItem, patchItem, allowUpdate } = useItemListContext();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    patchItem({ ...data, id, updateMode, cost, status });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <article className="group relative" style={style}>
      <div className="absolute top-1 right-1 hidden gap-1 p-1 group-hover:flex">
        <Button
          onClick={() => {
            removeItem(id);
          }}
        >
          <Icon icon="ri:delete-bin-6-fill" />
        </Button>
        <Button
          onClick={() => {
            allowUpdate(id);
          }}
        >
          <Icon icon="ri:pencil-fill" />
        </Button>
      </div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab rounded-lg border border-gray-200 p-2 shadow hover:bg-gray-100"
      >
        {updateMode ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <input
              placeholder="Titre"
              className="border border-gray-200 p-1 ring-gray-500 focus:outline-none"
              defaultValue={title}
              {...register('title', { required: true })}
            />
            <textarea
              placeholder="Describe yourself here..."
              className="h-24 w-full resize-none border border-gray-200 p-1 ring-gray-500 focus:outline-none"
              defaultValue={description}
              {...register('description', { required: true })}
            />
          </form>
        ) : (
          <>
            <h2>{title}</h2>
            <div>{description}</div>
          </>
        )}
      </div>
    </article>
  );
};
export default Columns;
