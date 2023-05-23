import React from 'react';

function Login({ onLogin }) {
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
      onLogin(email, password)
   }

   return (
      <section className="auth">
         <h2 className="auth__title">Вход</h2>
         <form className="auth__form" onSubmit={handleSubmit}>
            <input className="auth__email auth__input" value={email} autoComplete="email" onChange={handleChangeEmail} placeholder="Email"></input>
            <input className="auth__password auth__input" value={password} autoComplete="current-password" onChange={handleChangePassword} placeholder="Пароль" type="password"></input>
            <button type="submit" className="auth__button">Войти</button>
         </form>
      </section>
   );
}
export default Login;