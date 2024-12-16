
import useTranslation from "@/hooks/use-translation";
import BaseTabsPage from "@/base/base-tabs-page";
import MainBookLoansClientPage from "./_components/main-bookLoans-page";
import { EBookLoanClientStatus } from "./_services/bookLoans.model";

const BookLoansClientPage = () => {

    const { t } = useTranslation();

    const tabs = [
        {
            label: t('Đang mượn'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Borrowed} />
        },
        {
            label: t('Tất cả'),
            Component: <MainBookLoansClientPage />
        },
        {
            label: t('Yêu cầu mượn'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Request_Borrowing} />
        },
        {
            label: t('Yêu cầu trả'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Request_Returning} />
        },
        {
            label: t('Đã trả'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Returned} />
        },
        {
            label: t('Không thể trả'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Nonreturnable} />
        },
        {
            label: t('Từ chối'),
            Component: <MainBookLoansClientPage status={EBookLoanClientStatus.Rejected} />
        }
    ]
    return (
        <>
            <BaseTabsPage
                title={t('Danh mục sách mượn')}
                name='book-loans'
                tabs={tabs} 
            />
        </>
    )
}

export default BookLoansClientPage;