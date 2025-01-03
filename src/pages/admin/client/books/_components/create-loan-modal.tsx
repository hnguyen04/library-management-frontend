import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useId, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import BaseFormInput from '@/base/base-form-input';
import useTranslation from '@/hooks/use-translation';
import appService from '@/services/app/app.service';
import booksClientService from '../_services/books.service';

import { getErrorMessage } from '@/services/utils';

type TCreateCopiesModal = {
    bookId: string;
    userId: string;
    refetchData?: () => void;

};

const CreateLoanModal = NiceModal.create((props: TCreateCopiesModal) => {
    const { bookId, userId, refetchData } = props;
    const uid = useId();
    const modal = useModal();
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const schema = useMemo(
        () =>
            yup.object().shape({
                loanDate: yup.date().required(t('Vui lòng nhập ngày mượn')),
                numberOfDaysLoan: yup.number().required(t('Vui lòng nhập số ngày mượn')).min(1, t('Số ngày mượn phải lớn hơn 0')),
            }),
        [],
    );
    const form = useForm({
        mode: 'onChange',
        resolver: schema ? yupResolver(schema) : undefined,
        defaultValues: {
            loanDate: new Date(),
            numberOfDaysLoan: 7,
        },
    });

    const bookCopyMutation = useMutation({
        mutationFn: (data: any) => booksClientService.createBookLoan(data),
        onMutate: () => {
            appService.showLoadingModal();
        },
        onSettled: () => {
            appService.hideLoadingModal();
        },
        onSuccess: () => {
            refetchData && refetchData();
            enqueueSnackbar(t('Thành công'), {
                variant: 'success',
            });
            modal.hide();
        },
        onError: (err: any) => {
            const errormsg = t('Thất bại');
            enqueueSnackbar(getErrorMessage(errormsg, err), {
                variant: 'error',
            });
        },
    });
    const onSubmit = useCallback(
        (data: any) => {
            data.bookId = bookId;
            data.userId = userId;
            bookCopyMutation.mutate(data);
        },
        [bookCopyMutation],
    );
    const { handleSubmit, formState, control } = form;
    return (
        <Dialog
            {...muiDialogV5(modal)}
            fullWidth
            //maxWidth="lg"
            scroll="paper"
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'flex-start',
                },
            }}
        >
            <DialogTitle
                sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {t('Mượn sách')}
            </DialogTitle>
            <DialogContent>
                <FormProvider {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                        <Grid container spacing={2} sx={{ p: 3 }}>
                            <Grid xs={6} md={6} item>
                                <BaseFormInput
                                    control={control}
                                    field={{
                                        required: true,
                                        name: 'loanDate',
                                        label: t('Thời gian mượn'),
                                        type: 'datetime',
                                        colSpan: 6,
                                    }}
                                />
                            </Grid>
                            <Grid xs={6} md={6} item>
                                <BaseFormInput
                                    control={control}
                                    field={{
                                        required: true,
                                        name: 'numberOfDaysLoan',
                                        label: t('Thời hạn mượn (ngày)'),
                                        type: 'number',
                                        colSpan: 6,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </FormProvider>
            </DialogContent>
            <DialogActions
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                    py: 1,
                    height: '64px',
                }}
            >
                <Button
                    disabled={formState.isSubmitting || !formState.isValid}
                    variant="contained"
                    onClick={() => {
                        formRef.current?.dispatchEvent(
                            new Event('submit', { cancelable: true, bubbles: true }),
                        );
                    }}
                >
                    {t('Xác nhận')}
                </Button>
                <Button
                    variant="text"
                    color="inherit"
                    form={uid + 'CopiesCancelForm'}
                    type="reset"
                    onClick={() => {
                        modal.hide();
                    }}
                >
                    {t('Đóng')}
                </Button>
            </DialogActions>
        </Dialog>
    );
});
export default CreateLoanModal;
