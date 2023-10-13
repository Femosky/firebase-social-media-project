import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './post';

export interface Post {
    id: string;
    description: string;
    title: string;
    userId: string;
    username: string;
}

export function Main() {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, 'posts');

    async function getPosts() {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {postsList?.map((post) => (
                <Post post={post} />
            ))}
        </div>
    );
}
