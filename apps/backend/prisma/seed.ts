import { prismaSeederClient, seedable } from '@mealideas/schemas';

Promise.all(
	seedable.map(async (seed) => {
		while (true) {
			// Sometimes foreign key constraints may cause the seed to fail first time.
			try {
				const seedName = await seed();

				console.log(`🌱 - seeded '${seedName}'!`);

				break;
			} catch (error: any) {
				if (!String(error).includes('Foreign key constraint failed')) throw error;

				console.info(
					'WARN: Forign key constraint problem. Retrying in 1 second... If this message persists for too long, there is a problem.'
				);

				await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
			}
		}
	})
)
	.then(() => {
		console.log('✅ Database has been seeded!');
		prismaSeederClient.$disconnect();
		process.exit(0);
	})
	.catch((error) => {
		const message = ['Database seeding failed!', '⬇️⬇️⬇️', error, '⬆️⬆️⬆️'];

		console.error(message.join('\n\n'));
		prismaSeederClient.$disconnect();
		process.exit(1);
	});
