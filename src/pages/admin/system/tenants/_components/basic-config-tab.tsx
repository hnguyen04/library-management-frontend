import { useMemo } from 'react';

import BaseCrudFormContainer from '@/base/base-crud-form-container';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

const BasicConfigTab = () => {
  const { t } = useTranslation();

  const fields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'id',
        label: 'ID',
        type: 'number',
        required: true,
        readOnly: true,
        noRender: true,
      },
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
        name: 'isActive',
        label: t('Hoạt động'),
        type: 'checkbox',
        required: true,
        colSpan: 4,
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

export default BasicConfigTab;
