import { NextResponse } from 'next/server';
import { uploadToDrive } from '@/lib/google/drive';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const sajaName = formData.get('sajaName') as string || 'General';

        if (!file) {
            return NextResponse.json({ error: 'No file found' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToDrive(file.name, file.type, buffer, sajaName);

        return NextResponse.json({ success: true, ...result });
    } catch (error: any) {
        console.error('Upload API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
