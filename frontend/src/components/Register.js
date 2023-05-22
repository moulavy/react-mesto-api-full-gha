import React from 'react';
import { Link } from 'react-router-dom'
function Register({ onRegister }) {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   function handleChangeEmail(e) {
      setEmail(e.target.value)
   }

   function handleChangePassword(e) {
      setPassword(e.target.value)
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password) {
          
         return;
         
      }      
      onRegister( email,password)
   }
   return (
      <section className="auth">
         <h2 className="auth__title">Регистрация</h2>
         <form className="auth__form" onSubmit={handleSubmit}>
            
            <input className="auth__email auth__input" value={email} onChange={handleChangeEmail} placeholder="Email"></input>
            <input className="auth__password auth__input" value={password} onChange={handleChangePassword} placeholder="Пароль" type="password"></input>
            <button type="submit" className="auth__button">Зарегистрироваться</button>
            
         </form>
         <div className="auth__login">
            <p className="auth__question">Уже зарегистрированы?</p>
            <Link to='/signin' className="auth__link">Войти</Link>
         </div>
      </section>
   );
}
export default Register;