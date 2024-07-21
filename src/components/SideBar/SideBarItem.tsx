import React from 'react';
import {Link} from 'react-router-dom';
import s from './style.css';
import gs from '../../global.css';

interface SideBarItemProps {
    icon: React.ReactNode;
    title: string;
    activeItem: string;
    linkTo: string;
    setActiveItem: (item: string) => void;
}

const SideBarItem: React.FC<SideBarItemProps> = ({icon, title, activeItem, linkTo, setActiveItem}) => {
    const focused = activeItem === linkTo;
    const color = focused ? gs.primaryColor : gs.greyColor;

    return (
        <Link
            onClick={() => setActiveItem(linkTo)}
            to={`/vault/${linkTo}`}
            className={s.itemContainer}
            style={{backgroundColor: focused ? 'rgba(0,0,0,0.03)' : undefined}}>
            {icon}
            <p className={`${s.title} ${color}`} style={{fontWeight: focused ? 'bold' : undefined}}>
                {title}
            </p>
        </Link>
    );
};

export default SideBarItem;
