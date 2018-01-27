import React, { Component } from 'react';
import axios from 'axios';
import DetailBlock from './detail_block';
import loadingGif from '../../img/loading2.gif';

class TabBlock extends Component {
constructor(props) {
  super(props);
  this.state = {
    isLoading:true,
    headers:[],
    headersLoaded:false,
    portfolioId:this.props.portfolioId,
    portfolioItemId:this.props.portfolioItemId
  };
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
      that.setState({headers:res.data, headersLoaded:true,isLoading:false});
    },
    (err) => {

    }
  )
}
componentWillReceiveProps(nextprops){
  this.componentDidMount();
}
  render() {
    return (
      <div>
        {!this.state.isLoading ? this.state.headers.map(function(data,i){

          if(i >= 0){

          return <DetailBlock tabName={this.props.tabName} portfolioItemId={this.state.portfolioItemId} key={i} mainCategory={data} />
          }
        },this) : <div className="loading-gif"><img src={loadingGif} /></div>

      }
      </div>
    );
  }

}

export default TabBlock;
