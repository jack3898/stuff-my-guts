import { Results } from 'depcheck';

export default function callback(unused: Results, projectName: string) {
	if (!unused.dependencies.length) {
		process.exit(0);
	}

	console.error('Oh no, we found some unused dependencies!');
	console.error('Please check the following project:', projectName, '\n');
	console.error('Unused dependencies:\n');
	console.error(unused.dependencies.map((depName) => ` - ${depName}`).join('\n'), '\n\n');

	process.exit(1);
}
