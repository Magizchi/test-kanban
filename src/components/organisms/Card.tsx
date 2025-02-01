import { useDraggable } from '@dnd-kit/core';
import { FunctionComponent } from 'react';
import { KanbanItem } from '@models/todos';
import { Icon } from '@iconify/react';
import { useItemListContext } from '@contexts/item.context';
import { useForm, SubmitHandler } from 'react-hook-form';

type CardProps = KanbanItem;

type Inputs = {
  title: string;
  description: string;
};

const Columns: FunctionComponent<CardProps> = ({
  description = 'default description',
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    patchItem({ ...data, id, updateMode, cost, status });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <article className="group relative" style={style}>
      <div className="absolute top-0 right-3 hidden gap-2 p-1 group-hover:flex">
        <button
          className="cursor-pointer"
          onClick={() => {
            removeItem(id);
          }}
        >
          <Icon icon="ri:delete-bin-6-fill" />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            allowUpdate(id);
          }}
        >
          <Icon icon="ri:pencil-fill" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="mx-2 cursor-grab rounded-lg border border-indigo-700 p-2 hover:bg-indigo-400"
      >
        {updateMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Title"
              className="border border-gray-200"
              defaultValue={title}
              {...register('title', { required: true })}
            />
            <input
              placeholder="Title"
              className="border border-gray-200"
              defaultValue={description}
              {...register('description', { required: true })}
            />
            {errors.description && <span>This field is required</span>}
            <input type="submit" />
          </form>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2>{title}</h2>
            </div>
            <div>{description}</div>
          </>
        )}
      </div>
    </article>
  );
};
export default Columns;
