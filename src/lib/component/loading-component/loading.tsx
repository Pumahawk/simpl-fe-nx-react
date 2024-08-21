import PageLayout from "../page-layout-component/page-layout";

export default function Loading() {
    return (
        <span className="material-symbols-outlined animate-spin text-4xl text-primary-900">
          progress_activity
        </span>
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