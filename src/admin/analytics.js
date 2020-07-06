import React, {Component} from 'react';
import {getolx, getpkm, getpkw} from "./apiReport";
import DonutChart from 'react-donut-chart';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
class Analytics extends Component {
    state = {
        startDate: new Date(),
        olxweekly : [],
        olxdaily:[],
        olxmontly: [],
        pkmweekly : [],
        pkmdaily:[],
        pkmmontly: [],
        pkwweekly : [],
        pkwdaily:[],
        pkwmontly: [],
    };
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    componentDidMount() {
        getolx(7).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({olxweekly:data})
        });

        getolx(1).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({olxdaily:data})
        });
        getolx(30).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({olxmontly:data})
        })

        getpkw(7).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkwweekly:data})
        });

        getpkw(1).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkwdaily:data})
        });
        getpkw(30).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkwmontly:data})
        })

        getpkm(7).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkmweekly:data})
        });

        getpkm(1).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkmdaily:data})
        });
        getpkm(30).then(data=>{
            if(data.error){
                console.log("error");
            }
            this.setState({pkmmontly:data})
        })
    }

    render() {
        return (
            <div className={"container mt-3"}>
                <h3>Analytics</h3>
                <hr/>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                <div className={"row"}>
                    <h4>Daily Insights</h4>

                    <div className={"col-sm-4 mt-3"}>
                        <DonutChart
                            colors = {[
                                '#2a65ea', '#3eb549', '#ef8e00'
                            ]}
                            height={500}
                            data={[
                                {
                                label: 'olx',
                                value: this.state.olxdaily.length,

                            },
                                {
                                    label: 'pakweels',
                                    value: this.state.pkwdaily.length,

                                },
                                {
                                    label: 'pkmotors',
                                    value: this.state.pkmdaily.length,

                                }]}

                        />
                    </div>


                </div>
                <div className={"row"}>
                    <h4>Weekly Insights</h4>

                    <div className={"col-sm-4 mt-3"}>
                        <DonutChart
                            colors = {[
                                '#2a65ea', '#3eb549', '#ef8e00'
                            ]}
                            height={500}
                            data={[
                                {
                                    label: 'olx',
                                    value: this.state.olxweekly.length,

                                },
                                {
                                    label: 'pakweels',
                                    value: this.state.pkwweekly.length,

                                },
                                {
                                    label: 'pkmotors',
                                    value: this.state.pkmweekly.length,

                                }]}

                        />
                    </div>


                </div>
                <div className={"row"}>
                    <h4>Monthly Insights</h4>

                    <div className={"col-sm-4 mt-3"}>
                        <DonutChart
                            colors = {[
                                '#2a65ea', '#3eb549', '#ef8e00'
                            ]}
                            height={500}
                            data={[
                                {
                                    label: 'olx',
                                    value: this.state.olxmontly.length,

                                },
                                {
                                    label: 'pakweels',
                                    value: this.state.pkwmontly.length,

                                },
                                {
                                    label: 'pkmotors',
                                    value: this.state.pkmmontly.length,

                                }]}

                        />
                    </div>


                </div>

            </div>
        );
    }
}

export default Analytics;