import { PrismaClient as AuthClient } from '../auth-service/generated/prisma/client/index.js';
import { PrismaClient as MovieClient } from '../movie-service/generated/prisma/client/index.js';
import { seedData } from '../shared/data/seed.data.js';
import bcrypt from 'bcryptjs';

const authPrisma = new AuthClient();
const moviePrisma = new MovieClient();

async function main() {
    console.log('🌱 Starting seeding process...');

    // 1. Seed Users
    console.log('👤 Seeding Users...');
    const hashedPassword = await bcrypt.hash('123456', 10);
    for (const userData of seedData.users) {
        await authPrisma.user.upsert({
            where: { username: userData.username },
            update: {},
            create: {
                ...userData,
                password: hashedPassword
            }
        });
    }

    // 2. Seed Movies
    console.log('🎬 Seeding Movies...');
    for (const movieData of seedData.movies) {
        const existingMovie = await moviePrisma.movie.findFirst({
            where: { title: movieData.title }
        });

        if (existingMovie) {
            await moviePrisma.movie.update({
                where: { id: existingMovie.id },
                data: movieData
            });
        } else {
            await moviePrisma.movie.create({
                data: movieData
            });
        }
    }

    // 3. Seed Cinemas
    console.log('🏛️ Seeding Cinemas...');
    for (const cinemaData of seedData.cinemas) {
        const existingCinema = await moviePrisma.cinema.findFirst({
            where: { name: cinemaData.name }
        });

        if (existingCinema) {
            await moviePrisma.cinema.update({
                where: { id: existingCinema.id },
                data: cinemaData
            });
        } else {
            await moviePrisma.cinema.create({
                data: cinemaData
            });
        }
    }

    // 4. Seed Showtimes
    console.log('⏰ Seeding Showtimes...');
    // Clear existing showtimes to avoid duplicates on re-seed
    await moviePrisma.showtime.deleteMany({});
    
    const allMovies = await moviePrisma.movie.findMany({ where: { status: 'NOW_SHOWING' } });
    const allCinemas = await moviePrisma.cinema.findMany({});
    
    const today = new Date();
    const dateStrings = [
        today.toISOString().split('T')[0], 
        new Date(today.getTime() + 86400000).toISOString().split('T')[0]
    ];
    
    // Add some random showtimes
    for (const movie of allMovies.slice(0, 4)) {
        for (const cinema of allCinemas) {
            for (const date of dateStrings) {
                // Two showtimes per day per cinema per movie
                const showtimesToCreate = [
                    { time: '14:30', format: 'IMAX 2D', price: 120000 },
                    { time: '19:45', format: '3D', price: 150000 }
                ];
                
                for (const st of showtimesToCreate) {
                    await moviePrisma.showtime.create({
                        data: {
                            movieId: movie.id,
                            cinemaId: cinema.id,
                            date: date,
                            time: st.time,
                            format: st.format,
                            price: st.price,
                            // Pre-fill some booked seats for testing SeatsPage
                            bookedSeats: ['D5', 'D6', 'H1', 'H2', 'C4']
                        }
                    });
                }
            }
        }
    }

    console.log('✅ Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await authPrisma.$disconnect();
        await moviePrisma.$disconnect();
    });
