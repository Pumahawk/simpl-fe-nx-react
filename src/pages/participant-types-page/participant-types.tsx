import { keycloak } from "../../lib/auth";
import PageLayout from "../../lib/component/page-layout-component/page-layout";

export default function ParticipantTypesPage() {
    const auth = keycloak.authenticated;
    return (
        <PageLayout title="Participant types">
            <div>working... {auth}</div>
        </PageLayout>
    )
}