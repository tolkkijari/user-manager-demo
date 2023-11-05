import EditInputField from './EditInputField.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { saveChanges, cancelChanges } from './usersSlice';
import Button from 'react-bootstrap/Button';

export default function UserEditView({user}) {

  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(saveChanges(user.id));
  };

  const onCancel = () => {
    dispatch(cancelChanges(user.id));
  };

  return (
      <div>
        <form>
          <EditInputField label={"Name"} user={user} field={"name"} />
          <EditInputField label={"UserName"} user={user} field={"userName"} />
          <EditInputField label={"Email"} user={user} field={"email"} />
          <EditInputField label={"Street"} user={user} field={"street"} />
          <EditInputField label={"Suite number"} user={user} field={"suite"} />
          <EditInputField label={"Town"} user={user} field={"town"}/>
          <EditInputField label={"Zip Code"} user={user} field={"zip"}/>
          <EditInputField label={"Phone Number"} user={user} field={"phone"} />
          <EditInputField label={"Website"} user={user} field={"website"} />
          <EditInputField label={"Company"}user={user} field={"company"} />
        </form>
        <Button onClick={onSave} variant="primary">Save</Button>
        <Button onClick={onCancel} variant="danger">Cancel</Button>
      </div>
    );
}