import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './services/AuthProvider'
import { AuthRoute } from './components/AuthRoute'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={
					<AuthRoute>
						<Login />
					</AuthRoute>
				} />
				<Route path='/register' element={
					<AuthRoute>
						<Register />
					</AuthRoute>
				} />
				<Route path='/dashboard' element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				} />
			</Routes>
		</AuthProvider>
	)
}

export default App
