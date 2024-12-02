import { useMemo } from 'react';

import BaseCrudFormContainer from '@/base/base-crud-form-container';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import {
  LIST_COMMUNITY,
  LIST_SOCIAL,
  LIST_TENANT_TYPE,
} from '../_constants/tenant.constant';

const MobileConfigTab = () => {
  const { t } = useTranslation();

  const fields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'mobileConfig.socialConfig',
        label: t('Cấu hình social cho Mobile app'),
        type: 'multiautocomplete',
        options: LIST_SOCIAL,
        colSpan: 12,
        defaultValue: [],
      },
      {
        name: 'mobileConfig.communityConfig',
        label: t('Cấu hình community cho Mobile app'),
        type: 'multiautocomplete',
        options: LIST_COMMUNITY,
        colSpan: 12,
        defaultValue: [],
      },
      {
        name: 'mobileConfig.typeConfig',
        label: t('Loại hình'),
        type: 'select',
        options: LIST_TENANT_TYPE,
        colSpan: 3,
        defaultValue: LIST_TENANT_TYPE[0].value,
      },
      {
        name: 'mobileConfig.mobileVersion',
        label: t('Phiên bản Mobile app'),
        type: 'text',
        colSpan: 3,
        defaultValue: '',
      },
      {
        name: 'mobileConfig.portalWebsite',
        label: t('Trang web cổng thông tin'),
        type: 'text',
        colSpan: 6,
        defaultValue: '',
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

export default MobileConfigTab;
