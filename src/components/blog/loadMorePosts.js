import Posts from '../../components/blog/posts';

const LoadMorePosts = ( {edges} ) => {
    return (
        <>
            <Posts edges={edges}/>
        </>
    )
}

export default LoadMorePosts;