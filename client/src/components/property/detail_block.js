import React, { Component } from 'react';
import axios from 'axios';
import loadingGif from '../../img/loading2.gif';

class DetailBlock extends Component {
  constructor(props){
    super(props);
    this.state = {
      blockDetails: [],
      isLoading:true,
      portfolioItemId:this.props.portfolioItemId
    }
  }
  componentDidMount(){
    var that = this;
    var data = {majorCategory:this.props.mainCategory, portfolioItemId:this.state.portfolioItemId}
    axios.post('/api/getBlock', data).then(
      (res) => {

        that.setState({blockDetails:res.data,isLoading:false})
      }
    );
  }
truncate(string){
     if (string.length > 25)
        return string.substring(0,25)+'...';
     else
        return string;
  };

  render() {
    return (
      <div>
      {this.state.isLoading ? <div className="loading-gif"><img src={require('../../img/loading2.gif')} /></div> : null}
      <div className="basic-detail-block animated-fast fadeIn">
        <div className="basic-detail-main-title">{this.props.mainCategory}</div>

        <div className="basic-detail-block-detail-container">
        {this.state.blockDetails.map(function(data,i){
          console.log('data_block');
          var hasSource = false;

          if(data['Source File'] != '--' && data['Source File'] != undefined){
            hasSource = true;
            var dataLink;
            dataLink = "http://"  + data['Source File'];
          }
          var newDataValue = [];
          var value = data['Value'];
          var dataTitle = data['Specific Category'];
          //console.log(typeof value)
          if(typeof value == 'string'){
            value = this.truncate(value);
          }
          if(typeof data['Specific Category'] == 'string'){
          dataTitle =  this.truncate(dataTitle);
          }

          if(value !== undefined && value.toString().indexOf('T') > -1){
          newDataValue = value.split('T00');
        }else{
          newDataValue[0] = value;
        }

        if(newDataValue[0] == undefined){
          newDataValue[0] = '--';
        }
          return (
            <div key={i} className="basic-detail-block-detail-item animated-fast fadeIn">
            <div className="basic-detail-block-title">{dataTitle}</div>
            <div className="basic-detail-block-value">{hasSource ? <a target="_blank" href={dataLink}> {newDataValue[0]}</a> : newDataValue[0]}</div>
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
