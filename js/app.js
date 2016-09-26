import React from 'react';
import ReactDOM from 'react-dom';
import FrequentPages from './components/FrequentPages';
import EasyLoginPages from './components/EasyLoginPages';

var App = React.createClass({

  getInitialState: function() {
    return {
      frequentPages: [],
      loginPages: []
    };
  },

  componentDidMount: function() {
    chrome.topSites.get(function(sites) {
      this.setState({
        frequentPages: sites
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <EasyLoginPages />
        <h3>Frequently visited pages</h3>
        <FrequentPages pages={this.state.frequentPages}/>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("appContainer"));

export default App;