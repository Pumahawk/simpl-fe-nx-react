import { FormEvent, useReducer, useState } from 'react';
import { Input, Select } from '../../lib/component/form-inputs-component/form-inputs';
import { CenterPageLayout } from '../../lib/component/page-layout-component/page-layout';


interface FormValues {
  pwd1: string;
  pwd2: string;
}
export function ApplicationRequest() {
  const [formValues, setFormValues] = useState<FormValues>({
    pwd1: "",
    pwd2: "",
  })
  const updatePassword = adp(pwd1 => setFormValues(v => ({...v, ...{pwd1}})));
  const updateRepeatePassword = adp(pwd2 => setFormValues(v => ({...v, ...{pwd2}})))

  const validPasswordMessage = formValues.pwd1 === formValues.pwd2 ? "" : "Two passwords are different";

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
        <Input id='password' label='Password' name='password' input={{value: formValues.pwd1, onChange: updatePassword}}/>
        <Input id='confirmPassword' label='Confirm Password' name='confirmPassword' invalidMessage={validPasswordMessage} input={{value: formValues.pwd2, onChange: updateRepeatePassword}}/>
        <button className='mt-6 mb-3 btn btn-primary' type="button">Create credentials</button>
      </form>
    </CenterPageLayout>
  );
}

export default ApplicationRequest;

function adp(fn: (value: string) => void): (event: React.FormEvent<HTMLInputElement>) => void {
  return (event) => fn(event.currentTarget.value);
}