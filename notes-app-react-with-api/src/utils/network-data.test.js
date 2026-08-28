import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    getAccessToken,
    putAccessToken,
    login,
    register,
    getUserLogged,
    addNote,
    getActiveNotes,
    getArchivedNotes,
    getNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
} from './network-data';

const BASE_URL = 'https://notes-api.dicoding.dev/v1';

const ReqInitPost = (data) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
});

describe('network-data utils', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
        global.alert = vi.fn();
    });

    // ==========================================
    // Access Token Helpers
    // ==========================================
    describe('AccessToken Utils', () => {
        it('should save and retrieve access token correctly from localStorage', () => {
            putAccessToken('dummy-access-token');
            expect(getAccessToken()).toBe('dummy-access-token');
        });
    });

    // ==========================================
    // Register Tests
    // ==========================================
    describe('register', () => {
        it('should return error false when register is successful', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', message: 'User created' }),
            });

            const registerData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
            };

            const response = await register(registerData);

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/register`,
                expect.objectContaining(ReqInitPost(registerData))
            );
            expect(response).toEqual({ error: false });
        });

        it('should return error true when register using existing email', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Email already exists' }),
            });

            const registerData = {
                name: 'John Doe',
                email: 'existing@example.com',
                password: 'password123',
            };

            const response = await register(registerData);

            expect(global.alert).toHaveBeenCalledWith('Email already exists');
            expect(response).toEqual({ error: true });
        });

        it('should return error true when register using password less than 6 characters', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({
                    status: 'fail',
                    message: 'Password must be at least 6 characters',
                }),
            });

            const registerData = {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123',
            };

            const response = await register(registerData);

            expect(global.alert).toHaveBeenCalledWith('Password must be at least 6 characters');
            expect(response).toEqual({ error: true });
        });
    });

    // ==========================================
    // Login Tests
    // ==========================================
    describe('login', () => {
        it('should return valid data when login is successful', async () => {
            const fakeToken = { accessToken: 'secret-token-123' };
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: fakeToken }),
            });

            const credentials = { email: 'john@example.com', password: 'password123' };
            const response = await login(credentials);

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/login`,
                expect.objectContaining(ReqInitPost(credentials))
            );
            expect(response).toEqual({ error: false, data: fakeToken });
        });

        it('should return error when login using invalid credentials', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Email or password wrong' }),
            });

            const response = await login({ email: 'wrong@example.com', password: 'wrong' });

            expect(global.alert).toHaveBeenCalledWith('Email or password wrong');
            expect(response).toEqual({ error: true, data: null });
        });
    });

    // ==========================================
    // User Profile Test
    // ==========================================
    describe('getUserLogged', () => {
        it('should return user profile with bearer token header', async () => {
            putAccessToken('valid-token');
            const fakeUser = { id: 'user-1', name: 'John Doe', email: 'john@example.com' };

            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: fakeUser }),
            });

            const response = await getUserLogged();

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/users/me`,
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: 'Bearer valid-token',
                    }),
                })
            );
            expect(response).toEqual({ error: false, data: fakeUser });
        });

        it('should return error true when fetch user profile fails', async () => {
            putAccessToken('invalid-token');
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Unauthorized' }),
            });

            const response = await getUserLogged();
            expect(response).toEqual({ error: true, data: null });
        });
    });

    // ==========================================
    // Notes Operations Tests
    // ==========================================
    describe('notes operations', () => {
        beforeEach(() => {
            putAccessToken('my-token');
        });

        it('should add new note successfully', async () => {
            const newNote = { id: 'note-1', title: 'Test', body: 'Body content' };
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: newNote }),
            });

            const payload = { title: 'Test', body: 'Body content' };
            const response = await addNote(payload);

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes`,
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: expect.objectContaining({
                        Authorization: 'Bearer my-token',
                        'Content-Type': 'application/json',
                    }),
                })
            );
            expect(response).toEqual({ error: false, data: newNote });
        });

        it('should fetch active notes successfully', async () => {
            const fakeNotes = [{ id: 'note-1', title: 'Active Note' }];
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: fakeNotes }),
            });

            const response = await getActiveNotes();
            expect(response).toEqual({ error: false, data: fakeNotes });
        });

        it('should fetch archived notes successfully', async () => {
            const fakeArchivedNotes = [{ id: 'note-2', title: 'Archived Note' }];
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: fakeArchivedNotes }),
            });

            const response = await getArchivedNotes();

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes/archived`,
                expect.any(Object)
            );
            expect(response).toEqual({ error: false, data: fakeArchivedNotes });
        });

        it('should fetch single note by id', async () => {
            const fakeNote = { id: 'note-1', title: 'Single Note' };
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: fakeNote }),
            });

            const response = await getNote('note-1');

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes/note-1`,
                expect.any(Object)
            );
            expect(response).toEqual({ error: false, data: fakeNote });
        });

        it('should archive note successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: 'Archived' }),
            });

            const response = await archiveNote('note-1');

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes/note-1/archive`,
                expect.objectContaining({ method: 'POST' })
            );
            expect(response).toEqual({ error: false, data: 'Archived' });
        });

        it('should unarchive note successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: 'Unarchived' }),
            });

            const response = await unarchiveNote('note-1');

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes/note-1/unarchive`,
                expect.objectContaining({ method: 'POST' })
            );
            expect(response).toEqual({ error: false, data: 'Unarchived' });
        });

        it('should delete note successfully', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: 'Deleted' }),
            });

            const response = await deleteNote('note-1');

            expect(global.fetch).toHaveBeenCalledWith(
                `${BASE_URL}/notes/note-1`,
                expect.objectContaining({ method: 'DELETE' })
            );
            expect(response).toEqual({ error: false, data: 'Deleted' });
        });
    });

    // ==========================================
    // Additional Edge Cases: Token Helpers
    // ==========================================
    describe('AccessToken Utils (Edge Cases)', () => {
        it('should return null when no access token is set', () => {
            expect(getAccessToken()).toBeNull();
        });
    });

    // ==========================================
    // Additional Negative & Edge Cases: Notes Operations
    // ==========================================
    describe('notes operations (Negative & Edge Cases)', () => {
        beforeEach(() => {
            putAccessToken('my-token');
        });

        // Edge Case: Mendapatkan array kosong
        it('should handle empty list when fetching active notes', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'success', data: [] }),
            });

            const response = await getActiveNotes();
            expect(response).toEqual({ error: false, data: [] });
        });

        // Negative Case: Gagal membuat catatan baru
        it('should return error true when addNote fails', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Title is required' }),
            });

            const response = await addNote({ title: '', body: '' });
            expect(response).toEqual({ error: true, data: null });
        });

        // Negative Case: ID Catatan tidak ditemukan (404/fail)
        it('should return error true when getNote with non-existent id', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Note not found' }),
            });

            const response = await getNote('invalid-id');
            expect(response).toEqual({ error: true, data: null });
        });

        // Negative Case: Gagal mengarsipkan catatan
        it('should return error true when archiveNote fails', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Failed to archive' }),
            });

            const response = await archiveNote('invalid-id');
            expect(response).toEqual({ error: true, data: null });
        });

        // Negative Case: Gagal batal-arsip catatan
        it('should return error true when unarchiveNote fails', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Failed to unarchive' }),
            });

            const response = await unarchiveNote('invalid-id');
            expect(response).toEqual({ error: true, data: null });
        });

        // Negative Case: Gagal menghapus catatan
        it('should return error true when deleteNote fails', async () => {
            global.fetch = vi.fn().mockResolvedValue({
                json: async () => ({ status: 'fail', message: 'Failed to delete' }),
            });

            const response = await deleteNote('invalid-id');
            expect(response).toEqual({ error: true, data: null });
        });
    });
});