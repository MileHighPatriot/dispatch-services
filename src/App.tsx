import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { OpenAccount, RequestServe } from './pages/Forms'
import { Home } from './pages/Home'
import { About, Contact, Faq, ForFirms, NotFound, ServiceArea, Services } from './pages/Info'

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-area" element={<ServiceArea />} />
        <Route path="/for-firms" element={<ForFirms />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<RequestServe />} />
        <Route path="/open-account" element={<OpenAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
