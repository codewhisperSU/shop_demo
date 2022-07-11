import fs from 'fs';
import path from 'path';

export async function readFileData(testDataFileName: string): Promise<string> {
    const filePath = path.join(
        __dirname,
        '..',
        '..',
        'tests',
        'testData',
        `${testDataFileName}.txt`
    );

    try {
        await fs.accessSync(filePath, fs.constants.F_OK);
        console.log('File exists');

        const data = await fs.readFileSync(filePath);
        return data.toString();
    } catch (err) {
        console.log('File is not exists');
        return '';
    }
}
