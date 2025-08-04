import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from './store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster position='top-center' closeButton richColors />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
