import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IoIosHelpCircleOutline} from 'react-icons/io';
import {AiOutlineInfoCircle, AiOutlinePoweroff} from 'react-icons/ai';
import {useHistory} from 'react-router-dom';
import {GrDiamond} from 'react-icons/gr';
import {BiSolidBadgeCheck} from 'react-icons/bi';
import {FaVault} from 'react-icons/fa6';
import {useDisconnect} from 'wagmi';
import SettingsItem from '../../SettingsItem';
import s from './style.css';
import {auth, iap} from '../../../actions';
import {colors} from '../../../foundations';
import {IApplicationState} from '../../../types';

interface SettingsMenuProps extends PropsFromRedux {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface SettingItem {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
}

const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
    const history = useHistory();
    const {disconnect} = useDisconnect();
    const actions: SettingItem[] = [
        {
            text: 'My Vault',
            icon: <FaVault color='#0F0F28' />,
            onClick: () => {
                props.setVisible(false);
                history.push('/vault/files');
            },
        },
        {
            text: 'Support',
            icon: <IoIosHelpCircleOutline color='#0F0F28' />,
            onClick: () => {
                props.setVisible(false);
                history.push('/support');
            },
        },
        {
            text: 'Sticknet Premium',
            icon: <GrDiamond color='#0F0F28' />,
            onClick: () => {
                props.setVisible(false);
                history.push('/premium');
            },
        },
        {
            text: 'Log Out',
            icon: <AiOutlinePoweroff color='#0F0F28' />,
            onClick: async () => {
                await disconnect();
                props.logout(() => {
                    props.setVisible(false);
                    history.push('/');
                });
            },
        },
    ];

    if (!props.visible) return null;

    return (
        <div
            className={s.menuContainer}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                }
            }}
            role='button'
            tabIndex={0}>
            <div className={s.infoContainer}>
                <div className={s.nameContainer}>
                    <p className={s.name}>{props.user?.name}</p>
                    {!props.isBasic && <BiSolidBadgeCheck style={{marginLeft: 4}} size={20} color={colors.primary} />}
                </div>
                <p className={s.email}>
                    Username: <b>@{props.user?.username}</b>
                </p>
                <p className={s.email}>
                    Email: <b>{props.user?.email}</b>
                </p>
            </div>
            {actions.map((item) => (
                <SettingsItem
                    key={item.text}
                    icon={item.icon}
                    text={item.text}
                    onClick={item.onClick}
                    danger={item.danger}
                />
            ))}
            <div className={s.noteContainer}>
                <AiOutlineInfoCircle color='#8d8d8d' size={14} />
                <p className={s.note}>You can access your network, chats, and profile from a mobile device.</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    user: state.auth.user,
    isBasic: !state.auth.user || state.auth.user.subscription === 'basic',
});

const connector = connect(mapStateToProps, {...auth, ...iap});
export default connector(SettingsMenu);
