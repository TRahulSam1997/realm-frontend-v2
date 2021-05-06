import Posts from '../../components/blog/posts';

const LoadMorePosts = ( { posts } ) => {
    return (
        <>
            <Posts edges={posts.edges}/>
        </>
    )
}

export default LoadMorePosts;