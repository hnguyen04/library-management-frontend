import React from 'react';
import { Chip } from '@mui/material';
import { EBookCopyStatus } from '../_services/bookCopies.model';
import useTranslation from '@/hooks/use-translation';

interface StatusChipProps {
    status: EBookCopyStatus;
}

const BookCopyStatusChip: React.FC<StatusChipProps> = ({ status }) => {

    const { t } = useTranslation();

    const getChipProps = (status: EBookCopyStatus) => {
        switch (status) {
            case EBookCopyStatus.AVAILABLE:
                return { label: t('Khả dụng'), color: 'success' as 'success', variant : 'outlined' as 'outlined' };
            case EBookCopyStatus.UNAVAILABLE:
                return { label: t('Không khả dụng'), color: 'error' as 'error', variant : 'outlined' as 'outlined' };
            default:
                return { label: 'Unknown', color: 'default' as 'default', variant : 'outlined' as 'outlined'};
        }
    };

    const chipProps = getChipProps(status);

    return <Chip {...chipProps} />;
};

export default BookCopyStatusChip;
