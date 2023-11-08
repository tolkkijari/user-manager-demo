import { useSelector, useDispatch } from 'react-redux';
import { isEditModalShown, cancelEditChanges, selectedUser, updateUser, editFields } from './usersSlice';
import AppModal from './AppModal';
import EditInputFieldWrapper from './EditInputFieldWrapper';

export default function EditModal() {

  const dispatch = useDispatch();

  const user = useSelector(selectedUser);
  const showEditModal = useSelector(isEditModalShown);
  const editedFields = useSelector(editFields);

  const hide = () => dispatch(cancelEditChanges());
  const save = () => dispatch(updateUser({userId: user.id, fields: editedFields}));

  return(
    <AppModal showModal={showEditModal} hide={hide} save={save} title={"Edit user data"}>
      <EditInputFieldWrapper label={"Name"} user={user} field={"name"} />
      <EditInputFieldWrapper label={"Username"} user={user} field={"username"} />
      <EditInputFieldWrapper label={"Email"} user={user} field={"email"} />
      <EditInputFieldWrapper label={"Address"} user={user} field={"address"} />
      <EditInputFieldWrapper label={"Postal address"} user={user} field={"postalAddress"} />
      <EditInputFieldWrapper label={"Phone Number"} user={user} field={"phone"} />
      <EditInputFieldWrapper label={"Website"} user={user} field={"website"} />
      <EditInputFieldWrapper label={"Company"}user={user} field={"company"} />
    </AppModal>
  );

}