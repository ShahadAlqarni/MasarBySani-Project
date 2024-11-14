import { faker } from '@faker-js/faker';

async function seedArticles() {
    for (let i = 0; i < 1000; i++) {
        const article = {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(),
         //   authorId: randomUserId, // get a random user ID if available
        };
        //await articleRepository.save(article);
    }
}
