export interface TriageResponse {
	summary?: string;
	possible_causes?: string;
	recommended_steps?: string;
	suggested_labs?: string;
	red_flags?: string;
	education?: string;
	content?: string;
}

export interface TriageFormData {
	symptoms: string;
	age: number;
	goal: string;
	duration: string;
}
