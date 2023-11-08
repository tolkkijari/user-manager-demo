import Form from 'react-bootstrap/Form';

export default function InputField({label, value, onChange}) {

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        type="input"
        value={value}
        autoFocus
      />
    </Form.Group>
  );
}