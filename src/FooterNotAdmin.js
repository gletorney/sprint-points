import React from 'react';

class FooterNotAdmin extends React.Component {
  render() {
    return (
      <div className="footer font-0-8">
        <span>
            Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'}
        </span> 
      </div>
    )
  }
}
export default FooterNotAdmin;

