import './App.css';
import Header from './components/Header'
import DestCards from './components/DestCards'
import DestinationsData from './DestinationsData'


function App() {

const destCards = DestinationsData.map(item => {
 return (
<DestCards 
  img={item.img}
  city={item.city}
/>
)
})

  return (
    <div>
      <Header />
      <div className="destinations-scroll">
        {destCards}
      </div>
    </div>
  )

}

export default App;


