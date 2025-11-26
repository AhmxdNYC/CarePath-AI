'use client';

import { FormEvent, useReducer } from 'react';
import TriageForm from '@/app/triage/components/TriageForm';
import CarePathwayResults from '@/app/triage/components/CarePathwayResults';
import ErrorDisplay from '@/app/triage/components/ErrorDisplay';
import { submitTriageForm } from '@/app/triage/utils/api';
import { TriageResponse } from '@/app/triage/utils/types';

interface FormState {
	symptoms: string;
	age: string;
	goal: string;
	duration: string;
	loading: boolean;
	result: TriageResponse | null;
	error: string | null;
}

type FormAction =
	| {
			type: 'UPDATE_FIELD';
			field: 'symptoms' | 'age' | 'goal' | 'duration';
			value: string;
	  }
	| { type: 'SUBMIT_START' }
	| { type: 'SUBMIT_SUCCESS'; result: TriageResponse }
	| { type: 'SUBMIT_ERROR'; error: string }
	| { type: 'RESET' };

const initialState: FormState = {
	symptoms: '',
	age: '',
	goal: '',
	duration: '',
	loading: false,
	result: null,
	error: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return { ...state, [action.field]: action.value };
		case 'SUBMIT_START':
			return { ...state, loading: true, error: null };
		case 'SUBMIT_SUCCESS':
			return { ...state, loading: false, result: action.result, error: null };
		case 'SUBMIT_ERROR':
			return { ...state, loading: false, result: null, error: action.error };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}

export default function CarePathFormPanel() {
	const [state, dispatch] = useReducer(formReducer, initialState);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: 'SUBMIT_START' });

		try {
			const data = await submitTriageForm({
				symptoms: state.symptoms,
				age: parseInt(state.age, 10),
				goal: state.goal,
				duration: state.duration,
			});
			dispatch({ type: 'SUBMIT_SUCCESS', result: data });
		} catch (err) {
			dispatch({
				type: 'SUBMIT_ERROR',
				error: err instanceof Error ? err.message : 'Something went wrong',
			});
		}
	};

	return (
		<div className='space-y-6'>
			<div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
				<TriageForm
					symptoms={state.symptoms}
					age={state.age}
					goal={state.goal}
					duration={state.duration}
					loading={state.loading}
					onSymptomsChange={(value) =>
						dispatch({ type: 'UPDATE_FIELD', field: 'symptoms', value })
					}
					onAgeChange={(value) =>
						dispatch({ type: 'UPDATE_FIELD', field: 'age', value })
					}
					onGoalChange={(value) =>
						dispatch({ type: 'UPDATE_FIELD', field: 'goal', value })
					}
					onDurationChange={(value) =>
						dispatch({ type: 'UPDATE_FIELD', field: 'duration', value })
					}
					onSubmit={handleSubmit}
				/>

				{state.error && <ErrorDisplay error={state.error} />}

				{state.result && (
					<div className='mt-6'>
						<CarePathwayResults result={state.result} />
					</div>
				)}
			</div>
		</div>
	);
}
