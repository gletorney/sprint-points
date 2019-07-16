import React from 'react';

class Header extends React.Component {

  
  handleLogout = () => {
    this.props.onLogout();
  }

  handleTryMe = () => {
    let i = 0;
    let themes = [
      "theme-1",
      "theme-2",
      "no-theme",
    ];
    let body = document.getElementById('appBody');
    return () => {
      i = (i + 1) % themes.length;      
      body.setAttribute('class', themes[i]);
    }
  }

  tryMe = this.handleTryMe();

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
            <span onClick={this.tryMe} className="marg-right-20 color-blue cursor-pointer float-right">
              Try me
            </span>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;