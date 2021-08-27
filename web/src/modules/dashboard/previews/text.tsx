import PreviewListPane from "@components/PreviewListPane";
import { useQuery } from "react-query";

import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";

const LatestTextsModule = (): JSX.Element => {
    const { data, isLoading } = useQuery<FileType[]>("/api/latest/texts");

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest Text Uploads"
            link="/texts"
            viewTitle="View all text files"
            type="text"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} />
            ))}
        </PreviewListPane>
    );
};

export default LatestTextsModule;
