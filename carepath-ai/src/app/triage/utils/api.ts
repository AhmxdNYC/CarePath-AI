import { TriageFormData, TriageResponse } from './types';

export async function submitTriageForm(
	data: TriageFormData
): Promise<TriageResponse> {
	const response = await fetch('/api/triage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || 'Failed to get care pathway');
	}

	return await response.json();
}
