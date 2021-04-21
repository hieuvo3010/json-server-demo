const faker = require('faker');
const fs = require('fs');
// set locale to use Vietnamese
faker.locale = 'vi'

// random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());

// console.log(faker.datatype.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());

const randomPostList = (n) => {
    if (n < 0) return [];
    const postsList = []

    // loop and push post
    Array.from(new Array(n)).forEach(() => {
        const posts = {
            id: faker.datatype.uuid(),
            title: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        postsList.push(posts)

    })
    return postsList;
}

const randomProductList = (postsList, numberOfProducts) => {
        if (numberOfProducts < 0) return [];
        const productList = []

        //random data
        for (const posts of postsList) {
            Array.from(new Array(numberOfProducts)).forEach(() =>{
                const products = {
                    postsId: posts.id,
                    id: faker.datatype.uuid(),
                    name : faker.name.findName(),
                    color : faker.commerce.color(),
                    price : Number.parseFloat(faker.commerce.price()),
                    createdAt : Date.now(),
                    updatedAt : Date.now()
                }

                productList.push(products);
            })

        }
        return productList;
    }
    //IFFE
    (() => {
        // random
        const postsList = randomPostList(5)
        const productList = randomProductList(postsList, 4);
        // prepare db object
        const db = {
            posts: postsList,
            products: productList,
            comments: [],
            profile: {
                name: 'Ashiba',
            },
        };

        //write db object to db.json
        fs.writeFile('db.json', JSON.stringify(db), () => {
            console.log("generate data successfully");

        })
    })()