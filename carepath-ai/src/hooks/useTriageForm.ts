import { useState, FormEvent, useCallback } from 'react';
import { submitTriageForm } from '@/app/triage/utils/api';
import { TriageFormData, TriageResponse } from '@/app/triage/utils/types';

interface UseTriageFormReturn {
	symptoms: string;
	age: string;
	goal: string;
	duration: string;
	loading: boolean;
	result: TriageResponse | null;
	error: string | null;
	setSymptoms: (value: string) => void;
	setAge: (value: string) => void;
	setGoal: (value: string) => void;
	setDuration: (value: string) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
	reset: () => void;
}

export function useTriageForm(): UseTriageFormReturn {
	const [symptoms, setSymptoms] = useState('');
	const [age, setAge] = useState('');
	const [goal, setGoal] = useState('');
	const [duration, setDuration] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<TriageResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setLoading(true);
			setError(null);
			setResult(null);

			try {
				const ageNum = parseInt(age, 10);
				if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
					throw new Error('Age must be a number between 1 and 120');
				}

				const formData: TriageFormData = {
					symptoms,
					age: ageNum,
					goal,
					duration,
				};

				const data = await submitTriageForm(formData);
				setResult(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'An error occurred';
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		},
		[symptoms, age, goal, duration]
	);

	const reset = useCallback(() => {
		setSymptoms('');
		setAge('');
		setGoal('');
		setDuration('');
		setResult(null);
		setError(null);
		setLoading(false);
	}, []);

	return {
		symptoms,
		age,
		goal,
		duration,
		loading,
		result,
		error,
		setSymptoms,
		setAge,
		setGoal,
		setDuration,
		handleSubmit,
		reset,
	};
}

