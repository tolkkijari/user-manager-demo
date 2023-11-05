import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editFieldContent } from './usersSlice';

export default function EditInputField({label, field, user}) {

  const dispatch = useDispatch();

  //Use the current value as the initial value in the edit field.
  useEffect(() => {
    dispatch(editFieldContent({
      id: user.id,
      field: field,
      value: user.fields[field]
    }))}, []);

  function onChange(e) {
    let value = event.target.value;
    dispatch(editFieldContent({
      id: user.id,
      field: field,
      value: value
    }));
  }

  return (
    <label>{label}: <input onChange={onChange} type="text" value={user.editFields[field] || ''} name={field} id={field} /></label>
  );
}