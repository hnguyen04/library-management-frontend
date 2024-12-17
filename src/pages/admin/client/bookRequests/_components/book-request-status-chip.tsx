import React from 'react';
import { Chip } from '@mui/material';
import { EBookRequestStatus } from '../_services/bookRequest.model';
import useTranslation from '@/hooks/use-translation';

interface StatusChipProps {
    status: EBookRequestStatus;
}

const BookRequestStatusChip: React.FC<StatusChipProps> = ({ status }) => {

    const { t } = useTranslation();

    const getChipProps = (status: EBookRequestStatus) => {
        switch (status) {
            case EBookRequestStatus.ACCEPTED:
                return { label: t('ACCEPTED'), color: 'success' as 'success', variant: 'filled' as 'filled' };
            case EBookRequestStatus.DENIED:
                return { label: t('DENIED'), color: 'error' as 'error', variant: 'filled' as 'filled' };
            case EBookRequestStatus.PENDING:
                return { label: t('PENDING'), color: 'info' as 'info', variant: 'filled' as 'filled' };
            default:
                return { label: 'Unknown', color: 'default' as 'default', variant: 'filled' as 'filled' };
        }
    };

    const chipProps = getChipProps(status);

    return <Chip {...chipProps} />;
};

export default BookRequestStatusChip;
