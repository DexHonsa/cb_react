import React, { Component } from 'react';
import axios, { post } from 'axios';
import {connect} from 'react-redux';

class uploadItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file:null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file);
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    var that = this;
    const url = '/api/uploadData/';
    const formData = new FormData();
    formData.append('file',file);
    formData.append('userId',this.props.auth.user.id);
    formData.append('portfolioId', this.props.portfolioId);
    formData.append('itemId', this.props.itemId);
    const config = {
        headers: {

        }
    }


     axios.post(url, formData, config).then(
      (res) => {this.props.closePopup();console.log(res)},
      (err) => {console.log(err)}
    );
  }
  render() {
    return (
      <div className="overlay animated fadeIn">
        <div className="upload-popup animated fadeInUp">
          <div className="upload-popup-top">Upload Excel Spreadsheet <i onClick={this.props.hidePopup} className="fa fa-times"></i></div>
          <div className="upload-popup-content">
          <form onSubmit={this.onFormSubmit}>
            <input name="file" type="file" onChange={this.onChange} />
            <button type="submit" className="add-new-project-btn">Upload File</button>
            </form>
          </div>


        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(uploadItem);
