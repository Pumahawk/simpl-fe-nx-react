import { Suspense, useCallback, useState } from "react";
import PageLayout from "../lib/component/page-layout-component";
import { IdentityAttribute, SimplClient } from "../lib/resource-framework/simpl-client";
import { LoadingRow } from "../lib/component/loading-component";
import { useNavigate } from "react-router-dom";
import { usePromiseComponent } from "../lib/custom-react";
import { ColumnDefinition, NavBar, PaginatedTable } from "../lib/component/table-component";

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

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const searchIA = useCallback(() => SimplClient.sap.identityAttibute.search({
        page,
        size,
    }), [page, size]);

    const RowTableData = usePromiseComponent(searchIA, dataset => <PaginatedTable<IdentityAttribute> rows={dataset.content} columns={columns} rowClick={(row) => navigate(row.id)}/>, [page, size]);

    return (
        <PageLayout title="Identity attributes">
            <Suspense fallback={<LoadingRow/>}>
                <RowTableData/>
                <NavBar
                    options={[10, 20, 50, 100]}
                    onPageChange={setPage}
                    onSizeChange={size => {
                        setPage(0);
                        setSize(size);
                    }}
                    {...{size, page}}
                />
            </Suspense>
        </PageLayout>
    )
}

