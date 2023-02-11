import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SuperAdminList.css';


class SuperAdminList extends Component {
	renderUsers(users) {
		console.log('renderUsers', this.props);
		if (this.props.users) {
			return users.map((u, id) => {
						return ( 
							<div className="user-list">
								<div className="super-admin-users-list" key={id}>
										<button onClick={() => this.props.chooseUser(u)}>
											<p id="click-user">{u.first_name}{" "}{u.last_name}</p>
										</button>
										<button onClick={() => this.props.chooseUser(u)}>
											<p id="click-user">{u.email}{" "}</p>
										</button>
										<button onClick={() => this.props.chooseUser(u)}>
											<p id="click-user">ID:{" "}{u.id}</p>
										</button>
								</div>
							</div>
						)
					})



		}
	}

	render() {
		console.log('SuperAdminList props, ', this.props);

		return (
			<div className="user-list">
				SuperAdminList
				{this.renderUsers(this.props.users)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps)(SuperAdminList);