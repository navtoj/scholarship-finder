import { z } from 'zod';

const NonEmptyString = z.string().min(1);

export const Scholarships = z
	.object({
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
			.regex(/^\w{3}\s\d{2},\s\d{4}\sto\s\w{3}\s\d{2},\s\d{4}$/)
			.transform((v) => {
				// split into start and end
				const [start, end] = v.split(' to ');
				// return as object
				return { start, end };
			})
			.array()
			.nonempty()
			.nullable(),
		biography: z.string().nullable()
	})
	.array();
export type Scholarships = z.infer<typeof Scholarships>;
