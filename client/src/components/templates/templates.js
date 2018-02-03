import React, { Component } from 'react';
import logo_color from '../../img/logo_color_with_line.png';
import FileDownload from 'react-file-download';
import axios from 'axios';

class Templates extends Component {
downloadTemplate(){

    axios.post('/api/downloadTemplate',{}, { responseType: 'arraybuffer' }).then(
      (res) => {FileDownload(res.data, 'CB_template.xlsx')}
    )
  }
  render() {
    return (
      <div>
        <div className="main-stage">

  <div className="container">
    <div className="row">
      <div className="col-sm-4">
        <div className="side-nav">
          <ul>
            <li className="active">Templates</li>
          </ul>
        </div>
      </div>
      <div className="col-sm-8">
        <div className="side-stage">
          <div className="side-stage-title">Templates</div>

          <div className="my-projects-tabs">
            <div className="my-projects-tab active">All Templates</div>

          </div>
          <div className="my-projects-container">
            <div onClick={this.downloadTemplate.bind(this)}  id="template-1" className="my-projects-item">
                <div className="my-projects-logo"><img src={logo_color} alt="" /></div>
                <div className="my-projects-title">CommonBrain Upload Template<br /></div>
                <div className="my-projects-create-date">
                </div>
              </div>

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

export default Templates;
