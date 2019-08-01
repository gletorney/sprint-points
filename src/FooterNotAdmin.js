import React from 'react';

class FooterNotAdmin extends React.Component {
  render() {
    return (
      <div className="footer font-0-8">
        <span>
            Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'}
        </span> 
        <span className="pad-left-10 pad-right-10">|</span>
        <span className="color-blue cursor-pointer" onClick={this.props.onClaimAdmin}>
          Claim admin
        </span>
      </div>
    )
  }
}
export default FooterNotAdmin;

