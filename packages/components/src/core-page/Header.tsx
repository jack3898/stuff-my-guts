type HeaderProps = {
	title: string;
	tagline: string;
};

export default function Header({ title, tagline }: HeaderProps) {
	return (
		<header className="bg-black text-white p-4 text-center mb-4">
			<span className="font-serif font-bold text-2xl">{title}</span> - <em>{tagline}</em>
		</header>
	);
}
