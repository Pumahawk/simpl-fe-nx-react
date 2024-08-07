import { ReactNode } from "react";

export default function PageLayout({title, children}: {title?: string, children: ReactNode}) {
    return (
        <div className="d-flex justify-content-center align-items-center row min-vh-100">
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