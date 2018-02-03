import React, {Component} from 'react';

class ApplicationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  expandItem() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    var riskScore;
    if(0 <= parseInt(this.props.riskScore,10)){
      riskScore = "low"
    }
    if(40 <= parseInt(this.props.riskScore,10)){
      riskScore = "med-low"
    }
    if(80 <= parseInt(this.props.riskScore,10)){
      riskScore = "med"
    }
    if(120 <= parseInt(this.props.riskScore,10)){
      riskScore = "med-high"
    }
    if(160 <= parseInt(this.props.riskScore,10)){
      riskScore = "high"
    }

    return (
      <div id="application-1" className={this.state.open ? "application-item "+riskScore+" open" : "application-item "+riskScore}>
        <div className="application-item-top">
          <div className="application-item-title tooltip" title="Accounting">
            <a href="img/excel/Accounting Software.pdf">{this.props.applicationName}</a><br/>
            <div className="risk-level-label">{riskScore}</div>
          </div>
            <div className="risk-level-number">
                <div style={{
                  float: 'left'
                  }}>Risk Score<br/>
                  <span>{this.props.riskScore}</span>
                </div>
              <div onClick={this.expandItem.bind(this)} className={this.state.open ? "expand-icon active" : "expand-icon"}><i className="fa fa-angle-down"/></div>
            </div>
        </div>
        <div className={this.state.open ? "risk-level-details animated fadeIn block" : "risk-level-details animated fadeOut "}>
          <div className="risk-level-detail-item">
            <div className="risk-level-detail-title">Administrator</div>
            <div className="risk-level-detail-value">{this.props.admin} (<a href="mailto:dbyer@gmail.com">{this.props.adminEmail}</a>)</div>
          </div>
          <div className="risk-level-detail-item">
            <div className="risk-level-detail-title">License Expiration</div>
            <div className="risk-level-detail-value">
              <a href="img/Sample licensing contract in pdf with comments.pdf#page=2">{this.props.expiration}</a>
            </div>
          </div>
          <div className="risk-level-detail-item">
            <div className="risk-level-detail-title"># of Seats</div>
            <div className="risk-level-detail-value">
              <a href="img/Sample licensing contract in pdf with comments.pdf#page=1">{this.props.seats}</a>
            </div>
          </div>
          <div className="risk-level-detail-item">
            <div className="risk-level-detail-title">Compliancy Percentage</div>
            <div className="risk-level-detail-value">
              <a href="img/excel/Application_Legend.xlsm">{this.props.compliancy*100 + '%'}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ApplicationItem;
