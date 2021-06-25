import Parser from 'rss-parser';

export async function parse(url: string) {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return feed
} 