import './App.css'
import enjson from './assets/i18n/en.json'
import esjson from './assets/i18n/es.json'
import pbjson from './assets/i18n/pb.json'
import Table from './components/table/table';

function App() {
  return (
    <>
      <Table jsonList={{en: enjson, es: esjson, pb: pbjson}} />
      
    </>
  )
}

export default App