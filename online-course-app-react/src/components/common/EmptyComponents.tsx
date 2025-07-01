import { Empty } from 'antd';

type Props = { message?: string };

export const EmptyComponent = ({ message }: Props) => {
  return <Empty description={message} />;
};
