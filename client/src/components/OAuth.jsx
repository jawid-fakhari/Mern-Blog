import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider } from 'firebase-auth';

import { auth, signInWithPopup } from '../firebase/config';


export default function OAuth() {
  const handleGoogleClick = async (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider();
    provider.SetCustomParameters({prompt: 'select_account'})
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  )
}
