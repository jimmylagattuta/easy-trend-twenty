import React from 'react';
import { connect } from 'react-redux';
import { selectItem, fetchItems } from '../../actions';
import SuperAdminDropdown from './superadminhelpers/SuperAdminDropdown';
import SuperAdminList from './superadminhelpers/SuperAdminList';
import SuperAdminShow from './superadminhelpers/SuperAdminShow';



class SuperAdminSettings extends React.Component {
  constructor(props){  
      super(props);  
      this.state = {  
           hierarchy: "Hierarchy",
           hierarchies: ["Admin", "Employee", "Consumer"],
           user: [],
           users: [],
           consumers: [],
           employees: [],
           admins: [],
           grabSuperBundle: true,
           superBundleUser: null
        }  

  }
  componentDidMount() {
    console.log('SuperAdminSettings componentDidMount props', this.props);
      console.log('super get going');
      if (this.state.superBundleUser) {
        fetch("api/v1/super_post", {
          credentials: "same-origin",
        }).then((res) => {
          if (res.ok) {
            res.json().then((super_post_bundle) => {
              console.log('super_post_bundle ~>', super_post_bundle);
              this.setState({ consumers: super_post_bundle.super_admin_bundle.consumers, employees: super_post_bundle.super_admin_bundle.employees, admins: super_post_bundle.super_admin_bundle.admins, grabSuperBundle: false, superBundleUser: {} });
            });
          } else {
            // console.log('super_get_bundle not ok res', res);
            // console.log('setAuthenticated(true)');
            // reimplement
            // setAuthenticated(true);
          }
        }).catch((err) => {
          console.log('error super_get', err);
        })       
      } else {
        if (this.state.grabSuperBundle) {
          fetch("api/v1/super_get", {
            credentials: "same-origin",
          }).then((res) => {
            if (res.ok) {
              res.json().then((super_get_bundle) => {
                console.log('super_get_bundle ~>', super_get_bundle);
                this.setState({ consumers: super_get_bundle.super_admin_bundle.consumers, employees: super_get_bundle.super_admin_bundle.employees, admins: super_get_bundle.super_admin_bundle.admins, grabSuperBundle: false, superBundleUser: {} });
              });
            } else {
              console.log('super_post_bundle not ok res', res);
              // console.log('setAuthenticated(true)');
              // reimplement
              // setAuthenticated(true);
            }
          }).catch((err) => {
            console.log('error super_post', err);
          });
        }

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
  updateUser(user) {
    this.setState({ grabSuperBundle: true, superBundleUser: user });
  }
  chooseHierarchy(hierarchy, hierarchies) {
    console.log('chooseHierarchy hierarchy', hierarchy, hierarchies);
      // sort users for
    let newHierarchies = [];
    if (hierarchy === "Hierarchy") {

      this.setState({ users: [], user: [], hierarchies: ["Admin", "Employee", "Consumer"], hierarchy: "Hierarchy" });
    } else if (hierarchy === "Admin") {
      let hierarchiesNew = ["Hierarchy"];
      const usersArray = this.state.admins;
      this.setState({ users: usersArray, hierarchies: ["Hierarchy", "Admin"], hierarchy: hierarchy });
    } else if (hierarchy === "Employee") {
      let hierarchiesNew = ["Employee"];
      const usersArray = this.state.employees;
      this.setState({ users: usersArray, hierarchies: ["Hierarchy", "Employee"], hierarchy: hierarchy });
  
    } else {
      // consumer
      let hierarchiesNew = ["Consumer"];
      const usersArray = this.state.consumers;
      this.setState({ users: usersArray, hierarchies: ["Hierarchy", "Consumer"], hierarchy: hierarchy });
    }


  }
  chooseUser(user) {
    console.log('chooseUser user', user);
    const array = [];
    array.push(user);
    this.setState({ user: array });
  }
  goBack(condition) {
    console.log('goBack condition', condition);
    if (condition === "user") {
      this.setState({ user: [] });
    } else {
      this.setState({ users: [] });
    }
  }
  renderSuperAdmin() {
    console.log('this.state.user[0]', this.state.user[0]);
    console.log('this.state.users[0]', this.state.users[0])
    if (this.state.user[0]) {
      return (
        <SuperAdminShow
          goBack={this.goBack.bind(this)}
          user={this.state.user}
          hierarchy={this.state.hierarchy}
          updateUser={this.updateUser.bind(this)}
        />
      );
    } else if (this.state.users[0]) {
      return (
        <SuperAdminList
          goBack={this.goBack.bind(this)}
          chooseUser={this.chooseUser.bind(this)}
          user={this.state.user}
          users={this.state.users}
          hierarchy={this.state.hierarchy}
        />
      );
    } else {
      return (
        <SuperAdminDropdown
          chooseHierarchy={this.chooseHierarchy.bind(this)}
          hierarchy={this.state.hierarchy}
          hierarchies={this.state.hierarchies}
        />
      );
    }
  }
  render() {
    console.log('SuperAdminSettings props', this.props);
      return (
          <div>
              {this.renderSuperAdmin()}
          </div>
      )
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