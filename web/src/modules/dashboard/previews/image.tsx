import PreviewListPane from "@components/PreviewListPane";
import { useQuery } from "react-query";

import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";

const LatestImagesModule = (): JSX.Element => {
    const { data, isLoading } = useQuery<FileType[]>("/api/latest/images");

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest Image Uploads"
            link="/images"
            viewTitle="View all images"
            type="image"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} />
            ))}
        </PreviewListPane>
    );
};

export default LatestImagesModule;
