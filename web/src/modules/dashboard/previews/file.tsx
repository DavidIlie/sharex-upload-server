import { useQuery } from "react-query";

import PreviewListPane from "@components/PreviewListPane";
import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";

const LatestFilesModule = (): JSX.Element => {
    const { data, isLoading } = useQuery<FileType[]>("/api/latest/files");

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest File Uploads"
            link="/files"
            viewTitle="View all files"
            type="file"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} />
            ))}
        </PreviewListPane>
    );
};

export default LatestFilesModule;