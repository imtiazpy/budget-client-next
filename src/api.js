
import useInterCeptor from './interceptor';

const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        //  authentication
        login: (data, params={}) => axios.post(`api/v1/auth/jwt/create/`, data, {params : params}),
        signUp: (data, params={}) => axios.post(`api/v1/auth/users/`, data, {params : params}),
        // logout: (data, params={}) => axios.post(`rest-auth/logout/`, data, {params : params}),
        confirmEmail: (data, params={}) => axios.post(`rest-auth/registration/verify-email/`, data, {params : params}),
        passwordChange: (data, params={}) => axios.post(`rest-auth/password/change/`, data, {params : params}),
        passwordReset: (data, params={}) => axios.post(`rest-auth/password/reset/`, data, {params : params}),
        passwordResetConfirm: (data, params={}) => axios.post(`rest-auth/password/reset/confirm/`, data, {params : params}),

        leaderboard: (params={}) => axios.get(`challenge/api/v1/leader-board/`, {params : params}),
        getPlatform: (params={}) => axios.get(`challenge/api/v1/platform-list/`, {params : params}),
        getLinks: (params={}) => axios.get(`challenge/api/v1/social-link/`, {params : params}),
        postLink: (data, params={}) => axios.post(`challenge/api/v1/social-link/`, data, {params : params}),
        deleteLinks: (pk, params={}) => axios.delete(`challenge/api/v1/social-link/${pk}`, {params : params}),

        // user profile
        getUserProfile: (params={}) => axios.get(`users/api/v1/influnetial-profile/`, {params: params}),
        getUserProfileDetails: (pk, params={}) => axios.get(`users/api/v1/influnetial-profile-details/${pk}`, {params: params}),
        updateUserProfile: (data, params={}) => axios.patch(`users/api/v1/influnetial-profile/`, data, {params: params}),
        uploadAvatar: (data, params={}) => axios.patch(`users/api/v1/avatar-upload/`, data, {params: params}),
    };

    return api;
}

export default  useApiHelper;