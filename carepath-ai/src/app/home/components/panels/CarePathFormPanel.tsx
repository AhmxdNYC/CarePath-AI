'use client';

import { FormEvent, useState } from 'react';
import TriageForm from '@/app/triage/components/TriageForm';
import CarePathwayResults from '@/app/triage/components/CarePathwayResults';
import ErrorDisplay from '@/app/triage/components/ErrorDisplay';
import { submitTriageForm } from '@/app/triage/utils/api';
import { TriageResponse } from '@/app/triage/utils/types';

export default function CarePathFormPanel() {
	const [symptoms, setSymptoms] = useState('');
	const [age, setAge] = useState('');
	const [goal, setGoal] = useState('');
	const [duration, setDuration] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TriageResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const data = await submitTriageForm({
				symptoms,
				age: parseInt(age, 10),
				goal,
				duration,
			});
			setResult(data);
		} catch (err) {
			setResult(null);
			setError(err instanceof Error ? err.message : 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
				<TriageForm
					symptoms={symptoms}
					age={age}
					goal={goal}
					duration={duration}
					loading={loading}
					onSymptomsChange={setSymptoms}
					onAgeChange={setAge}
					onGoalChange={setGoal}
					onDurationChange={setDuration}
					onSubmit={handleSubmit}
				/>

				{error && <ErrorDisplay error={error} />}

				{result && (
					<div className='mt-6'>
						<CarePathwayResults result={result} />
					</div>
				)}
			</div>
		</div>
	);
}
