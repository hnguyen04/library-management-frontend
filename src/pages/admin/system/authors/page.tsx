import NiceModal from '@ebay/nice-modal-react';
import { RefreshTwoTone } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import * as yup from 'yup';

import BaseCrudPage from '@/base/base-crud-page';
import { TCrudFormField } from '@/base/crud-form-field.type';
import useTranslation from '@/hooks/use-translation';

//import ChangePassModal from './_components/change-pass-modal';
import authorsService from './_services/authors.service';

const AuthorsPage = () => {
  const { t } = useTranslation();

  const { data: getallAuthorsRes } = useQuery({
    queryKey: ['authors/getAllAuthors'],
    queryFn: () => authorsService.getAllAuthors(),
    staleTime: Infinity,
  });

  const roleOptions = useMemo(() => {
    return getallAuthorsRes?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  }, [getallAuthorsRes]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        headerName: t('ID'),
        field: 'id',
        type: 'number',
        width: 50,
        editable: false,
        renderCell: (params) => params.row.id,
      },
      {
        field: 'name',
        headerName: t('Tên tác giả'),
        width: 200,
        type: 'string',
        editable: false,
        flex: 5,
      },
    ],
    [t],
  );

  const createFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'name',
        label: t('Tên tác giả'),
        type: 'text',
        required: true,
        colSpan: 6,
      },

    ],
    [t, roleOptions],
  );

  const updateFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'name',
        label: t('Tên tác giả'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
    ],
    [t, roleOptions],
  );

  const viewFields = useMemo<TCrudFormField[]>(
    () => [
      {
        name: 'id',
        label: t('ID'),
        type: 'text',
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('Tên tác giả'),
        type: 'text',
        required: true,
        colSpan: 6,
      },
    ],
    [t, roleOptions],
  );

  const filterFields = useMemo<TCrudFormField[]>(() => [
    {
      name: "id",
      label: t("ID"),
      type: "number",
      required: true,
      colSpan: 6,
      readOnly: true,
    },
    {
      name: 'name',
      label: t('Tên tác giả'),
      type: 'text',
      colSpan: 6,
    },
   
  ], [roleOptions, t]);

  const createSchema = useMemo(
    () =>
        yup.object().shape({
            id: yup.number().required('Vui lòng nhập ID').min(1, 'ID phải lớn hơn 0'),
        }),
    [t],
  );

  const updateSchema = useMemo(
      () =>
          yup.object().shape({
              id: yup.number().required('Vui lòng nhập ID').min(1, 'ID phải lớn hơn 0'),
          }),
      [t],
  );



  return (
    <BaseCrudPage
      title={t('Tác giả')}
      name={t('Tác giả')}
      unitName={t('Tác giả')}
      service={authorsService}
      columns={columns}
      hideSelectRowCheckbox
      beautyView
      beautyViewFormWidth="sm"
      createFields={createFields}
      updateFields={updateFields}
      viewFields={viewFields}
      filterFields={filterFields}
      createSchema={createSchema}
      updateSchema={updateSchema}
      formWidth="lg"
      hideAddBtn={false}
      hideDeleteManyBtn={false}
      hideExportExcelBtn={true}
      hideImportExcelBtn={true}
      hasCustomActions={false}
      hideSearchInput={true}
    />
  );
};
export default AuthorsPage;
