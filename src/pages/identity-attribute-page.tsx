import { ReactNode, useCallback, useEffect, useState } from "react";
import PageLayout from "../lib/component/page-layout-component";
import { IdentityAttribute, PagedModelIdentityAtttribute, SimplClient } from "../lib/resource-framework/simpl-client";
import Loading from "../lib/component/loading-component";
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

    useEffect(() => {
        searchIA().then(data => setDataset(data))
    }, [page, size, searchIA]);

    return (
        <PageLayout title="Identity attributes">
            {
                !dataset
                ? <Loading/>
                : <div>
                    { createTable(dataset.content, navigate) }
                </div>
            }
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