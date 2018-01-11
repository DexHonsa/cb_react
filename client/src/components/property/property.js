import React from 'react';
import Main from './main.js';
import Loan from './loan';
import AssetSum from './asset_summary';
import Visualize from './visualize';
import Exceptions from './exceptions';
import {NavLink} from 'react-router-dom';

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideStage: 'main',
      activeClasses:[true,false,false,false,false]
    }
  }
  changeStage(stage) {
    var that = this;
    if (stage == 'main') {
      this.setState({sideStage: 'main',activeClasses:[true,false,false,false,false]})
    }
    if (stage == 'loan') {
      this.setState({sideStage: 'loan',activeClasses:[false,true,false,false,false]})
    }
    if (stage == 'asset_sum') {
      this.setState({sideStage: 'asset_sum',activeClasses:[false,false,true,false,false]})
    }
    if (stage == 'visualize') {
      this.setState({sideStage: 'visualize',activeClasses:[false,false,false,true,false]})
    }
    if (stage == 'exceptions') {
      this.setState({sideStage: 'exceptions',activeClasses:[false,false,false,false,true]})
    }
  }
  render() {
    const activeClasses = this.state.activeClasses.slice();
    var sideStage;
    if (this.state.sideStage == 'main') {
      sideStage = <Main/>
    }
    if (this.state.sideStage == 'loan') {
      sideStage = <Loan/>
    }
    if (this.state.sideStage == 'asset_sum') {
      sideStage = <AssetSum/>
    }
    if (this.state.sideStage == 'visualize') {
      sideStage = <Visualize/>
    }
    if (this.state.sideStage == 'exceptions') {
      sideStage = <Exceptions/>
    }
    return (
      <div>
        <div className="main-stage">

          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <div className="side-nav">
                  <ul>

                      <li className={activeClasses[0]? "active" : "inactive"} onClick={() => this.changeStage("main")}>Asset</li>


                      <li className={activeClasses[1]? "active" : "inactive"} onClick={() => this.changeStage("loan")}>Financing</li>


                      <li className={activeClasses[2]? "active" : "inactive"} onClick={() => this.changeStage("asset_sum")}>Asset Summary</li>


                    <div className="divider"/>

                      <li className={activeClasses[3]? "active disabled" : "inactive disabled"} onClick={() => this.changeStage("visualize")}>Visualize</li>


                      <li className={activeClasses[4]? "active disabled" : "inactive disabled"} onClick={() => this.changeStage("exceptions")}>Exceptions</li>

                    {/*					<a href="img/Sample Property Template.xlsx"><li>Main Template</li></a>*/}
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
