import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    CardImg,
    CardText,
    Row,  
    Dropdown,
    DropdownToggle, 
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'; 

import {  lightState as getLightState } from '../requests/Light';
import { fanState as getFanState } from '../requests/Fan';
import { getTemp, getHumidity, getData } from '../requests/dht';
import { getState as getHeaterState, getMaxTemp } from '../requests/heater';

import Page from 'components/Page';

import bg1Image from 'assets/img/bg/bg_light.svg';
import heater from 'assets/img/bg/bg_heater.png';
import humidity from 'assets/img/bg/bg_humidity.png';
import fan from 'assets/img/bg/bg_fan.png';

  
class Home extends React.Component {
    constructor(props) {
        super(props);
        const requestsInterval = 1000;

        this.state = {
            fanState: false,
            lightState: false,
            temperature: 0,
            hum: 0,            
            heaterState: false,
            maxTemp: {
                day: 0,
                night: 0
            },
            dhtOptions: {
                responsive: true,
                legend: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest',
                },
                hover: {
                    mode: 'index',
                },
                scales: {
                    xAxes: [
                    {
                        gridLines: {
                            display: false,
                        },
                    },
                    ],
                    yAxes: [
                    {
                        stacked: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value',
                        },
                        gridLines: {
                            display: false,
                        },
                    },
                    ],
                },
            },
            dhtGraph: {
                labels: [], //Y names
                datasets: [],
            },
            isDropDownOpen: false,
        };
        
        this.dropDownValue = {
            DAY: '1',
            WEEK: '2',
            MONTH: '3',
            ALL: '4',
        };

        this.requestHistory(48);

        setInterval(() => {
            this.requestHistory(48);
        }, 1000 * 60 * 30);        

        setInterval(() => {
            getLightState().then((resp) => {        
                this.setState({
                    lightState: resp.state,
                });
            }); 
    
            getFanState().then((resp) => {        
                this.setState({
                    fanState: resp.state,
                });
            }); 
    
            getTemp().then((resp) => {        
                this.setState({
                    temperature: resp.temp,
                });
            });
            
            getHumidity().then((resp) => {        
                this.setState({
                    hum: resp.humidity,
                });
            }); 

            getHumidity().then((resp) => {        
                this.setState({
                    hum: resp.humidity,
                });
            }); 

            getHeaterState().then((resp) => {        
                this.setState({
                    heaterState: resp.state,
                });
            }); 

            getMaxTemp().then((resp) => {        
                this.setState({
                    maxTemp: resp.maxTemp,
                });
            }); 

        }, requestsInterval);        

   }
    
    requestHistory(limit) {
        getData(limit).then(resp => {
            const labels = [];            
            const temps = {
                label: 'Température',
                borderColor: '#CB634B',
                backgroundColor: '#FF4B21',
                data: [],
            };
            const humidity = {
                label: 'Humidité',
                borderColor: '#2CB7D6',
                backgroundColor: '#2CC2D6',
                data: [],
            };

            resp.data.forEach(data => {
                const date = new Date(data.date);
                const hour = date.getHours() === 0 ? '00' : date.getHours().toString();
                labels.push(hour + ':' + date.getMinutes().toString());
                temps.data.push(data.temperature);
                humidity.data.push(data.humidity);      
            });    
                        
            this.setState({
                dhtGraph: {
                    labels,
                    datasets: [
                        temps,
                        humidity,
                    ],
                },
            });
        });
    }

    toggleDropDown = (e) => {        
        const { isDropDownOpen } = this.state;
        this.setState({isDropDownOpen: !isDropDownOpen});
    }

    clearGraph() {
        this.setState({
            dhtGraph:{},
        });
    }

    setRequestDropDown = (e) => {        
        this.clearGraph();
        switch(e.target.value) {
            case this.dropDownValue.DAY:
                this.requestHistory(48);
                break;
            case this.dropDownValue.WEEK:
                this.requestHistory(48 * 7);
                break;
            case this.dropDownValue.MONTH:
                this.requestHistory(48 * 7 * 4);
                break;
            case this.dropDownValue.ALL:
                this.requestHistory(0);
                break;
            default:
                this.requestHistory(0);
                break;
        };
    }

    render() {
        const { fanState, lightState, temperature, hum, maxTemp, heaterState, dhtGraph, dhtOptions, isDropDownOpen } = this.state;
        return(
            <Page
                className="DashboardPage"
                title="Menu"
            >
                <Row>
                    <Col lg="7" md="12" sm="12" xs="12">
                    <Card>
                        <CardHeader>
                            <p>Graphique température / hygrométrie</p>

                            <Dropdown isOpen={isDropDownOpen} toggle={this.toggleDropDown} direction={'right'} size='sm'>
                            <DropdownToggle caret>
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem value={this.dropDownValue.DAY} onClick={this.setRequestDropDown}>Jour</DropdownItem>
                                <DropdownItem value={this.dropDownValue.WEEK} onClick={this.setRequestDropDown}>Semaine</DropdownItem>
                                <DropdownItem value={this.dropDownValue.MONTH} onClick={this.setRequestDropDown}>Mois</DropdownItem>
                                <DropdownItem value={this.dropDownValue.ALL} onClick={this.setRequestDropDown}>Tout</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>                            
                        </CardHeader>
                        <CardBody>
                        <Line data={dhtGraph} options={dhtOptions} />
                        </CardBody>
                    </Card>
                    </Col>
            
                    <Col  className="mb-3">
                        <Card className="flex-row mb-5"> 
                            <CardImg
                                className="card-img-left p-2"
                                src={bg1Image}
                                style={{ width: 'auto', height: 150 }}
                            />
                            <CardBody>
                                <CardTitle>Statut:</CardTitle>
                                <CardText>
                                    La lumière est acuellement <strong>{lightState ? 'Allumé' : 'Éteinte'}</strong>
                                </CardText>
                            </CardBody>
                        </Card>
                    
                        <Card className="flex-row mb-5"> 
                            <CardImg
                                className="card-img-left p-2"
                                src={fan}
                                style={{ width: 'auto', height: 150 }}
                            />
                            <CardBody>
                                <CardTitle>Statut:</CardTitle>
                                <CardText>
                                    Le ventilateur est acuellement <strong>{fanState ? 'Allumé' : 'Éteint'}</strong>
                                </CardText>
                            </CardBody>
                        </Card>
                  
                        <Card className="flex-row mb-5">
                            <CardImg
                                className="card-img-left p-2"
                                src={heater}
                                style={{ width: 'auto', height: 150 }}
                            />
                            <CardBody>
                                <CardTitle>Statut: <strong>{heaterState ? 'Allumé' : 'Éteint'}</strong></CardTitle>
                                <CardText>
                                    Température <strong>{temperature}°</strong>
                                </CardText>
                                <CardText>
                                    Température maximum le jour <strong>{maxTemp.day}°</strong>
                                </CardText>
                                <CardText>
                                    Température maximum la nuit <strong>{maxTemp.night}°</strong>
                                </CardText>
                            </CardBody>
                        </Card>

                        <Card className="flex-row">
                            <CardImg
                                className="card-img-left p-2"
                                src={humidity}
                                style={{ width: 'auto', height: 150 }}
                            />
                            <CardBody>
                                <CardTitle>Statut:</CardTitle>
                                <CardText>
                                    Humidité <strong>{hum}%</strong>
                                </CardText>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Page>
        );

    }


}

export default Home;