import React from 'react';

class Header extends React.Component {

  handleEditUser = () => {
    this.props.onEditUser();
  }

  render() {
    const { myUser } = this.props;
    return (
      <React.Fragment>
        <header className="border-bottom-1-ccc">
          <h1 className="pad-10">Sprint points</h1>
        </header>
        <div className="border-bottom-1-ccc pad-10">
            Hello {myUser.name} <span onClick={this.handleEditUser} className="color-blue cursor-pointer">edit</span>
        </div>
      </React.Fragment>
    )
  }
}
export default Header;