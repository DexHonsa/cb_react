import React, { Component } from 'react';
import axios from 'axios';
import loadingGif from '../../img/loading2.gif';

class DetailBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      blockDetails: [],
      isLoading:true
    }
  }
  componentDidMount(){
    var that = this;
    var data = {majorCategory:this.props.mainCategory}
    axios.post('/api/getClosingBlock', data).then(
      (res) => {

        that.setState({blockDetails:res.data,isLoading:false})
      }
    );
  }

  render() {
    return (
      <div>
      {this.state.isLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : null}
      <div className="basic-detail-block animated-fast fadeIn">
        <div className="basic-detail-main-title">{this.props.mainCategory}</div>

        <div className="basic-detail-block-detail-container">
        {this.state.blockDetails.map(function(data,i){
          var newDataValue = [];
          var value = data['Value'];
          if(value !== undefined && value.toString().indexOf('T') > -1){
          newDataValue = value.split('T00');
        }else{
          newDataValue[0] = value;
        }
          return (
            <div key={i} className="basic-detail-block-detail-item animated-fast fadeIn">
            <div className="basic-detail-block-title">{data['Specific Category']}</div>
            <div className="basic-detail-block-value"><a target="_blank" href={data['Source File']}>{newDataValue[0]}</a></div>
          </div>
        );
        },this)}

        </div>
      </div>
      </div>
    );
  }

}

export default DetailBlock;
