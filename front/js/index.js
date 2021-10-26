main();

async function main() {
    const articles = await getArticles();
    for(article of articles){
        displayArticle(article);
    }   
}