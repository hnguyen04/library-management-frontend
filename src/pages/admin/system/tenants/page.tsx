import NiceModal from '@ebay/nice-modal-react';
import { SettingsTwoTone } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TBaseCrudCol } from '@/base/base.model';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';
import tenantService from '@/services/tenants/tenant.service';

import TenantConfigModal from './_components/tenant-config-modal';

const SystemTenantPage = () => {
  const { t } = useTranslation();

  const [refetchData, setRefetchData] = useState<() => void>();

  const columns = useMemo<TBaseCrudCol[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 100, type: 'number' },
      {
        field: 'tenancyName',
        headerName: t('Mã tenant'),
        editable: false,
        flex: 1,
      },
      {
        field: 'name',
        headerName: t('Tên'),
        editable: false,
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: t('Hoạt động'),
        type: 'boolean',
        editable: false,
        flex: 1,
      },
    ],
    [t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'tenancyName',
        label: t('Mã tenant'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'name',
        label: t('Tên'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'connectionString',
        label: t('URL kết nối'),
        type: 'text',
        required: false,
        colSpan: 4,
      },
      {
        name: 'adminEmailAddress',
        label: t('Email quản trị'),
        type: 'text',
        required: true,
        colSpan: 4,
      },
      {
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        defaultValue: false,
        colSpan: 4,
      },
    ],
    [t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        tenancyName: yup.string().required(),
        name: yup.string().required(),
        connectionString: yup.string().optional(),
        adminEmailAddress: yup.string().email().required(),
        isActive: yup.boolean().required(),
      }),
    [],
  );

  return (
    <BaseCrudPage
      title={t('Tenant')}
      name="tenants"
      unitName={t('Tenant')}
      service={tenantService}
      columns={columns}
      createFields={createFields}
      createSchema={createSchema}
      hideExportExcelBtn
      hideImportExcelBtn
      hideViewAction
      setRefetchData={setRefetchData}
      hideEditAction
      extendActions={[
        {
          title: t('Cấu hình'),
          icon: <SettingsTwoTone color="primary" />,
          onClick: (row) =>
            NiceModal.show(TenantConfigModal, {
              tenantId: row.id as number,
              refetchData,
            }),
        },
      ]}
    />
  );
};

export default SystemTenantPage;
