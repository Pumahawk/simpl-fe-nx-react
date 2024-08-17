import { useNavigate } from "react-router-dom";
import PageLayout from "../../lib/component/page-layout-component/page-layout";
import { FetchArgs, TableSearchRest } from "../../lib/component/table-search-rest-component/table-search-rest";
import { IdentityAttribute, PagedModel, SimplClient } from "../../lib/resource-framework/simpl-client";
import { ColumnDefinition } from "../../lib/component/table-component/table";
import { LoadingRow } from "../../lib/component/loading-component/loading";

const columns: ColumnDefinition<IdentityAttribute>[] = [
    {
        label: "ID",
        mapper: ia => ia.id,
    },
    {
        label: "CODE",
        mapper: ia => ia.code,
    },
    {
        label: "NAME",
        mapper: ia => ia.name,
    },
];

export default function IdentityAttributePage() {
    const navigate = useNavigate();

    return (
        <PageLayout title="Identity attributes">
            <TableSearchRest
                fallback={<LoadingRow/>}
                initSize={10}
                search={searchAPI}
                paginatedTable={{
                    columns,
                    options: [10, 20, 50, 100],
                    rowClick: ia => navigate(ia.id),
                    getRowId: ia => ia.id,
                }}
            />
        </PageLayout>
    )
}

function searchAPI(arg: FetchArgs): Promise<PagedModel<IdentityAttribute>> {
    return SimplClient.sap.identityAttibute.search({
        page: arg.page,
        size: arg.size
    })
}
