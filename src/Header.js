import React from 'react';

class Header extends React.Component {

  
  handleLogout = () => {
    this.props.onLogout();
  }

  showMenu = () => {
    document.getElementById('FooterMenu').style.display = 'block';
  }

  handleRefresh = () => {
    window.location.reload();
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
          <h1 className="pad-10">
            <span className="cursor-pointer" onClick={this.handleRefresh}>
              Sprint points
            </span>
          </h1>
        </header>
        <div className="border-bottom-1-ccc pad-10">
          <span id="MyName">
            Hello {myUser.name} 
          </span>
          <span onClick={this.handleLogout} className="color-blue cursor-pointer float-right">
            Logout
          </span>
          <span onClick={this.changeTheme} className="marg-right-20 color-blue cursor-pointer float-right">
            Theme
          </span>
          <span onClick={this.showMenu} className="color-blue float-right cursor-pointer marg-right-20">
            &#9776; Options
          </span>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;
