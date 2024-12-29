import React, {Component} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import {FaLinkedin} from 'react-icons/fa';

import s from './NavBar.css';
import SearchBar from '../SearchBar';
import ProfileMenu from '../ProfileMenu';
import AnimatedButton from '../Buttons/AnimatedButton';
import {IApplicationState} from '../../types';
import {FaWallet} from 'react-icons/fa6';

interface NavBarState {
    active: boolean;
    border: boolean;
    visible: boolean;
}

const mapStateToProps = (state: IApplicationState) => ({
    user: state.auth.user,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type NavBarProps = PropsFromRedux;

class NavBar extends Component<NavBarProps, NavBarState> {
    state: NavBarState = {
        active: false,
        border: false,
        visible: false,
    };

    componentDidMount() {
        if (window.innerHeight > window.innerWidth) {
            document.getElementById('menu')?.addEventListener('click', this.handleMenuClick);
        }
    }

    handleMenuClick = () => {
        const container = document.getElementById('container');
        if (container?.classList.contains('NavBar__navActive___sBqdn')) {
            container.classList.remove('NavBar__navActive___sBqdn');
            this.setState({active: false});
            setTimeout(() => this.setState({border: false}), 900);
        } else {
            container?.classList.add('NavBar__navActive___sBqdn');
            this.setState({border: true, active: true});
        }
    };

    render() {
        const isDesktop = window.innerWidth > window.innerHeight;
        const isVault = window.location.pathname.includes('vault');
        const {user} = this.props;
        const edgeStyle = isVault || user ? s.shadow : s.border;

        return (
            <div
                className={`${s.headerContainer} ${edgeStyle}`}
                id='container'
                role='button'
                tabIndex={0}
                onClick={() => this.setState({visible: false})}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        this.setState({visible: false});
                    }
                }}>
                <Link to={user ? '/vault/files' : '/'} className={s.sticknetContainer}>
                    <p className={s.sticknet}>Sticknet</p>
                </Link>
                {isVault && <SearchBar />}
                {isDesktop ? (
                    isVault || user ? (
                        <ProfileMenu
                            visible={this.state.visible}
                            setVisible={(value: boolean) => this.setState({visible: value})}
                        />
                    ) : (
                        !user && (
                            <div className={s.headerRightContainer}>
                                <a className={s.headerLink} href={`${window.location.origin}#get-sticknet`}>
                                    <span>Get Sticknet</span>
                                </a>
                                <Link className={s.headerLink} to='/faq'>
                                    <span>FAQ</span>
                                </Link>
                                <Link className={s.headerLink} to='/support'>
                                    <span>Support</span>
                                </Link>
                                <Link className={s.headerLink} to='/premium'>
                                    <span>Pricing</span>
                                </Link>
                                {this.props.user ? (
                                    <ProfileMenu
                                        visible={this.state.visible}
                                        setVisible={(value: boolean) => this.setState({visible: value})}
                                    />
                                ) : (
                                    <AnimatedButton icon={<FaWallet color="#ffffff" size={18} />} text='Login' to='/portal-login' />
                                )}
                            </div>
                        )
                    )
                ) : (
                    <div className={s.menuIcon} id='menu' role='button' tabIndex={0} aria-label='Menu'>
                        <span className={`${s.menuIconLine} ${s.menuIconLineLeft}`} />
                        <span className={s.menuIconLine} />
                        <span className={`${s.menuIconLine} ${s.menuIconLineRight}`} />
                    </div>
                )}
                {!isDesktop && (
                    <div
                        className={s.menuContainer}
                        style={{
                            maxHeight: !this.state.active ? 0 : '60vh',
                            borderTop: this.state.border ? 'lightgrey 1px solid' : '',
                        }}
                        role='menu'
                        aria-label='Mobile Menu'>
                        <Link
                            onClick={this.handleMenuClick}
                            className={`${s.headerLink} ${s.headerLink1}`}
                            to='/premium'
                            tabIndex={0}
                            role='menuitem'>
                            <span>Pricing</span>
                        </Link>
                        <a
                            onClick={this.handleMenuClick}
                            className={`${s.headerLink}`}
                            href={`${window.location.origin}#get-sticknet`}
                            tabIndex={0}
                            role='menuitem'>
                            <span>Get Sticknet</span>
                        </a>
                        <Link
                            onClick={this.handleMenuClick}
                            className={s.headerLink}
                            to='/faq'
                            tabIndex={0}
                            role='menuitem'>
                            <span>FAQ</span>
                        </Link>
                        <Link
                            onClick={this.handleMenuClick}
                            className={s.headerLink}
                            to='/support'
                            tabIndex={0}
                            role='menuitem'>
                            <span>Support</span>
                        </Link>
                        <a
                            onClick={this.handleMenuClick}
                            className={s.headerLink}
                            target='_blank'
                            href='https://www.linkedin.com/company/sticknet/'
                            rel='noreferrer'
                            tabIndex={0}
                            role='menuitem'
                            aria-label='LinkedIn'>
                            <FaLinkedin className={s.icon} />
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

export default connector(NavBar);
