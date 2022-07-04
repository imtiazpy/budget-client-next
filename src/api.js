
import useInterCeptor from './interceptor';

const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        //  authentication
        login: (data, params={}) => axios.post(`api/v1/auth/jwt/create/`, data, {params : params}),
        signUp: (data, params={}) => axios.post(`api/v1/auth/users/`, data, {params : params}),
        passwordResetRequest: (data, params={}) => axios.post(`api/v1/auth/users/reset_password/`, data, {params : params}),
        passwordResetConfirm: (data, params={}) => axios.post(`api/v1/auth/users/reset_password_confirm/`, data, {params : params}),

        // Budget
        getBudgets: (params={}) => axios.get(`api/v1/budget/budgets/`, {params: params}),
        postBudget: (data, params={}) => axios.post(`api/v1/budget/budgets/`, data, {params:params}),
        getBudgetDetails: (pk, params={}) => axios.get(`api/v1/budget/budget/${pk}/`, {params:params}),
        updateBudget: (pk, data, params={}) => axios.patch(`api/v1/budget/budget/${pk}/`, data, {params:params}),
        deleteBudget: (pk, params={}) => axios.delete(`api/v1/budget/budget/${pk}/`, {params:params}),

        // Categories
        getCategories: (params={}) => axios.get(`api/v1/budget/categories`, {params:params}),
        postCategory: (data, paams={}) => axios.post(`api/v1/budget/categories`, data, {params:params}),
        getCategoryDetails: (pk, params={}) => axios.get(`api/v1/budget/category/${pk}/`, {params:params}),
        updateCategory: (pk, data, params={}) => axios.patch(`api/v1/budget/category/${pk}/`, data, {params:params}),
        deleteCategory: (pk, params={}) => axios.delete(`api/v1/budget/category/${pk}/`, {params: params}),

        // CategoryItems
        getItems: (params={}) => axios.get(`api/v1/budget/items`, {params:params}),
        postItems: (data, params={}) => axios.post(`api/v1/budget/items`, data, {params:params}),
        getItemDetails: (pk, params={}) => axios.get(`api/v1/budget/item/${pk}`, {params:params}),
        updateItem: (pk, data, params={}) => axios.patch(`api/v1/budget/item/${pk}`, data, {params:params}),
        deleteItem: (pk, params={}) => axios.delete(`api/v1/budget/item/${pk}`, {params:params}),



        // user profile
        getUserProfile: (params={}) => axios.get(`api/v1/users/profile/`, {params: params}),

        getUserProfileDetails: (pk, params={}) => axios.get(`users/api/v1/influnetial-profile-details/${pk}`, {params: params}),

        updateUserProfile: (data, params={}) => axios.patch(`api/v1/users/profile/`, data, {params: params}),
        uploadAvatar: (data, params={}) => axios.patch(`api/v1/users/avatar-upload/`, data, {params: params}),
    };

    return api;
}

export default  useApiHelper;