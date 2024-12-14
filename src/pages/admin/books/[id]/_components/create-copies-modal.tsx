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
import bookCopiesService from '../_services/bookCopies.service';

import { getErrorMessage } from '@/services/utils';

type TCreateCopiesModal = {
    id: string;
    refetchData?: () => void;
};

const CreateBookCopyModal = NiceModal.create((props: TCreateCopiesModal) => {
    const { id, refetchData } = props;
    const uid = useId();
    const modal = useModal();
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const schema = useMemo(
        () =>
            yup.object().shape({
                number: yup.number()
                    .required(t('Vui lòng nhập số lượng'))
                    .min(1, t('Số lượng phải lớn hơn 0'))
                    .max(10, t('Số lượng phải nhỏ hơn 10')),
                id: yup.string().required(t('Vui lòng nhập ID')),
            }),
        [],
    );
    const form = useForm({
        mode: 'onChange',
        resolver: schema ? yupResolver(schema) : undefined,
        defaultValues: {
            id: id,
            number: 1,
        },
    });

    const bookCopyMutation = useMutation({
        mutationFn: (data: any) => bookCopiesService.createMultipleBookCopies(data),
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
                {t('Thêm bản ghi sách')}
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
                                        name: 'id',
                                        label: t('ID'),
                                        type: 'text',
                                        defaultValue: id,
                                        readOnly: true,
                                        colSpan: 6,
                                    }}
                                />
                            </Grid>
                            <Grid xs={6} md={6} item>
                                <BaseFormInput
                                    control={control}
                                    field={{
                                        required: true,
                                        name: 'number',
                                        label: t('Số lượng'),
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
                    form={uid + 'OrderCancelForm'}
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
export default CreateBookCopyModal;
