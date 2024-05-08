// http://localhost:8000

// Auth
export const register = "https://my-wallet-gwsi.onrender.com/api/v1/auth/register"  // Post
export const login = "https://my-wallet-gwsi.onrender.com/api/v1/auth/login"  // Post
export const currentUser = "https://my-wallet-gwsi.onrender.com/api/v1/auth/current-user"  // get
export const editProfile = "https://my-wallet-gwsi.onrender.com/api/v1/auth/edit-profile"  // put

// Expenses
export const addExp = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/expenses"  // Post
export const getExp = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/expenses"  // get
export const getSingleExp = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/expense/"  // get
export const editExp = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/expense/"  // put
export const delExp = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/expense/"  // delete

// Incomes
export const addIncome = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/incomes"  // Post
export const getIncome = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/incomes"  // get
export const getSingleIncome = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/income/"  // get
export const editIncome = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/income/"  // put
export const delIncome = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/income/"  // delete

// Statistics
export const stats = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/stats"  // get
export const chartStats = "https://my-wallet-gwsi.onrender.com/api/v1/wallet/chart-stats"  // get

export const Url = {
   register,
   login,
   currentUser,
   editProfile,
   addExp,
   getExp,
   getSingleExp,
   editExp,
   delExp,
   addIncome,
   getIncome,
   getSingleIncome,
   editIncome,
   delIncome,
   stats,
   chartStats
};
