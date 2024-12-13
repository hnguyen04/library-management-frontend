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
import categoryService from './_services/category.service';

const CategoriesPage = () => {
  const { t } = useTranslation();

  const { data: getallCategoriesRes } = useQuery({
    queryKey: ['system/category/getAllCategories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: Infinity,
  });

  const roleOptions = useMemo(() => {
    return getallCategoriesRes?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  }, [getallCategoriesRes]);

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
        headerName: t('categories_name'),
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
        name: "id",
        label: t("ID"),
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('categories_name'),
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
        name: "id",
        label: t("ID"),
        type: "number",
        required: true,
        colSpan: 6,
      },
      {
        name: 'name',
        label: t('categories_name'),
        type: 'text',
        required: true,
        colSpan: 6,
        readOnly: true,
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
        label: t('categories_name'),
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
      label: t('categories_name'),
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
      title={t('Thể loại')}
      name={t('Thể loại')}
      unitName={t('Thể loại')}
      service={categoryService}
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
      defaultGetAllParams={
        {
          roleId: 1,
        }
      }
    />
  );
};
export default CategoriesPage;