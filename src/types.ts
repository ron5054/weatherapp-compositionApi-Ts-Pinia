export interface Favorite {
    city: string
    country: string
    locationKey: string
    weatherData: any[]
  }

export interface DateInfo {
  Date: string
  Day: {
    Icon: number
    IconPhrase: string
    HasPercipitation: boolean
  }
  EpochDate: number
  Link: string
  MobileLink: string
  Night: {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
  }
  Sources: string[]
  Temperature: {
    Maximum: {
      Value: number
      Unit: string
      UnitType: number
    }
    Minimum: {
      Value: number
      Unit: string
      UnitType: number
    }
  }
}

export interface City {
  AdministrativeArea: {
    ID: string
    LocalizedName: string
  }
  Country: {
    ID: string
    LocalizedName: string
  }
  Key: string
  LocalizedName: string
  Rank: number
  Type: string
  Version: number
}

export interface LocationWeather {
  timestamp: number
  locationKey: string
  DailyForecasts: DateInfo[]
}