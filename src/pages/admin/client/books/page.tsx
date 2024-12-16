import BaseCrudPage from "@/base/base-crud-page";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import { AddBox as BorrowIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";


import useTranslation from '@/hooks/use-translation';
import useAuth from "@/hooks/use-auth";
import { TCrudFormField } from "@/base/crud-form-field.type";
import publishersService from "../../publishers/_services/publishers.services";
import authorsService from "../../authors/_services/authors.service";
import categoryService from "../../category/_services/category.service";
import booksClientService from "./_services/books.service";
import BaseTabsPage from "@/base/base-tabs-page";
import BaseCrudTabPanel from "@/base/base-crud-tab-panel";
import { BookCardContainer, BookItemCard } from "./_components/books-card";
import CreateLoanModal from "./_components/create-loan-modal";

const BookClientPage = () => {

    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const authQuery = useAuth();

    const { data: getAllCategoriesRes } = useQuery({
        queryKey: ['categories/getAllCategories'],
        queryFn: () => categoryService.getAllCategories(),
        staleTime: 5000,
    });

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
    }, [getAllCategoriesRes]);


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
                return params.row.authors?.map((author: any) => author.name).join(', ');
            }
        },
        {
            field: "categories",
            headerName: t('Thể loại'),
            type: "text",
            width: 150,
            renderCell: (params) => {
                return params.row.categories?.map((category: any) => category.name).join(', ');
            }
        },
        {
            field: "description",
            headerName: t("Mô tả"),
            type: "text",
            flex: 2,
        }
    ], [t]);


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
        },
        {
            name: "description",
            label: t("Mô tả"),
            type: "textarea",
            colSpan: 12,
        }
    ], [t, authorOptions, publisherOptions, categoryOptions]);

    const filterFields = useMemo<TCrudFormField[]>(() => [
        {
            name: "title",
            label: t("Tiêu đề"),
            type: "text",
            colSpan: 6,
        },
        {
            name: "publisherId",
            label: t("Nhà xuất bản"),
            type: "select",
            options: publisherOptions,
            colSpan: 6,
        },
        {
            name: "authorId",
            label: t("Tác giả"),
            type: "select",
            options: authorOptions,
            colSpan: 6,
        },
        {
            name: "categoryId",
            label: t("Thể loại"),
            type: "select",
            options: categoryOptions,
            colSpan: 6,
        },
    ], [t, authorOptions, publisherOptions, categoryOptions]);


    return (
        <BaseTabsPage
            name=""
            title={t('Danh mục sách')}
            tabs={[
                {
                    label: t('Dạng lưới'),
                    Component: (
                        <BaseCrudTabPanel
                            mode="card"
                            name="tenants/apartments"
                            service={booksClientService}
                            title={t('Danh mục sách dạng lưới')}
                            titleProps={{ sx: { opacity: 0.6 } }}
                            unitName=""
                            viewFields={viewFields}
                            filterFields={filterFields}
                            sx={{ margin: 0, padding: 0 }}
                            beautyView
                            CardContainerComp={BookCardContainer}
                            CardItemComp={BookItemCard}
                            hideSearchInput
                            hideAddBtn
                            hideSelectRowCheckbox
                            hideImportExcelBtn
                            hideExportExcelBtn
                        />
                    ),
                },
                {
                    label: t('Dạng bảng'),
                    Component: (
                        <BaseCrudPage
                            name="client/books"
                            service={booksClientService}
                            title={t('Danh mục sách dạng bảng')}
                            titleProps={{ sx: { opacity: 0.6 } }}
                            unitName=""
                            columns={columns}
                            viewFields={viewFields}
                            filterFields={filterFields}
                            beautyView
                            hideSelectRowCheckbox
                            hideImportExcelBtn
                            hideExportExcelBtn
                            hideSearchInput
                            hideAddBtn
                            hideDeleteAction
                            hideDeleteManyBtn
                            hideEditAction
                            onCloseFilter={() => queryClient.invalidateQueries(['categories/getAllCategories',])}
                            extendActions={[
                                {
                                    title: t('Mượn sách'),
                                    icon: <BorrowIcon color="info" />,
                                    onClick: (_row : any) => NiceModal.show(CreateLoanModal, {
                                        bookId: _row.id,
                                        userId: authQuery.data?.id,
                                        refetchData: () => queryClient.invalidateQueries(['booksClient/GetAll'])
                                    })
                                }
                            ]}  
                        />
                    ),
                },
            ]}
        />
    );
};
export default BookClientPage;