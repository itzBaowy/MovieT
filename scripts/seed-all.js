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
