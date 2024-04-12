import { SCHOLARSHIPS_URL } from '$lib/static';
import { Scholarships } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	// fetch scholarships
	const response = await fetch(SCHOLARSHIPS_URL);
	const data = await response.json();
	const scholarships = Scholarships.parse(data);

	// pass data to the app
	return { scholarships };
}) satisfies LayoutLoad;
