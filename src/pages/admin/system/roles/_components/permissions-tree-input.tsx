import { Box, alpha } from '@mui/material';

import { TBaseInputProps } from '@/base/base-form-input';
import useTranslation from '@/hooks/use-translation';

import Tree from '../../../../../components/tree/tree';

type TPemissionTreeInputProps = TBaseInputProps<string[]>;

const PermissionTreeInput = ({
  value,
  onChange,
  field,
}: TPemissionTreeInputProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        borderWidth: 1,
        borderRadius: '8px',
        borderColor: alpha('#000', 0.2),
        borderStyle: 'solid',
        height: 500,
        overflowY: 'auto',
      }}
    >
      <Tree
        treeData={field?.props?.allPermissions?.map((p: any) => ({
          label: t(p.name),
          value: p.name,
          parentName: p.parentName,
          name: p.name,
        }))}
        treeDataSimpleMode={{
          id: 'name',
          pId: 'parentName',
        }}
        value={value}
        onChange={(v) => onChange(v || [])}
        readonly={field?.readOnly}
      />
    </Box>
  );
};

export default PermissionTreeInput;
