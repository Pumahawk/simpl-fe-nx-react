import { Link } from "react-router-dom";
import PageLayout from "../../lib/component/page-layout-component/page-layout";



export default function HomePage() {

    const links = [
        "/identity-attributes",
        "/participant-types",
    ]

    return (
        <PageLayout title="Home">
            <div>
                {
                    links.map((address) => <Link key={address} className="list-group-item cursor-pointer hover:bg-slate-100" to={address}>{address}</Link>)
                }
            </div>
        </PageLayout>
    )
}
