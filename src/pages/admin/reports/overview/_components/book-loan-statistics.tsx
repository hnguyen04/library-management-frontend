import { Grid, Paper, Typography, Avatar } from "@mui/material";
import { blue, green, orange, purple, red, brown, cyan } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useQuery } from "@tanstack/react-query";
import { 
    CheckBox as BorrowIcon,
    Handshake as ReturnIcon,
    AccessAlarm as OverdueIcon,
    AddBox as RequestBorrowIcon,
    Undo as RequestReturnIcon,
    Block as RejectIcon,
    AssignmentLate as NonreturnableIcon,


} from "@mui/icons-material";


import useTranslation from "@/hooks/use-translation";
import bookLoansService from "@/pages/admin/bookLoans/_services/bookLoans.service";
import appService from "@/services/app/app.service";
import { EBookLoanStatus } from "@/pages/admin/bookLoans/_services/bookLoans.model";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function BookLoanStatistics() {

    const { t } = useTranslation();

    const { data: getAllBookLoansRes, isLoading } = useQuery({
        queryKey: ['admin/bookLoans/getAllBookLoans'],
        queryFn: () => bookLoansService.getAllBooksLoans(),
        onSettled: () => appService.hideLoadingModal(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if (isLoading) {
            appService.showLoadingModal();
        }
    }, [isLoading]);


    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={4}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Đang mượn')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Borrowed).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Borrowed).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <BorrowIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Đã trả')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Returned).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Returned).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: cyan[500] }}>
                                        <ReturnIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Quá hạn')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: any) => new Date(loan.returnDate) < new Date()).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: any) => new Date(loan.returnDate) < new Date()).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: orange[500] }}>
                                        <OverdueIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={3}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Yêu cầu mượn')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Request_Borrowing).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Request_Borrowing).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: blue[500] }}>
                                        <RequestBorrowIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Yêu cầu trả')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Request_Returning).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Request_Returning).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: purple[500] }}>
                                        <RequestReturnIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Từ chối')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Rejected).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Rejected).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        <RejectIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                mb={1}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1" fontWeight={600} color="#6C737F">
                                        {t('Không thể trả')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Nonreturnable).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookLoansRes?.data && getAllBookLoansRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookLoansRes?.data?.filter((loan: { status: EBookLoanStatus }) => loan.status === EBookLoanStatus.Nonreturnable).length /
                                                        getAllBookLoansRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số sách mượn trả')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: brown[500] }}>
                                        <NonreturnableIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}