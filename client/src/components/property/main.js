import React, { Component } from 'react';
import DetailBlock from './detail_block';
import axios from 'axios';
import UploadData from './upload_data';
import loadingGif from '../../img/loading2.gif';
import FileDownload from 'react-file-download';
import {connect} from 'react-redux';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      uploadPopup:false,
      headers:[],
      headersLoaded:false,
      propertyInfo:[{title:'',ImgUrl:''}],
      portfolioId:this.props.portfolioId,
      portfolioItemId:this.props.portfolioItemId,
      isLoading:true,
      filename:''
    }
  }
  componentDidMount(){
    var that = this;
    var portfolioId = this.state.portfolioId;
    var portfolioItemId = this.state.portfolioItemId;
    var data = {
      portfolioId:portfolioId,
      portfolioItemId:portfolioItemId
    }
    axios.post('/api/getHeaders/', data).then(
      (res) => {
        console.log('headers:' + res.data);
        that.setState({headers:res.data, headersLoaded:true});
      },
      (err) => {
        console.log(err);
      }
    )
  this.getStuff();

  }
  getStuff(){

    console.log('mounted');
    var that = this;
    this.setState({
      isLoading:true,
      uploadPopup:false,
      propertyInfo:[{title:'',ImgUrl:''}],
      isLoading:true,
    });


    axios.post('/api/getFilename',{portfolioItemId:this.state.portfolioItemId}).then(
      (res) => {that.setState({filename:res.data.name})},
      (err) => {console.log(err)}
    );
    axios.post('/api/getPropertyInfo/', { responseType: 'arraybuffer', userId:this.props.auth.user.id, portfolioItemId:this.state.portfolioItemId }).then(
      (res) => {

        that.setState({propertyInfo:res.data, isLoading:false});

      }
    )
  }
  downloadExcel(){
    var that = this;
    axios.post('/api/downloadNewExcel/', {userId:this.props.auth.user.id, portfolioId:this.state.portfolioId,filename:this.state.filename} , { responseType: 'arraybuffer' }).then(
      (res) => {FileDownload(res.data, that.state.filename)},
      (err) => {}
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
    this.getStuff();
  }
  render() {


    var uploadPopup;
    if(this.state.uploadPopup){
      uploadPopup = <UploadData portfolioId={this.state.portfolioId} portfolioItemId={this.state.portfolioItemId}  filename={this.state.filename} hidePopup={this.showUploadPopup.bind(this)} closePopup={this.closeUploadPopup.bind(this)} />
    }else{
      uploadPopup = null;
    }
    return (
    <div>
    {uploadPopup}
    <div className="side-stage">
    <div className="side-stage-top" style={{marginBottom:'25px'}}>

      <div className="add-new-project-btn" style={{right:'160px'}} onClick={this.showUploadPopup.bind(this)}>Upload</div>
      <div className="add-new-project-btn" onClick={this.downloadExcel.bind(this)}>Download Excel</div>
    </div>
      <div className="property-main-title">{!this.state.isLoading && this.state.propertyInfo[0].title}</div>
      <div className="property-top-container">
        <div className="property-img" style={!this.state.isLoading ? {backgroundImage:'url(' + this.state.propertyInfo[0].imgUrl + ')'} : {}} />
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
      {this.state.isLoading && <div className="loading-gif"><img src={loadingGif} /></div>}
      {!this.state.isLoading ? this.state.headers.map(function(data,i){

        if(i >= 0){
        return <DetailBlock portfolioItemId={this.state.portfolioItemId} key={i} mainCategory={data} />
        }
    },this) : null

    }



      <div style={{height: 300}} />
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
export default connect(mapStateToProps)(Main);
