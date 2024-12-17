import React from 'react';
import { Chip, Stack } from '@mui/material';
import { EBookLoanStatus } from '../_services/bookLoans.model';
import useTranslation from '@/hooks/use-translation';

interface StatusChipProps {
    status: EBookLoanStatus;
    returnDate?: string; // Dưới dạng ISO string
}

const BookLoanStatusChip: React.FC<StatusChipProps> = ({ status, returnDate }) => {
    const { t } = useTranslation();

    // Hàm để lấy props cho Chip dựa trên trạng thái
    const getChipProps = (status: EBookLoanStatus) => {
        switch (status) {
            case EBookLoanStatus.Request_Borrowing:
                return { label: t('Yêu cầu mượn'), color: 'info' as 'info', variant: 'outlined' as 'outlined' };
            case EBookLoanStatus.Borrowed:
                return { label: t('Đang mượn'), color: 'success' as 'success', variant: 'outlined' as 'outlined' };
            case EBookLoanStatus.Returned:
                return { label: t('Đã trả'), color: 'success' as 'success', variant: 'filled' as 'filled' };
            case EBookLoanStatus.Request_Returning:
                return { label: t('Yêu cầu trả'), color: 'warning' as 'warning', variant: 'outlined' as 'outlined' };
            case EBookLoanStatus.Nonreturnable:
                return { label: t('Không thể trả'), color: 'error' as 'error', variant: 'outlined' as 'outlined' };
            case EBookLoanStatus.Rejected:
                return { label: t('Từ chối'), color: 'secondary' as 'secondary', variant: 'outlined' as 'outlined' };
            default:
                return { label: t('Không xác định'), color: 'default' as 'default', variant: 'outlined' as 'outlined' };
        }
    };

    // Kiểm tra ngày quá hạn
    const isOverdue = (returnDate?: string): boolean => {
        if (!returnDate) return false;
        const today = new Date();
        const dueDate = new Date(returnDate);
        return dueDate < today; // returnDate trước ngày hôm nay
    };

    const chipProps = getChipProps(status);
    const overdue = isOverdue(returnDate);

    return (
        <Stack spacing={0.5} style={{paddingTop: 0.25}}>
            {/* Chip Trạng Thái Chính */}
            <Chip {...chipProps} />

            {/* Chip Quá Hạn nếu có */}
            {overdue && (
                <Chip label={t('Quá hạn')} color="error" variant="filled" />
            )}
        </Stack>
    );
};

export default BookLoanStatusChip;
