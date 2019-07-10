import React from 'react';
import './loading.css';

class Connecting extends React.Component {

  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh() {
    setInterval(
      () => this.props.onRefresh(),
      1000
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="background-eee">
				  <div className="fixed-center">
            <div className="text-center pad-20">
              <div className="pad-bottom-20">
                <div className="lds-grid background-eee"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
              <div className="color-fff">
                Aligning satellites
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Connecting;