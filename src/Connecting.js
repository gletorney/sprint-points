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
    this.props.onRefresh()
  }

  render() {
    return (
      <React.Fragment>
        <div className="overlay background-111">
				  <div className="modal background-111">
            <div className="text-center pad-20">
              <div className="pad-bottom-20">
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
              <div className="color-white">
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