import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useAbp from '@/hooks/use-abp';
import useTranslation from '@/hooks/use-translation';
import permissionService from '@/services/permission/permission.service';
import { formatDate } from '@/services/utils-date';

import PermissionTreeInput from './_components/permissions-tree-input';
import roleService from './_services/role.service';

const SystemRolesPage = () => {
  const { t } = useTranslation();

  const { getCurLoginInfoQuery } = useAbp();

  const { data: thisTenantPermissions } = useQuery({
    enabled:
      !!getCurLoginInfoQuery.data?.tenant?.id ||
      getCurLoginInfoQuery.data?.tenant === null,
    queryKey: [
      'systems/permissions/getAllPermissions',
      getCurLoginInfoQuery.data?.tenant?.id,
    ],
    queryFn: () =>
      permissionService.getAllPermissions({
        tenantId: getCurLoginInfoQuery.data?.tenant?.id,
      }),
  });

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('STT'),
        width: 100,
        editable: false,
        type: 'number',
        renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      {
        field: 'name',
        headerName: t('Tên vai trò'),
        type: 'string',
        editable: false,
        flex: 1,
      },
      {
        field: 'displayName',
        headerName: t('Tên hiển thị'),
        type: 'string',
        editable: false,
        flex: 1,
        renderCell: (params) => (
          <Chip label={params.value as string} variant="soft" color="primary" />
        ),
      },
      {
        field: 'creationTime',
        headerName: t('Ngày tạo'),
        editable: false,
        flex: 1,
        valueFormatter: (params) => {
          return formatDate(params.value);
        },
      },
    ],
    [t],
  );

  const createOrUpdateSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t('field-required')),
        displayName: yup.string().required(t('field-required')),
        description: yup.string().optional().nullable(),
        grantedPermissions: yup.array().of(yup.string()),
      }),
    [t],
  );

  const tabFields = useMemo<{ label: string; fields: TCrudFormField[] }[]>(
    () => [
      {
        label: t('Thông tin'),
        fields: [
          {
            name: 'name',
            label: t('Tên'),
            type: 'text',
            required: true,
            colSpan: 6,
          },
          {
            name: 'displayName',
            label: t('Tên hiển thị'),
            type: 'text',
            required: true,
            colSpan: 6,
          },
          {
            name: 'description',
            label: t('Mô tả'),
            type: 'textarea',
            colSpan: 12,
          },
        ],
      },
      {
        label: t('Phân quyền'),
        fields: [
          {
            name: 'grantedPermissions',
            type: 'custom',
            Component: PermissionTreeInput,
            props: {
              allPermissions: thisTenantPermissions?.items || [],
            },
          },
        ],
      },
    ],
    [t, thisTenantPermissions?.items],
  );

  return (
    <>
      <BaseCrudPage
        title={t('Vai trò')}
        name="systems/roles"
        unitName={t('Vai trò').toLowerCase()}
        service={roleService}
        columns={columns}
        formWidth="md"
        hideSelectRowCheckbox
        hideExportExcelBtn
        hideImportExcelBtn
        defaultGetAllParams={{ pageSize: 100 }}
        createSchema={createOrUpdateSchema}
        updateSchema={createOrUpdateSchema}
        viewTabFields={tabFields.map((tab) => ({
          label: tab.label,
          fields: tab.fields.map((field) => ({
            ...field,
            readOnly: true,
          })),
        }))}
        beautyView
        createTabFields={tabFields}
        updateTabFields={tabFields}
      />
    </>
  );
};

export default SystemRolesPage;
