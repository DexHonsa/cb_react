import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Bar, Scatter, Pie} from 'react-chartjs-2';
import ApplicationItem from './application_item';
import axios from 'axios';

import UploadPopup from './upload_popup';

class Applications extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab1: true,
      tab2:false,
      activeClasses:[true,false],
      applications: [],
      filteredApplications: [],
      applicationTypeDropdown:'All Applications',
      uploadPopup:false
    }
  }
componentDidMount(){
  var that = this;
  axios.post('/api/applications').then(function(res){
    that.setState({
      applications:res.data,
      filteredApplications:res.data
    });
  })
}
showUploadPopup(){
  this.setState({
    uploadPopup: !this.state.uploadPopup
  });

}
closeUploadPopup(){
  this.setState({
    uploadPopup: !this.state.uploadPopup
  });
  this.componentDidMount();
  //this.forceUpdate();
}
filterApplications(event){
  this.setState({applicationTypeDropdown: event.target.value});
  var arr = [];
  this.state.applications.map(function(data, i ){
      if(data.applicationType == event.target.value){
        arr.push(data);
      }
  },this)

  if(event.target.value == 'All Applications'){
    arr = this.state.applications;
  }

    this.setState({
      filteredApplications: arr
    })



}

  changeTab(tab){
    if(tab == '1'){
      if(this.state.tab == '1'){

      }else{
        this.setState({
          tab1: true,
          tab2:false,
          activeClasses:[true,false]
        });
      }

    }else{
      if(this.state.tab == '2'){

      }else{
        this.setState({
          tab1: false,
          tab2:true,
          activeClasses:[false,true]
        });
      }

    }
  }


  render() {
    const activeClasses = this.state.activeClasses.slice();
    var BarArray = [0,0,0,0,0];


    var barArrayData = this.state.applications.map(function(data,i){
        if(0 <= parseInt(data.riskScore) && 40 > parseInt(data.riskScore)){
          BarArray[0] = BarArray[0] + 1
        }
        if(40 <= parseInt(data.riskScore) && 80 > parseInt(data.riskScore)){
          BarArray[1] = BarArray[1] + 1
        }
        if(80 <= parseInt(data.riskScore) && 120 > parseInt(data.riskScore)){
          BarArray[2] = BarArray[2] + 1
        }
        if(120 <= parseInt(data.riskScore) && 160 > parseInt(data.riskScore)){
          BarArray[3] = BarArray[3] + 1
        }
        if(160 <= parseInt(data.riskScore) && 200 >= parseInt(data.riskScore)){
          BarArray[4] = BarArray[4] + 1
        }

    },this);


    var barData = {
				labels: ["Low", "Medium-Low", "Medium", "Medium-High","High"],
				datasets: [{
					data: BarArray,
					backgroundColor: [
						'#66d18f',
						'#BAF06B',
						'#ebf06b',
						'#FFA600',
						'#fe4848'
					],
				}],
			};
    var barOptions = {
				tooltips: {
						callbacks: {
						  label: function(tooltipItem, data) {
							var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Balh';
							var label = data.labels[tooltipItem.index];

							  if(tooltipItem.index == 0){
								  return label + ': ' + data.datasets[0].data[tooltipItem.index] + ' (0-40)';
							  }
							  if(tooltipItem.index == 1){
								  return label + ': ' + data.datasets[0].data[tooltipItem.index] + ' (40-80)';
							  }
							  if(tooltipItem.index == 2){
								  return label + ': ' + data.datasets[0].data[tooltipItem.index] + ' (80-120)';
							  }
							  if(tooltipItem.index == 3){
								  return label + ': ' + data.datasets[0].data[tooltipItem.index] + ' (120-160)';
							  }
							  if(tooltipItem.index == 4){
								  return label + ': ' + data.datasets[0].data[tooltipItem.index] + ' (160-200)';
							  }

						  }
						}
					  },
				responsive:true,
				legend: { display: false, position: 'bottom' },
				 scales: {

					yAxes: [{
						override: {
                    stepWidth: 10,
                    start: 0,
                    steps: 10
                },
						ticks: {
							beginAtZero: true,
							max : 10,
                        	min : 0
						},

					}],
					 xAxes: [{

					ticks: {
						fontSize: 10
					},
						 gridLines : {
							display : false
						}
        }]
				}
			}
    var pieData = {
				labels: ["Yes", "No", "TBD"],
				datasets: [{
					data: [41, 21, 38],
					backgroundColor: [
						'#66d18f',
						'#fe4848',
						'#808080'
					],
				}]
			};
    var pieOptions = {
				tooltips: {
						callbacks: {
						  label: function(tooltipItem, data) {
							var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
							var label = data.labels[tooltipItem.index];

							return label + ': ' + data.datasets[0].data[tooltipItem.index] + '%';
						  }
						}
					  },
				responsive:true,
				legend: { display: true, position: 'bottom' },
			};

    var scatterArray = [];
    var scatterNameArray = [];
    var scatterColorArray = [];

    var scatterDataArray = this.state.applications.map(function(data,i){
        scatterNameArray.push(data.applicationName)
        scatterArray.push({
          x:data.riskScore,
          y: (data.compliancyPercentage*100)
        })
        if(0 <= parseInt(data.riskScore) && 40 > parseInt(data.riskScore)){
          scatterColorArray.push('#66d18f')
        }
        if(40 <= parseInt(data.riskScore) && 80 > parseInt(data.riskScore)){
          scatterColorArray.push('#baf06b')
        }
        if(80 <= parseInt(data.riskScore) && 120 > parseInt(data.riskScore)){
          scatterColorArray.push('#ebf06b')
        }
        if(120 <= parseInt(data.riskScore) && 160 > parseInt(data.riskScore)){
          scatterColorArray.push('#ffa600')
        }
        if(160 <= parseInt(data.riskScore) && 200 >= parseInt(data.riskScore)){
          scatterColorArray.push('#fe4848')
        }

    },this);

    var scatterData = {
				labels:scatterNameArray,
				datasets: [{

					label:'Applications',
					borderColor:'#3080e8',
					pointColor:'#3080e8',
					data: scatterArray,
					pointRadius:5,
					pointBorderColor: "#ffffff",
					pointBackgroundColor:scatterColorArray


				}]
			};
    var scatterOptions = {
				tooltips: {
				   callbacks: {
					  label: function(tooltipItem, data) {
						 var label = data.labels[tooltipItem.index];
						 return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + '%)';
					  }
				   }
				},
				responsive:true,
				legend: { display: false, position: 'bottom' },
				scales: {
					xAxes:[{
						ticks:{
							beginAtZero: true,
							max:200,
						},
						scaleLabel:{
							display:true,
							labelString:'Risk Score'
						}
					}],
					yAxes:[{
						ticks: {
								beginAtZero: true,
								max:100,
								callback: function(label, index, labels) {
									return label + '%';
								}
							},
						scaleLabel:{
							display:true,
							labelString:'Compliancy Percentage'
						}
					}]
				}
			};

      var uploadPopup;
      if(this.state.uploadPopup){
        uploadPopup = <UploadPopup hidePopup={this.showUploadPopup.bind(this)} closePopup={this.closeUploadPopup.bind(this)} />
      }else{
        uploadPopup = null;
      }
    return (
      <div>
        <div className="main-stage">
        {uploadPopup}
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="side-nav">
                  <ul>
                    <li className="active">Applications</li>
                    <a href="img/excel/Application_Legend.xlsm">
                      <li>Source</li>
                    </a>
                  </ul>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="side-stage">
                  <div className="side-stage-top">
                    <div className="side-stage-title">Applications - Security Analysis</div>
                    <div className="add-new-project-btn" onClick={this.showUploadPopup.bind(this)}>Upload</div>
                  </div>
                  <div className="divider"/>
                  <div className="side-stage-top">
                    <div className="side-stage-title" style={{
                      fontSize: '15pt'
                    }}>Portfolio Visualization</div>
                    <div className="graph-selector">
                      <select className="application-selector" onChange={this.filterApplications.bind(this)} value={this.state.applicationTypeDropdown}>
                        <option value="All Applications">All Applications</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Cash Management">Cash Management</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Electronic Payments">Electronic Payments</option>
                        <option value="Executive">Executive</option>
                        <option value="International">International</option>
                        <option value="Management Information">Management Information</option>
                        <option value="Web">Web</option>
                        <option value="Banking">Banking</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                  </div>
                  <div className="graph-selector-tab">
                    <div onClick={() => this.changeTab('1')} className={activeClasses[0]? "graph-selector-tab-item active" : "graph-selector-tab-item"} id="graph-selector-1">Risk and Compliancy</div>
                    <div onClick={() => this.changeTab('2')} className={activeClasses[1]? "graph-selector-tab-item active" : "graph-selector-tab-item"} id="graph-selector-2">Risk vs Compliancy Analysis</div>
                  </div>
                    {
                      this.state.tab1
                      ? <div id="graph-group-1" className="graphs-outer">
                        <div className="graph-container" style={{
                          width: '50%',
                          float: 'left'
                        }}>
                          <div className="graph-title">Application Risk Category</div>
                          <Bar data={barData} options={barOptions}/>
                        </div>
                        <div className="graph-container">
                          <div className="graph-selector" style={{
                            top: 'auto',
                            bottom: '-35px',
                            width: '51%',
                            left: '50%',
                            transform: 'translateX(-50%)'
                          }}>
                            <select style={{
                              width: '100%'
                            }} className="compliancy-selector">
                              <option value={1}>All Controls</option>
                              <option value={2}>Authentication &amp; Identification (AN)</option>
                              <option value={3}>Authorization / Access Control (AZ)</option>
                            </select>
                          </div>
                          <div className="graph-title">Control Compliancy</div>
                          <Pie data={pieData} options={pieOptions}/>
                        </div>
                      </div>

                      : null
                    }
                  {
                    this.state.tab2
                    ? <div id="graph-group-2" className="graphs-outer">
                      <div className="graph-container" style={{
                        width: '100%',
                        float: 'left'
                      }}>
                        <div className="graph-title">Risk vs Compliancy Analysis</div>
                        <Scatter height={80} data={scatterData} options={scatterOptions} />
                      </div>
                    </div>
                    : null
                  }


                  <div className="divider" style={{
                    clear: 'both'
                  }}/>
                  <div className="side-stage-top">
                    <div className="side-stage-title" style={{
                      fontSize: '15pt',
                      width: '100%',
                      marginBottom: 15
                    }}>
                      <div style={{
                        float: 'left'
                      }}>Individual Applications</div>
                      <div style={{
                        float: 'right',
                        fontSize: '10pt',
                        marginTop: 5
                      }}>Profiled
                        <span>20</span>
                        of 23 Applications</div>
                    </div><br/>
                  </div>
                  {
                    this.state.filteredApplications.map(function(data, i){
                        return <ApplicationItem
                          applicationName = {data.applicationName}
                          riskScore={data.riskScore}
                          expiration={data.expiration}
                          seats={data.numberOfSeats}
                          compliancy={data.compliancyPercentage}
                          admin={data.adminName}
                          adminEmail={data.adminEmail}
                         key={i} />

                    },this)
                  }

                  <div style={{
                    height: 300
                  }}/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Applications;
