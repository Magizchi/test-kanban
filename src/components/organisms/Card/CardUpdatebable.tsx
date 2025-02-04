import { FunctionComponent } from 'react';
import { KanbanItem } from '@models/todos';
import { Icon } from '@iconify/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@components/atoms/Button';

interface CardUpdatable extends KanbanItem {
  removeItem: (id: number) => void;
  patchItem: (item: KanbanItem) => void;
}

type Inputs = {
  title: string;
  description: string;
};

const CardUpdatable: FunctionComponent<CardUpdatable> = ({
  removeItem,
  patchItem,
  ...props
}) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    return patchItem({ ...props, ...data, updateMode: false });
  };
  return (
    <>
      <div>
        <div className="absolute top-1 right-1 z-10 hidden gap-1 p-1 group-hover:flex">
          <Button onClick={() => removeItem(props.id)}>
            <Icon icon="ri:delete-bin-6-fill" />
          </Button>
          <Button type="submit" form="form">
            <Icon icon="ri:check-fill" />
          </Button>
        </div>
        <div className="cursor-grab rounded-lg border border-gray-200 p-2 shadow hover:bg-gray-100">
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className="z-50 flex flex-col gap-2"
          >
            <input
              type="text"
              placeholder="Titre"
              className="border border-gray-200 p-1 focus:outline-none"
              defaultValue={props.title}
              {...register('title', { required: true })}
            />
            <textarea
              placeholder="Describe yourself here..."
              className="h-24 w-full resize-none border border-gray-200 p-1 ring-gray-500 focus:outline-none"
              defaultValue={props.description}
              {...register('description', { required: true })}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CardUpdatable;
