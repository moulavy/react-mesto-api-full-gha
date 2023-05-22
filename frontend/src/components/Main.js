import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card.js'
function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardLike, onCardClick, onCardDelete }) {

   const currentUser = React.useContext(CurrentUserContext);
   
   return (
      <main className="content container">
         <section className="profile">
            <button
               type="button"
               className="profile__button-avatar"
               onClick={onEditAvatar}
            >
               <img src={currentUser.data.avatar} alt="Аватар" className="profile__avatar" />
            </button>
            <div className="profile__info">
               <h1 className="profile__name">{currentUser.data.name}</h1>
               <button aria-label="Edit" className="profile__edit-button" onClick={onEditProfile}></button>
               <p className="profile__description">{currentUser.data.about}</p>
            </div>
            <button aria-label="Add" className="profile__add-button" onClick={onAddPlace}></button>
         </section>
         <section className="elements">
            <ul className="elements__list">
               {cards.map((card) =>
               (<Card
                  onCardLike={onCardLike}
                  onCardClick={onCardClick}
                  onCardDelete={onCardDelete}
                  card={card}
                  key={card._id}
               />
               )
               )}
            </ul>
         </section>
      </main>
   );
}

export default Main;
