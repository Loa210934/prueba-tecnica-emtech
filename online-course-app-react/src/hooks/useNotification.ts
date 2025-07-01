import { notification } from 'antd';

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    message: string = 'OOPS!',
    description: string = 'Esta funcionalidad aún no está implementada. Por favor, inténtalo más tarde.',
  ) => {
    api.info({
      message,
      description,
      placement: 'topRight',
    });
  };

  return { openNotification, contextHolder } as const;
};
