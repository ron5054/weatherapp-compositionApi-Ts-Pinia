export const weatherService = {
  getWeatherForcast,
  getUserLocation,
  getLocationData,
  searchCity,
  getCurrWeather,
}

import { City, DateInfo, LocationWeather } from '../types'

const API_KEY: string = import.meta.env.VITE_API_KEY




async function searchCity(searchTerm: string): Promise<City[]> {
  try {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch location key')

    const cities: City[] = await res.json()
    return cities
  } catch (error) {
    console.error('Error fetching location key:', error)
    throw error
  }
}

async function getLocationData(lat: number, lon: number): Promise<any> {
  try {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch location key')

    const location: any = await res.json()

    return {
      locationKey: location.Key,
      city: location.EnglishName,
      country: location.Country.EnglishName,
    }
  } catch (error) {
    console.error('Error fetching location key:', error)
    throw error
  }
}

function _getWeatherFromCache(locationKey: string): LocationWeather | null {
  const weatherData: LocationWeather[] = JSON.parse(localStorage.getItem('weather') || '[]')
  return (
    weatherData.find((weather) => weather.locationKey === locationKey) || null
  )
}

function _saveWeatherToCache(locationWeather: LocationWeather): void {
  const weatherData: LocationWeather[] = JSON.parse(localStorage.getItem('weather') || '[]')
  localStorage.setItem(
    'weather',
    JSON.stringify([...weatherData, locationWeather])
  )
}

async function fetchWeatherFromApi(locationKey: string): Promise<{ DailyForecasts: DateInfo[] }> {
  try {
    const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=true`
    const res = await fetch(forecastUrl)
    if (!res.ok) throw new Error('Failed to fetch weather forecast')
    const weather = await res.json()
    return weather
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

async function getWeatherForcast(locationKey: string): Promise<any> {
  const cachedWeather = _getWeatherFromCache(locationKey)

  if (cachedWeather) {
    const isStale = Date.now() - cachedWeather.timestamp > 3600000 // 1 hour
    if (!isStale) return cachedWeather.DailyForecasts
  }

  try {
    const { DailyForecasts } = await fetchWeatherFromApi(locationKey)

    const locationWeather: LocationWeather = {
      timestamp: Date.now(),
      locationKey,
      DailyForecasts,
    }

    _saveWeatherToCache(locationWeather)
    return DailyForecasts
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

async function getCurrWeather(locationKey: string): Promise<any> {
  try {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en&details=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch current weather')

    const weather = await res.json()
    return weather
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

async function getUserLocation(): Promise<GeolocationPosition> {
  try {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  } catch (error) {
    console.error('Error getting user location:', error)
    throw error
  }
}
