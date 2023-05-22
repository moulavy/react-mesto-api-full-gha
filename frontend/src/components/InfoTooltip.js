import React from 'react';
function InfoTooltip({ isOpen, tooltip, onClose }) {
   return (
      <section className={(isOpen ? 'popup  popup-tooltip popup_opened' : 'popup  popup-tooltip')}>
         <div className="popup-tooltip__container popup__container">
            <button
               onClick={onClose}
               aria-label="Close"
               type="button"
               className="popup__button-close popup-tooltip__button-close"
            ></button>
            <img className="popup-tooltip__image" src={tooltip.image} alt={tooltip.text} />
            <h2 className="popup-tooltip__title" >{tooltip.text}</h2>

         </div>
      </section>
   );
}
export default InfoTooltip;