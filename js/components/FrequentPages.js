'use strict';

import React from 'react';

var FrequentPages = React.createClass({

  MAX_PAGES_TO_RENDER: 8,

  getDefaultProps: function() {
    return {
      pages: []
    };
  },

  renderFrequentPages: function(pagesToRender) {
    if(pagesToRender && pagesToRender.length > 0) {
      return pagesToRender.map(this.renderPage);
    } else {
      return (<div>There are no items in the history. Please visit any web page first.</div>)
    }
  },

  openPage: function(url) {
    location.assign(url);
  },

  renderPage: function(page, key) {
    return (
      <div key={key} className="pageItem" data-url={page.url} title={page.url}
           onClick={this.openPage.bind(null, page.url)}>
        <img src={"https://www.google.com/s2/favicons?domain_url="+page.url} />
        <div className="itemText">{page.title}</div>
    </div>);
  },

  render: function() {

    var pagesToRender = this.props.pages.length > this.MAX_PAGES_TO_RENDER ?
        this.props.pages.slice(0, this.MAX_PAGES_TO_RENDER) : this.props.pages;
    return (
      <div className="minWidth">
        <h3 className="titleBorder">Frequently visited pages</h3>
        <div className="displayFlex flexColumnDirection">
          <div className="frequentPagesContainer">
            <div className="loginItemsWidthEnforcer">
              {this.renderFrequentPages(pagesToRender)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default FrequentPages;