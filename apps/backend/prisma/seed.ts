import { seedable } from '@mealideas/schemas';

Promise.all(
	seedable.map(async (seed) => {
		const seedName = await seed();
		console.log(`🌱 - seeded '${seedName}'!`);
	})
)
	.then(() => {
		console.log('✅ Database has been seeded!');
		process.exit(0);
	})
	.catch((error) => {
		const message = ['Database seeding failed!', '⬇️⬇️⬇️', error, '⬆️⬆️⬆️'];

		console.error(message.join('\n\n'));
		process.exit(1);
	});
