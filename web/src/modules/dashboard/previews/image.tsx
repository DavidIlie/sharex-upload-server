import PreviewListPane from "@components/PreviewListPane";
import { useQuery } from "react-query";

import useEnv from "@hooks/useEnv";

import type { FileType } from "@sharex-server/common";
import UploadPreviewCard from "@components/UploadPreviewCard";

const LatestImagesModule = (): JSX.Element => {
    const env = useEnv();

    const { data, isLoading } = useQuery<FileType[]>(
        `${env.api_url}/api/latest/images`
    );

    if (isLoading) return <div />;

    return (
        <PreviewListPane
            title="Latest Image Uploads"
            link="/dashboard/images"
            viewTitle="View all images"
            type="image"
        >
            {data?.map((file, index) => (
                <UploadPreviewCard file={file} key={index} type="image" />
            ))}
        </PreviewListPane>
    );
};

export default LatestImagesModule;
