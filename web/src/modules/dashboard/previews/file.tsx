import { useQuery } from "react-query";

import PreviewListPane from "@components/PreviewListPane";
import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";
import useEnv from "@hooks/useEnv";

const LatestFilesModule = (): JSX.Element => {
    const env = useEnv();

    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/files`
    );

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest File Uploads"
            link="/dashboard/files"
            viewTitle="View all files"
            type="file"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} type="file" />
            ))}
        </PreviewListPane>
    );
};

export default LatestFilesModule;
