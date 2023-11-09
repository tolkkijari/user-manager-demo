import { useSelector, useDispatch } from 'react-redux';
import { isAddUserModalShown, cancelAddUser, createUser, editFields } from './appManagerSlice';
import AppModal from './AppModal';
import AddNewUserInputFieldWrapper from './AddNewUserInputFieldWrapper';

export default function AddNewUserModal() {

  const dispatch = useDispatch();

  const showModal = useSelector(isAddUserModalShown);
  const editedFields = useSelector(editFields);

  const hide = () => dispatch(cancelAddUser());
  const save = () => dispatch(createUser(editedFields));

  return(
    <AppModal showModal={showModal} hide={hide} save={save} title={"Add new user data"}>
      <AddNewUserInputFieldWrapper label={"Name"} field={"name"} />
      <AddNewUserInputFieldWrapper label={"Username"} field={"username"} />
      <AddNewUserInputFieldWrapper label={"Email"} field={"email"} />
      <AddNewUserInputFieldWrapper label={"Address"} field={"address"} />
      <AddNewUserInputFieldWrapper label={"Postal address"}  field={"postalAddress"} />
      <AddNewUserInputFieldWrapper label={"Phone Number"} field={"phone"} />
      <AddNewUserInputFieldWrapper label={"Website"} field={"website"} />
      <AddNewUserInputFieldWrapper label={"Company"} field={"company"} />
    </AppModal>
  );

}