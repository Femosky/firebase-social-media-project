import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { provider } from '../config/firebase';

export function Navbar() {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };

    function isUserPickerActive() {
        if (!user) {
            provider.setCustomParameters({
                prompt: 'select_account',
            });
        }
    }
    useEffect(() => {
        isUserPickerActive();
    }, []);

    return (
        <div className='navbar'>
            <div className='links'>
                <Link to='/'> Home </Link>
                {user ? (
                    <>
                        <Link to='/createpost'> Create Post </Link>
                    </>
                ) : (
                    <>
                        <Link to='/login'> Login </Link>
                    </>
                )}
            </div>
            <div className='user'>
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ''} alt='' width='20' height='20' />
                        <button onClick={signUserOut}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}
