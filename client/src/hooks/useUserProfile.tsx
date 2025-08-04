import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserdata } from '../store/slices/authSlice';
import useFetch from './useFetch';

const useUserProfile = () => {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state: any) => state.auth);
    const { fetchData, loading, error, data } = useFetch({ url: 'auth/profile' });

    useEffect(() => {
        // Only fetch if we have a token but no user data
        if (token && !user) {
            fetchData({ isAuth: true });
        }
    }, [token, user]);

    useEffect(() => {
        // Update Redux store when data is received
        if (data?.isOk) {
            dispatch(setUserdata(data));
        }
    }, [data, dispatch]);

    // Handle errors
    useEffect(() => {
        if (error) {
            console.error('Profile fetch error:', error);
        }
    }, [error]);

    return { loading, error };
};

export default useUserProfile;
