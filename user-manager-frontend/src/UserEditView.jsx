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
          <EditInputField label={"UserName"} user={user} field={"username"} />
          <EditInputField label={"Email"} user={user} field={"email"} />
          <EditInputField label={"Address"} user={user} field={"address"} />
          <EditInputField label={"Postal address"} user={user} field={"postalAddress"} />
          <EditInputField label={"Phone Number"} user={user} field={"phone"} />
          <EditInputField label={"Website"} user={user} field={"website"} />
          <EditInputField label={"Company"}user={user} field={"company"} />
        </form>
        <Button onClick={onSave} variant="primary">Save</Button>
        <Button onClick={onCancel} variant="danger">Cancel</Button>
      </div>
    );
}