import { lazy, ReactNode, Suspense, useCallback, useEffect, useState } from "react";
import PageLayout from "../lib/component/page-layout-component";
import { IdentityAttribute, PagedModelIdentityAtttribute, SimplClient } from "../lib/resource-framework/simpl-client";
import Loading, { LoadingRow } from "../lib/component/loading-component";
import { NavigateFunction, useNavigate } from "react-router-dom";


export default function IdentityAttributePage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [dataset, setDataset] = useState<null | PagedModelIdentityAtttribute>(null);

    const searchIA = useCallback(() => SimplClient.sap.identityAttibute.search({
        page,
        size,
    }), [page, size]);

    const RowTableData = lazy(() => searchIA().then(dataset => ({default: () => createTable(dataset.content, navigate)})));

    return (
        <PageLayout title="Identity attributes">
            <Suspense fallback={<LoadingRow/>}>
                <RowTableData/>
                <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>-</button>
                <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>+</button>
            </Suspense>
        </PageLayout>
    )
}

function createTable(rows: IdentityAttribute[], navigate: NavigateFunction): ReactNode {
    return (
        <table className="table table-hover">
            <tbody>
                { 
                    rows.map((row, i) => (
                        <tr key={i} onClick={() => navigate(row.id)}>
                            <td>{row.id}</td>
                            <td>{row.code}</td>
                            <td>{row.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}