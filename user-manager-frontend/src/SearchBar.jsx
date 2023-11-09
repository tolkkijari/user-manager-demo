import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import SuggestionDropDown from './SuggestionDropDown';
import { searchFields, selectedSearchField, changeSearchField, changeSearchText, runSearch, searchTerm } from './appManagerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchBar() {

  const dispatch = useDispatch();

  const selectedField = useSelector(selectedSearchField);
  const searchWord = useSelector(searchTerm);

  const onSelectChange = e => {
    dispatch(changeSearchField(e.target.value));
    if(searchWord !== null && searchWord !== undefined && searchWord.length > 0) {
      dispatch(runSearch({field: e.target.value, term: searchWord}));
    }
  };

  const onTextChange = e => {
    dispatch(changeSearchText(e.target.value));
    if(e.target.value !== null && e.target.value !== undefined && e.target.value.length > 0) {
      dispatch(runSearch({field: selectedField, term: e.target.value}));
    }
  };

  const searchFieldComponents = Object.keys(searchFields).map(key => <option key={key} value={key}>{searchFields[key]}</option>);

  return(
    <Row>
      <Col md={2}>
        <Form.Label>
          Select search field
        </Form.Label>
        <Form.Select value={selectedField} onChange={onSelectChange}>
          {searchFieldComponents}
        </Form.Select>
      </Col>
      <Col md={10}>
        <Form.Control value={searchWord} placeholder="Search" type="text" onChange={onTextChange} />
        <SuggestionDropDown  />
      </Col>
    </Row>
  );
}