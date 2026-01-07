import { google } from 'googleapis';

export const getGoogleAuth = () => {
    const email = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!email || !privateKey) {
        throw new Error('Missing Google Credentials in Environment Variables');
    }

    return new google.auth.GoogleAuth({
        credentials: { client_email: email, private_key: privateKey },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
        ],
    });
};

export const getSheetsClient = () => google.sheets({ version: 'v4', auth: getGoogleAuth() });
export const getDriveClient = () => google.drive({ version: 'v3', auth: getGoogleAuth() });
