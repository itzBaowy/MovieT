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
        },
        {
            title: "Kung Fu Panda 4",
            subTitle: "Po's next adventure",
            image: "https://m.media-amazon.com/images/M/MV5BZjZlOTBiMDItODM4Yi00ZjJhLWE1NmItYzJiNTFiZDkzMTMyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            background: "https://images8.alphacoders.com/135/1352932.jpeg",
            rating: 7.2,
            duration: 94,
            description: "After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior, while a wicked sorceress plans to re-summon all the master villains whom Po has vanquished to the spirit realm.",
            director: "Mike Mitchell",
            actors: ["Jack Black", "Awkwafina", "Viola Davis"],
            tags: ["Animation", "Action", "Adventure"],
            status: "NOW_SHOWING"
        },
        {
            title: "Deadpool & Wolverine",
            subTitle: "Two iconic heroes",
            image: "https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDVjZWM0MGQwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            background: "https://images7.alphacoders.com/135/1352462.jpeg",
            rating: 8.7,
            duration: 127,
            description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.",
            director: "Shawn Levy",
            actors: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
            tags: ["Action", "Comedy", "Sci-Fi"],
            status: "COMING_SOON"
        },
        {
            title: "Inside Out 2",
            subTitle: "Make room for new emotions",
            image: "https://m.media-amazon.com/images/M/MV5BYTc1MTQxZjcgYmMyLTM0ZWVlLTg4YTctYzI1NzlkYzg0NThlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            background: "https://images4.alphacoders.com/135/1353282.jpeg",
            rating: 8.3,
            duration: 100,
            description: "Follows Riley, in her teenage years, encountering new emotions.",
            director: "Kelsey Mann",
            actors: ["Amy Poehler", "Maya Hawke", "Kensington Tallman"],
            tags: ["Animation", "Adventure", "Comedy"],
            status: "COMING_SOON"
        },
        {
            title: "Lật Mặt 7: Một Điều Ước",
            subTitle: "A mother's wish",
            image: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
            background: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2000&auto=format",
            rating: 8.0,
            duration: 132,
            description: "A touching story about a mother and her children facing family difficulties.",
            director: "Ly Hai",
            actors: ["Ly Hai", "Thanh Thuc", "Kinh Quoc"],
            tags: ["Drama", "Family"],
            status: "NOW_SHOWING"
        },
        {
            title: "The Roundup: Punishment",
            subTitle: "Vây Hãm: Kẻ Trừng Phạt",
            image: "https://m.media-amazon.com/images/M/MV5BZThiMmExNmItODVlZC00OWQxLTkyMmYtNzVlZDliYmFlZmNmXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
            background: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2000&auto=format",
            rating: 8.2,
            duration: 128,
            description: "Det. Ma Seok-do joins the Cyber Investigation Team to catch an online gambling syndicates organizer.",
            director: "Heo Myeong-haeng",
            actors: ["Ma Dong-seok", "Kim Mu-yeol", "Park Ji-hwan"],
            tags: ["Action", "Crime"],
            status: "NOW_SHOWING"
        }
    ],
    cinemas: [
        {
            name: "Galaxy Nguyen Du",
            address: "116 Nguyen Du, District 1",
            city: "Ho Chi Minh"
        },
        {
            name: "CGV Vincom Landmark 81",
            address: "772 Dien Bien Phu, Binh Thanh District",
            city: "Ho Chi Minh"
        },
        {
            name: "Lotte Cinema Go Vap",
            address: "242 Nguyen Van Luong, Go Vap District",
            city: "Ho Chi Minh"
        }
    ]
};
