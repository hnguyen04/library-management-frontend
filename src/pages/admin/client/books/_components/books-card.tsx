import {
    MapsHomeWorkTwoTone as ApartmentIcon,
    Groups3TwoTone as PeopleIcon,
    SortByAlphaTwoTone as TypeIcon,
    Paid as MoneyIcon,
} from '@mui/icons-material';
import {
    Button,
    Card,
    CardActions,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useQueryClient } from '@tanstack/react-query';
import useTranslation from '@/hooks/use-translation';
import useAuth from '@/hooks/use-auth';
import IBook from '../_services/book.model';
import CreateLoanModal from './create-loan-modal';

export const BookCardContainer = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    );
};

type TBookItemCardProps = {
    refetchData: () => void;
    onClickViewBtn: () => void;
    item: IBook;
};

export const BookItemCard = (props: TBookItemCardProps) => {
    const { item, onClickViewBtn } = props;
    const queryClient = useQueryClient();

    const { t } = useTranslation();
    const authQuery  = useAuth();

    return (
        <Grid xs={12} sm={6} md={4} xl={3}>
            <Card>
                <Stack p={1} pt={2} spacing={0.5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Tooltip title={item.title} placement="top">
                            <Typography
                                color="primary.main"
                                noWrap={true}
                                fontWeight={700}
                                fontSize="1.125rem"
                            >
                                {item.title}
                            </Typography>
                        </Tooltip>
                    </Stack>

                    <Typography variant="subtitle2" color="primary.main" pt={1}>
                        {t('Thông tin chi tiết')}
                    </Typography>

                    <Grid container spacing={1}>
                        <Grid xs={8}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <MoneyIcon fontSize="small" color="primary" />
                                <Typography variant="body2">
                                    {t('Giá')}: <strong>{item.price || t('Chưa có')} ₫</strong>
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <ApartmentIcon fontSize="small" color="primary" />
                                <Typography variant="body2">
                                    {t('Nhà xuất bản')}: <strong>{item.publisherName}</strong>
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PeopleIcon fontSize="small" color="primary" />
                                <Tooltip title={item.authors?.map(author => author.name).join(', ')} placement="top">
                                    <Typography
                                        variant="subtitle2"
                                        noWrap={true}
                                        fontWeight={700}
                                    >   
                                        
                                        {item.authors?.length || 0} {t('Tác giả')}
                                    </Typography>
                                </Tooltip>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <TypeIcon fontSize="small" color="primary" />
                                <Tooltip title={item.categories?.map(category => category.name).join(', ')} placement="top">
                                    <Typography
                                        variant="subtitle2"
                                        noWrap={true}
                                        fontWeight={700}
                                    >   
                                        
                                        {item.categories?.length || 0} {t('Thể loại')}
                                    </Typography>
                                </Tooltip>
                            </Stack>
                        </Grid>
                        <Grid xs={4}>
                            <img
                                src={'/assets/images/books.png'}
                                alt={item.title}
                                width="100%"
                            />
                        </Grid>
                    </Grid>
                </Stack>

                <CardActions
                    sx={{ justifyContent: 'space-between', p: 0, pb: 2, px: 1 }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{ flex: 1, padding: 0.2, borderRadius: 1 }}
                        onClick={() => onClickViewBtn()}
                    >
                        {t('Xem chi tiết')}
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ flex: 1, padding: 0.2, borderRadius: 1 }}
                        onClick={() => NiceModal.show(CreateLoanModal, { 
                            bookId: item.id, 
                            userId: authQuery.data?.id,
                            refetchData : () => queryClient.invalidateQueries(['books/GetAll'])
                        })}
                    >
                        {t('Mượn sách')}
                    </Button>
                </CardActions>

            </Card>
        </Grid >
    );
};
