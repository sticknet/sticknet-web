import React, {ChangeEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Modal from '../index';
import Input from '../../Input';
import s from './style.css';
import Loading from '../../Loading';
import {IApplicationState} from '../../../types';

interface InputModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    title: string;
    done: () => void;
    cancel?: () => void;
    doneText: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = InputModalProps & PropsFromRedux;

const InputModal: React.FC<Props> = ({
    visible,
    setVisible,
    title,
    done,
    cancel,
    doneText,
    onChange,
    value,
    placeholder,
    loading,
}) => {
    return (
        <Modal visible={visible} setVisible={setVisible} cancel={cancel}>
            <div className={s.container}>
                <div className={s.titleContainer}>
                    <p className={s.title}>{title}</p>
                </div>
                <Input
                    placeholder={placeholder || 'Folder name..'}
                    autoFocus
                    width='20vw'
                    onChange={onChange}
                    value={value}
                />
                {loading ? (
                    <Loading white />
                ) : (
                    <div className={s.buttonsContainer}>
                        <button
                            type='button'
                            className={s.button}
                            onClick={() => {
                                setVisible(false);
                                cancel?.();
                            }}>
                            Cancel
                        </button>
                        <button type='submit' className={s.button} onClick={done}>
                            {doneText}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

const mapStateToProps = (state: IApplicationState) => ({
    loading: state.progress.loading,
});

const connector = connect(mapStateToProps);

export default connector(InputModal);
