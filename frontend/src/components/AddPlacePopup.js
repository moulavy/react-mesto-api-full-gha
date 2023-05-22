import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose, isLoading }) {
   const [nameCard, setNameCard] = React.useState('');
   const [link, setLink] = React.useState('');

   React.useEffect(() => {
      if (isOpen) {
         setNameCard('');
         setLink('');
      }
   }, [isOpen]);

   function handleChangeNameCard(e) {
      setNameCard(e.target.value);
   }
   function handleChangeUrl(e) {
      setLink(e.target.value);
   }
   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name: nameCard,
         link
      })
   }

   return (
      <PopupWithForm
         onSubmit={handleSubmit}
         isOpen={isOpen}
         onClose={onClose}
         name='add'
         title='Новое место'
         textButton={isLoading ? 'Создание...' : 'Создать'}
         button='add'
      >
         <input
            onChange={handleChangeNameCard}
            value={nameCard}
            id="name-img-input"
            type="text"
            minLength="2"
            maxLength="30"
            name="name"
            required
            placeholder="Название"
            className="popup__input popup__input_value_name-img"
         />
         <span className="popup__error popup__error_visible name-img-input-error"></span>
         <input
            onChange={handleChangeUrl}
            value={link}
            id="link-img-input"
            type="url"
            required
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_value_link-img"
         />
         <span className="popup__error popup__error_visible link-img-input-error"></span>
      </PopupWithForm>
   )
}
export default AddPlacePopup;