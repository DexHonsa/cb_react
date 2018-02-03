import React, { Component } from 'react';
import axios from 'axios';
import DetailBlock from './detail_block';
import loadingGif from '../../img/loading2.gif';

class TabBlock extends Component {
constructor(props) {
  super(props);
  this.state = {
    isLoading:true,
    headers:this.props.headers,
    headersLoaded:true,
    portfolioId:this.props.portfolioId,
    portfolioItemId:this.props.portfolioItemId
  };
}
componentDidMount(){
  if(this.props.headers){

  }
  var that = this;
  var portfolioId = this.state.portfolioId;
  var portfolioItemId = this.state.portfolioItemId;
  var data = {
    portfolioId:portfolioId,
    portfolioItemId:portfolioItemId,
    activeSideTabName:this.props.activeSideTabName
  }
  // axios.post('/api/getHeaders/', data).then(
  //   (res) => {
  //     that.setState({headers:res.data, headersLoaded:true,isLoading:false});
  //   },
  //   (err) => {
  //
  //   }
  // )
}
componentWillReceiveProps(nextProps){
  this.setState({isLoading:true,headers:nextProps.headers})
  this.componentDidMount();
}
doneLoading(){
  console.log('done');
  this.setState({isLoading:false})
}
  render() {
    return (
      <div>

        {this.state.headers.map(function(data,i){
          
          return <DetailBlock activeSideTabName={this.props.activeSideTabName} tabName={this.props.tabName} portfolioItemId={this.state.portfolioItemId} key={i} mainCategory={data} />

        },this)}
      </div>
    );
  }

}

export default TabBlock;
