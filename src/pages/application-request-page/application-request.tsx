import { Input, Select } from '../../lib/component/form-inputs-component/form-inputs';
import { CenterPageLayout } from '../../lib/component/page-layout-component/page-layout';

export function ApplicationRequest() {
  const participantTypeOptions = [
    {
      label: "Consumer",
      value: "CONSUMER",
      id: "CONSUMER",
    },
    {
      label: "Service provider",
      value: "SERVICE_PROVIDER",
      id: "SERVICE_PROVIDER",
    }
  ]
  return (
    <CenterPageLayout title='Welcome to $Dataspace'>
      <form>
        <Input id='email' label='Email address' name='email'/>
        <Input id='org' label='Organizzation name' name='org'/>
        <Select id='participantType' label='Participant type' name='participantType' options={participantTypeOptions}/>
        <Input id='surname' label='Surname' name='surname'/>
        <Input id='name' label='Name' name='name'/>
        <Input id='username' label='Username' name='username'/>
        <Input id='password' label='Password' name='password'/>
        <Input id='confirmPassword' label='Confirm Password' name='confirmPassword'/>
        <button className='mt-6 mb-3 btn btn-primary' type="button">Create credentials</button>
      </form>
    </CenterPageLayout>
  );
}

export default ApplicationRequest;
