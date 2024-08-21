import { CenterPageLayout } from '../../lib/component/page-layout-component/page-layout';

export function ApplicationInfo() {
  return (
    <CenterPageLayout title='Welcome to $Dataspace'>
      <h5>
        In order to access this data space you will need the following:
      </h5>
      <ul className='list-disc py-6 px-7'>
        <li>Register to obtain new credentials. An email, organization name and participant type are required.</li>
        <li>After logging in, upload a document in .pdf format.</li>
        <li>Wait for a system administrator to approve the onboarding request.</li>
      </ul>
      <div className='pt-8'>
        <button className='btn btn-primary'>Register for this dataspace</button> 
      </div>
    </CenterPageLayout>
  );
}

export default ApplicationInfo;
