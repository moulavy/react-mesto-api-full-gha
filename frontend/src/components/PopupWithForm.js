import React from 'react';
function PopupWithForm({ isOpen, onSubmit, onClose, name, title, textButton, button, children }) {
   return (
      <section className={(isOpen ? `popup popup_opened popup-${name} ` : `popup popup-${name} `)}>
         <form
            onSubmit={onSubmit}
            className={`popup__form popup__container popup-${name}__container`}
         >
            <button
               onClick={onClose}
               aria-label="Close"
               type="button"
               className={`popup__button-close popup-${name}__button-close`}
            ></button>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button type="submit" className={`popup__button popup__button-${button}`}>
               {textButton}
            </button>
         </form>
      </section>
   )
}
export default PopupWithForm;