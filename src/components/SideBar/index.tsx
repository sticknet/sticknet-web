import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {IoShieldCheckmark} from 'react-icons/io5';
import {LiaStickyNoteSolid} from 'react-icons/lia';
import {FaVault} from 'react-icons/fa6';
import {PiImages} from 'react-icons/pi';
import {LuFiles} from 'react-icons/lu';
import SideBarItem from './SideBarItem';

import s from './style.css';
import gs from '../../global.css';
import ProgressBar from '../ProgressBar';
import AnimatedButton from '../Buttons/AnimatedButton';
import {IApplicationState} from '../../types';

type SideBarProps = PropsFromRedux;

const SideBar: React.FC<SideBarProps> = (props) => {
    const history = useHistory();
    const [activeItem, setActiveItem] = useState<string>('files');

    useEffect(() => {
        const unlisten = history.listen((location) => {
            const tab = location.pathname?.split('/').filter((item) => item !== '')[1];
            setActiveItem(tab);
        });
        return () => unlisten();
    }, [history]);

    useEffect(() => {
        const tab = window.location.pathname?.split('/').filter((item) => item !== '')[1];
        setActiveItem(tab);
    }, []);

    const oneGb = 1073741824;
    const max = props.isBasic ? oneGb : oneGb * 2000;
    const progress = props.vaultStorage! / max;
    const vaultStorage = props.vaultStorage! / oneGb;
    const maxCount = props.isBasic ? 1 : 2000;

    return (
        <div className={s.container}>
            <div className={`${s.itemContainer} ${s.headerContainer}`}>
                <FaVault fontSize={25} className={gs.silverColor} />
                <p className={`${s.title} ${s.headerTitle}`}>My Vault</p>
            </div>
            <SideBarItem
                setActiveItem={setActiveItem}
                icon={<LuFiles size={20} className={activeItem === 'files' ? gs.primaryColor : gs.greyColor} />}
                title='Files'
                linkTo='files'
                activeItem={activeItem}
            />
            <SideBarItem
                setActiveItem={setActiveItem}
                icon={<PiImages size={22} className={activeItem === 'photos' ? gs.primaryColor : gs.greyColor} />}
                title='Photos'
                linkTo='photos'
                activeItem={activeItem}
            />
            <SideBarItem
                setActiveItem={setActiveItem}
                icon={
                    <LiaStickyNoteSolid size={20} className={activeItem === 'notes' ? gs.primaryColor : gs.greyColor} />
                }
                title='Notes'
                linkTo='notes'
                activeItem={activeItem}
            />
            <div className={s.storageContainer}>
                <p className={s.storageText}>Storage ({(progress * 100).toFixed(2)}% full)</p>
                <ProgressBar progress={progress} />
                <p className={s.storageText}>
                    {vaultStorage.toFixed(2)} GB of {maxCount} GB used
                </p>
                <div className={s.shieldText} style={{marginTop: 16}}>
                    <IoShieldCheckmark color='#34A853' size={20} style={{marginRight: 8}} />
                    End-to-end encrypted
                </div>
                <div className={s.shieldText} style={{marginBottom: 16}}>
                    <IoShieldCheckmark color='#34A853' size={20} style={{marginRight: 8}} />
                    Decentralized storage
                </div>
                {props.isBasic && <AnimatedButton text='Upgrade' to='/premium' style={s.upgradeButton} />}
            </div>
        </div>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    vaultStorage: state.auth.user ? state.auth.user.vaultStorage : 0,
    isBasic: !state.auth.user || state.auth.user.subscription === 'basic',
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SideBar);
