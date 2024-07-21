import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import s from './css/QuestionScreen.css';
import gs from '../global.css';
import {IApplicationState} from '../types';

interface State {
    email: string;
    text: string;
    sending: boolean;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux, RouteComponentProps {}

class QuestionScreen extends Component<Props, State> {
    state: State = {
        email: '',
        text: '',
        sending: false,
    };

    componentDidMount() {
        document.title = 'Sticknet | Ask a Question';
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
                .catch((err) => console.warn('err', err.response.data));
        }
    };

    render() {
        const {sending} = this.state;
        return (
            <div className={gs.main}>
                <div className={`${gs.screenContainer} ${gs.centerScreen}`}>
                    <h1 className={s.headerTitle}>Ask a Question</h1>
                    <p className={s.have}>
                        Have a question? Make sure to check out our{' '}
                        <Link className={s.link} to='/faq'>
                            FAQ
                        </Link>
                        . You can also send us your question below and we will get back to you as soon as possible, or
                        send an email to support@sticknet.org.
                    </p>
                    <p className={s.contact}>Your contact Email that we can get back to you at</p>
                    <input
                        type='text'
                        className={s.emailInput}
                        placeholder='Your email'
                        defaultValue={this.props.user ? this.props.user.email : ''}
                        onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <textarea
                        className={s.input}
                        placeholder='Leave your question here...'
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

const mapStateToProps = (state: IApplicationState) => ({
    user: state.auth.user,
});

const connector = connect(mapStateToProps);

export default connector(QuestionScreen);
