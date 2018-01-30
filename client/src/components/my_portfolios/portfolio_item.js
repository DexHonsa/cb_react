import React from 'react';
import {Link} from 'react-router-dom';
import logo_color from '../../img/logo_1.png';
import {connect} from 'react-redux';

class PortfolioItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ntt:false,
      portfolioId:this.props.portfolioId
    }
  }
  componentDidMount(){
    if(this.props.auth.user.id == '5a3adb9cc786f041d850f823'){
      this.setState({ntt:true})
    }
    
  }
  render() {
    var to = {
      pathname: '/product/my-portfolios/' + this.props.portfolioId,
      portfolioName:this.props.portfolioName
    };
    if(this.props.auth.user.id == '5a3adb9cc786f041d850f823'){
      to = {
        pathname: '/product/applications',
        portfolioName:this.props.portfolioName
      }
    }
    // if(this.props.auth.user.id == '5a4e8e21c27b7c780cbb8e3d'){
    //   to = {
    //     pathname: '/product/modelhomes',
    //     portfolioName:this.props.portfolioName
    //   }
    // }
    return (
      <div>
        <Link  to={to}>
          <div className="my-projects-item animated-fast fadeIn">
            <div className="my-projects-logo"><img src={logo_color} alt/></div>
            <div className="my-projects-title">{this.props.portfolioName}<br/>
              <span style={{
                color: '#D1DCE7',
                fontSize: '10pt'
              }}>Portfolio</span>
            </div>
            <div className="my-projects-create-date">Created by {this.props.username}</div>
          </div>
        </Link>
        </div>
    );
  }
}
function mapStateToProps(state){
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(PortfolioItem);
