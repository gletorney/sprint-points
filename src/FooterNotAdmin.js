import React from 'react';

class FooterNotAdmin extends React.Component {
  render() {
    return (
      <div className="footer font-0-9">
          Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'} | <span onClick={this.props.onClaimAdmin} className="pad-left-5 bold color-blue cursor-pointer">Claim admin</span> | <span className="color-blue cursor-pointer" onClick={this.props.onHideCard}>Hide my scorecard</span>
      </div>
    )
  }
}
export default FooterNotAdmin;

