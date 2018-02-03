import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import UploadData from './upload_data';
import FileDownload from 'react-file-download';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import TabBlock from './tab_block';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      uploadPopup:false,
      headers:[],
      tabs:[],
      activeTabs:[true],
      activeTabName:'',
      headersLoaded:false,
      tabsLoaded:false,
      propertyInfo:[{title:'',ImgUrl:''}],
      portfolioId:this.props.portfolioId,
      portfolioItemId:this.props.portfolioItemId,
      filename:'',
      topTitleVisible:true
    }
  }

  activateTab(i){
    var array = [];
    array[i] = true;
    var tabName = this.state.tabs[i];
    this.setState({activeTabName:tabName, activeTabs:array})
  }
  componentDidMount(){
    this.getStuff();
    $(window).scroll(function () {
			var scroll = $(window).scrollTop();
			if(scroll > 50){
				$('.fixed-address-bar').show().removeClass('fadeOutUp').addClass('fadeInDown');
			}else{
				$('.fixed-address-bar').removeClass('fadeInDown').addClass('fadeOutUp');
			}
		});
  }
  componentDidUpdate(){
    ReactTooltip.rebuild();
  }
  componentWillReceiveProps(nextProps){
    this.setState({tabsLoaded:false,headers:[]})
    var that = this;
    var portfolioId = this.state.portfolioId;
    var portfolioItemId = this.state.portfolioItemId;
    var data = {
      portfolioId:portfolioId,
      portfolioItemId:portfolioItemId,
      activeSideTabName:nextProps.activeSideTabName,
    }
    axios.post('/api/getHeaders/', data).then(
      (res) => {
        that.setState({headers:res.data, headersLoaded:true});
      },
      (err) => {
      }
    )
    axios.post('/api/getTabs/', data).then(
      (res) => {
        that.setState({activeTabName:res.data[0],tabs:res.data, tabsLoaded:true});
      },
      (err) => {
      }
    )
  }
  getStuff(){
    this.setState({
      isLoading:true,
      uploadPopup:false,
      propertyInfo:[{title:'',ImgUrl:''}],

    });
    var that = this;
    var portfolioId = this.state.portfolioId;
    var portfolioItemId = this.state.portfolioItemId;
    var data = {
      portfolioId:portfolioId,
      portfolioItemId:portfolioItemId,
      activeSideTabName:this.props.activeSideTabName,
    }
    axios.post('/api/getHeaders/', data).then(
      (res) => {

        that.setState({headers:res.data, headersLoaded:true});
      },
      (err) => {
      }
    )
    axios.post('/api/getTabs/', data).then(
      (res) => {
        that.setState({activeTabName:res.data[0],tabs:res.data, tabsLoaded:true});
      },
      (err) => {
      }
    )
    axios.post('/api/getFilename',{portfolioItemId:this.state.portfolioItemId}).then(
      (res) => {that.setState({filename:res.data.name})},
      (err) => {}
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
      {this.state.topTitleVisible ? <div className="fixed-address-bar animated " style={{display: 'none', opacity: 0}}>
        <div className="container" style={{display: 'flex', alignItems: 'center'}}>{this.state.propertyInfo[0].title}
        </div>
      </div>
       : null}
      <div className="property-top-container">
        <div className="property-img" style={!this.state.isLoading ? {backgroundImage:'url(' + this.state.propertyInfo[0].imgUrl + ')'} : {}} >
          <div className="property-main-title">
            {!this.state.isLoading && this.state.propertyInfo[0].title}
            <div className="side-stage-top" >
              <div className="download-btn" data-tip="Upload Excel" style={{right:'160px'}} onClick={this.showUploadPopup.bind(this)}><i className="fa fa-upload"></i></div>
              <div className="download-btn" data-tip="Download Excel" onClick={this.downloadExcel.bind(this)}><i className="fa fa-download"></i></div>
            </div>
          </div>
        </div>
        <div className="property-tab-container">
          {this.state.tabsLoaded && this.state.tabs.map(function(data,i){
            if(data !== undefined){
              return <div key={i} onClick={()=>this.activateTab(i)} className={this.state.activeTabs[i] ?"property-tab-item active" :"property-tab-item"}>{data}</div>
            }
            return '';

          },this)}

        </div>
        {!this.state.isLoading && <TabBlock headers={this.state.headers} activeSideTabName={this.props.activeSideTabName} tabName={this.state.activeTabName} portfolioId={this.state.portfolioId} portfolioItemId={this.state.portfolioItemId} /> }

      </div>





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
