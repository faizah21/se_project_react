export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const weatherOptions = [
  {
    day: true,
    condition: "Sunny",
    url: new URL("../assets/Day/Sunny.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "Sunny",
    url: new URL("../assets/Night/Sunny.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/Day/Cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/Night/Cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/Day/Rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/Night/Rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Storm",
    url: new URL("../assets/Day/Storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Storm",
    url: new URL("../assets/Night/Storm.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/Day/Snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/Night/Snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "Fog",
    url: new URL("../assets/Day/Fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "Fog",
    url: new URL("../assets/Night/Fog.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/Day/Clear.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/Night/Night.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 40.712776,
  longitude: -74.005974,
};
export const APIkey = "278ae1b8e4e4e6b9acc0ea52c5e7e53f";
