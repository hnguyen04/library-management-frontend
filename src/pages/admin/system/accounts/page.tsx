import NiceModal from '@ebay/nice-modal-react';
import { RefreshTwoTone } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

import ChangePassModal from './_components/change-pass-modal';
import accountsService from './_services/accounts.service';

const SystemAccountsPage = () => {
  const { t } = useTranslation();

  const { data: getallRolesRes } = useQuery({
    queryKey: ['system/accounts/getAllRoles'],
    queryFn: () => accountsService.getAllRoles(),
    staleTime: Infinity,
  });
  const allRoles = getallRolesRes?.items || [];

  const columns: GridColDef[] = useMemo(
    () => [
      {
        headerName: t('ID'),
        field: 'id',
        type: 'number',
        width: 100,
        editable: false,
        renderCell: (params) => params.row.id,
      },
      {
        field: 'userName',
        headerName: t('accounts_userName'),
        width: 150,
        type: 'string',
        editable: false,
      },
      {
        field: 'fullName',
        headerName: t('accounts_fullName'),
        type: 'string',
        editable: false,
        flex: 2,
      },
      {
        field: 'emailAddress',
        headerName: t('accounts_emailAddress'),
        width: 200,
        type: 'string',
        editable: false,
        flex: 3,
      },
      {
        field: 'isActive',
        headerName: t('accounts_isActive'),
        type: 'boolean',
        editable: false,
        flex: 1,
      },
    ],
    [t],
  );

  const basicCreateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'surname',
        label: t('accounts_surname'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('accounts_name'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'userName',
        label: t('accounts_userName'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'emailAddress',
        label: t('accounts_emailAddress'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'password',
        label: t('accounts_password'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'repassword',
        label: t('accounts_repassword'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'dateOfBirth',
        label: t('accounts_dateOfBirth'),
        type: 'date',
        required: false,
        colSpan: 6,
      },
      {
        name: 'gender',
        label: t('Giới tính'),
        type: 'radio',
        options: [
          { label: t('Nam'), value: 'male' },
          { label: t('Nữ'), value: 'female' },
          { label: t('Khác'), value: 'other' },
        ],
        defaultValue: 'male',
        colSpan: 6,
      },
      {
        name: 'addressOfBirth',
        label: t('accounts_addressOfBirth'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'homeAddress',
        label: t('Địa chỉ'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'isActive',
        label: t('Trạng thái'),
        required: false,
        type: 'radio',
        options: [
          { label: t('accounts_isActive'), value: true },
          { label: t('accounts_isNotActive'), value: false },
        ],
        defaultValue: true,
      },
    ],
    [t],
  );

  const basicUpdateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'id',
        type: 'number',
        noRender: true,
      },
      {
        name: 'surname',
        label: t('accounts_surname'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('accounts_name'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'userName',
        readOnly: true,
        label: t('accounts_userName'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'emailAddress',
        label: t('accounts_emailAddress'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'dateOfBirth',
        label: t('accounts_dateOfBirth'),
        type: 'date',
        required: false,
        colSpan: 6,
      },
      {
        name: 'gender',
        label: t('Giới tính'),
        type: 'radio',
        options: [
          { label: t('Nam'), value: 'male' },
          { label: t('Nữ'), value: 'female' },
          { label: t('Khác'), value: 'other' },
        ],
        defaultValue: 'male',
        colSpan: 6,
      },
      {
        name: 'addressOfBirth',
        label: t('accounts_addressOfBirth'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'homeAddress',
        label: t('Địa chỉ'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'isActive',
        label: t('Trạng thái'),
        required: false,
        type: 'radio',
        options: [
          { label: t('accounts_isActive'), value: true },
          { label: t('accounts_isNotActive'), value: false },
        ],
        defaultValue: true,
      },
    ],
    [t],
  );

  const basicViewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'surname',
        label: t('accounts_surname'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('accounts_name'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'userName',
        label: t('accounts_userName'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'emailAddress',
        label: t('accounts_emailAddress'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
      {
        name: 'dateOfBirth',
        label: t('accounts_dateOfBirth'),
        type: 'date',
        required: false,
        colSpan: 6,
      },
      {
        name: 'gender',
        label: 'Giới tính',
        type: 'radio',
        options: [
          { label: t('Nam'), value: 'male' },
          { label: t('Nữ'), value: 'female' },
          { label: t('Khác'), value: 'other' },
        ],
        defaultValue: 'male',
        colSpan: 6,
      },
      {
        name: 'addressOfBirth',
        label: t('accounts_addressOfBirth'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'homeAddress',
        label: t('Địa chỉ'),
        type: 'text',
        required: false,
        colSpan: 12,
      },
      {
        name: 'isActive',
        label: t('Trạng thái'),
        required: false,
        type: 'radio',
        options: [
          { label: t('accounts_isActive'), value: true },
          { label: t('accounts_isNotActive'), value: false },
        ],
      },
    ],
    [t],
  );

  const createSchema = useMemo(
    () =>
      yup.object().shape({
        surname: yup.string().required(t('field-required')),
        name: yup.string().required(t('field-required')),
        password: yup.string().required(t('field-required')),
        repassword: yup
          .string()
          .required(t('field-required'))
          .oneOf([yup.ref('password'), ''], t('Mật khẩu nhập lại không đúng')),
        userName: yup.string().required(t('field-required')),
        emailAddress: yup
          .string()
          .email(t('Email không hợp lệ'))
          .required(t('field-required'))
          .email(),
        homeAddress: yup.string().nullable(),
        addressOfBirth: yup.string().nullable(),
      }),
    [t],
  );
  const updateSchema = useMemo(
    () =>
      yup.object().shape({
        surname: yup.string().required(t('field-required')),
        name: yup.string().required(t('field-required')),
        emailAddress: yup.string().required(t('field-required')),
        homeAddress: yup.string().nullable(),
        addressOfBirth: yup.string().nullable(),
      }),
    [t],
  );

  return (
    <BaseCrudPage
      title={t('accounts')}
      name="accounts"
      unitName={t('accounts')}
      service={accountsService}
      columns={columns}
      hideSelectRowCheckbox
      viewTabFields={[
        { label: t('Thông tin'), fields: basicViewFields },
        {
          label: t('Phân quyền'),
          fields: [
            {
              name: 'roleNames',
              type: 'multiautocomplete',
              colSpan: 12,
              options: allRoles.map(
                (p: { name: string; normalizedName: string }) => ({
                  label: p.name,
                  value: p.normalizedName,
                }),
              ),
              readOnly: true,
            },
          ],
        },
      ]}
      beautyView
      beautyViewFormWidth="sm"
      createTabFields={[
        { label: t('Thông tin'), fields: basicCreateFields },
        {
          label: t('Phân quyền'),
          fields: [
            {
              name: 'roleNames',
              type: 'multiautocomplete',
              colSpan: 12,
              options: allRoles.map(
                (p: { name: string; normalizedName: string }) => ({
                  label: p.name,
                  value: p.normalizedName,
                }),
              ),
            },
          ],
        },
      ]}
      updateTabFields={[
        { label: t('Thông tin'), fields: basicUpdateFields },
        {
          label: t('Phân quyền'),
          fields: [
            {
              name: 'roleNames',
              type: 'multiautocomplete',
              colSpan: 12,
              options: allRoles.map(
                (p: { name: string; normalizedName: string }) => ({
                  label: p.name,
                  value: p.normalizedName,
                }),
              ),
            },
          ],
        },
      ]}
      createSchema={createSchema}
      updateSchema={updateSchema}
      formWidth="lg"
      hideAddBtn={false}
      hideDeleteManyBtn={false}
      hideExportExcelBtn={true}
      hideImportExcelBtn={true}
      hasCustomActions={false}
      hideSearchInput={false}
      extendActions={[
        {
          icon: <RefreshTwoTone color="primary" />,
          title: t('Đổi mật khẩu'),
          onClick: (params) => {
            NiceModal.show(ChangePassModal, {
              row: params.row,
              mode: 'changepass',
              title: t('Đổi mật khẩu'),
            });
          },
        },
      ]}
    />
  );
};
export default SystemAccountsPage;
