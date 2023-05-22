import React from 'react';
function ImagePopup({ card, onClose, isOpen }) {
   return (
      <section className={(isOpen ? "popup-img popup popup_opened" : "popup-img popup")}>
         <div className="popup-img__container">
            <button
               onClick={onClose}
               aria-label="Close"
               type="button"
               className="popup__button-close popup-img__button-close"
            ></button>
            <img src={card.link} alt={card.name} className="popup-img__photo" />
            <p className="popup-img__subtitle">{card.name}</p>
         </div>
      </section>
   )
}
export default ImagePopup;
