import { useState, useEffect } from 'react';
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      // creating path
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      // upload image
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      // get image url
      const imgUrl = await img.ref.getDownloadURL();

      // add display name and profile image to user profile
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document creating a custom id for the collection and then the doc inside will have the user id.
      // this why we use the doc() method instead of add method(). This will create a doc inside users collection that has the
      // passed user id.
      // the set() method will set the properties of the newly created document.
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
