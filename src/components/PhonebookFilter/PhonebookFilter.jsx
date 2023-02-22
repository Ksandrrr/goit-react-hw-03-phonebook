import { Component } from 'react';
import PropTypes from 'prop-types';
class PhoneBookFilter extends Component {
  render() {
    const { saveFilterValue } = this.props;
    const { Filter } = this.props;
    return (
      <input
        type="text"
        name="filter"
        title="Search Contacts"
        onChange={saveFilterValue}
        value={Filter}
      />
    );
  }
}
PhoneBookFilter.propTypes = {
  saveFilterValue: PropTypes.func.isRequired,
  // filter: PropTypes
};
export default PhoneBookFilter;
