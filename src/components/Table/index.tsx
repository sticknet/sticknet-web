import React from 'react';
import {IoClose} from 'react-icons/io5';
import {FaCheck} from 'react-icons/fa6';
import s from './style.css';
import {colors} from '../../foundations';

function findBackgroundColor(item: string): string {
    switch (item) {
        case 'no':
            return 'rgba(255,0,0,0.1)';
        case 'yes':
            return 'rgba(0,255,0,0.1)';
        case 'limited':
        case 'external':
            return 'rgba(255,192,0,0.1)';
        case '$8.99':
            return 'rgba(96,96,255,0.1)';
        default:
            return 'rgba(0,0,0,0.1)';
    }
}

const Table: React.FC = () => {
    const isDesktop = window.innerWidth > window.innerHeight;
    const tableData: string[][] = [
        ['', 'Dropbox', 'iCloud', 'G-Drive', 'Sticknet'],
        ['End-to-end encrypted', 'no', 'limited', 'no', 'yes'],
        ['Decentralized storage', 'no', 'no', 'no', 'yes'],
        ['Integrated social network', 'no', 'no', 'no', 'yes'],
        ['Integrated messenger', 'no', 'external', 'no', 'yes'],
    ];

    return (
        <table border={1}>
            <thead>
                <tr>
                    {tableData[0].map((header, index) => (
                        <th
                            key={index}
                            style={{
                                textAlign: 'center',
                                color: header === 'Sticknet' ? colors.primary : '#000',
                                fontFamily: header === 'Sticknet' ? 'Sirin Stencil' : undefined,
                                fontSize:
                                    header === 'Sticknet' ? (isDesktop ? '1.2vw' : '5vw') : isDesktop ? '1vw' : '4.5vw',
                            }}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <th>{row[0]}</th>
                        {row.slice(1).map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                <div className={s.cell} style={{backgroundColor: findBackgroundColor(cell)}}>
                                    {cell === 'no' ? (
                                        <IoClose color='red' size={20} />
                                    ) : cell === 'yes' ? (
                                        <FaCheck color={colors.success} size={20} />
                                    ) : (
                                        <span
                                            style={{
                                                color:
                                                    cell === 'external' || cell === 'limited'
                                                        ? 'rgb(255,128,0)'
                                                        : cell === '$8.99'
                                                        ? 'rgba(96,96,255)'
                                                        : 'grey',
                                            }}>
                                            {cell}
                                        </span>
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
