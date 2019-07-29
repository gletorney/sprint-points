import React from 'react';

class Header extends React.Component {

  
  handleLogout = () => {
    this.props.onLogout();
  }

  hangleChangeTheme = () => {
    let i = 0;
    let themes = [
      "no-theme",
      "theme-1",
      "theme-2",
      "theme-3",
    ];
    let body = document.getElementById('appBody');
    return () => {
      i = (i + 1) % themes.length;      
      body.setAttribute('class', themes[i]);
    }
  }

  changeTheme = this.hangleChangeTheme();

  render() {
    const { myUser } = this.props;

    return (
      <React.Fragment>
        <header className="border-bottom-1-ccc">
          <h1 className="pad-10">Sprint points</h1>
        </header>
        <div className="border-bottom-1-ccc pad-10">
            Hello {myUser.name} 
            <span onClick={this.handleLogout} className="color-blue cursor-pointer float-right">
              Logout
            </span>
            <span onClick={this.changeTheme} className="marg-right-20 color-blue cursor-pointer float-right">
              Theme
            </span>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;