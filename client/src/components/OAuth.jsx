import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { API } from '../api'; 
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);


      const result = await signInWithPopup(auth, provider);

     
      const res = await fetch(API.googleSignin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include', 
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Google login failed:', data);
        return;
      }

      console.log('Google login response:', data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not login with Google:', error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
