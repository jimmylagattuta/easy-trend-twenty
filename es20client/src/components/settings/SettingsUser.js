import React from 'react';
import { connect } from 'react-redux';
import { selectItem, fetchItems } from '../../actions';

class SettingsUser extends React.Component {


  render() {
    // console.log('SettingsUser props', this.props);
    return <div className="ui relaxed divided list">SettingsUser</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log('state ~>', state);
  return { items: state.items };
}

export default connect(
  mapStateToProps,
  { selectItem, fetchItems }
)(SettingsUser);