import { Grid, Paper, Typography, Avatar } from "@mui/material";
import { blue, green, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import {
    CheckBox as AcceptedIcon,
    ThumbDown as DeniedIcon,
    HourglassEmpty as PendingIcon,


} from "@mui/icons-material";


import useTranslation from "@/hooks/use-translation";
import bookRequestsService from "@/pages/admin/client/bookRequests/_services/bookRequests.service";
import appService from "@/services/app/app.service";
import useAuth from "@/hooks/use-auth";
import { EBookRequestStatus } from "@/pages/admin/client/bookRequests/_services/bookRequest.model";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function BookRequestStatistics() {

    const { t } = useTranslation();
    const authQuery = useAuth();

    const { data: getAllBookRequestsRes, isLoading } = useQuery({
        queryKey: ['admin/bookRequests/getAllBookRequests'],
        queryFn: () => bookRequestsService.getAllClientBooksRequests(authQuery?.data?.id as string),
        onSettled: () => appService.hideLoadingModal(),
        staleTime: Infinity,
    });

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
                                        {t('ACCEPTED')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.ACCEPTED).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookRequestsRes?.data && getAllBookRequestsRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.ACCEPTED).length /
                                                        getAllBookRequestsRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số yêu cầu')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <AcceptedIcon />
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
                                        {t('DENIED')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.DENIED).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookRequestsRes?.data && getAllBookRequestsRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.DENIED).length /
                                                        getAllBookRequestsRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số yêu cầu')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        <DeniedIcon />
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
                                        {t('PENDING')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.PENDING).length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="#6C737F">
                                        <span style={{ color: green[500], fontWeight: '600' }}>
                                            {getAllBookRequestsRes?.data && getAllBookRequestsRes?.totalRecords > 0
                                                ? (
                                                    Number(
                                                        getAllBookRequestsRes?.data?.filter((request: { status: EBookRequestStatus }) => request.status === EBookRequestStatus.PENDING).length /
                                                        getAllBookRequestsRes?.totalRecords,
                                                    ) * 100
                                                ).toFixed(2)
                                                : 0}
                                            %{' '}
                                        </span>
                                        {t('Tổng số yêu cầu')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: blue[500] }}>
                                        <PendingIcon />
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