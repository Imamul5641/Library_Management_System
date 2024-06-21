import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalBooks: 0,
  BooksBorrowed: 0,
  BooksOverdue: 0,
  issuedToday: 0,
  returnedToday: 0,
  borrowedThisMonth: 0,
  totalMembers: 0,
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setTotalBooks(state, action) {
      state.totalBooks = action.payload
    },
    setBooksBorrowed(state, action) {
      state.BooksBorrowed = action.payload
    },
    setBooksOverdue(state, action) {
      state.BooksOverdue = action.payload
    },
    setIssuedToday(state, action) {
      state.issuedToday = action.payload
    },
    setReturnedToday(state, action) {
      state.returnedToday = action.payload
    },
    setBorrowedThisMonth(state, action) {
      state.borrowedThisMonth = action.payload
    },
    setTotalMembers(state, action) {
      state.totalMembers = action.payload
    },
  },
})

export const {
  setTotalBooks,
  setBooksBorrowed,
  setIssuedToday,
  setReturnedToday,
  setBorrowedThisMonth,
  setTotalMembers,
  setBooksOverdue,
} = statsSlice.actions

export default statsSlice.reducer

const statPaths = [
    {
        path: 'https://library-management-system-f9gh.onrender.com/api/admin/stats/total-books',
        action: setTotalBooks,
    },
    {
        path: 'https://library-management-system-f9gh.onrender.com/api/admin/stats/total-borrowed-this-month',
        action: setBooksBorrowed,
    },
    {
        path: 'https://library-management-system-f9gh.onrender.com/api/admin/stats/total-overdue',
        action: setBooksOverdue,
    },
    {
        path: 'https://library-management-system-f9gh.onrender.com/api/admin/stats/total-issued-today',
        action: setIssuedToday,
    },
    {
        path: 'https://library-management-system-f9gh.onrender.com/api/admin/stats/total-returned-today',
        action: setReturnedToday,
    }
]

export const fetchStats = () => async (dispatch) => {
  try {
    statPaths.forEach(async ({ path, action }) => {
        const response = await fetch(path)
        const data = await response.json()
        dispatch(action(data.totalBooks))
    })
    const response = await fetch('https://library-management-system-f9gh.onrender.com/api/admin/stats/total-members')
    const data = await response.json()
    dispatch(setTotalMembers(data.totalMembers))  

  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}
