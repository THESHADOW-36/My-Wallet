// Auth
export const register = "http://localhost:8000/api/v1/auth/register"  // Post
export const login = "http://localhost:8000/api/v1/auth/login"  // Post
export const currentUser = "http://localhost:8000/api/v1/auth/current-user"  // get
export const editProfile = "http://localhost:8000/api/v1/auth/edit-profile"  // put

// Expenses
export const addExp = "http://localhost:8000/api/v1/wallet/expenses"  // Post
export const getExp = "http://localhost:8000/api/v1/wallet/expenses"  // get
export const getSingleExp = "http://localhost:8000/api/v1/wallet/expense/"  // get
export const editExp = "http://localhost:8000/api/v1/wallet/expense/"  // put
export const delExp = "http://localhost:8000/api/v1/wallet/expense/"  // delete

// Incomes
export const addIncome = "http://localhost:8000/api/v1/wallet/incomes"  // Post
export const getIncome = "http://localhost:8000/api/v1/wallet/incomes"  // get
export const editIncome = "http://localhost:8000/api/v1/wallet/income/"  // put
export const delIncome = "http://localhost:8000/api/v1/wallet/income/"  // delete

// Statistics
export const stats = "http://localhost:8000/api/v1/wallet/stats"  // get

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
   editIncome,
   delIncome,
   stats
};
