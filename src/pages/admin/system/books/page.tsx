import BaseCrudPage from "@/base/base-crud-page";
import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import { Typography } from "@mui/material";

import useTranslation from '@/hooks/use-translation';
import { useMemo } from "react";
import { TCrudFormField } from "@/base/crud-form-field.type";
import booksService from "./_services/books.service";
import authorsService from "../authors/_services/authors.service";

const BookPage = () => {

    const { t } = useTranslation();


    const columns = useMemo<GridColDef[]>(() => [
        {
            field: "id",
            headerName: t("ID"),
            type: "number",
            width: 50,

        },
        {
            field: "title",
            headerName: t("Tiêu đề"),
            type: "text",
            width: 400,
            flex: 1,
        },
        {
            field: "price",
            headerName: t("Giá"),
            type: "text",
            width: 200,
            renderCell: (params) => <Typography>{params.row.price} ₫</Typography>
        },
        {
            field: "publisherName",
            headerName: t("Nhà xuất bản"),
            type: "text",
            width: 200,
        },
        {
            field: "authors",
            headerName: t('Tác giả'),
            type: "text",
            width: 200,
            renderCell: (params) => {
                return params.row.authors.map((author: any) => author.name).join(', ');
            }
        },
        {
            field: "categories",
            headerName: t('Thể loại'),
            type: "text",
            width: 200,
            renderCell: (params) => {
                return params.row.categories.map((category: any) => category.name).join(', ');
            }
        },
    ], [t]);


    const updateFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "title",
            label: t("Tên"),
            type: "textarea",
            required: true,
            colSpan: 12,
        },
        {
            name: "price",
            label: t("Giá"),
            type: "number",
            required: true,
            colSpan: 6,

        },
        {
            name: "publisherId",
            label: t("Nhà xuất bản"),
            type: "select",
            required: true,
            colSpan: 6,
            options: [],
        },
        {
            name: "authorIds",
            label: t("Tác giả"),
            type: "multiautocomplete",
            required: true,
            options: [],
            colSpan: 6,
        },
        {
            name: "categoryIds",
            label: t("Thể loại"),
            type: "multiautocomplete",
            required: true,
            options: [],
            colSpan: 6,
        }
    ], [t]);

    const viewFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "id",
            label: t("ID"),
            type: "number",
            colSpan: 6,
        },
        {
            name: "name",
            label: t("Tên"),
            type: "text",
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
                title={t('Quản lý sách')}
                name={t('Quản lý sách')}
                unitName=''
                service={booksService}
                columns={columns}
                updateFields={updateFields}
                createSchema={createSchema}
                updateSchema={updateSchema}
                viewFields={viewFields}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideAddBtn
                hideSelectRowCheckbox
                beautyView
                
            />
        </>
    );
}

export default BookPage;