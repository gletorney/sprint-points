import React from 'react';
import './loading.css';

class Connecting extends React.Component {

  componentDidMount() {
    setInterval(
      () => this.handleRefresh(),
      1000
    );
  }

  handleRefresh() {
    this.props.onRefresh();
  }

  render() {
    return (
      <React.Fragment>
        <div className="overlay background-eee">
				  <div className="modal background-eee">
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