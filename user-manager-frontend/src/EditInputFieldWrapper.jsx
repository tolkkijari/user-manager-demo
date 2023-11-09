import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editFieldContent, editFields } from './appManagerSlice';
import Form from 'react-bootstrap/Form';
import InputField from './InputField';

export default function EditInputFieldWrapper({label, field, user}) {

  const dispatch = useDispatch();
  const editFieldData = useSelector(editFields);

  useEffect(() => {
    dispatch(editFieldContent({
      field: field,
      value: user.fields[field]
    }))}, []);

  function onChange(e) {
    let value = event.target.value;
    dispatch(editFieldContent({
      field: field,
      value: value
    }));
  }

  return (
    <InputField value={editFieldData[field] || ''} label={label} onChange={onChange} />
  );
}