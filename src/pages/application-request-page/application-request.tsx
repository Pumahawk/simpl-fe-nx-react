import { Input } from '../../lib/component/form-inputs-component/form-inputs';
import { CenterPageLayout } from '../../lib/component/page-layout-component/page-layout';

export function ApplicationRequest() {
  return (
    <CenterPageLayout title='Welcome to $Dataspace'>
      <form>
        <Input id='email' label='Email address' name='email'/>
      </form>
    </CenterPageLayout>
  );
}

export default ApplicationRequest;
