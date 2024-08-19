import { useNavigate } from "react-router-dom";
import PageLayout from "../../lib/component/page-layout-component/page-layout";
import { FetchArgs, TableSearchRest } from "../../lib/component/table-search-rest-component/table-search-rest";
import { IdentityAttribute, PagedModel, SimplClient } from "../../lib/resource-framework/simpl-client";
import { ColumnDefinition } from "../../lib/component/table-component/table";
import { LoadingRow } from "../../lib/component/loading-component/loading";
import { TextFilter } from "../../lib/component/filters-component/filters";
import { FilterBar } from "../../lib/component/filter-bar-component/filter-bar";

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
interface IdentityAttributePageFilters extends FilterBar {
    name: TextFilter,
    code: TextFilter,
}
export default function IdentityAttributePage() {
    const navigate = useNavigate();

    return (
        <PageLayout title="Identity attributes">
            <TableSearchRest<IdentityAttribute, IdentityAttributePageFilters>
                fallback={<LoadingRow/>}
                initSize={10}
                search={searchAPI}
                filterBar={{
                    filters: {
                        name: new TextFilter({label: "Name", name: "name"}),
                        code: new TextFilter({label: "Code", name: "code"}),
                    }
                }}
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

function searchAPI(arg: FetchArgs<IdentityAttributePageFilters>): Promise<PagedModel<IdentityAttribute>> {
    return SimplClient.sap.identityAttibute.search({
        ...{
            page: arg.page,
            size: arg.size,
        },
        ...(arg.filters?.name.getValue() ? {code: arg.filters.name.getValue()} : {}),
        ...(arg.filters?.code.getValue() ? {code: arg.filters.code.getValue()} : {}),
    })
}
