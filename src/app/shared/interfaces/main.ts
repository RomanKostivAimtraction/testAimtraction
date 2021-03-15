export interface objFromYoutube {
    // snippet?: {
    //     thumbnails: {
    //         medium: {
    //             url: string
    //         }
    //     },
    //     publishedAt: string,
    //     description: string
    // }
}

export interface IData {
    // items?: Array<{ snippet: { thumbnails: { medium: { url: string } }, publishedAt: string, description: string } }>;
    items: IRowData[]
    countAllRows?: number;
    countSelectedRows?: number;
    error?: any;
    isLoading?: boolean;
}

export interface IRowData {
    description: string;
    publishedAt: string;
    thumbnails: string;
    title: object;
}