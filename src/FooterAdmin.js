import React from 'react';

class FooterAdmin extends React.Component {
  render() {
    return (
      <div className="footer font-0-9">
        You are admin. Don't blow it. <span className="color-blue cursor-pointer" onClick={this.props.onHideCard}>Hide my scorecard</span>
      </div>
    )
  }
}
export default FooterAdmin;

