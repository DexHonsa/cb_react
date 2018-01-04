import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DeletePortfolio from './delete_portfolio';
import UploadItem from './upload_item';
import {connect} from 'react-redux';
class Portfolio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioId: this.props.match.params.portfolioId,
      items:[],
      isloaded:false,
      portfolioInfo:{},
      deletePopup:false,
      uploadPopup:false,
      tab:'files',
      activeClasses: [true,false],
      shareInput:'',
      shareErrors:{},
      sharedUsers:[],
      sharedLoading:false
    }
  }
  changeTab(tab) {
    var that = this;
    if (tab == 'files') {
      this.setState({sideStage: 'files',activeClasses:[true,false]})
    }
    if (tab == 'sharing') {
      this.setState({sideStage: 'sharing',activeClasses:[false,true]})
      this.getSharedUsers();
    }
  }
  shareSubmit(){
    this.setState({sharedLoading:true,shareErrors:{}});
    var data = {
      userId:this.props.auth.user.id,
      shareEmail:this.state.shareInput,
      portfolioId:this.state.portfolioId
    }
    axios.post('/api/sharePortfolio', data).then(
      (res) => {this.getSharedUsers()},
      (err) => {this.setState({shareErrors: err.response.data.shareErrors, isLoaded: true, sharedLoading:false})}
    )
  }
  unshareSubmit(email){
    this.setState({sharedLoading:true,shareErrors:{}});
    var data = {
      userId:this.props.auth.user.id,
      shareEmail:email,
      portfolioId:this.state.portfolioId
    }
    axios.post('/api/unsharePortfolio', data).then(
      (res) => {this.getSharedUsers();this.setState({sharedUsers:[]})},
      (err) => {}
    )
  }
  onChange(e){
    this.setState({shareInput:e.target.value})
  }
  getSharedUsers(){
      this.setState({sharedLoading:true,shareErrors:{}});
    axios.post('/api/getSharedUsers', {portfolioId:this.state.portfolioId}).then(
      (res) => {
        if(res.data.length > 0){
          this.setState({shareErrors:{},sharedUsers:res.data, sharedLoading:false})
        }else{
          this.setState({shareErrors:{}, sharedLoading:false})
        }

      },
      (err) => {this.setState({sharedLoading:false})}
    )
  }
  componentDidMount(){
    var that = this;
    var portfolioId = this.props.match.params.portfolioId;
    axios.post('/api/getPortfolioInfo',{portfolioId:portfolioId}).then(function(res){
      that.setState({
        portfolioInfo:res.data
      })
    })
    axios.post('/api/getPortfolioItems', {portfolioId:portfolioId}).then(function(res){
      that.setState({
        items:res.data,
        isloaded:true
      });
    })

  }
  showDeletePopup(){
    this.setState({deletePopup:true});
  }
  hideDeletePopup(){
    this.setState({deletePopup:false});
  }
  showUploadPopup(){
    this.setState({uploadPopup:true});
  }
  hideUploadPopup(){
    this.setState({uploadPopup:false});
  }
  render(){
    const {shareErrors} = this.state;
    var deletePopup;
    if(this.state.deletePopup){
      deletePopup = <DeletePortfolio portfolioId={this.state.portfolioId} hide={this.hideDeletePopup.bind(this)}/>
    }
    var uploadPopup;
    if(this.state.uploadPopup){
      deletePopup = <UploadItem portfolioId={this.state.portfolioId} hide={this.hideUploadPopup.bind(this)}/>
    }
    return(
      <div>
      {deletePopup}
      {uploadPopup}
      <div className="main-stage">

<div className="container">
  <div className="row">
    <div className="col-sm-4">
      <div className="side-nav">
        <ul>
          <li className="active">My Portfolios</li>
        </ul>
      </div>
    </div>
    <div className="col-sm-8">
      <div className="side-stage">
        <div className="side-stage-title">{this.state.isloaded ? this.state.portfolioInfo[0].portfolioName : <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> }</div>
        <div onClick={this.showDeletePopup.bind(this)} className="delete-portfolio-btn">Delete</div>
        <div style={{right:'80px'}} onClick={this.showUploadPopup.bind(this)} className="add-new-project-btn">Upload File</div>
        <div className="my-projects-tabs">
          <div id="files_tab" onClick={() => this.changeTab('files')} className={this.state.activeClasses[0] ? 'my-projects-tab active' : 'my-projects-tab'}>Portfolio Files</div>
          <div id="files_tab" onClick={() => this.changeTab('sharing')} className={this.state.activeClasses[1] ? 'my-projects-tab active' : 'my-projects-tab'}>Sharing</div>

        </div>
        {this.state.activeClasses[0] && (
        <div id="files">
          <div className="file-item-headers">
            <div className="file-item-header" style={{marginRight: 15}}>File Name</div>
            <div className="file-item-header">Date Created</div>
            <div className="file-item-header">Date Modified</div>
          </div>
          {this.state.isLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : null}
          {this.state.items.map(function(data, i){
            var to = "/product/my-portfolios/" + this.props.match.params.portfolioId + "/" + data._id;
            if(data.portfolioId == "5a4e8fa6af759d39a4834553"){
              to = "/product/model_homes";
            }
            return (
              <Link key={i} to={to}><div className="file-item animated-fast fadeIn">
                <div className="icon"><i className="fa fa-file" /></div>
                <div className="file-item-value">{data.name}</div>
                <div className="file-item-value">08/01/2017</div>
                <div className="file-item-value">08/01/2017</div>
              </div></Link>
            );
          },this)}

        </div>
      )
    }
    {this.state.activeClasses[1] && (
    <div id="files">

      {this.state.isLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : null}
      <div className="sharing-add-email animated-fast fadeIn">
        <input onChange={this.onChange.bind(this)} placeholder="Username or Email" type="text" />
        <div className="sharing-add-email-btn" onClick={this.shareSubmit.bind(this)}>Share</div>
      </div>
      {shareErrors.form && <div style={{marginTop:'15px'}} className=" alert-danger animated fadeIn">{shareErrors.form}</div>}
      <div className="sharing-list animated-fast fadeIn">
        {this.state.sharedLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : this.state.sharedUsers.map(function(data,i){

          return (
            <div className="shared-user-item animated-fast fadeIn" key={i}>
            <div className="shared-user-username">{data.username}</div>
            <div className="shared-user-email">{data.email}</div>
            <i onClick={() => this.unshareSubmit(data.email)} className="fa fa-close"/>
            </div>
          )
        },this)}

      </div>

    </div>
  )
}
      </div>
    </div>
  </div>
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
export default connect(mapStateToProps)(Portfolio);
