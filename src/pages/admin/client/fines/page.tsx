import BaseCrudPage from '@/base/base-crud-page';
import useTranslation from '@/hooks/use-translation';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Typography } from '@mui/material';


import finesClientService from './_services/fines.service';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { hashUUIDTo8Char } from '@/services/utils';
import useAuth from '@/hooks/use-auth';

const FinesClientPage = () => {
    const { t } = useTranslation();
    const authQuery = useAuth();

    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t('ID'),
            type: 'text',
            width: 150,
            renderCell: (params) => hashUUIDTo8Char(params.row.id),
        },
        {
            field: "bookLoanId",
            headerName: t('Mã mượn'),
            type: 'text',
            width: 150,
            renderCell: (params) => hashUUIDTo8Char(params.row.bookLoanId),
        },
        {
            field: 'bookTitle',
            headerName: t('Tiêu đề'),
            type: 'text',
            width: 200,
            flex: 1,
        },
        {
            field: 'amount',
            headerName: t('Số tiền'),
            type: 'text',
            width: 200,
            renderCell: (params) => <Typography>{params.row.amount} ₫</Typography>
        }
    ], [t]);


    const viewFields = useMemo<TCrudFormField[]>(
        () => [
            {
                name: 'id',
                label: t('ID'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
                formatValue: (value) => hashUUIDTo8Char(value),
            },
            {
                name: 'bookLoanId',
                label: t('Mã mượn'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
                formatValue: (value) => hashUUIDTo8Char(value),
            },
            {
                name: 'bookTitle',
                label: t('Tiêu đề'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
            },
            {
                name: 'amount',
                label: t('Số tiền'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
            }
        ],
        [t],
    );


    return (
        <>
            <BaseCrudPage
                title={t('Danh sách hình phạt')}
                name='finesClient'
                unitName={t('Danh sách hình phạt')}
                service={finesClientService}
                columns={columns}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                hideAddBtn
                hideDeleteAction
                hideDeleteManyBtn
                hideEditAction
                viewFields={viewFields}
                beautyView
                defaultGetAllParams={{
                    userId: authQuery.data?.id,
                }}
            />
        </>
    );
}
export default FinesClientPage;
