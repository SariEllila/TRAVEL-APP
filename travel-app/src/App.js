import './App.css';
import Header from './components/Header'
import DestCards from './components/DestCards'
import DestinationsData from './DestinationsData'
import Weather from './components/Weather'
import NewsData from './NewsData'
import NewsCards from './components/NewsCards'


function App() {

const destCards = DestinationsData.map(item => {
 return (
<DestCards 
  img={item.img}
  city={item.city}
/>
)
})

const newsCards = NewsData.map(item => {
  return (
 <NewsCards 
   img={item.img}
   title={item.title}
   text={item.text}
   date={item.date}
 />
 )
 })

  return (
    <div>

      <Header />

        <div className="destinations-scroll">
          {destCards}
        </div>

          <div class="quiz-link-text">
          <h1>Do you want to know which destination is best for YOU?</h1>
          <h1>Take the QUIZ <span>HERE</span></h1>
          </div>

      <div class="news-weather-container">
          <div>
          <h1>News</h1>
          {newsCards}
          </div>
              <div>
                <Weather />
                </div>
      </div>

    </div>
  )

}

export default App;


