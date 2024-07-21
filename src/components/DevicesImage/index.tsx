import React, {FC} from 'react';
import * as images from '../../website/images';
import s from '../style.css';

const DevicesImage: FC = () => {
    return (
        <div>
            <img src={images.iphone} className={s.iphone} alt='iPhone' />
            <img src={images.android} className={s.android} alt='Android' />
        </div>
    );
};

export default DevicesImage;
