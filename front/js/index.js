import {getArticles, displayArticles} from "./functions.js";

main();

async function main() {
    const articles = await getArticles();
    displayArticles(articles);
}