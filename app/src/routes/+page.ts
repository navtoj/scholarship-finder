import { Scholarships } from '$lib/types/database';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	// get data
	const response = await fetch('https://navtoj.github.io/ufv-api/scholarships.json');
	const data = await response.json();

	// validate data
	const scholarships = Scholarships.parse(data);

	// return data
	return { scholarships };
}) satisfies PageLoad;
