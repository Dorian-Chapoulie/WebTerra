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

import { lightOn, lightOff, lightState, setLightDate, getLightDate } from '../requests/Light';

import Page from 'components/Page';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validerPlageHorraire: false,
            validerEtat: {
                show: false,
                text: '',
            },
            lightState: false,
            date: {
                dateOn: '00:00',
                dateOff: '00:00',
            },
        };

        getLightDate().then((resp) => {
            this.setState({
                date: { 
                    dateOn: `${resp.date.dateOn.hour}:${resp.date.dateOn.minutes}`,
                    dateOff: `${resp.date.dateOff.hour}:${resp.date.dateOff.minutes}`,
                },
            });
        });
    }

    handleClickPlageHorraire = () => {
        const { validerPlageHorraire, date } = this.state; 
        this.setState({validerPlageHorraire: false});      
        setLightDate(date).then(() => {
            this.setState({validerPlageHorraire: !validerPlageHorraire});
            setTimeout(() => {
                this.setState({validerPlageHorraire: false});  
            }, 2000);
            getLightDate().then((resp) => {
                this.setState({
                    date: { 
                        dateOn: `${resp.date.dateOn.hour}:${resp.date.dateOn.minutes}`,
                        dateOff: `${resp.date.dateOff.hour}:${resp.date.dateOff.minutes}`,
                    },
                });
            });
        }).catch (error => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: 'Erreur lors du changement de la plage horraire !',
                level: 'error',
            });
        }); 
    }

    getTextFromState = (state) => {
        if(state) return 'allumée.';
        else return 'éteinte.';
    }

    getLightState = () => {
        return lightState().then(resp => {
            this.setState({lightState: resp.state});
            this.setState({validerEtat: {
                show: true,
                text: this.getTextFromState(resp.state),
            }});
        })
    }

    invalidateNotificationState = () => {
        this.setState({validerEtat: {
            show: false,
            text: '',
        }});
    }

    handleClickOn = () => {
        this.invalidateNotificationState();
        
        lightOn().then(() => this.getLightState()).then(() => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: `La lumière est maintenant ${this.state.validerEtat.text}`,
                level: 'success',
            });
        })
        .catch (error => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: 'Erreur lors du changement d\'état de la lumière !',
                level: 'error',
            });
        }); 
    }

    handleClickOff = () => {
        this.invalidateNotificationState();  
        lightOff().then(() => this.getLightState()).then(() => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: `La lumière est maintenant ${this.state.validerEtat.text}`,
                level: 'success',
            });
        })
        .catch (error => {
            this.notificationSystem.addNotification({
                title: <MdLightbulbOutline />,
                message: 'Erreur lors du changement d\'état de la lumière !',
                level: 'error',
            });
        }); 
    }

    hanldeDateOnChange = (e) => {
        const { date } = this.state;
        const temp = date;
        temp.dateOn = e.target.value;
        this.setState({date: temp});        
    }
    
    hanldeDateOffChange = (e) => {
        const { date } = this.state;
        const temp = date;
        temp.dateOff = e.target.value;
        this.setState({date: temp});        
    }

    render() {
        const { validerPlageHorraire, validerEtat, date } = this.state;
        return(
            <Page
                className="DashboardPage"
                title="Lumière"
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
                        {validerPlageHorraire && (<Alert color="success">Modifications sauvergardées.</Alert>)}
                        <Card>
                            <CardHeader>Plage horaire</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleTime">Heure d'allumage</Label>
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            value={date.dateOn}
                                            onChange={this.hanldeDateOnChange}
                                        />
                                    </FormGroup>   
                                    <FormGroup>
                                        <Label for="exampleTime">Heure d'extinction</Label>
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            value={date.dateOff}
                                            onChange={this.hanldeDateOffChange}
                                        />
                                    </FormGroup>                                   
                                </Form>
                            </CardBody>
                            <CardFooter className="d-flex">
                                <Button color="success" className="mr-0 ml-auto" onClick={this.handleClickPlageHorraire}>Valider</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xl={3} lg={12} md={12}>
                        {validerEtat.show && (<Alert color="success">La lumière est maintenant <strong>{validerEtat.text}</strong></Alert>)}
                        <Card>
                            <CardHeader>État</CardHeader>
                            <CardBody className="d-flex">
                                <Button color="success" size="lg" className="ml-4" onClick={this.handleClickOn}>
                                    Allumer
                                </Button>      
                                <Button color="danger" size="lg" className="mr-4 ml-auto" onClick={this.handleClickOff}>
                                    Éteindre
                                </Button>               
                            </CardBody>                            
                        </Card>
                    </Col>
                </Row>
            </Page>
        );

    }


}

export default Home;