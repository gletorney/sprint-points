import React from 'react';

class SelectIcon extends React.Component {

  closeSelectionModal = () => {
    let iconsElem = document.querySelector("#SelectIcon");
    let formElem = document.querySelector("#JoinTeam");
    iconsElem.classList.remove("show");
    formElem.style.display = 'block';
  }

  handleSelectIcon = (event, className) => {
    let AvatarInput = document.querySelector("#AvatarInput");
    let IconPreview = document.querySelector("#IconPreview");

    AvatarInput.value = className;
    IconPreview.setAttribute('class', className)

    this.closeSelectionModal();
  }

  render() {

    const iconList = [
      {'name': 'bat', 'class': 'icofont-bat' },
      {'name': 'bear', 'class': 'icofont-bear-face' },
      {'name': 'butterfly', 'class': 'icofont-butterfly' },
      {'name': 'cat', 'class': 'icofont-cat-alt-2' },
      {'name': 'crocodile', 'class': 'icofont-crocodile' },
      {'name': 'deer', 'class': 'icofont-deer-head' },
      {'name': 'elephant', 'class': 'icofont-elephant-head' },
      {'name': 'fish', 'class': 'icofont-fish-3' },
      {'name': 'fox', 'class': 'icofont-fox' },
      {'name': 'frog', 'class': 'icofont-frog' },
      {'name': 'gorilla', 'class': 'icofont-gorilla' },
      {'name': 'horse', 'class': 'icofont-horse-head-2' },
      {'name': 'jellyfish', 'class': 'icofont-jellyfish' },
      {'name': 'lion', 'class': 'icofont-lion-head' },
      {'name': 'panda', 'class': 'icofont-panda' },
      {'name': 'rooster', 'class': 'icofont-rooster' },
      {'name': 'squid', 'class': 'icofont-squid' },
      {'name': 'zebra', 'class': 'icofont-zebra' },
      {'name': 'coffee', 'class': 'icofont-coffee-mug' },
      {'name': 'donut', 'class': 'icofont-donut' },
      {'name': 'cup cake', 'class': 'icofont-cup-cake' },
      {'name': 'pizza', 'class': 'icofont-pizza-slice' },
      {'name': 'pineapple', 'class': 'icofont-pineapple' },
      {'name': 'noodles', 'class': 'icofont-noodles' },
      {'name': 'sushi', 'class': 'icofont-sushi' },
      {'name': 'taco', 'class': 'icofont-taco' },
      {'name': 'beach', 'class': 'icofont-beach' },
      {'name': 'island', 'class': 'icofont-island-alt' },
      {'name': 'game controller', 'class': 'icofont-game-controller' },
      {'name': 'music player', 'class': 'icofont-mp3-player' },
      {'name': 'burglar', 'class': 'icofont-burglar' },
      {'name': 'investigator', 'class': 'icofont-investigator' },
      {'name': 'skull', 'class': 'icofont-skull-face' },
      {'name': 'swirl', 'class': 'icofont-swirl' },
      {'name': 'cassette', 'class': 'icofont-cassette' },
      {'name': 'tongue out', 'class': 'icofont-stuck-out-tongue' },
      {'name': 'smirk', 'class': 'icofont-smirk' }
    ]

    return (
      <div className="select-an-icon">
        <div className="header">
          <div className="container">
            <span className="ico-title"> 
              Select your avatar
            </span>
            <i onClick={this.closeSelectionModal} className="icofont-close-line font-1-5 float-right pad-5 cursor-pointer"></i>
          </div>
        </div>
        <div className="container">
        <ul className="iconlist">

          {iconList.map(
            (icon, i) =>
              <li key={icon.class} onClick={(e) => this.handleSelectIcon(e, icon.class)}>
                <div className="icon-holder">
                  <div className="icon"> 
                    <i className={icon.class}></i>
                  </div> 
                  <span>{icon.name}</span>
                </div>
              </li>
          )}
          
          </ul>
        </div>	
      </div>
    )
  }
}
export default SelectIcon;

