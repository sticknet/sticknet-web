import React, {useEffect, useState, ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {AiOutlineSearch} from 'react-icons/ai';
import {IoClose} from 'react-icons/io5';
import {useHistory} from 'react-router-dom';
import s from './style.css';
import {vault} from '../../actions';
import {API} from '../../actions/URL';

const mapDispatchToProps = {
    ...vault,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type SearchBarProps = PropsFromRedux;

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const [text, setText] = useState<string>('');
    const history = useHistory();

    const handleKeydown = (event: KeyboardEvent) => {
        if (text === '') return;
        if (event.key === 'Enter') {
            history.push('/vault/files');
            props.searchItems(`${API}/api/search-files/?q=${text}&limit=15`, true);
        }
    };

    useEffect(() => {
        const keydownListener = (event: globalThis.KeyboardEvent) => handleKeydown(event as KeyboardEvent);
        document.addEventListener('keydown', keydownListener);
        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, [text]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div className={s.container}>
            <AiOutlineSearch color='grey' size={20} />
            <input value={text} className={s.input} placeholder='Search files...' onChange={onChange} />
            <IoClose onClick={() => setText('')} color={text === '' ? '#f3f3f3' : 'grey'} size={20} />
        </div>
    );
};

export default connector(SearchBar);
