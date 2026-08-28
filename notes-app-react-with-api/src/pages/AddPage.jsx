import { useContext, useCallback } from 'react';
import { Form, redirect } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { FiCheck, FiEdit3 } from 'react-icons/fi';
import LocaleContext from '../contexts/LocaleContext';
import useInput from '../hooks/useInput';

export async function addNoteAction({ request }) {
    const formData = await request.formData();
    const title = formData.get('title');
    const body = formData.get('body');

    if (!title || !body) {
        return { error: true };
    }

    const { error } = await addNote({ title, body });
    if (error) {
        return { error: true };
    }

    return redirect('/');
}

export default function AddPage() {
    const { locale } = useContext(LocaleContext);
    const [title, handleTitleChange] = useInput('');
    const [body, , setBody] = useInput('');

    const handleBodyInput = useCallback((event) => {
        setBody(event.currentTarget.textContent);
    }, [setBody]);

    const isFormValid = title.trim() !== '' && body.trim() !== '';

    return (
        <section className="add-new-page">
            <Form method="post">
                <div className="add-new-page__input">
                    <input
                        className="add-new-page__input__title"
                        type="text"
                        name="title"
                        placeholder={
                            locale === 'id' ? 'Catatan rahasia' : 'Secret note'
                        }
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    <div
                        className="add-new-page__input__body"
                        contentEditable
                        data-placeholder={
                            locale === 'id'
                                ? 'Sebenarnya saya adalah...'
                                : 'Actually I am...'
                        }
                        onInput={handleBodyInput}
                    />
                    {/* Input tersembunyi agar teks contentEditable terkirim via Form */}
                    <input type="hidden" name="body" value={body} />
                </div>

                <div className="add-new-page__action">
                    <button
                        className="action"
                        type="submit"
                        title={
                            isFormValid
                                ? locale === 'id'
                                    ? 'Simpan Catatan'
                                    : 'Save Note'
                                : locale === 'id'
                                    ? 'Lengkapi Judul dan Isi'
                                    : 'Complete Title and Body'
                        }
                        disabled={!isFormValid}
                    >
                        {isFormValid ? <FiCheck /> : <FiEdit3 />}
                    </button>
                </div>
            </Form>
        </section>
    );
}