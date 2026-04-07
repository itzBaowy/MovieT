export const seedData = {
    users: [
        {
            username: "admin",
            email: "admin@moviet.com",
            password: "hashed_password_placeholder", // Will be hashed in script
            fullName: "System Admin",
            role: "ADMIN"
        },
        {
            username: "user1",
            email: "user1@gmail.com",
            password: "hashed_password_placeholder",
            fullName: "Movie Fan",
            role: "USER"
        }
    ],
    movies: [
        {
            title: "Oppenheimer",
            subTitle: "The world forever changes",
            image: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzhmODhlNjExOWUxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
            background: "https://images6.alphacoders.com/131/1318287.jpeg",
            rating: 8.5,
            duration: 180,
            description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
            director: "Christopher Nolan",
            actors: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
            tags: ["History", "Drama", "Biography"],
            status: "NOW_SHOWING"
        },
        {
            title: "Dune: Part Two",
            subTitle: "Long live the fighters",
            image: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            background: "https://images.alphacoders.com/133/1338575.jpg",
            rating: 8.8,
            duration: 166,
            description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
            director: "Denis Villeneuve",
            actors: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
            tags: ["Sci-Fi", "Action", "Adventure"],
            status: "NOW_SHOWING"
        }
    ]
};
