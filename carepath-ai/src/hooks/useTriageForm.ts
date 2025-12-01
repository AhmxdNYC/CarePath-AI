import { useReducer, FormEvent, useCallback } from 'react';
import { submitTriageForm } from '@/app/triage/utils/api';
import { TriageFormData, TriageResponse } from '@/app/triage/utils/types';

interface TriageFormState {
	symptoms: string;
	age: string;
	goal: string;
	duration: string;
	loading: boolean;
	result: TriageResponse | null;
	error: string | null;
}

type TriageFormAction =
	| { type: 'SET_SYMPTOMS'; payload: string }
	| { type: 'SET_AGE'; payload: string }
	| { type: 'SET_GOAL'; payload: string }
	| { type: 'SET_DURATION'; payload: string }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_RESULT'; payload: TriageResponse | null }
	| { type: 'SET_ERROR'; payload: string | null }
	| { type: 'RESET' };

const initialState: TriageFormState = {
	symptoms: '',
	age: '',
	goal: '',
	duration: '',
	loading: false,
	result: null,
	error: null,
};

function triageFormReducer(
	state: TriageFormState,
	action: TriageFormAction
): TriageFormState {
	switch (action.type) {
		case 'SET_SYMPTOMS':
			return { ...state, symptoms: action.payload };
		case 'SET_AGE':
			return { ...state, age: action.payload };
		case 'SET_GOAL':
			return { ...state, goal: action.payload };
		case 'SET_DURATION':
			return { ...state, duration: action.payload };
		case 'SET_LOADING':
			return { ...state, loading: action.payload };
		case 'SET_RESULT':
			return { ...state, result: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload };
		case 'RESET':
			return initialState;
		default:
			return state;
	}
}

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
	const [state, dispatch] = useReducer(triageFormReducer, initialState);

	const setSymptoms = useCallback((value: string) => {
		dispatch({ type: 'SET_SYMPTOMS', payload: value });
	}, []);

	const setAge = useCallback((value: string) => {
		dispatch({ type: 'SET_AGE', payload: value });
	}, []);

	const setGoal = useCallback((value: string) => {
		dispatch({ type: 'SET_GOAL', payload: value });
	}, []);

	const setDuration = useCallback((value: string) => {
		dispatch({ type: 'SET_DURATION', payload: value });
	}, []);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch({ type: 'SET_LOADING', payload: true });
			dispatch({ type: 'SET_ERROR', payload: null });
			dispatch({ type: 'SET_RESULT', payload: null });

			try {
				const ageNum = parseInt(state.age, 10);
				if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
					throw new Error('Age must be a number between 1 and 120');
				}

				const formData: TriageFormData = {
					symptoms: state.symptoms,
					age: ageNum,
					goal: state.goal,
					duration: state.duration,
				};

				const data = await submitTriageForm(formData);
				dispatch({ type: 'SET_RESULT', payload: data });
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'An error occurred';
				dispatch({ type: 'SET_ERROR', payload: errorMessage });
			} finally {
				dispatch({ type: 'SET_LOADING', payload: false });
			}
		},
		[state.symptoms, state.age, state.goal, state.duration]
	);

	const reset = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, []);

	return {
		symptoms: state.symptoms,
		age: state.age,
		goal: state.goal,
		duration: state.duration,
		loading: state.loading,
		result: state.result,
		error: state.error,
		setSymptoms,
		setAge,
		setGoal,
		setDuration,
		handleSubmit,
		reset,
	};
}
