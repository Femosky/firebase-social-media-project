import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { Post as IPost } from './main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost;
}

export function Post(props: Props) {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likeAmount, setLikeAmount] = useState<number | null>(null);

    const likesRef = collection(db, 'likes');

    const likesDoc = query(likesRef, where('postId', '==', post.id));

    async function getLikes() {
        const data = await getDocs(likesDoc);
        setLikeAmount(data.docs.length);
    }

    async function addLike() {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id,
        });
    }

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className='post'>
            <div className='title'>
                <h3>{post?.title}</h3>
            </div>
            <div className='body'>
                <p>{post?.description}</p>
            </div>
            <div className='footer'>
                <p>@{post?.username}</p>
                <button onClick={addLike}>&#128077;</button>
                {likeAmount && <p>Likes: {likeAmount}</p>}
            </div>
        </div>
    );
}
