import React from 'react';

export const InfoTooltip = ({ onClose, isSuccess }) => {
    let popupClassName = `popup popup_type_tooltip`

    if (isSuccess) {
        popupClassName += ' popup_active';
    }

    const iconClassName = `popup__icon ${isSuccess ? 'popup__icon_type_success' : 'popup__icon_type_error'}`;

    return (
        <div className={popupClassName}>
            <div className='popup__container'>
                <button className='popup__close-cross' type='button' onClick={onClose} aria-label='Закрыть'></button>
                <div className={iconClassName}></div>
                <p className='popup__text'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div>
    )
}