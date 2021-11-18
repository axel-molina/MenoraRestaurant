import { icons, images } from "./";

const myProfile = {
  name: "Emiliano Cassoni",
  profile_image: images.profile,
  address: "Corrientes, Corrientes",
};

const categories = [
  {
    id: 1,
    name: "Burger",
    icon: icons.burger,
  },
  {
    id: 2,
    name: "Pizzas",
    icon: icons.pizza,
  },
  {
    id: 3,
    name: "Mexicana",
    icon: icons.tacos,
  },
  {
    id: 4,
    name: "Panchos",
    icon: icons.hotdog,
  },
];

const hamburger = {
  id: 1,
  name: "Hamburgesa",
  description: "Chicken patty hamburger",
  categories: [1],
  price: 15.99,
  isFavourite: true,
  image: require("../assets/dummyData/hamburger.png"),
};

const hamburger2 = {
  id: 2,
  name: "hamburger2",
  description: "Chicken patty hamburger",
  categories: [1],
  price: 15.99,
  isFavourite: true,
  image: require("../assets/dummyData/hamburger2.png"),
};

const hamburger3 = {
  id: 3,
  name: "hamburger3",
  description: "Chicken patty hamburger",
  categories: [1],
  price: 15.99,
  isFavourite: true,
  image: require("../assets/dummyData/hamburger3.png"),
};

const hamburger4 = {
  id: 4,
  name: "hamburger4",
  description: "Chicken patty hamburger",
  categories: [1],
  price: 15.99,
  isFavourite: true,
  image: require("../assets/dummyData/hamburger4.png"),
};

const hotTacos = {
  id: 5,
  name: "Tacos Picantes",
  description: "Mexican tortilla & tacos",
  categories: [3],
  price: 10.99,
  isFavourite: false,
  image: require("../assets/dummyData/hot_tacos.png"),
};

const vegBiryani = {
  id: 6,
  name: "Pizza 1",
  description: "Pizza nappolitana",
  categories: [2],
  price: 10.99,
  isFavourite: true,
  image: require("../assets/dummyData/pizza.png"),
};

const vegBiryani2 = {
  id: 7,
  name: "Pizza 2",
  description: "Pïzza con morron",
  categories: [2],
  price: 10.99,
  isFavourite: false,
  image: require("../assets/dummyData/pizza2.png"),
};

const vegBiryani3 = {
  id: 8,
  name: "Ensalada Veg3",
  description: "Indian Vegetable Biryani",
  categories: [2],
  price: 10.99,
  isFavourite: true,
  image: require("../assets/dummyData/veg_biryani.png"),
};

const wrapSandwich = {
  id: 9,
  name: "Wrap Sandwich",
  description: "Grilled vegetables sandwich",
  categories: [3],
  price: 10.99,
  isFavourite: true,
  image: require("../assets/dummyData/wrap_sandwich.png"),
};

const hot_dogs = {
  id: 10,
  name: "Pancho",
  description: "Panchuque",
  categories: [4],
  price: 10.99,
  isFavourite: true,
  image: require("../assets/dummyData/hot_dogs.png"),
};

const hot_dogs2 = {
    id:11,
    name: "Pancho2",
    description: "Super Panchuque",
    categories: [4],
    price: 10.99,
    isFavourite: true,
    image: require("../assets/dummyData/hot_dogs2.png"),
  };

const menu = [
  {
    id: 1,
    name: "Todos",
    list: [
      hamburger,
      hotTacos,
      vegBiryani,
      vegBiryani2,
      vegBiryani3,
      wrapSandwich,
      hamburger2,
      hamburger3,
      hamburger4,
      hot_dogs,
    ],
  },
  {
    id: 2,
    name: "Populares",
    list: [
      hotTacos,
      vegBiryani,
      wrapSandwich,
      hamburger2,
      hamburger3,
      hamburger4,
      vegBiryani2,
      vegBiryani3,
      hot_dogs,
      hot_dogs2,
    ],
  },
  {
    id: 5,
    name: "Recomendados",
    list: [
      hotTacos,
      vegBiryani,
      wrapSandwich,
      hamburger3,
      hamburger4,
      vegBiryani2,
      hot_dogs,
      hot_dogs2,
    ],
  },
];

export default {
  myProfile,
  categories,
  menu,
};
