import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface CreateFormData {
    title: string;
    description: string;
}

export function CreateForm() {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required('You must add a title!'),
        description: yup
            .string()
            .max(280, 'Description must be less than 280 characters!')
            .required('You must include a description!'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db, 'posts');

    async function onCreatePost(data: CreateFormData) {
        await addDoc(postRef, {
            ...data,
            // title: data.title,
            // description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        });
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder='title' {...register('title')} />
            <p style={{ color: 'red' }}>{errors.title?.message}</p>
            <textarea placeholder='description' {...register('description')} />
            <p style={{ color: 'red' }}>{errors.description?.message}</p>
            <input type='submit' />
        </form>
    );
}
