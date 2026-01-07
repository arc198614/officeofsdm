import { getDriveClient } from './auth';
import { Readable } from 'stream';

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

export async function createSajaFolder(sajaName: string) {
    const drive = getDriveClient();

    // Check if folder already exists
    const query = `name = '${sajaName}' and mimeType = 'application/vnd.google-apps.folder' and '${ROOT_FOLDER_ID}' in parents and trashed = false`;
    const list = await drive.files.list({ q: query, fields: 'files(id, name)' });

    if (list.data.files && list.data.files.length > 0) {
        return list.data.files[0].id;
    }

    // Create new folder
    const folderMetadata = {
        name: sajaName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [ROOT_FOLDER_ID!],
    };

    const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
    });

    return folder.data.id;
}

export async function uploadToDrive(fileName: string, mimeType: string, buffer: Buffer, sajaName: string) {
    const drive = getDriveClient();
    const folderId = await createSajaFolder(sajaName);

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const response = await drive.files.create({
        requestBody: {
            name: fileName,
            parents: folderId ? [folderId] : undefined,
        },
        media: {
            mimeType: mimeType,
            body: stream,
        },
        fields: 'id, webViewLink, webContentLink',
    });

    // Make it public or reader-accessible
    await drive.permissions.create({
        fileId: response.data.id!,
        requestBody: { role: 'reader', type: 'anyone' },
    });

    return { id: response.data.id, link: response.data.webViewLink };
}
