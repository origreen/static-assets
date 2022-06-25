import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const httpUrl = 'https://github.com/origreen/static-assets/raw/main/white_cabbage/';
    const framesPath = path.join(__dirname, 'frames');
    const files = (await fs.promises.readdir(framesPath)).filter(file => !file.endsWith('.js'));
    const jsonResult: { date: Date, url: string }[] = [];

    let currentDate = new Date('2022-03-01');
    for (const file of files) {
        await fs.promises.rename(path.join(framesPath, file), path.join(framesPath, `${currentDate.toISOString().slice(0, 10)}.jpg`));
        currentDate.setTime(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
        jsonResult.push({ date: currentDate, url: `${httpUrl}${file}` });
    }

    await fs.promises.writeFile(path.join(__dirname, 'index.json'), JSON.stringify(jsonResult));
}
main();