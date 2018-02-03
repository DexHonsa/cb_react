import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import FileDownload from 'react-file-download';
import axios from 'axios';












class Dashboard extends React.Component {

downloadTemplate(){

  axios.post('/api/downloadTemplate', {}, { responseType: 'arraybuffer' }).then(
    (res) => {FileDownload(res.data, 'CB_template.xlsx')}
  )
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
            <li className="active">Getting Started</li>
            <NavLink to="/product/dashboard/faq"><li>FAQ</li></NavLink>
          </ul>
        </div>
      </div>
      <div className="col-sm-8">
        <div className="side-stage">
          <div className="side-stage-title">Getting Started</div>
          <div className="main-desc">Upload your data to CommonBrain quickly and easily.  Just download the template below and navigate to My Portfolios to create your first portfolio!</div>
          <div onClick={this.downloadTemplate.bind(this)} className="render-btn">Download Template</div>
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

export default connect(mapStateToProps)(Dashboard);
