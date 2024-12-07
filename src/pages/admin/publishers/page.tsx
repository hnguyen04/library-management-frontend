import BaseCrudPage from '@/base/base-crud-page';
import publishersService from './_services/publishers.services';
import useTranslation from '@/hooks/use-translation';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { TBaseCrudCol } from '@/base/base.model';

const PublishersPage = () => {
    const {t} = useTranslation();

    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t('ID'),
            type: 'number',
            width: 150,
        },
        {
            field: 'name',
            headerName: t('Tên'),
            type: 'string',
            flex: 1
        }
    ], [t]);

    const createFields = useMemo<TBaseCrudCol[]>(() => [
        {
            name: 'name',
            label: t('Tên nhà xuất bản'),
            type: 'text',
            required: true,
            colspan: 6,
        },
    ], [t]);

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
                />
        </>
    );
}
export default PublishersPage;
