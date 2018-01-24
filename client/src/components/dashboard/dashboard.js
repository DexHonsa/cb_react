import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import FileDownload from 'react-file-download';
import axios from 'axios';

import logo_grey from '../../img/logo_grey.png';
import logo_color from '../../img/logo_color_with_line.png';
import computer from '../../img/computer.png';
import logo_white from '../../img/logo_white.png';
import systems_1 from '../../img/argus.png';
import systems_2 from '../../img/MRI_Software_logo.svg_-1.png';
import systems_3 from '../../img/SFDC_logo.png';
import systems_4 from '../../img/yardi.png';
import excel from '../../img/Excel-Logo-Home-Page.png';
import include from '../../img/include.png';

class Dashboard extends React.Component {

downloadTemplate(){
  var that = this;
  axios.post('/api/downloadTemplate', {}, { responseType: 'arraybuffer' }).then(
    (res) => {{FileDownload(res.data, 'CB_template.xlsx')}}
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
