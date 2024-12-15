import BaseCrudPage from "@/base/base-crud-page";
import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import useTranslation from '@/hooks/use-translation';
import { useMemo } from "react";
import { TCrudFormField } from "@/base/crud-form-field.type";
import bookCopiesService from "./_services/bookCopies.service";
import { EBookCopyStatus } from "./_services/bookCopies.model";
import CreateBookCopyModal from "./_components/create-copies-modal";
import { formatDate } from "@/services/utils-date";


const BookCopyPage = () => {
    const { id } = useParams<{ id: string }>();

    const { t } = useTranslation();
    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t("ID"),
            align: "center",
            type: "number",
            width: 150,
        },
        {
            field: "bookTitle",
            headerName: t("Tiêu đề"),
            type: "text",
            width: 400,
            flex: 1,
        },
        {
            field: "status",
            headerName: t("Trạng thái"),
            type: "text",
            width: 200,
        },
        {
            field: "createdAt",
            headerName: t("Ngày tạo"),
            type: "text",
            width: 200,
            renderCell: (params) => formatDate(params.row.createdAt, 'DD/MM/YYYY HH:mm'),
        },
        {
            field: "updatedAt",
            headerName: t("Cập nhật lần cuối"),
            type: "text",
            width: 200,
            renderCell: (params) => formatDate(params.row.updatedAt, 'DD/MM/YYYY HH:mm'),
        }
    ], [t]);



    const updateFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "status",
            label: t("Trạng thái"),
            type: "select",
            options: Object.values(EBookCopyStatus).map(status => ({
                label: status,
                value: status,
            })),
        }
    ], [t]);

    const viewFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "id",
            label: t("ID"),
            type: "text",
            colSpan: 6,
        },
        {
            name: "bookTitle",
            label: t("Tiêu đề"),
            type: "text",
            colSpan: 6,
            readOnly: true,
        },
        {
            name: "status",
            label: t("Trạng thái"),
            type: "select",
            options: Object.values(EBookCopyStatus).map(status => ({
                label: status,
                value: status,
            })),
            colSpan: 6,
        },
    ], [t]);


    const createSchema = useMemo(
        () =>
            yup.object().shape({
                id: yup.number().required('Vui lòng nhập ID').min(1, 'ID phải lớn hơn 0'),
            }),
        [t],
    );

    const updateSchema = useMemo(
        () =>
            yup.object().shape({
                id: yup.number().required('Vui lòng nhập ID').min(1, 'ID phải lớn hơn 0'),
            }),
        [t],
    );

    return (
        <>
            <BaseCrudPage
                title={t('Quản lý bản ghi sách')}
                name={t('Quản lý bản ghi sách')}
                unitName=''
                service={bookCopiesService}
                columns={columns}
                updateFields={updateFields}
                createSchema={createSchema}
                updateSchema={updateSchema}
                viewFields={viewFields}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                onClickAddBtn={() => NiceModal.show(CreateBookCopyModal, {
                    id: id,
                    refetchData: () => (console.log(id))
                })}
                hideSelectRowCheckbox
                beautyView
                defaultGetAllParams={{
                    bookId: id,
                }}
            />
        </>
    );
}

export default BookCopyPage;