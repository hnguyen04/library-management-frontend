import BaseCrudPage from '@/base/base-crud-page';
import useTranslation from '@/hooks/use-translation';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import * as yup from 'yup';

import finesService from './_services/fines.service';
import { TCrudFormField } from '@/base/crud-form-field.type';
import { Typography } from '@mui/material';
import { hashUUIDTo8Char } from '@/services/utils';

const FinesPage = () => {
    const { t } = useTranslation();

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
            field: 'userName',
            headerName: t('Người dùng'),
            type: 'text',
            width: 200,
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
            renderCell: (params) => <Typography variant='body2'>{params.row.amount} ₫</Typography>
        }
    ], [t]);

    const updateFields = useMemo<TCrudFormField[]>(
        () => [
            {
                name: 'amount',
                label: t('Số tiền'),
                type: 'number',
                required: false,
                colspan: 12,
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
                readOnly: true,
            },
            {
                name: 'bookLoanId',
                label: t('Mã mượn'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
            },
            {
                name: 'userName',
                label: t('Người dùng'),
                type: 'text',
                colSpan: 6,
                readOnly: true,
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

    // const filterFields = useMemo<TCrudFormField[]>(
    //     () => [
    //         {
    //             name: 'loanId',
    //             label: t('Mã mượn'),
    //             type: 'text',
    //             colSpan: 12,
    //         },
    //         {
    //             name: 'userName',
    //             label: t('Người dùng'),
    //             type: 'text',
    //             colSpan: 6,
    //         },
    //         {
    //             name: 'bookTitle',
    //             label: t('Tiêu đề'),
    //             type: 'text',
    //             colSpan: 6,
    //         }
    //     ],
    //     [t],
    // )


    const updateSchema = useMemo(
        () =>
            yup.object().shape({
                amount: yup.number().min(0, 'Số tiền không hợp lệ'),
            }),
        [t],
    );


    return (
        <>
            <BaseCrudPage
                title={t('Quản lý phạt')}
                name='fines'
                unitName={t('Quản lý phạt')}
                service={finesService}
                columns={columns}
                updateSchema={updateSchema}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                hideAddBtn
                updateFields={updateFields}
                viewFields={viewFields}
                beautyView
            />
        </>
    );
}
export default FinesPage;
