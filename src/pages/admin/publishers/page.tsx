import BaseCrudPage from '@/base/base-crud-page';
import publishersService from './_services/publishers.services';
import useTranslation from '@/hooks/use-translation';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { TCrudFormField } from '@/base/crud-form-field.type';

const PublishersPage = () => {
    const {t} = useTranslation();

    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t('ID'),
            type: 'number',
            width: 150,
            sortable: true,
        },
        {
            field: 'name',
            headerName: t('Tên'),
            type: 'string',
            flex: 1
        }
    ], [t]);

    const createFields = useMemo<TCrudFormField[]>(() => [
        {
            name: 'name',
            label: t('Tên nhà xuất bản'),
            type: 'text',
            required: true,
            colspan: 6,
        },
    ], [t]);

    const updateFields = useMemo<TCrudFormField[]>(
        () => [
            {
                name: 'name',
                label: t('Sửa tên nhà xuất bản'),
                type: 'text',
                required: true,
                colspan: 6,
            }
          
        ],
        [t],
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
                label: t('Tên nhà xuất bản'),
                type: 'text',
                required: true,
                colspan: 6,
            }
        ],
        [t],
      );

    
    return (
        <>
            <BaseCrudPage
                title = {t('Nhà xuất bản')}
                name = {t('Nhà xuất bản')}
                unitName= {t('Nhà xuất bản')}
                service = {publishersService}
                columns={columns}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                createFields={createFields}
                updateFields={updateFields}
                viewFields={viewFields}
                />
        </>
    );
}
export default PublishersPage;
