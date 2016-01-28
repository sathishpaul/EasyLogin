import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';

var AddLoginItem = React.createClass({

  showAddDialog: function() {
    console.log("trying to open");
    $("#myModal").modal("show");
  },

  render: function() {
    return (
      <div className="addBtnContainer">
        <button className="btn btn-success" data-target="#myModal" onClick={this.showAddDialog}>Add Item</button>

        <div id="myModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Create a new Login Item</h4>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2">URL</span>
                  <input type="text" className="form-control" placeholder="http://your-web-app.com"
                         aria-describedby="sizing-addon2" />
                </div>

                <div>
                  <button type="button" className="btn btn-primary">Add attribute</button>
                </div>
                <div className="input-group">
                  <span className="input-group-addon" id="sizing-addon2">@</span>
                  <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon2" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default AddLoginItem;