// LoginPage.jsx
import { useContext } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

export async function loginAction({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const { error, data } = await login({ email, password });
    if (error) return { error: true };

    putAccessToken(data.accessToken);
    return redirect('/');
}

export default function LoginPage() {
    const { locale } = useContext(LocaleContext);
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    return (
        <section className="login-page">
            <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app.'}</h2>

            <Form method="post" className="input-login">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={onEmailChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={onPasswordChange} required />

                <button type="submit">{locale === 'id' ? 'Masuk' : 'Login'}</button>
            </Form>

            <p>
                {locale === 'id' ? 'Belum punya akun? ' : "Don't have an account? "}
                <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link>
            </p>
        </section>
    );
}