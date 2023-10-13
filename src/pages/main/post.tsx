import { Post as IPost } from './main';

interface Props {
    post: IPost;
}

export function Post(props: Props) {
    const { post } = props;

    return (
        <div>
            <div className='title'>
                <h3>{post.title}</h3>
            </div>
            <div className='body'>
                <p>{post.description}</p>
            </div>
            <div className='footer'>
                <p>@{post.username}</p>
            </div>
        </div>
    );
}
