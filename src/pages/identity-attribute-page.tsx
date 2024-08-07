import { DeferredPageLayout } from "../lib/component/page-layout-component";

export default function IdentityAttributePage() {
    return (
        <DeferredPageLayout title="Identity attributes">
            {(data) => (JSON.stringify(data))}
        </DeferredPageLayout>
    )
}