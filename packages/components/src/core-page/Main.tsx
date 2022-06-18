type MainProps = {
	children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
	return <main className="max-w-4xl mx-auto px-4">{children}</main>;
}
