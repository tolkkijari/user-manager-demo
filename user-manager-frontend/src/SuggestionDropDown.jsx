import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { isSuggestionListShown, suggestions, selectedSearchField, openInfoModal } from './appManagerSlice';

export default function SuggestionDropDown() {

  const dispatch = useDispatch();

  const onClick = id => {dispatch(openInfoModal(id))};
  const show = useSelector(isSuggestionListShown);
  const suggestionList = useSelector(suggestions);
  const selectedField = useSelector(selectedSearchField);

  const suggestionItems = suggestionList.map(suggestion => {
    console.log(suggestion);
    //Don't show the name twice.
    const fieldOccurence = selectedField !== 'name' ? suggestion.selectedFieldContent : '';
    return <Dropdown.Item key={suggestion.id} onClick={() => onClick(suggestion.id)}>
      {suggestion.name} {fieldOccurence}
    </Dropdown.Item>
  });

  return(
    <Dropdown.Menu show={show}>
      {suggestionItems}
    </Dropdown.Menu>
  );
}