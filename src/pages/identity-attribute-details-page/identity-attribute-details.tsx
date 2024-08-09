import { DeferredPageLayout } from "../../lib/component/page-layout-component/page-layout";

export default function IdentityAttributeDetailsPage() {
    return (
        <DeferredPageLayout title="Identity attributes">
            {(data) => (JSON.stringify(data))}
        </DeferredPageLayout>
    )
}