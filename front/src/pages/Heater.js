import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    FormGroup,
    Form,
    Col,
    Row,
    Label,
    Input,
    Alert,
} from 'reactstrap';

import {
    MdLightbulbOutline,
} from 'react-icons/md';

import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

import { getMaxTemp as getHeaterConfig, setMaxTemp } from '../requests/heater';

import Page from 'components/Page';
import Heater from '../styles/Heater.scss';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {            
            validerEtat: false,
            maxTemp: {
                day: 0,
                night: 0,
            }
        };

        getHeaterConfig().then((resp) => {
            this.setState({
                maxTemp: { 
                    day: resp.maxTemp.day,
                    night: resp.maxTemp.night,
                },
            });
        });
    }

    getTextFromState = (state) => {
        if(state) return 'allumée.';
        else return 'éteint.';
    }

    handleChangeMaxTempDay = data => {
        const { maxTemp } = this.state;    
        this.setState({maxTemp: {
            night: maxTemp.night,
            day: parseInt(data.target.value)
        }});
    }

    handleChangeMaxTempNight = data => {        
        const { maxTemp } = this.state;    
        this.setState({maxTemp: {
            day: maxTemp.day,
            night: parseInt(data.target.value)
        }});
    }

    handleSumbit = () => {
        setMaxTemp(this.state.maxTemp).then(() => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: `Modifications sauvegardées !`,
                level: 'success',
            });
        })
        .catch(e => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: `Erreur lors du changement de paramètres !`,
                level: 'error',
            });
        });
    }

    render() {
        const { validerMaxTemp, maxTemp } = this.state;
        return(
            <Page
                className="DashboardPage"
                title="Chauffage"
            >

                <NotificationSystem
                    dismissible={false}
                    ref={notificationSystem =>
                        (this.notificationSystem = notificationSystem)
                    }
                    style={NOTIFICATION_SYSTEM_STYLE}
                />
                
                <Row>
                    <Col xl={6} lg={12} md={12}>
                        {validerMaxTemp && (<Alert color="success">Modifications sauvergardées.</Alert>)}
                        <Card>
                            <CardHeader>Paramètres</CardHeader>
                            <CardBody>
                                <Form>                                
                                    <FormGroup>
                                        <Label for="exampleTime">Température max le jour</Label>
                                        <input
                                            className="input"
                                            type="number"
                                            value={ maxTemp.day }
                                            onChange={ this.handleChangeMaxTempDay }
                                            min={20}
                                            max={40}
                                        />
                                    </FormGroup>   
                                    <FormGroup>
                                        <Label for="exampleTime">Température max de nuit</Label>
                                        <input
                                            className="input"
                                            type="number"
                                            value={ maxTemp.night }
                                            onChange={ this.handleChangeMaxTempNight }
                                            min={10}
                                            max={30}
                                        />
                                    </FormGroup>                                   
                                </Form>
                            </CardBody>
                            <CardFooter className="d-flex">
                                <Button color="success" className="mr-0 ml-auto" onClick={this.handleSumbit}>Valider</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );

    }


}

export default Home;