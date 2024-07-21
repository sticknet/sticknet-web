import React, {PureComponent, ReactNode} from 'react';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {NavBar, Footer, SideBar} from './components';
import CustomFormData from './actions/myaxios/CustomFormData';
import {app} from './actions';

interface AppProps extends RouteComponentProps {
    cancelMenus: () => void;
    children?: ReactNode;
}

class App extends PureComponent<AppProps> {
    componentDidMount() {
        window.FormData = CustomFormData;
    }

    render() {
        const {children, cancelMenus} = this.props;
        return (
            <div
                role='button'
                tabIndex={0}
                onClick={cancelMenus}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        cancelMenus();
                    }
                }}>
                <NavBar />
                {window.location.pathname.includes('vault') && <SideBar />}
                <div>{children}</div>
                {!window.location.pathname.includes('vault') && <Footer />}
            </div>
        );
    }
}

export default connect(null, {...app})(withRouter(App));
