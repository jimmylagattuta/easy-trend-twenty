import React from 'react';
import { connect } from 'react-redux';
import { selectItem, fetchItems } from '../../actions';

class SuperAdminSettings extends React.Component {
  componentDidMount() {
    console.log('SuperAdminSettings componentDidMount props', this.props);
    if (this.props.user_in_app_state && this.props.user_in_app_state.super_admin) {
      fetch("api/v1/super_get", {
        credentials: "same-origin",
      }).then((res) => {
        if (res.ok) {
          res.json().then((super_get_bundle) => {
            // console.log('super_get_bundle ~>', super_get_bundle);
          });
        } else {
          // console.log('super_get_bundle not ok res', res);
          // console.log('setAuthenticated(true)');
          // reimplement
          // setAuthenticated(true);
        }
      }).catch((err) => {
        console.log('error super_get', err);
      });
    }
  }
  renderList() {
    // console.log('props', this.props);
    if (this.props.items.data) {
      return this.props.items.data.map((item) => {
        // console.log("item ~> ", item);
        return (
          <div className="item" key={item.name}>
            <div className="right floated content">
              <button
                className="ui button primary"
                onClick={() => this.props.selectItem(item)}
              >
                Select
              </button>
            </div>
            <div className="description">
              <h2>{item.name}</h2>
              <p>Stock: {item.quantity}</p>
            </div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    // console.log('SuperAdminSettings props', this.props);
    return <div className="ui relaxed divided list">SuperAdminSettings</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log('state ~>', state);
  return { items: state.items };
}

export default connect(
  mapStateToProps,
  { selectItem, fetchItems }
)(SuperAdminSettings);