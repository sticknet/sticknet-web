import React, {FC} from 'react';
import {FaVault, FaCloud} from 'react-icons/fa6';
import {colors} from '../../foundations';

const CloudVaultIcon: FC = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <FaCloud size={30} color={colors.black} />
            <FaVault size={12} color='#ffffff' style={{position: 'absolute', marginTop: 4}} />
        </div>
    );
};

export default CloudVaultIcon;
