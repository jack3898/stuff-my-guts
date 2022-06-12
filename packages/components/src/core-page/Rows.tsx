type RowsProps = {
	children: React.ReactNode;
};

export default function Rows({ children }: RowsProps) {
	return <div className="grid grid-flow-row gap-8">{children}</div>;
}
