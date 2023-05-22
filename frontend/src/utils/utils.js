export const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
export const formEditElement = document.querySelector('.popup-edit__container');
export const nameInput = formEditElement.querySelector('.popup__input_value_name');
export const jobInput = formEditElement.querySelector('.popup__input_value_description');
export const buttonOpenCardPopup = document.querySelector('.profile__add-button');
export const cardsContainerSelector = '.elements__list';
export const buttonOpenAvatarPopup = document.querySelector('.profile__button-avatar');

export const settingsValidate = {
   formSelector: '.popup__form',
   /*селектор используется для создания массива всех существующих форм*/
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}
