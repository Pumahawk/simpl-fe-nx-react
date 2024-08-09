import PageLayout from "../page-layout-component/page-layout";

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

export function LoadingRow() {
  return (
    <div className="text-center py-3">
      <Loading/>
    </div>
  );
}