import React from "react";
import success from "../images/auth-success.png";
import unsuccess from "../images/auth-error.png";

const InfoTooltip = props => { 
  const { isConfirmed, isOpen, onClose } = props; 
  
  return (
    <div className={`popup popup_register ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close" aria-label="Закрыть" type="button" onClick={onClose} />
        {isConfirmed && (
          <div className="popup__register-info">
            <img className="popup__register-image" src={success} alt="Успешная регистрация" />
            <p className="popup__message">Вы успешно зарегистрировались!</p>
          </div> 
        )}
        {!isConfirmed && (
          <div className="popup__register-info">
            <img className="popup__register-image" src={unsuccess} alt="Ошибка регистрации" />
            <p className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</p>
          </div> 
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;