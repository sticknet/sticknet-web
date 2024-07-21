import React, {useState, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {getInitials} from '../../utils';
import s from './style.css';
import SettingsMenu from './SettingsMenu';
import {app} from '../../actions';
import {IApplicationState} from '../../types'; // Adjust the import path as necessary

interface ProfileMenuProps extends PropsFromRedux {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
type PropsFromRedux = ConnectedProps<typeof connector>;

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
    const [retried, setRetried] = useState(false);
    const {visible, setVisible} = props;
    const profilePicture = props.user ? props.user.profilePicture : null;

    useEffect(() => {
        if (profilePicture && !props.uri) {
            props.cacheProfilePicture(profilePicture);
        }
    }, []);

    useEffect(() => {
        setVisible(false);
    }, [props.cancelMenus]);

    const handleError = () => {
        if (retried) return;
        setRetried(true);
        props.cacheProfilePicture(profilePicture);
    };

    if (!props.user) return <div />;

    return (
        <div className={s.container}>
            <button
                type='button'
                className={s.circle}
                onClick={(e) => {
                    e.stopPropagation();
                    setVisible(!visible);
                }}>
                {profilePicture && props.uri ? (
                    <img src={props.uri} className={s.imageFile} onError={handleError} />
                ) : (
                    <p className={s.name}>{getInitials(props.user.name!)}</p>
                )}
                <SettingsMenu visible={visible} setVisible={setVisible} />
            </button>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    user: state.auth.user,
    isBasic: !state.auth.user || state.auth.user.subscription === 'basic',
    cancelMenus: state.appTemp.cancelMenus,
    uri: state.app.profilePictureUri,
});

const connector = connect(mapStateToProps, {...app});
export default connector(ProfileMenu);
