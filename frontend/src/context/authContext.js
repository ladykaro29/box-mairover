import { createContext } from 'react';

// Contexto de sesión compartido por toda la aplicación.
// El proveedor vive en AuthProvider.jsx y el consumidor en hooks/useAuth.js
export const AuthContext = createContext(null);
