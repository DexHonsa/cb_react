import React from 'react';
import {Link} from 'react-router-dom';
import logo_color from '../../img/logo_1.png';
import {connect} from 'react-redux';

class PortfolioItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ntt:false
    }
  }
  componentDidMount(){
    if(this.props.auth.user.id == '5a3adb9cc786f041d850f823'){
      this.setState({ntt:true})
    }
  }
  render() {

    return (
      <div>
        <Link  to={this.state.ntt ? {
          pathname: '/product/applications',
          portfolioName:this.props.portfolioName
        }:{
          pathname: '/product/my-portfolios/' + this.props.portfolioId,
          portfolioName:this.props.portfolioName
        }}>
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
