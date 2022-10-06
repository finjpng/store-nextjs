const UserList = [
  {
    id: 1,
    name: "John",
    username: "john",
    email: "john@email.com",
    password: "1234",
    token: "",
    // age: 20,
    // nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        // age: 20,
        // nationality: "BRAZIL",
      },
      {
        id: 5,
        name: "Kelly",
        username: "kelly2019",
        // age: 5,
        // nationality: "CHILE",
      },
    ],
  },
  {
    id: 2,
    name: "Pedro",
    username: "PedroTech",
    email: "pedro@email.com",
    password: "1234",
    token: "",
    // age: 20,
    // nationality: "BRAZIL",
  },
  {
    id: 3,
    name: "Sarah",
    username: "cameron",
    email: "sarah@email.com",
    password: "1234",
    token: "",
    // age: 25,
    // nationality: "INDIA",
    friends: [
      {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        // age: 20,
        // nationality: "BRAZIL",
      },
    ],
  },
  {
    id: 4,
    name: "Rafe",
    username: "rafe123",
    email: "rafe@email.com",
    password: "1234",
    token: "",
    // age: 60,
    // nationality: "GERMANY",
  },
  {
    id: 5,
    name: "Kelly",
    username: "kelly2019",
    email: "kelly@email.com",
    password: "1234",
    token: "",
    // age: 5,
    // nationality: "CHILE",
  },
];
const MovieList = [
  {
    id: 1,
    name: "Avatar",
    image: "https://media.gv.com.sg/imagesresize/img3164.jpg",
    release: 2022,
    director: "James Cameron",
    genre: [
      {
        g1: "Action",
        g2: "Adventure",
      },
    ],
    casts: [
      {
        cast1: "Sam Worthington",
        cast2: "Zoe Saldana",
      },
    ],
    synopsis:
      "James Cameron's Academy Award®-winning 2009 epic adventure \"Avatar\", returns to theaters on September 22.On the lush alien world of Pandora live the Na'vi, beings who appear primitive but are highly evolved. Because the planet's environment is poisonous, human/Na'vi hybrids, called Avatars, must link to human minds to allow for free movement on Pandora. Jake Sully (Sam Worthington), a paralyzed former Marine, becomes mobile again through one such Avatar and falls in love with a Na'vi woman (Zoe Saldana). As a bond with her grows, he is drawn into a battle for the survival of her world.",
  },
  {
    id: 2,
    name: "Jurrasic World Dominion",
    // image: "https://media.gv.com.sg/imagesresize/img3080.jpg",
    release: 2022,
    director: "Colin Trevorrow",
    genre: [
      {
        g1: "Action",
        g2: "Adventure",
      },
    ],
    casts: [
      {
        cast1: "Chris Pratt",
        cast2: "Bryce Dallas Howard",
      },
    ],
    synopsis:
      "In the epic conclusion to the Jurassic era, two generations unite for the first time as Chris Pratt and Bryce Dallas Howard are joined by Laura Dern, Jeff Goldblum and Sam Neill in a bold, timely and breathtaking new adventure that spans the globe. Four years after Isla Nublar has been destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
  },
  {
    id: 3,
    name: "Minions 2: The Rise of Gru",
    // image: "https://media.gv.com.sg/imagesresize/img6800.jpg",
    release: 2022,
    director: "Kyle Balda",
    genre: [
      {
        g1: "Animation",
      },
    ],
    casts: [
      {
        cast1: "Steve Carell",
        cast2: "Taraji P. Henson",
      },
    ],
    synopsis:
      "From the biggest animated franchise in history and global cultural phenomenon comes the untold story of one 12-year-old’s dream to become the world’s greatest supervillain. In the 1970s, Gru (Steve Carell) is growing up in the suburbs. A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them, with the backup of his followers, the Minions. When the Vicious 6 oust their leader, Gru interviews to become their newest member. It doesn’t go well (to say the least), and Gru suddenly finds himself the mortal enemy of the apex of evil.",
  },
];

const ProductsList = [
  {
    id: 1,
    productName: "Laptop Bag",
    image: "https://m.media-amazon.com/images/I/61MUbvslk2L._AC_SX679_.jpg",
    quantity: 5,
    price: 500,
    description: "Black laptop backpack",
  },
  {
    id: 2,
    productName: "Monitor",
    image: "https://m.media-amazon.com/images/I/61DtCZXjgUS._AC_SX679_.jpg",
    quantity: 2,
    price: 1000,
    description: "LED 20 inch monitor",
  },
];

const RegisteredUsers = [
  {
    id: 1,
    name: "Pedro",
    username: "uname",
    password: "pass",
    email: "test@email.com",
    token: "asdwas",
  },
  {
    id: 2,
    name: "Skips",
    username: "skips",
    password: "123",
    email: "test123@email.com",
    token: "asdwas",
  },
];

module.exports = { UserList, MovieList, ProductsList, RegisteredUsers };
