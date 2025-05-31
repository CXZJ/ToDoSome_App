import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../app/api'
import toast from 'react-hot-toast'

// Async thunks
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authAPI.signup(userData)
            toast.success('Registration successful! Please check your email for activation.')
            return response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
            return rejectWithValue(error.response?.data)
        }
    }
)

export const activateEmail = createAsyncThunk(
    'auth/activateEmail',
    async (activationToken, { rejectWithValue }) => {
        try {
            const response = await authAPI.activateEmail(activationToken)
            toast.success('Email activated successfully!')
            return response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Email activation failed')
            return rejectWithValue(error.response?.data)
        }
    }
)

export const signin = createAsyncThunk(
    'auth/signin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authAPI.signin(credentials)
            localStorage.setItem('token', response.data.access_token)
            toast.success('Login successful!')
            return response.data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
            return rejectWithValue(error.response?.data)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authAPI.getUserInfo()
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authAPI.logout()
        toast.success('Logged out successfully')
    }
)

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Signin
            .addCase(signin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.token = action.payload.access_token
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get User Info
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getUserInfo.rejected, (state) => {
                state.loading = false
                state.user = null
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
    },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
