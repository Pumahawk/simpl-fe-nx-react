import { Link } from "react-router-dom";
import PageLayout from "../../lib/component/page-layout-component/page-layout";



export default function HomePage() {

    const links = [
        "/identity-attributes",
        "/participant-types",
    ]

    return (
        <PageLayout title="Home">
            <div className="list-group">
                {
                    links.map((address, i) => <Link key={i} className="list-group-item list-group-item-action" to={address}>{address}</Link>)
                }
            </div>
        </PageLayout>
    )
}
