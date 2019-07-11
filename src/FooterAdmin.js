import React from 'react';

class FooterAdmin extends React.Component {
  render() {
    const hidden = this.props.hidden;
    return (
      <div className="footer font-0-9">
        {hidden ? (
          <div>
            You are admin. Don't blow it. 
            <span className="pad-left-5 pad-right-5">|</span>
            <span className="color-blue cursor-pointer" onClick={this.props.onShowCard}>Show my scorecard</span>
          </div>
        ) : (
          <div>
            You're admin. Don't blow it. 
            <span className="pad-left-5 pad-right-5">|</span>
            <span className="color-blue cursor-pointer" onClick={this.props.onHideCard}>Hide my scorecard</span>
          </div>
        )}
      </div>
    )
  }
}
export default FooterAdmin;

