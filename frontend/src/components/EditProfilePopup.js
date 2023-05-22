import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser, onClose, isLoading }) {
   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('');
   const currentUser = React.useContext(CurrentUserContext);

   React.useEffect(() => {
      if (isOpen) {
         setName(currentUser.data.name);
         setDescription(currentUser.data.about);
         
      }
   }, [currentUser, isOpen]);

   function handleChangeName(e) {
      setName(e.target.value);
   }
   function handleChangeDescription(e) {
      setDescription(e.target.value);
   }
   function handleSubmit(e) {
      
      e.preventDefault();
      onUpdateUser({
         name,
         about:description,
      });
   }

   return (
      <PopupWithForm
         isOpen={isOpen}
         onSubmit={handleSubmit}
         onClose={onClose}
         name='edit'
         title='Редактировать профиль'
         textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
         button='save'
      >
         <input
            onChange={handleChangeName}
            value={name || ''}
            placeholder="Имя"
            name="name"
            id="name-input"
            type="text"
            minLength="2"
            maxLength="40"
            required
            className="popup__input popup__input_value_name"
         />
         <span className="name-input-error popup__error popup__error_visible"></span>
         <input
            value={description || ''}
            onChange={handleChangeDescription}
            placeholder="О себе"
            id="description-input"
            name="about"
            minLength="2"
            maxLength="200"
            required
            type="text"
            className="popup__input popup__input_value_description"
         />
         <span className="description-input-error popup__error popup__error_visible"></span>
      </PopupWithForm>
   )
}
export default EditProfilePopup;