import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import CreateTask from './pages/CreateTask'
import Register from './pages/Register'
import { AuthProvider } from './services/AuthProvider'

function App() {
  return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/create' element={<CreateTask />} />
			</Routes>
		</AuthProvider>
  )
}

export default App
