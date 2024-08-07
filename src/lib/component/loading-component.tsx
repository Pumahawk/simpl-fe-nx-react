import PageLayout from "./page-layout-component";

export default function Loading() {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export function LoadingPage() {
    return (
      <PageLayout>
        <div className='text-center'>
          <Loading/>
        </div>
      </PageLayout>
    );
}