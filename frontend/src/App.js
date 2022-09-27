import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { AuthProvider } from './services/AuthProvider'

function App() {
  return (
		<AuthProvider>
			<Routes>
				<Route path='/' element={<Register />} />
			</Routes>
		</AuthProvider>
  )
}

export default App
