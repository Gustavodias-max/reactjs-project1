export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postResponse, photosResponse]);

    const postsjson = await posts.json();
    const photosjson = await photos.json();

    const postsandphotos = postsjson.map((post, index) => {
        return { ...post, cover: photosjson[index].url }
    });

    return postsandphotos;
}