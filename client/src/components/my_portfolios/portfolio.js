import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Portfolio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioId: this.props.match.params.portfolioId,
      items:[],
      isloaded:false,
      portfolioInfo:{},
    }
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
  render(){
    return(
      <div>
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
        <div className="side-stage-title">{this.state.isloaded && this.state.portfolioInfo[0].portfolioName}</div>
        <div className="my-projects-tabs">
          <div id="files_tab" className="my-projects-tab active">Portfolio Files</div>

        </div>
        <div id="files">
          <div className="file-item-headers">
            <div className="file-item-header" style={{marginRight: 15}}>File Name</div>
            <div className="file-item-header">Date Created</div>
            <div className="file-item-header">Date Modified</div>
          </div>
          {this.state.isLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : null}
          {this.state.items.map(function(data, i){
            return (
              <Link key={i} to={"/product/my-portfolios/" + this.props.match.params.portfolioId + "/" + data._id}><div className="file-item animated-fast fadeIn">
                <div className="icon"><i className="fa fa-file" /></div>
                <div className="file-item-value">{data.name}</div>
                <div className="file-item-value">08/01/2017</div>
                <div className="file-item-value">08/01/2017</div>
              </div></Link>
            );
          },this)}

        </div>
        <div id="properties" style={{display: 'none'}}>
          <div className="file-item-headers">
            <div className="file-item-header" style={{marginRight: 15}}>Property Name</div>
          </div>
          <a href="property.html"><div className="file-item">
              <div className="icon"><i className="fa fa-file" /></div>
              <div className="file-item-value" style={{width: '100%'}}>6135 NW 167th Street Miami Lakes, FL 33015.xlsx</div>
            </div></a>
          <a href="property.html"><div className="file-item">
              <div className="icon"><i className="fa fa-file" /></div>
              <div className="file-item-value" style={{width: '100%'}}>18 South Palmer Rd Miami Lakes, FL 33015.xlsx</div>
            </div></a>
          <a href="property.html"><div className="file-item">
              <div className="icon"><i className="fa fa-file" /></div>
              <div className="file-item-value" style={{width: '100%'}}>6135 NW 167th Street E-7 Miami Lakes, FL 33015.xlsx</div>
            </div></a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

      </div>
    );
  }
}
export default Portfolio;
