import React from 'react';
import Main from './main.js';
import Loan from './loan';
import AssetSum from './asset_summary';
import Visualize from './visualize';
import Exceptions from './exceptions';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideStage: 'main',
      portfolioId:this.props.match.params.portfolioId,
      portfolioItemId:this.props.match.params.id,
      activeTabIndex:0,
      sideTabs:[],
      activeSideTabName:null
    }
  }
  changeStage(tabIndex) {
    this.setState({activeTabIndex:tabIndex,activeSideTabName:this.state.sideTabs[tabIndex]})
  }
  componentDidMount(){

    var that = this;
    var portfolioId = this.state.portfolioId;
    var portfolioItemId = this.state.portfolioItemId;
    var data = {
      portfolioId:portfolioId,
      portfolioItemId:portfolioItemId
    }
    axios.post('/api/getSideTabs', data).then(
      (res) => {
        
        that.setState({sideTabs:res.data, activeSideTabName:res.data[0]})
        that.changeStage(0);
      },
      (err) => {console.log(err)}
    )
  }
  render() {

    var sideStage;
    if (this.state.activeSideTabName) {
      sideStage = <Main activeSideTabName={this.state.activeSideTabName} portfolioId={this.state.portfolioId} portfolioItemId={this.state.portfolioItemId}/>
    }

    return (
      <div>
        <div className="main-stage">

          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="side-nav">
                  <ul>
                    {this.state.sideTabs.map(function(data, i){
                      var active = false;
                      if(this.state.activeTabIndex == i){
                        active = true;
                      }
                      if(data != null){
                        return <li key={i} className={active ? "active" : "inactive"} onClick={() => this.changeStage(i)}>{data}</li>
                      }
                    },this)}

                  </ul>
                </div>
              </div>
              <div className="col-sm-9">
                {sideStage}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
  export default Property;
