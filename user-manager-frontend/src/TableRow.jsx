import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TableRow({title, user, field}) {

  return(
    <Row>
      <Col sm={6}>
        <strong>{title}</strong>
      </Col>
      <Col sm={6}>
        {user.fields[field]}
      </Col>
    </Row>
  );
}