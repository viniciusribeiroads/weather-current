import { useState } from 'react';



function App() {
  const [city, setCity] = useState('');

  const [ WeatherForecast, setWeatherForecast ] = useState(null);

  const [ loading, setLoading ] = useState(false);


  const searchForecastWeather = () => {
    setLoading(true)
    fetch(`http://api.weatherapi.com/v1/current.json?key=f7e8820069f347638f6222607212010
          &q=${city}&lang=pt`).then( (response) => {
            if (response.status === 200){
              return response.json()
            }
            
          }).then( (data) => {
              setLoading(false);
              console.log('data --> ', data);
              setWeatherForecast(data);
              
          })
          setCity('');
          

  }

  

  const handleCityChange = (event) => {
    setCity(event.target.value);
  
  }

 
 
    
  

  return (
    <>
      <div>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
          <a className="navbar-brand" href="#search">
            Previsão do Tempo
          </a>
          <a href='https://github.com/viniciusribeiroads' target='_blank'>
            <img src="https://img.icons8.com/fluency/48/000000/github.png"/>
          </a>
        </nav>

        <main className="container" id="search">
          <div className="jumbotron">
            <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
            <p className="lead">Digite a sua cidade no campo abaixo e em seguida clique em pesquisar.</p>
            <div className="mb-4">
              <div>
                <input type="text" className="form-control" value={city} onChange={handleCityChange} />
              </div>
            </div>
            <button className="btn btn-lg btn-dark " onClick={searchForecastWeather}>Pesquisar</button>

            
            {loading ? (
              <div className="jumbotron">
                <h1>Buscando os dados ...</h1>
              </div>
            ) : null }

            {
              
              
             

              WeatherForecast ? (
                
                <div className="mt-4 d-flex align-itens-center">
                  <div className="col-sm-1">
                    <img src={WeatherForecast.current.condition.icon} alt="Weather icon"></img>
                  </div>
                  <div>
                    
                    <h3>Hoje o dia está: {WeatherForecast.current.condition.text}</h3>
                    <p className="lead">
                      Cidade: {WeatherForecast.location.name} / Estado: {WeatherForecast.location.region}<br/>
                      Data/hora: {WeatherForecast.current.last_updated}<br/>
                      Velocidade do ar: {WeatherForecast.current.wind_kph} km/h<br/>
                      Temperatura: {WeatherForecast.current.temp_c}º<br/>
                      Umidade do ar: {WeatherForecast.current.humidity} %<br/>
                    </p>
                  </div>
                </div>
              ) : 
                <div className="mt-4 d-flex align-itens-center">
                    <h3>Ops, não conseguimos encontrar :( </h3>
                </div>
            }
          </div>
        </main>
      </div>
    </>

  );
}

export default App;
