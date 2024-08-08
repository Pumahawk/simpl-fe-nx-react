import { lazy, ReactNode, Suspense, useCallback, useState } from "react";
import PageLayout from "../lib/component/page-layout-component";
import { IdentityAttribute, SimplClient } from "../lib/resource-framework/simpl-client";
import { LoadingRow } from "../lib/component/loading-component";
import { NavigateFunction, useNavigate } from "react-router-dom";


export default function IdentityAttributePage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const searchIA = useCallback(() => SimplClient.sap.identityAttibute.search({
        page,
        size,
    }), [page, size]);

    const RowTableData = promiseComponent(searchIA(), dataset => createTable(dataset.content, navigate));

    return (
        <PageLayout title="Identity attributes">
            <Suspense fallback={<LoadingRow/>}>
                <RowTableData/>
                <button className="btn btn-secondary me-2" onClick={() => setPage(page - 1)}>-</button>
                <button className="btn btn-secondary me-2" onClick={() => setPage(page + 1)}>+</button>
                <select onChange={(event) => setSize(parseInt(event.target.value))}>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
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

function promiseComponent<T>(promise: Promise<T>, component: (data: T) => ReactNode) {
    return lazy(() => promise.then(data => ({default: () => component(data)})));
}