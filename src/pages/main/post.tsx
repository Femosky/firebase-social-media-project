import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Post as IPost } from './main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export function Post(props: Props) {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, 'likes');

    const likesDoc = query(likesRef, where('postId', '==', post.id));

    async function getLikes() {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    async function addLike() {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) =>
                    prev
                        ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }],
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeLike() {
        try {
            const likeToDeleteQuery = query(likesRef, where('postId', '==', post.id), where('userId', '==', user?.uid));

            const liketoDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = liketoDeleteData.docs[0].id;
            const likeToDelete = doc(db, 'likes', likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

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
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p>Likes: {likes?.length}</p>}
            </div>
        </div>
    );
}
