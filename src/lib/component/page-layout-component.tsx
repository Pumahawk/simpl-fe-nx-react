import { ReactNode, Suspense } from "react";
import { LoadingPage } from "./loading-component";
import { Await, useLoaderData } from "react-router-dom";
import { DeferredPageData } from "../auth";

export interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

export interface DeferredPageLayoutProps {
    title?: string;
    children: (data: any) => ReactNode;
    deferred?: string;
}

export default function PageLayout({title, children}: PageLayoutProps) {
    return (
        <div className="d-flex no-gutters justify-content-center align-items-center min-vh-100">
            <div className="col-12 col-md-8">
                {
                    title && (
                        <div className="row  text-break">
                            <h1 className="text-primary">{title}</h1>
                        </div>
                    )
                }
                <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DeferredPageLayout(props: DeferredPageLayoutProps) {
    const {deferred = "single"} = props; 
    const data = useLoaderData() as DeferredPageData;
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Await resolve={data[deferred]}>
                { data => (
                        <PageLayout {...props}>
                            {props.children(data)}
                        </PageLayout>
                    )
                }
            </Await>
        </Suspense>
    )
}