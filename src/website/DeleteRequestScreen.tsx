import React, {Component} from 'react';
import axios from 'axios';
import {RouteComponentProps} from 'react-router-dom';

import s from './css/QuestionScreen.css';
import gs from '../global.css';

interface DeleteRequestScreenState {
    email: string;
    text: string;
    sending: boolean;
}

type DeleteRequestScreenProps = RouteComponentProps;

class DeleteRequestScreen extends Component<DeleteRequestScreenProps, DeleteRequestScreenState> {
    state: DeleteRequestScreenState = {
        email: '',
        text: '',
        sending: false,
    };

    componentDidMount() {
        document.title = 'Sticknet | Account Deletion Request';
        window.scrollTo(0, 0);
    }

    send = () => {
        const {email, text} = this.state;
        if (email.includes('@') && text !== '') {
            this.setState({sending: true});
            axios
                .post('/api/ask-question/', {
                    email,
                    text,
                    anonymous: true,
                })
                .then(() => {
                    this.props.history.push('/thank-you');
                })
                .catch((err) => console.warn('err', err.response.data))
                .finally(() => this.setState({sending: false}));
        }
    };

    render() {
        const {sending} = this.state;
        return (
            <div className={gs.main}>
                <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                    <h1 className={s.headerTitle}>Account Deletion Request</h1>
                    <p className={s.have} style={{textAlign: 'left'}}>
                        Want to delete your Sticknet account? You can do so in-app through: <br />
                        <span style={{marginTop: 12}}>
                            Profile {' > '} Account {' > '} More options {' > '} Delete account
                        </span>
                        <span style={{marginTop: 12}}>
                            Alternatively, you can submit a request to delete your account below. If you wish to delete
                            all or some of your account's data without deleting your whole account let us know. We will
                            get back to you within 24 hours to guide you through the steps.
                        </span>
                        <span style={{marginTop: 12}}>
                            Note: Deleting your whole account will delete all of its associated data immediately.
                        </span>
                    </p>
                    <p className={s.contact}>Your email associated with your Sticknet account</p>
                    <input
                        type='text'
                        className={s.emailInput}
                        placeholder='Your email'
                        onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <textarea
                        className={s.input}
                        placeholder='Leave your request here.'
                        onChange={(e) => this.setState({text: e.target.value})}
                    />
                    <button type='submit' onClick={this.send} style={{display: !sending ? 'block' : 'none'}}>
                        <p className={s.send}>SEND</p>
                    </button>

                    <div className={s.loader} style={{display: sending ? 'block' : 'none'}} />
                </div>
            </div>
        );
    }
}

export default DeleteRequestScreen;
