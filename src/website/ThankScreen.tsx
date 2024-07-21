import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import s from './css/QuestionScreen.css';
import gs from '../global.css';

type ThankScreenProps = RouteComponentProps;

class ThankScreen extends Component<ThankScreenProps> {
    componentDidMount() {
        document.title = 'Sticknet | Thank You';
        window.scrollTo(0, 0);
    }

    render() {
        const isDesktop = window.innerWidth > window.innerHeight;
        return (
            <div
                className={gs.main}
                style={{
                    height: isDesktop ? '70vh' : '60vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <div className={gs.screenContainer}>
                    <h1 className={s.headerTitle}>Thank You!</h1>
                    <p className={s.thank}>
                        Thank you for contacting us. We will review your query and get back to you as soon as possible.
                    </p>
                    <button type='submit' onClick={() => this.props.history.push('/')}>
                        <p className={s.send}>Done</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(ThankScreen);
