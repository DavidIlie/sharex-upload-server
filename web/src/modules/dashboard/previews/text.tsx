import PreviewListPane from "@components/PreviewListPane";
import { useQuery } from "react-query";

import useEnv from "@hooks/useEnv";

import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";

const LatestTextsModule = (): JSX.Element => {
    const env = useEnv();

    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/texts`
    );

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest Text Uploads"
            link="/dashboard/texts"
            viewTitle="View all text files"
            type="text"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} type="text" />
            ))}
        </PreviewListPane>
    );
};

export default LatestTextsModule;
