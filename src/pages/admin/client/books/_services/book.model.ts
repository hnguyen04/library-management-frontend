export default interface IBook {
    id: string;
    title: string;
    price: number;
    publisherId: string;
    publisherName: string;
    authors: any[];
    categories: any[];
    description: string;
    createdAt: string;
    updatedAt: string;
    numberOfCopiesAvailable: number;
}