import { Controller, useFormContext } from 'react-hook-form';

import useTranslation from '@/hooks/use-translation';

import Tree from '../../../../../components/tree/tree';

type TPermissionConfigTabProps = {
  listPermissions: any[];
};

const PermissionConfigTab = ({
  listPermissions,
}: TPermissionConfigTabProps) => {
  const { t } = useTranslation();

  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="permissions"
        render={({ field }) => (
          <Tree
            treeData={listPermissions.map((p) => ({
              label: t(p.name),
              value: p.name,
              parentName: p.parentName,
              name: p.name,
            }))}
            treeDataSimpleMode={{ id: 'name', pId: 'parentName' }}
            value={field.value}
            onChange={(v) => field.onChange(v)}
          />
        )}
      />
    </>
  );
};

export default PermissionConfigTab;
