
import useTranslation from "@/hooks/use-translation";
import BaseTabsPage from "@/base/base-tabs-page";
import MainBookLoansPage from "./_components/main-bookLoans-page";
import { EBookLoanStatus } from "./_services/bookLoans.model";

const BookLoansPage = () => {

    const { t } = useTranslation();

    const tabs = [
        {
            label: 'Yêu cầu mượn',
            Component: <MainBookLoansPage status={EBookLoanStatus.Request_Borrowing} />
        },
        {
            label: 'Đang mượn',
            Component: <MainBookLoansPage status={EBookLoanStatus.Borrowed} />
        },
        {
            label: 'Yêu cầu trả',
            Component: <MainBookLoansPage status={EBookLoanStatus.Request_Returning} />
        },
        {
            label: 'Đã trả',
            Component: <MainBookLoansPage status={EBookLoanStatus.Returned} />
        },
        {
            label: 'Tất cả',
            Component: <MainBookLoansPage />
        },
        {
            label: 'Không thể trả',
            Component: <MainBookLoansPage status={EBookLoanStatus.Nonreturnable} />
        },
        {
            label: 'Từ chối',
            Component: <MainBookLoansPage status={EBookLoanStatus.Rejected} />
        }
    ]
    return (
        <>
            <BaseTabsPage
                title={t('Quản lý mượn trả sách')}
                name='book-loans'
                tabs={tabs} 
            />
        </>
    )
}

export default BookLoansPage;