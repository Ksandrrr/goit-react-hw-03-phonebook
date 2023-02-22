import Style from '../Phonebook.module.css';
import PropTypes from 'prop-types';
const PhoneList = ({ items, delateContacts }) => {
  const elements = items.map(({ name, number, id }) => (
    <li key={id} className={Style.list}>
      {name} ({number})
      <button onClick={() => delateContacts(id)} className={Style.btnDelate}>
        Delete
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
};
PhoneList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  })),
  delateContacts: PropTypes.func.isRequired,
}
export default PhoneList;
