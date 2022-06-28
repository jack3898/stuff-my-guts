import format from 'date-fns/format';

const formats = {
	formal: "do 'of' LLLL, uuuu"
};

export default function formatDate(date: Date, type: keyof typeof formats = 'formal') {
	return format(date, formats[type]);
}
