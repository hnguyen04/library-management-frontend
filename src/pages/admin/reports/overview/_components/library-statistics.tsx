import { Grid, Paper, Typography, Avatar } from "@mui/material";
import { blue, grey, pink, teal } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import {
    MenuBook as BookIcon,
    ContentCopy as CopyIcon,
    Person as AuthorIcon,
    Factory as PublisherIcon,
    FormatListBulleted as CategoryIcon
} from "@mui/icons-material";


import useTranslation from "@/hooks/use-translation";
import booksService from "@/pages/admin/books/_services/books.service";
import categoryService from "@/pages/admin/category/_services/category.service";
import authorsService from "@/pages/admin/authors/_services/authors.service";
import publishersService from "@/pages/admin/publishers/_services/publishers.services";
import appService from "@/services/app/app.service";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function LibraryStatistics() {

    const { t } = useTranslation();
    const { data: getAllBooksRes, isLoading: isBookLoading } = useQuery({
        queryKey: ['admin/books/getAllBooks'],
        queryFn: () => booksService.getAllBooks(),
        staleTime: Infinity,
    });
    const { data: getAllCategoriesRes, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['admin/category/getAllCategories'],
        queryFn: () => categoryService.getAllCategories(),
        staleTime: Infinity,
    })
    const { data: getAllAuthorsRes, isLoading: isAuthorsLoading } = useQuery({
        queryKey: ['admin/authors/getAllAuthors'],
        queryFn: () => authorsService.getAllAuthors(),
        staleTime: Infinity,
    })
    const { data: getAllPublishersRes, isLoading: isPublishersLoading } = useQuery({
        queryKey: ['admin/publishers/getAllPublishers'],
        queryFn: () => publishersService.getAllPublishers(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if (isBookLoading || isCategoriesLoading || isAuthorsLoading || isPublishersLoading) {
            appService.showLoadingModal();
        }
    }, [isBookLoading, isCategoriesLoading, isAuthorsLoading, isPublishersLoading]);


    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
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
                                        {t('Số lượng sách')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBooksRes?.totalRecords || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: blue[300] }}>
                                        <BookIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
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
                                        {t('Số lượng bản ghi')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllBooksRes?.data?.reduce((total, book) => total + book.numberOfCopiesAvailable, 0) || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: grey[500] }}>
                                        <CopyIcon />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
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
                                        {t('Số lượng tác giả')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllAuthorsRes?.totalRecords || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: pink[500] }}>
                                        <AuthorIcon />
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
                                        {t('Số lượng nhà xuất bản')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllPublishersRes?.totalRecords || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: blue[800] }}>
                                        <PublisherIcon />
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
                                        {t('Số lượng thể loại')}
                                    </Typography>
                                    <Typography variant="h4" color="#000" gutterBottom>
                                        {getAllCategoriesRes?.totalRecords || 0}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Avatar sx={{ bgcolor: teal[500] }}>
                                        <CategoryIcon />
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