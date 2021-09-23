export interface FileType {
    id: any;
    type: string;
    name: string;
    slug: string;
    stats: {
        size: string;
        fileName: string;
        extension: string;
        md5: string;
        sha1: string;
        resolution?: {
            height: number;
            width: number;
        };
    };
}
