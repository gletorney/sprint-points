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
    
    const myArray = [
      "Remember your Apple II?",
      "Que chulo.",
      "Bonjour.",
      "o()xxxx[{::::::::::::::::::>",
      "¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>"
    ];
    let randImgSrc = myArray[Math.floor(Math.random()*myArray.length)];

    return (
      <React.Fragment>
        <div className="background-eee">
				  <div className="fixed-center">
            <div className="text-center pad-20">
              <div className="pad-bottom-20">
                <div className="lds-grid background-eee"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
              <div className="color-fff">
                {randImgSrc}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Connecting;