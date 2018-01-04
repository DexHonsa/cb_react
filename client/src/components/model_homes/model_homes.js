import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class ModelHomes extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (<div>
      <div className="container">
        {/*
<div class="fixed-address-bar animated " style="display: none; opacity: 0;">
  <div class="container" style="display: flex; align-items: center;">6024 4th Avenue, Brooklyn, NY 11220
  <div style=" margin-left: auto; display: flex; align-items: center;">
    <div class="broker-img" style="width:50px; height:50px;"></div>
    <div class="broker-name" >Swany Vazquez</div>
    <div class="broker-email"  style="padding:15px;"><a href="mailto:svazquez@epic-cr.com">svazquez@epic-cr.com</a></div>
        <div class="broker-phone"><i class="fa fa-mobile"></i> (646) 278-4638</div>
  </div>
  </div>
</div>
*/
        }
        <div className="row">
          <div className="col-sm-3">
            <div className="side-nav">
              <ul>
                  <li className="active">Property</li>
                  <li>Asset Summary</li>
                <div className="divider"/>
                <li style={{
                    color: '#d0d0d0'
                  }}>Visualize Portfolio</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="side-stage">
              <div className="property-main-title">1015A TX-150, New Waverly, TX 77358</div>
              <div className="property-top-container">
                <div className="property-img" style={{
                    backgroundImage: 'url(' + require('../../img/CLIFFVIEW-B-Rendering.jpg')+')',
                    float: 'left'
                  }}><img style={{
        width: 100
      }} src={require('../../img/model_homes_logo.png')} alt="alt"/></div>
                <div className="property-side-details" style={{
                    padding: 0,
                    paddingLeft: 15
                  }}><div id="map" style={{
        width: '100%',
        height: 330
      }}/></div>
              </div>
              {/* Property Details */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Property Details</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Builder</div>
                    <div className="basic-detail-block-value">
                      <a href="https://www.linkedin.com/in/mark-watson-4790a09b/">Mark Watson</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Master Builder</div>
                    <div className="basic-detail-block-value">
                      <a href="https://www.linkedin.com/in/kyle-v-cox-architect-61357816">Kyle Cox</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Third Party Inspector</div>
                    <div className="basic-detail-block-value">
                      <a target="_blank" href="img/Building_Specs.pdf">TBD</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Address</div>
                    <div className="basic-detail-block-value">1015A TX-150, New Waverly, TX 77358</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Community</div>
                    <div className="basic-detail-block-value">
                      <a href="https://www.txgrandranch.com/">Texas Grand Ranch</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lot SF</div>
                    <div className="basic-detail-block-value tooltip" title="2.009 Acres">
                      <a href="img/GJ Gardner Model Homesite Purchase Contract.pdf#page=6">87,512 SF</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Submarket</div>
                    <div className="basic-detail-block-value">Conroe (North Houston)</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Building SF</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Cliffview B Model-FINAL Construction Documents.pdf">3,636 SF</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lot/Block/Section</div>
                    <div className="basic-detail-block-value">
                      <a href="img/GJ Gardner Model Homesite Purchase Contract.pdf#page=2">2/6/1</a>
                    </div>
                  </div>
                  {/*
          <div class="basic-detail-block-detail-item">
            <div class="basic-detail-block-title">Architectural Rendering</div>
            <div class="basic-detail-block-value"><a target="_blank" href="img/Cliffview B Model-FINAL Construction Documents.pdf">View Rendering</a></div>
          </div>
          <div class="basic-detail-block-detail-item">
            <div class="basic-detail-block-title">Building Specs</div>
            <div class="basic-detail-block-value"><a target="_blank" href="img/Building_Specs.pdf">View PDF</a></div>
          </div>
*/
                  }
                </div>
              </div>
              {/* Financial Details */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Financial Assumptions</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lot Cost</div>
                    <div className="basic-detail-block-value">
                      <a href="img/GJ Gardner Model Homesite Purchase Contract.pdf">$99,000</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Lot Value</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$108,900</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Delivered Cost</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$627,731</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Build Value</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$753,278</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Total Cost</div>
                    <div className="basic-detail-block-value tooltip" title="This includes interest charges if any.">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$733,825</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Initial Value</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$862,178</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Build Time</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">6 Months</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item ">
                    <div className="basic-detail-block-title">Value over Cost</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">117%</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lease information */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Lease Information</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">FICO Score of Lease Guarantor</div>
                    <div className="basic-detail-block-value">650</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lease Monthly</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$4,892</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lease Rate</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">8%</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lease Escrow</div>
                    <div className="basic-detail-block-value">
                      <span className="tooltip" title="6 months X $4,892 monthly rent">
                        <a href="img/Model Home upload 2017_11_30.xlsx">$29,353</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Comparative Market Analysis */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Comparative Market Analysis</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item full">
                    <div className="basic-detail-block-title">Sales Comp</div>
                    <div className="basic-detail-block-value">
                      <a href="img/attachment 1.pdf">CMA</a>
                    </div>
                  </div>
                  {/*
          <div class="basic-detail-block-detail-item full">
            <div class="basic-detail-block-title">Sales Comp 2</div>
            <div class="basic-detail-block-value">N/A</div>
          </div>
          <div class="basic-detail-block-detail-item full">
            <div class="basic-detail-block-title">Sales Comp 3</div>
            <div class="basic-detail-block-value">N/A</div>
          </div>
*/
                  }
                </div>
              </div>
              {/* Mortgage Assumotions */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Mortgage Assumptions</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Lender</div>
                    <div className="basic-detail-block-value">
                      <a href="https://www.firstnational1870.com/">First National 1870</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Interest Rate</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">6.0%</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">LTC</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">60%</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Amortization Term</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">Interest Only</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Investor Information */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Investor Information</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Total Capitalization Needed</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$290,000</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">IRR</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">38%</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Total Capitalization Raised</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">$290,000</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Multiple</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">1.6X</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Hold Period</div>
                    <div className="basic-detail-block-value">
                      <a href="img/Model Home upload 2017_11_30.xlsx">21 Months</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tax and Insurance */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Tax and Insurance</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Expected Taxes</div>
                    <div className="basic-detail-block-value">TBD</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Expected Insurance</div>
                    <div className="basic-detail-block-value">TBD</div>
                  </div>
                </div>
              </div>
              {/* Entity Details */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Entity Details</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Entity Name</div>
                    <div className="basic-detail-block-value">To be formed</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Date of Incorporation</div>
                    <div className="basic-detail-block-value">1/1/2018</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Entity Jursidiction</div>
                    <div className="basic-detail-block-value">Texas</div>
                  </div>
                  <div className="basic-detail-block-detail-item">
                    <div className="basic-detail-block-title">Corporation Type</div>
                    <div className="basic-detail-block-value">Texas</div>
                  </div>
                </div>
              </div>
              {/* Document Storage */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Document Storage</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item full">
                    <div className="basic-detail-block-title">
                      <a target="_blank" href="http://dropbox.com"><i className="fa fa-dropbox"/>
                        Dropbox</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item full">
                    <div className="basic-detail-block-title">
                      <a target="_blank" href="http://box.com">Box</a>
                    </div>
                  </div>
                  <div className="basic-detail-block-detail-item full">
                    <div className="basic-detail-block-title">
                      <a target="_blank" href="http://sharepoint.com">Sharepoint</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Document Storage */}
              <div className="basic-detail-block">
                <div className="basic-detail-main-title">Links to Outside Data Sources</div>
                <div className="basic-detail-block-detail-container">
                  <div className="basic-detail-block-detail-item full ">
                    <div className="basic-detail-block-title ">
                      <a target="_blank" href="http://www.gjgardner.com/data/estates/v-635869288326566000/533.pdf">Greenhouse
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                  height: 300
                }}/>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }

}

export default ModelHomes;
