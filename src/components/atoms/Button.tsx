import { FunctionComponent } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="cursor-pointer rounded-md bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
