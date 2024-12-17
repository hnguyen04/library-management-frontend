import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import {
    DoneOutline as ApproveBorrowingIcon,
    DoNotDisturbOn as RejectBorrowingIcon,
} from "@mui/icons-material";

import BaseCrudPage from "@/base/base-crud-page";
import { TCrudFormField } from "@/base/crud-form-field.type";
import useTranslation from "@/hooks/use-translation";
import { formatDate } from "@/services/utils-date";
import { EBookLoanStatus } from "../_services/bookLoans.model";
import bookLoansService from "../_services/bookLoans.service";
import appService from "@/services/app/app.service";
import { getErrorMessage, hashUUIDTo8Char } from "@/services/utils";
import BookLoanStatusChip from "./bookloan-status-chip";

interface IMainBookLoansPageProps {
    status?: EBookLoanStatus;
}

const MainBookLoansPage = (props: IMainBookLoansPageProps) => {
    const { status } = props;
    const queryClient = useQueryClient();

    const { t } = useTranslation();

    const setBookBorrowedMutation = useMutation({
        mutationFn: (data: any) => bookLoansService.setBookBorrowed(data),
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
            queryClient.refetchQueries({ queryKey: ['bookLoans/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })

    const setBookRejectedMutation = useMutation({
        mutationFn: (data: any) => bookLoansService.setBookRejected(data),
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
            queryClient.refetchQueries({ queryKey: ['bookLoans/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })
    const setReturnAcceptedMutation = useMutation({
        mutationFn: (data: any) => bookLoansService.setReturnAccepted(data),
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
            queryClient.refetchQueries({ queryKey: ['bookLoans/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })
    const setReturnRejectedMutation = useMutation({
        mutationFn: (data: any) => bookLoansService.setReturnRejected(data),
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
            queryClient.refetchQueries({ queryKey: ['bookLoans/getAll'] });
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    })

    const setNonreturnableMutation = useMutation({
        mutationFn: (data: any) => bookLoansService.setNonreturnable(data),
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
            queryClient.refetchQueries({ queryKey: ['bookLoans/getAll'] });
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
            type: "text",
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
            field: "userName",
            headerName: t("Người mượn"),
            type: "text",
            width: 100,
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
            width: 150,
            renderCell: (params) => formatDate(params.row.actualReturnDate, 'DD/MM/YYYY HH:mm'),
            hide: status !== null && status !== EBookLoanStatus.Returned
        },
        {
            field: "status",
            headerName: t("Trạng thái"),
            type: "text",
            width: 150,
            renderCell: (params) => <BookLoanStatusChip status={params.row.status} returnDate={params.row.returnDate} />,
        }
    ], [t, status]);

    const updateFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "loanDate",
            label: t("Thời gian mượn"),
            type: "datetime",
            required: true,
            colspan: 12,
        },
        {
            name: "returnDate",
            label: t("Thời gian hết hạn"),
            type: "datetime",
            required: true,
            colSpan: 12,
        },
        {
            name: "actualReturnDate",
            label: t("Thời gian trả thực tế"),
            type: "datetime",
            colSpan: 12,
            disabled: status !== null && (status !== EBookLoanStatus.Returned && status !== EBookLoanStatus.Request_Returning),
            hidden: status !== null && (status !== EBookLoanStatus.Returned && status !== EBookLoanStatus.Request_Returning),
        }
    ], [t]);

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
            name: "bookCopyId",
            label: t("Id bản ghi"),
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
            name: "userName",
            label: t("Người mượn"),
            type: "text",
            colSpan: 6,
            readOnly: true,
        },
        {
            name: "loanDate",
            label: t("Thời gian mượn"),
            type: "datetime",
            colSpan: 6,
            formatValue: (value) => formatDate(value, 'DD/MM/YYYY HH:mm'),
            readOnly: true,
        },
        {
            name: "returnDate",
            label: t("Thời gian hết hạn"),
            type: "datetime",
            colSpan: 6,
            formatValue: (value) => formatDate(value, 'DD/MM/YYYY HH:mm'),
            readOnly: true,
        },
        {
            name: "actualReturnDate",
            label: t("Thời gian trả thực tế"),
            type: "datetime",
            colSpan: 6,
            readOnly: true,
            formatValue: (value) => formatDate(value, 'DD/MM/YYYY HH:mm'),
            hidden: status !== null && status !== EBookLoanStatus.Returned,
        },
        {
            name: "status",
            label: t("Trạng thái"),
            type: "text",
            colSpan: 6,
            formatValue: (value) => t(value),
            readOnly: true,
        }
    ], [t]);

    const filterFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "bookTitle",
            label: t("Tiêu đề"),
            type: "text",
            colSpan: 6,
        },
        {
            name: "userName",
            label: t("Người mượn"),
            type: "text",
            colSpan: 6,
        }
    ], [t]);


    const updateSchema = useMemo(
        () =>
            yup.object().shape({
                loanDate: yup.date().required(t("field-required")),
                returnDate: yup.date().required(t("field-required")).min(
                    yup.ref('loanDate'),
                    t("Thời gian hết hạn phải sau thời gian mượn")
                ),
            }),
        [t],
    );

    const extendActions = useMemo(() => {
        switch (status) {
            case EBookLoanStatus.Request_Borrowing:
                return [
                    {
                        title: t("Phê duyệt"),
                        icon: <ApproveBorrowingIcon color="success" />,
                        onClick: (_row: any) => {
                            setBookBorrowedMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                    {
                        title: t("Từ chối"),
                        icon: <RejectBorrowingIcon color="error" />,
                        onClick: (_row: any) => {
                            setBookRejectedMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                ];
            case EBookLoanStatus.Request_Returning:
                return [
                    {
                        title: t("Phê duyệt"),
                        icon: <ApproveBorrowingIcon color="success" />,
                        onClick: (_row: any) => {
                            setReturnAcceptedMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                    {
                        title: t("Từ chối"),
                        icon: <RejectBorrowingIcon color="error" />,
                        onClick: (_row: any) => {
                            setReturnRejectedMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                ];
            case EBookLoanStatus.Borrowed:
                return [
                    {
                        title: t("Đánh dấu không thể trả lại"),
                        icon: <RejectBorrowingIcon color="error" />,
                        onClick: (_row: any) => {
                            setNonreturnableMutation.mutate({
                                bookLoanId: _row.row.id
                            });
                        }
                    },
                ];

            default:
                return [];
        }
    }, [
        status, 
        t, 
        setBookBorrowedMutation, 
        setBookRejectedMutation, 
        setReturnAcceptedMutation, 
        setReturnRejectedMutation
    ]);

    return (
        <>
            <BaseCrudPage
                title=''
                name='bookLoans'
                unitName=''
                service={bookLoansService}
                columns={columns}
                updateFields={updateFields}
                updateSchema={updateSchema}
                viewFields={viewFields}
                filterFields={filterFields}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                beautyView
                hideAddBtn
                defaultGetAllParams={{
                    status: status
                }}
                extendActions={extendActions}
            />
        </>
    );
};

export default MainBookLoansPage;
