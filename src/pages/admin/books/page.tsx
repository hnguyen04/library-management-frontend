import BaseCrudPage from "@/base/base-crud-page";
import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";
import { Typography } from "@mui/material";

import useTranslation from '@/hooks/use-translation';
import { useMemo } from "react";
import { TCrudFormField } from "@/base/crud-form-field.type";
import booksService from "./_services/books.service";
import authorsService from "../authors/_services/authors.service";
import categoryService from "../category/_services/category.service";
import publishersService from "../publishers/_services/publishers.services";
import { useQuery } from "@tanstack/react-query";

const BookPage = () => {

    const { t } = useTranslation();


    const { data: getAllAuthorsRes } = useQuery({
        queryKey: ['authors/getAllAuthors'],
        queryFn: () => authorsService.getAllAuthors(),
        staleTime: Infinity,
    });

    const { data: getAllPublishersRes } = useQuery({
        queryKey: ['publishers/getAllPublishers'],
        queryFn: () => publishersService.getAllPublishers(),
        staleTime: Infinity,
    });

    const { data: getAllCategoriesRes } = useQuery({
        queryKey: ['categories/getAllCategories'],
        queryFn: () => categoryService.getAllCategories(),
        staleTime: Infinity,
    })

    const { data: getAllBooksRes } = useQuery({
        queryKey: ['books/getAllBooks'],
        queryFn: () => booksService.getAll(),
        staleTime: Infinity,
    });

    const authorOptions = useMemo(() => {
        return getAllAuthorsRes?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
        }));
    }, [getAllAuthorsRes]);

    const publisherOptions = useMemo(() => {
        return getAllPublishersRes?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
        }));
    }, [getAllPublishersRes]);

    const categoryOptions = useMemo(() => {
        return getAllCategoriesRes?.data?.map((item: any) => ({
            label: item.name,
            value: item.id,
        }));
    }, []);



    


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
            width: 300,
            flex: 1,
        },
        {
            field: "price",
            headerName: t("Giá"),
            type: "text",
            width: 100,
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
            width: 150,
            renderCell: (params) => {
                return params.row.authors.map((author: any) => author.name).join(', ');
            }
        },
        {
            field: "categories",
            headerName: t('Thể loại'),
            type: "text",
            width: 150,
            renderCell: (params) => {
                return params.row.categories.map((category: any) => category.name).join(', ');
            }
        },
        {
            field: "description",
            headerName: t("Mô tả"),
            type: "text",
            flex: 2,
        }
    ], [t]);

    const createFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "title",
            label: t("Tên"),
            type: "text",
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
            options: publisherOptions,
        },
        {
            name: "authorIds",
            label: t("Tác giả"),
            type: "multiselect",
            required: true,
            options: authorOptions,
            colSpan: 6,

        },
        {
            name: "categoryIds",
            label: t("Thể loại"),
            type: "multiselect",
            required: true,
            options: categoryOptions,
            colSpan: 6,
        },
        {
            name: "description",
            label: t("Mô tả"),
            type: "textarea",
            colSpan: 12,
        }
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
            options: publisherOptions,
        },
        {
            name: "authorIds",
            label: t("Tác giả"),
            type: "multiautocomplete",
            required: true,
            options: authorOptions,
            colSpan: 6,
        },
        {
            name: "categoryIds",
            label: t("Thể loại"),
            type: "multiautocomplete",
            required: true,
            options: categoryOptions,
            colSpan: 6,
            formatValue: (_value) => {
                return _value.map((item: any) => {
                    console.log(item);
                    return {
                        label: item.name,
                        value: item.id,
                    }
                });
            },
        },
        {
            name: "description",
            label: t("Mô tả"),
            type: "textarea",
            colSpan: 12,
        }
    ], [t, authorOptions, publisherOptions, categoryOptions]);

    const viewFields = useMemo<TCrudFormField[]>(() => [
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
            options: publisherOptions,
        },
        {
            name: "authorIds",
            label: t("Tác giả"),
            type: "multiautocomplete",
            required: true,
            options: authorOptions,
            colSpan: 6,
        },
        {
            name: "categories",
            label: t("Thể loại"),
            type: "multiautocomplete",
            required: true,
            options: categoryOptions,
            colSpan: 6,
            formatValue: (_value) => {
                return _value.map((item: any) => {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                });
            },
            defaultValue: categoryOptions,
        },
        {
            name: "description",
            label: t("Mô tả"),
            type: "textarea",
            colSpan: 12,
        }
    ], [t, authorOptions, publisherOptions, categoryOptions]);


    const createSchema = useMemo(
        () =>
            yup.object().shape({
                title: yup.string().required('Vui lòng nhập tên sách'),
                price: yup.number().required('Vui lòng nhập giá sách'),
                publisherId: yup.number().required('Vui lòng chọn nhà xuất bản'),
                authorIds: yup.array().required('Vui lòng chọn tác giả'),
                categoryIds: yup.array().required('Vui lòng chọn thể loại'),
            }),
        [t, authorOptions, publisherOptions, categoryOptions],
    );

    const updateSchema = useMemo(
        () =>
            yup.object().shape({
                title: yup.string().required('Vui lòng nhập tên sách'),
                price: yup.number().required('Vui lòng nhập giá sách'),
                publisherId: yup.number().required('Vui lòng chọn nhà xuất bản'),
                authorIds: yup.array().required('Vui lòng chọn tác giả'),
                categoryIds: yup.array().required('Vui lòng chọn thể loại'),
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
                createFields={createFields}
                updateFields={updateFields}
                createSchema={createSchema}
                updateSchema={updateSchema}
                viewFields={viewFields}
                hideImportExcelBtn
                hideExportExcelBtn
                hideSearchInput
                hideSelectRowCheckbox
                beautyView
                extendActions={[
                    {
                        title: t('Quản lý bản ghi sách'),
                        onClick: (_row ) => {
                            window.location.href = `/books/${_row?.row?.id}`;
                        }
                    }
                ]}
                
            />
        </>
    );
}

export default BookPage;