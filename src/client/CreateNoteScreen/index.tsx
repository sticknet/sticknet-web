import React, {useState, useEffect, MouseEvent, ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {MdDone, MdClose} from 'react-icons/md';
import {IoChevronBack} from 'react-icons/io5';
import {useHistory} from 'react-router-dom';
import gs from '../../global.css';
import s from './style.css';
import {ActionButton} from '../../components';
import {vault} from '../../actions';
import {handleLinks} from '../../utils';
import {TVaultNote} from '../../types';

interface ParsedTextProps {
    text: string;
}

const ParsedText: React.FC<ParsedTextProps> = ({text}) => {
    useEffect(() => {
        handleLinks('note');
    }, []);
    return (
        <p className={`${s.input} ${s.parsedText}`} id='note'>
            {text}
        </p>
    );
};

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ICreateNoteScreenProps extends PropsFromRedux {
    location: any;
}

const CreateNoteScreen: React.FC<ICreateNoteScreenProps> = ({location, createVaultNote, updateVaultNote}) => {
    const [currentNote, setCurrentNote] = useState<TVaultNote>(location.state?.note || ({} as TVaultNote));
    const [text, setText] = useState<string>(currentNote.text || '');
    const [initialText, setInitialText] = useState<string>(text);
    const [editing, setEditing] = useState<boolean>(!currentNote.id);
    const history = useHistory();

    useEffect(() => {
        const input = document.getElementById('textarea') as HTMLTextAreaElement | null;
        if (input) {
            input.selectionStart = text.length;
            input.selectionEnd = text.length;
        }
    }, [editing]);

    const handleSaveOrBackClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (editing) {
            if (text !== initialText) {
                setInitialText(text);
                if (currentNote.id) {
                    updateVaultNote({note: currentNote, text});
                } else {
                    createVaultNote(text, (note: TVaultNote) => setCurrentNote(note));
                }
            }
            setEditing(false);
        } else {
            history.push('/vault/notes');
        }
    };

    const handleCancelClick = () => {
        history.push('/vault/notes');
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <div className={gs.vaultMain}>
            <div className={gs.vaultScreenContainer}>
                <div className={s.stackContainer}>
                    <div className={s.stackItem}>
                        <button type='button' className={s.stackItemTitle}>
                            Notes
                        </button>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <ActionButton
                        onClick={handleSaveOrBackClick}
                        text={editing ? 'Save' : 'Back'}
                        icon={editing ? <MdDone fontSize={20} /> : <IoChevronBack fontSize={20} />}
                    />
                    {editing && (
                        <ActionButton
                            onClick={handleCancelClick}
                            style={{marginLeft: 12}}
                            text='Cancel'
                            icon={<MdClose fontSize={20} />}
                        />
                    )}
                </div>
                <div
                    onClick={handleEditClick}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleEditClick();
                        }
                    }}
                    role='button'
                    tabIndex={0}>
                    {editing ? (
                        <textarea
                            id='textarea'
                            value={text}
                            onChange={handleTextChange}
                            autoFocus
                            className={s.input}
                            placeholder='Type your note here'
                        />
                    ) : (
                        <ParsedText text={text} />
                    )}
                </div>
            </div>
        </div>
    );
};

const connector = connect(null, {...vault});

export default connector(CreateNoteScreen);
