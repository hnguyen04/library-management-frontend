import { AssignmentTurnedIn as ReadIcon } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useMemo } from 'react';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import { ENotificationState } from '@/services/notifications/notification.model';
import notificationService from '@/services/notifications/notifications.service';
import { formatDate } from '@/services/utils-date';

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'notification.notificationName',
        label: t('Tiêu đề thông báo'),
        type: 'text',
        readOnly: true,
        valueProps: { color: 'primary.main', fontWeight: '800' },
        colSpan: 12,
      },
      {
        name: 'notification.data.message',
        label: t('Nội dung thông báo'),
        type: 'textarea',
        readOnly: true,
        colSpan: 12,
      },
      {
        name: 'notification.data.description',
        label: t('Mô tả'),
        type: 'textarea',
        readOnly: true,
        colSpan: 12,
      },
    ],
    [t],
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        type: 'number',
        editable: false,
        width: 100,
        renderCell: (params) => {
          return params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1;
        },
      },
      {
        field: 'notificationName',
        headerName: t('Nội dung thông báo'),
        type: 'string',
        editable: false,
        flex: 1,
        renderCell: (params) => {
          return params.row.notification.notificationName;
        },
      },
      {
        field: 'status',
        headerName: t('Trạng thái'),
        type: 'string',
        editable: false,
        width: 150,
        renderCell: (params) => {
          if (params.row.state === ENotificationState.READ) {
            return (
              <Chip
                sx={{
                  width: '100px',
                }}
                label={t('Đã đọc')}
                color="success"
              />
            );
          } else if (params.row.state === ENotificationState.UNREAD) {
            return (
              <Chip
                sx={{
                  width: '100px',
                }}
                label={t('Chưa đọc')}
                color="error"
              />
            );
          } else {
            return <></>;
          }
        },
      },
      {
        field: 'createdAt',
        headerName: t('Ngày tạo'),
        type: 'dateTime',
        editable: false,
        width: 150,
        renderCell: (params) => {
          return formatDate(params.row.notification.creationTime);
        },
      },
    ],
    [t],
  );

  return (
    <>
      <BaseCrudPage
        title={t('Thông báo')}
        name="notifications"
        unitName=""
        columns={columns}
        service={notificationService}
        formWidth="md"
        hideAddBtn
        hideExportExcelBtn
        hideImportExcelBtn
        hideEditAction
        hideSelectRowCheckbox
        hideSearchInput
        getAllPath="/getUserNotifications"
        deletePath="/deleteNotification"
        deleteManyPath="/deleteAllUserNotifications"
        viewFields={viewFields}
        beautyView
        extendActions={[
          {
            title: t('Đánh dấu đã đọc'),
            icon: <ReadIcon />,
            onClick: (params) => {
              notificationService
                .markAsRead(params.row.id)
                .then(() => {
                  queryClient.refetchQueries(['notifications/getAll']);
                })
                .catch((_error) => {
                  enqueueSnackbar(t('Đã có lỗi xảy ra'), { variant: 'error' });
                });
            },
            hidden: (params) => params.row.state === ENotificationState.READ,
          },
        ]}
      />
    </>
  );
};

export default NotificationsPage;
