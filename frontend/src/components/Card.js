import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);
   // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = card.owner === currentUser.data._id;
   const isLiked = card.likes.some(item => item === currentUser.data._id);
   const cardLikeButtonClassName = (
      `elements__button-heart ${isLiked && 'elements__button-heart_active'}`
   );

   function handleClick() {
      onCardClick(card);
   }
   function handleLike() {
      onCardLike(card);
   }
   function handleDeleteClick() {
      onCardDelete(card);
   }
   return (
      <li className="elements__element" >
         {isOwn && <button className="elements__button-delete " onClick={handleDeleteClick} />}
         <img className="elements__image" alt={card.name} src={card.link} onClick={handleClick} />
         <h2 className="elements__title">{card.name}</h2>
         <div className="elements__button-like">
            <button aria-label="Like" className={cardLikeButtonClassName} onClick={handleLike}></button>
            <p className="elements__like-counter">{card.likes.length}</p>
         </div>
      </li>
   )
}
export default Card;