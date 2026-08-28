// RegisterPage.jsx
import { useContext } from 'react';
import { Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import { register } from '../utils/network-data';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';

export async function registerAction({ request }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) return { error: 'password_mismatch' };

    const { error } = await register({ name, email, password });
    if (error) return { error: 'register_failed' };

    return redirect('/');
}

export default function RegisterPage() {
    const { locale } = useContext(LocaleContext);
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    return (
        <section className="register-page">
            <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>

            <Form method="post" className="input-register">
                <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
                <input type="text" name="name" id="name" placeholder="Nama Lengkap" value={name} onChange={onNameChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="email@example.com" value={email} onChange={onEmailChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={onPasswordChange} required />

                <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} required />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (locale === 'id' ? 'Memproses...' : 'Processing...') : (locale === 'id' ? 'Daftar' : 'Register')}
                </button>
            </Form>

            {actionData?.error === 'password_mismatch' && (
                <p className="error-msg">{locale === 'id' ? 'Password dan konfirmasi password tidak cocok.' : 'Passwords do not match.'}</p>
            )}
            {actionData?.error === 'register_failed' && (
                <p className="error-msg">{locale === 'id' ? 'Pendaftaran gagal. Silakan coba lagi.' : 'Registration failed. Please try again.'}</p>
            )}

            <p>
                {locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
                <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link>
            </p>
        </section>
    );
}