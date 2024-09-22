
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import AuthProvider from './contexts/Auth.tsx'

createRoot(document.getElementById('root')!).render(


    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>

)
