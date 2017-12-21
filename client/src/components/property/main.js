import React, { Component } from 'react';
import DetailBlock from './detail_block';
import axios from 'axios';
import UploadData from './upload_data';
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading:true,
      uploadPopup:false,
      headers:[],
      headersLoaded:false
    }
  }
  componentDidMount(){
    var that = this;
    this.setState({headers:[]});
    axios.get('/api/getClosingHeaders').then(
      (res) => {

        that.setState({headers:res.data, headersLoaded:true});
      }
    )

  }
  showUploadPopup(){
    this.setState({
      uploadPopup: !this.state.uploadPopup
    });

  }
  closeUploadPopup(){
    this.setState({
      uploadPopup: !this.state.uploadPopup
    });
    this.componentDidMount();
  }
  render() {
    var isLoading;
    if(this.state.isLoading == true){
      isLoading = <div className="Preloader">Preloader</div>;
    }else{
      isLoading = "";
    }

    var uploadPopup;
    if(this.state.uploadPopup){
      uploadPopup = <UploadData hidePopup={this.showUploadPopup.bind(this)} closePopup={this.closeUploadPopup.bind(this)} />
    }else{
      uploadPopup = null;
    }
    return (
    <div>

    {uploadPopup}
    <div className="side-stage">
    <div className="side-stage-top">

      <div className="add-new-project-btn" onClick={this.showUploadPopup.bind(this)}>Upload</div>
    </div>
      <div className="property-main-title">6135 NW 167th Street Miami Lakes, FL 33015</div>
      <div className="property-top-container">
        <div className="property-img" />
        <div className="property-side-details">
          <ul>
            <li>
              <div className="property-info-item">
                <div className="property-info-title">Zoning Type</div>
                <div className="property-info-value">IU-3: Unlimited Industrial District</div>
              </div>
            </li>
            <li>
              <div className="property-info-item">
                <div className="property-info-title">Square Footage</div>
                <div className="property-info-value"><span className="tooltip" title="Per Public Record">10,750 SF</span></div>
              </div>
            </li>
            <li>
              <div className="property-info-item">
                <div className="property-info-title">Assessors Parcel #</div>
                <div className="property-info-value">40-237229</div>
              </div>
            </li>
            <li>
              <div className="property-info-item">
                <div className="property-info-title">Last Sale Date</div>
                <div className="property-info-value">07/08/2016</div>
              </div>
            </li>
            <li>
              <div className="addition-data-source"><i className="fa-info-circle fa" /> Data above is sourced from API/public records.</div>
            </li>
          </ul>
        </div>
      </div>
      {this.state.headersLoaded ? this.state.headers.map(function(data,i){
        if(i > 1){
        return <DetailBlock key={i} mainCategory={data} />
      }
      },this) : null

    }



      <div style={{height: 300}} />
    </div>
    </div>
  );
  }
}

export default Main;
