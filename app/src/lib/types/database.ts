import { z } from 'zod';

const NonEmptyString = z.string().min(1);

export const Scholarship = z.object({
	code: z.string().length(4),
	name: NonEmptyString,
	type: NonEmptyString,
	description: NonEmptyString,
	applicationRequiresAdditionalDocumentation: z.boolean(),
	amount: z
		.string()
		.startsWith('$')
		.transform((v) => {
			// remove dollar sign
			v = v.slice(1);
			// remove comma
			v = v.replaceAll(',', '');
			// convert to number
			return Number(v);
		})
		.nullable(),
	selectionProcess: NonEmptyString,
	applicationMethod: NonEmptyString,
	applyTo: NonEmptyString,
	acceptApplications: z.boolean(),
	applicationsAccepted: z
		.string()
		.regex(
			/^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s\d{2},\s\d{4}\sto\s(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s\d{2},\s\d{4}$/i
		)
		.transform((v) => {
			// split into start and end
			const [start, end] = v.split(' to ');

			// split into month, day, year
			const [startMonth, startDay, startYear] = start.split(' ');
			const [endMonth, endDay, endYear] = end.split(' ');

			// convert month to number
			const monthMap = {
				jan: '01',
				feb: '02',
				mar: '03',
				apr: '04',
				may: '05',
				jun: '06',
				jul: '07',
				aug: '08',
				sep: '09',
				oct: '10',
				nov: '11',
				dec: '12'
			};
			const startMonthNumber = monthMap[startMonth.toLowerCase() as keyof typeof monthMap];
			const endMonthNumber = monthMap[endMonth.toLowerCase() as keyof typeof monthMap];

			// create sortable date
			const startDate = startYear + startMonthNumber + startDay.slice(0, -1);
			const endDate = endYear + endMonthNumber + endDay.slice(0, -1);

			// return as object
			return { start, end, s: Number(startDate), e: Number(endDate) };
		})
		.array()
		.nonempty()
		.nullable(),
	biography: z.string().nullable(),
	programName: z.string().array().nonempty().nullable()
});
export type Scholarship = z.infer<typeof Scholarship>;

export const Scholarships = Scholarship.array();
export type Scholarships = z.infer<typeof Scholarships>;
