import { useMemo } from 'react';

import BaseCrudFormContainer from '@/base/base-crud-form-container';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import { LIST_STATS, LIST_TOTAL_COUNTER } from '../_constants/tenant.constant';

const WebConfigTab = () => {
  const { t } = useTranslation();

  const fields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'adminPageConfig.layoutTenantConfig.labelTenant',
        label: t('Tên Tenant'),
        type: 'text',
        colSpan: 12,
      },
      {
        name: 'adminPageConfig.layoutTenantConfig.iconTenant',
        label: t('Biểu tượng Tenant'),
        type: 'uploadimage',
        colSpan: 6,
      },
      {
        name: 'adminPageConfig.layoutTenantConfig.logoTenant',
        label: t('Logo Tenant'),
        type: 'uploadimage',
        colSpan: 6,
      },
      {
        name: 'adminPageConfig.layoutTenantConfig.statisticsTbls',
        label: t('Hiển thị thống kê'),
        type: 'multiautocomplete',
        options: LIST_STATS,
        colSpan: 12,
      },
      {
        name: 'adminPageConfig.layoutTenantConfig.statisticsCounters',
        label: t('Hiển thị bảng đếm'),
        type: 'multiautocomplete',
        options: LIST_TOTAL_COUNTER,
        colSpan: 12,
      },
    ],
    [t],
  );

  return (
    <>
      <BaseCrudFormContainer fields={fields} />
    </>
  );
};

export default WebConfigTab;
