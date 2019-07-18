import React from 'react';

class FooterNotAdmin extends React.Component {
  render() {
    const hidden = this.props.hidden;
    return (
      <div className="footer font-0-9">
        {hidden ? (
          <div>
            <span>
                Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'}
            </span> 
            <span onClick={this.props.onClaimAdmin} className="pad-left-5 pad-right-5 color-blue cursor-pointer marg-left-20">
              Claim admin
            </span> 
            <span className="pad-left-5 color-blue cursor-pointer marg-left-20" onClick={this.props.onShowCard}>
              Show my scorecard
            </span>
          </div>
        ) : (
          <div>
            <span>
                Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'}
            </span> 
            <span onClick={this.props.onClaimAdmin} className="pad-left-5 pad-right-5 color-blue cursor-pointer marg-left-20">
              Claim admin
            </span> 
            <span className="pad-left-5 color-blue cursor-pointer marg-left-20" onClick={this.props.onHideCard}>
              Hide my scorecard
            </span>
          </div>
        )}
      </div>
    )
  }
}
export default FooterNotAdmin;

