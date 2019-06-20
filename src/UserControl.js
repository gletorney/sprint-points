class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.checkHasName = this.checkHasName.bind(this);
    this.state = {hasName: false};
  }

  checkHasName() {
    this.setState({hasName: true});
  }

  render() {
    const hasName = this.state.hasName;

    if (hasName) {
      console.log('has a name')
    } else {
      console.log('no name')
    }

    return (
        <NameModal />
    );
  }
}
