/**
	Component to render a dialog and an add button
*/
import React from 'react';
import Modal from 'boron/ScaleModal';

var styles = {
  btn: {
      margin: '1em auto',
      padding: '0.5em 1em',
      outline: 'none',
      fontSize: 16,
      fontWeight: '600',
      background: '#C94E50',
      color: '#FFFFFF',
      border: 'none'
  },
  container: {
      padding: '2em',
      textAlign: 'center'
  },
  title: {
    margin: 0,
    padding: '0 0 10px',
    color: '#C94E50',
    fontWeight: 400
  }
}

var DialogComponent = React.createClass({
  showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.showModal}>Open</button>
                <Modal ref="modal">
                  <div style={styles.container}>
                    <h2 style={styles.title}>Add a new Login Item</h2>
                    <div className="formContainer">
                      <input type="text" ref="username" placeholder="Enter username here..."/>
                      <input type="password" ref="password" />

                      <button style={styles.btn} onClick={this.hideModal}>Close</button>
                    </div>
                  </div>
                </Modal>
            </div>
        );
    }
});

export default DialogComponent;


// export default class ModalDialog extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//     };
//   }

//   handleOpen = () => {
//     this.setState({open: true});
//   }

//   handleClose = () => {
//     this.setState({open: false});
//   }

//   render() {
//     const actions = [
//       <FlatButton
//         label="Cancel"
//         secondary={true}
//         onTouchTap={this.handleClose} />,
//       <FlatButton
//         label="Submit"
//         primary={true}
//         disabled={true}
//         onTouchTap={this.handleClose} />,
//     ];

//     return (
//       <div>
//         <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
//         <Dialog
//           title="Dialog With Actions"
//           actions={actions}
//           modal={true}
//           open={this.state.open}>
//           Only actions can close this dialog.
//         </Dialog>
//       </div>
//     );
//   }
// }



// var React = require('react');
// var ReactDOM = require('react-dom');
// //import React from 'react';
// //import ReactDom from 'react-dom';
// //import Button from 'react-toolbox/lib/button';
// //var Button = require('react-toolbox/lib/button');
// import RaisedButton from 'material-ui/lib/raised-button';


// var DialogComponent = React.createClass({
// 	showModal: function() {
// 		this.refs.modal.show();
// 	},

// 	hideModal: function() {
// 		this.refs.modal.hide();
// 	},

// 	render: function() {
// 		var escKey = true, closeOnClick = true;
// 		return (
// 			<div>
//                 <button onClick={this.showModal}>Open</button>
//                 <Modal ref="modal" keyboard={true} closeOnClick={true}>
//                 	<div style={styles.container}>
// 						<h2 style={styles.title}>I am a dialog</h2>
//                     	<button style={styles.btn} onClick={this.hideModal}>Close</button>
//                 	</div>
//                 </Modal>
//             </div>
// 		);
// 	}
// });

// export default DialogComponent;