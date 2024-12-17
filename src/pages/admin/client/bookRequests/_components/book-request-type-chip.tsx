import React from 'react';
import { Chip } from '@mui/material';
import { EBookRequestType } from '../_services/bookRequest.model';
import useTranslation from '@/hooks/use-translation';

interface StatusChipProps {
    type: EBookRequestType;
}

const BookRequestTypeChip: React.FC<StatusChipProps> = ({ type }) => {

    const { t } = useTranslation();

    const getChipProps = (type: EBookRequestType) => {
        switch (type) {
            case EBookRequestType.BORROWING:
                return { label: t('BORROWING'), color: 'info' as 'info', variant: 'outlined' as 'outlined' };
            case EBookRequestType.RETURNING:
                return { label: t('RETURNING'), color: 'warning' as 'warning', variant: 'outlined' as 'outlined' };
            default:
                return { label: 'Unknown', color: 'default' as 'default', variant: 'outlined' as 'outlined' };
        }
    };

    const chipProps = getChipProps(type);

    return <Chip {...chipProps} />;
};

export default BookRequestTypeChip;
