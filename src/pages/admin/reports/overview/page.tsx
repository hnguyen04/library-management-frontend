import useTranslation from "@/hooks/use-translation";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import LibraryStatistics from "./_components/library-statistics";
import BookLoanStatistics from "./_components/book-loan-statistics";


const ReportPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <StyledMain component="main">
                <Typography variant="h5" component="h1">
                    {t('Thống kê thư viện')}
                </Typography>

                <Box sx={{ my: 3 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <LibraryStatistics />
                    </Grid>
                </Box>
                <Box sx={{ my: 3 }} />

                <Typography variant="h5" component="h1">
                    {t('Thống kê mượn sách')}
                </Typography>

                <Box sx={{ my: 3 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <BookLoanStatistics />
                    </Grid>
                </Box>

            </StyledMain>
        </>
    )
}

const StyledMain = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
}));

export default ReportPage;