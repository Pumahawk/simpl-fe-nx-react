import { ReactNode, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { DeferredPageData } from "../../../lib/auth";
import { LoadingPage } from "../loading-component/loading";

export interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

export interface DeferredPageLayoutProps {
    title?: string;
    children: (data: unknown) => ReactNode;
    deferred?: string;
}

export interface CenterPageLayoutProps{
    title: string;
    children: ReactNode;
}
export function CenterPageLayout({title, children}: CenterPageLayoutProps) {
    return (
        <div className="flex h-screen font-sans">
            <div className="p-2 m-auto min-h-96 md:w-1/3">
            {
                title && <h1 className="pb-4">{title}</h1>
            }
            {children}
            </div>
        </div>
    )
}

export default function PageLayout({title, children}: PageLayoutProps) {
    return (
        <div className="flex h-screen">
            <div className="container p-2 m-auto min-h-96">
            {
                title && <h1 className="pb-4">{title}</h1>
            }
            {children}
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