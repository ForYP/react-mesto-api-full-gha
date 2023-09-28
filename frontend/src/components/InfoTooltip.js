import React from "react";
import success from "../images/success.svg";
import unSuccess from "../images/unSuccess.svg";

function InfoTooltip({onClose, isOpen, isSuccess}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container-tooltip">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__img popup__img_type_sign"
          src={isSuccess ? success : unSuccess}
          alt={isSuccess ? "Иконка успешной регистрации" : "Иконка неудачной регистрации"}
        />
        <h2 className="popup__title popup__title-tooltip">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip;