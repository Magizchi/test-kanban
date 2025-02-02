import { FunctionComponent } from 'react';

interface BadgeProps {
  children: React.ReactNode;
}
const Badge: FunctionComponent<BadgeProps> = ({ children }) => {
  return (
    <span className="h-5 w-5 rounded-full bg-gray-300 text-center text-sm text-gray-700">
      {children}
    </span>
  );
};

export default Badge;
