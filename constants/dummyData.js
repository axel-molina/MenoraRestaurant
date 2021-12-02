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
  description: "American Burguer",
  categories: [1],
  price: '$15.99',
  isFavourite: true,
  image: require("../assets/dummyData/hamburger.png"),
};

const hamburger2 = {
  id: 2,
  name: "hamburger2",
  description: "Chicken patty hamburger",
  categories: [1],
  price: '$15.99',
  isFavourite: true,
  image: require("../assets/dummyData/hamburger2.png"),
};

const hamburger3 = {
  id: 3,
  name: "hamburger3",
  description: "Chicken patty hamburger",
  categories: [1],
  price: '$15.99',
  isFavourite: true,
  image: require("../assets/dummyData/hamburger3.png"),
};

const hamburger4 = {
  id: 4,
  name: "hamburger4",
  description: "Chicken patty hamburger ",
  categories: [1],
  price: '$15.99',
  isFavourite: true,
  image: require("../assets/dummyData/hamburger4.png"),
};

const hotTacos = {
  id: 5,
  name: "Tacos Picantes",
  description: "Mexican tortilla & tacos",
  categories: [3],
  price: '$10.99',
  isFavourite: false,
  image: require("../assets/dummyData/hot_tacos.png"),
};

const vegBiryani = {
  id: 6,
  name: "Pizza 1",
  description: "Pizza nappolitana",
  categories: [2],
  price: '$10.99',
  isFavourite: true,
  image: require("../assets/dummyData/pizza.png"),
};

const vegBiryani2 = {
  id: 7,
  name: "Pizza 2",
  description: "Pïzza con morron",
  categories: [2],
  price: '$10.99',
  isFavourite: false,
  image: require("../assets/dummyData/pizza2.png"),
};

const vegBiryani3 = {
  id: 8,
  name: "Ensalada Veg3",
  description: "Indian Vegetable Biryani",
  categories: [2],
  price: '$10.99',
  isFavourite: true,
  image: require("../assets/dummyData/veg_biryani.png"),
};

const wrapSandwich = {
  id: 9,
  name: "Wrap Sandwich",
  description: "Grilled vegetables sandwich",
  categories: [3],
  price: '$10.99',
  isFavourite: true,
  image: require("../assets/dummyData/wrap_sandwich.png"),
};

const hot_dogs = {
  id: 10,
  name: "Pancho",
  description: "Panchuque",
  categories: [4],
  price: '$10.99',
  isFavourite: true,
  image: require("../assets/dummyData/hot_dogs.png"),
};

const hot_dogs2 = {
    id:11,
    name: "Pancho2",
    description: "Super Panchuque",
    categories: [4],
    price: '$10.99',
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


const sizes = [
  {
    id: 1,
    name: "Carne",
    icon: icons.Carne,
  },
  {
    id: 2,
    name: "Lechuga",
    icon: icons.Lechuga,
  },
  {
    id: 3,
    name: "Salsa Jack",
    icon: icons.SalsaJack,
  },
  {
    id: 4,
    name: "Cebolla morada",
    icon: icons.CebollaMorada,
  },
]

const myCart = [
  {
      ...hamburger,
      qty: 1
  },
  {
      ...hotTacos,
      qty: 1
  },
  {
      ...vegBiryani,
      qty: 1
  }
]

const myCards = [
  {
      id: 1,
      name: "Master Card",
      icon: require("../assets/icons/mastercard.png"),
      card_no: "1234"
  },
  {
      id: 2,
      name: "Google Pay",
      icon: require("../assets/icons/google.png"),
      card_no: "1234"
  },
]

const allCards = [
  {
      id: 1,
      name: "Apple Pay",
      icon: require("../assets/icons/apple.png")
  },
  {
      id: 2,
      name: "Visa",
      icon: require("../assets/icons/visa.png"),
  },
  {
      id: 3,
      name: "PayPal",
      icon: require("../assets/icons/paypal.png"),
  },
  {
      id: 4,
      name: "Google Pay",
      icon: require("../assets/icons/google.png"),
  },
  {
      id: 5,
      name: "Master Card",
      icon: require("../assets/icons/mastercard.png"),
  },
]


const fromLocs = [
  {
      latitude: 1.5347282806345879,
      longitude: 110.35632207358996,
  },
  {
      latitude: 1.556306570595712,
      longitude: 110.35504616746915,
  },
  {
      latitude: 1.5238753474714375,
      longitude: 110.34261833833622,
  },
  {
      latitude: 1.5578068150528928,
      longitude: 110.35482523764315,
  },
  {
      latitude: 1.558050496260768,
      longitude: 110.34743759630511,
  },
  {
      latitude: 1.5573478487252896,
      longitude: 110.35568783282145,
  }
]


export default {
  vegBiryani,
  hamburger,
  myProfile,
  categories,
  menu,
  sizes,
  myCart,
  myCards,
  allCards,
  fromLocs,
};
