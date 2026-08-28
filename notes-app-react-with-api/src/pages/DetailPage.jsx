import { useContext } from 'react';
import { useLoaderData, Form, redirect } from 'react-router-dom';
import parser from 'html-react-parser';
import { FiArchive, FiInbox, FiTrash2 } from 'react-icons/fi';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import LocaleContext from '../contexts/LocaleContext';

export async function detailPageLoader({ params }) {
    const { error, data } = await getNote(params.id);
    if (error) {
        return null;
    }
    return data;
}

export async function detailPageAction({ request, params }) {
    const formData = await request.formData();
    const intent = formData.get('intent');

    if (intent === 'archive') {
        await archiveNote(params.id);
    } else if (intent === 'unarchive') {
        await unarchiveNote(params.id);
    } else if (intent === 'delete') {
        await deleteNote(params.id);
    }

    return redirect('/');
}

export default function DetailPage() {
    const { locale } = useContext(LocaleContext);
    const note = useLoaderData();

    if (!note) {
        return (
            <section className="detail-page">
                <p>{locale === 'id' ? 'Catatan tidak ditemukan!' : 'Note not found!'}</p>
            </section>
        );
    }

    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{note.title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
            <div className="detail-page__body">{parser(note.body)}</div>

            <div className="detail-page__action">
                {note.archived ? (
                    <Form method="post">
                        <button
                            className="action"
                            type="submit"
                            name="intent"
                            value="unarchive"
                            title={locale === 'id' ? 'Aktifkan' : 'Unarchive'}
                        >
                            <FiInbox />
                        </button>
                    </Form>
                ) : (
                    <Form method="post">
                        <button
                            className="action"
                            type="submit"
                            name="intent"
                            value="archive"
                            title={locale === 'id' ? 'Arsipkan' : 'Archive'}
                        >
                            <FiArchive />
                        </button>
                    </Form>
                )}
                <Form method="post">
                    <button
                        className="action"
                        type="submit"
                        name="intent"
                        value="delete"
                        title={locale === 'id' ? 'Hapus' : 'Delete'}
                    >
                        <FiTrash2 />
                    </button>
                </Form>
            </div>
        </section>
    );
}