import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router-dom";


//import styles
import styles from '../../assets/jss/NavigationBarStyle';
import LeftMenu from '../Menu/LeftMenu';
import SearchBarNavigationBar from '../SearchBar/SearchBarNavigationBar';

import DropDownMenu from '../DropDownMenu/DropDownMenu';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.values === undefined ? '' : props.values[0],
      language: props.values === undefined ? '' : props.values[1],
      level: props.values === undefined ? '' : props.values[2]
    }
  }

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      console.log(`Search Query: ${e.target.value}`)
      
      this.searchButtonPressed()
    }
  }

  searchButtonPressed = () => {
    if (this.state.value.length === 0) {
      alert("Please type in a search value")
    } else if (this.state.level === undefined || this.state.language === undefined || this.state.language.length === 0 || this.state.level.length === 0) {
      alert("Please define your level and a language")
    } else {
      // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
      this.props.history.push({
        pathname: "/results",
        // search: `?query=${e.target.value}&level=${this.state.level}&language=${this.state.language}`,
        search: `?query=${this.state.value}&level=${this.state.level}&language=${this.state.language}`,
        state: {
          searchValue: this.state.value,
          level: this.state.level,
          language: this.state.language
        }
      });
    }
  }

  renderSearchBar = (props) => {
    if (props.results) {
      const searchValue = props.values[0]
      const language = props.values[1] 
      const level = props.values[2] 
      return <div style={{display: "flex", flexGrow: 1}}>
        <SearchBarNavigationBar value={searchValue} onChange={e => this.setState({value: e})} onKeyDown={this.keyPress}/>
        <DropDownMenu value={language} desc="Result Language" items={["Deutsch", "English", "Español"]} onChange={e => this.setState({ language: e })} />
        <DropDownMenu value={level} desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
      </div>
    }
  }

  renderFilterBar = (props) => {
    if (props.results) {
      return <div style={{ marginLeft: "9vh", padding: "1vh" }}>
        <Button>All</Button>
        <Button>News</Button>
        <Button>Blogs</Button>
      </div>
    }
  }

  render() {
    return (

      <div style={styles.root}>
        <AppBar position="static" id="navBar" style={styles.appBar}>
          <Toolbar>
            <div>
              <LeftMenu />
            </div>
            {this.renderSearchBar(this.props)}
          </Toolbar>
          {this.renderFilterBar(this.props)}
        </AppBar>
      </div>
    );
  }
}

export default withRouter(NavigationBar);