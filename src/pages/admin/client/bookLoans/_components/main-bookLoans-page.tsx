import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import {
    AddBox as RequestReturnIcon,
    Undo as RejectBorrowingIcon,
} from "@mui/icons-material";

import BaseCrudPage from "@/base/base-crud-page";
import { TCrudFormField } from "@/base/crud-form-field.type";
import useTranslation from "@/hooks/use-translation";
import useAuth from "@/hooks/use-auth";
import { formatDate } from "@/services/utils-date";
import { EBookLoanClientStatus } from "../_services/bookLoans.model";
import bookLoansClientService from "../_services/bookLoans.service";
import appService from "@/services/app/app.service";
import { getErrorMessage, hashUUIDTo8Char } from "@/services/utils";
import BookLoanStatusChip from "@/pages/admin/bookLoans/_components/bookloan-status-chip";

interface IMainBookLoansPageProps {
    status?: EBookLoanClientStatus;
}

const MainBookLoansClientPage = (props: IMainBookLoansPageProps) => {
    const { status } = props;
    const queryClient = useQueryClient();
    const authQuery = useAuth();

    const { t } = useTranslation();


    const removeBorrowMutation = useMutation({
        mutationFn: (data: any) => bookLoansClientService.removeBorrow(data),
        onMutate: () => {
            appService.showLoadingModal();
        },
        onSettled: () => {
            appService.hideLoadingModal();
        },
        onSuccess: () => {
            enqueueSnackbar(t('Thành công'), {
                variant: 'success',
            });
            queryClient.refetchQueries({ queryKey: ['bookLoansClient/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })
    const requestReturningMutation = useMutation({
        mutationFn: (data: any) => bookLoansClientService.requestReturning(data),
        onMutate: () => {
            appService.showLoadingModal();
        },
        onSettled: () => {
            appService.hideLoadingModal();
        },
        onSuccess: () => {
            enqueueSnackbar(t('Thành công'), {
                variant: 'success',
            });
            queryClient.refetchQueries({ queryKey: ['bookLoansClient/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })


    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t("ID"),
            type: "number",
            width: 150,
            renderCell: (params) => hashUUIDTo8Char(params.row.id),
        },
        {
            field: "bookCopyId",
            headerName: t("Id bản ghi"),
            type: "text",
            width: 150,
            renderCell: (params) => hashUUIDTo8Char(params.row.bookCopyId),
        },
        {
            field: "bookTitle",
            headerName: t("Tiêu đề"),
            type: "text",
            width: 300,
            flex: 1,
        },
        {
            field: "loanDate",
            headerName: t("Thời gian mượn"),
            type: "text",
            width: 150,
            renderCell: (params) => formatDate(params.row.loanDate, 'DD/MM/YYYY HH:mm'),
        },
        {
            field: "returnDate",
            headerName: t("Thời gian hết hạn"),
            type: "text",
            width: 150,
            renderCell: (params) => formatDate(params.row.returnDate, 'DD/MM/YYYY HH:mm'),
        },
        {
            field: "actualReturnDate",
            headerName: t("Thời gian trả thực tế"),
            type: "text",
            width: 180,
            renderCell: (params) => formatDate(params.row.actualReturnDate, 'DD/MM/YYYY HH:mm'),
            hide: status !== null && (status !== EBookLoanClientStatus.Returned && status !== EBookLoanClientStatus.Request_Returning),
        },
        {
            field: "status",
            headerName: t("Trạng thái"),
            type: "text",
            width: 150,
            renderCell: (params) => <BookLoanStatusChip status={params.row.status} returnDate={params.row.returnDate} />,
        }
    ], [t, status]);

    const viewFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "id",
            label: t("ID"),
            type: "text",
            colSpan: 6,
            readOnly: true,
            formatValue: (value) => hashUUIDTo8Char(value),
        },
        {
            name: "bookTitle",
            label: t("Tiêu đề"),
            type: "text",
            colSpan: 6,
            readOnly: true,
        },
        {
            name: "loanDate",
            label: t("Thời gian mượn"),
            type: "datetime",
            formatValue: (value) => formatDate(value, 'YYYY-MM-DD HH:mm'),
            colSpan: 6,
            readOnly: true,
        },
        {
            name: "returnDate",
            label: t("Thời gian hết hạn"),
            type: "datetime",
            formatValue: (value) => formatDate(value, 'YYYY-MM-DD HH:mm'),
            colSpan: 6,
            readOnly: true,
        },
        {
            name: "actualReturnDate",
            label: t("Thời gian trả thực tế"),
            type: "datetime",
            formatValue: (value) => formatDate(value, 'YYYY-MM-DD HH:mm'),
            colSpan: 6,
            readOnly: true,
            hidden: status !== null && status !== EBookLoanClientStatus.Returned,
        },
        {
            name: "status",
            label: t("Trạng thái"),
            type: "text",
            colSpan: 6,
            readOnly: true,
            formatValue: (value) => t(value),
        }
    ], [t]);

    const filterFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "bookTitle",
            label: t("Tiêu đề"),
            type: "text",
            colSpan: 6,
        },
    ], [t]);


    const extendActions = useMemo(() => {
        switch (status) {
            case EBookLoanClientStatus.Request_Borrowing:
                return [
                    {
                        title: t("Thu hồi"),
                        icon: <RejectBorrowingIcon color="error" />,
                        onClick: (_row: any) => {
                            removeBorrowMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                ];
            case EBookLoanClientStatus.Borrowed:
                return [
                    {
                        title: t("Yêu cầu trả"),
                        icon: <RequestReturnIcon color="info" />,
                        onClick: (_row: any) => {
                            requestReturningMutation.mutate({
                                bookLoanId: _row.row.id,
                                actualReturnDate: new Date().toISOString()
                            });
                        }
                    }
                ];
            default:
                return [];
        }
    }, [
        status, 
        t, 
        removeBorrowMutation,
    ]);

    return (
        <>
            <BaseCrudPage
                title=''
                name='bookLoansClient'
                unitName=''
                service={bookLoansClientService}
                columns={columns}
                viewFields={viewFields}
                filterFields={filterFields}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                beautyView
                hideAddBtn
                hideDeleteAction
                hideDeleteManyBtn
                hideEditAction
                defaultGetAllParams={{
                    status: status,
                    userId: authQuery.data?.id
                }}
                extendActions={extendActions}
            />
        </>
    );
};

export default MainBookLoansClientPage;
