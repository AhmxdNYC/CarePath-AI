import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { symptoms, age, goal, duration } = body;

		// Validate required fields
		if (!symptoms || !age || !goal || !duration) {
			return NextResponse.json(
				{
					error:
						'Missing required fields: symptoms, age, goal, and duration are required',
				},
				{ status: 400 }
			);
		}

		// Validate age is a number
		if (typeof age !== 'number' || age < 1 || age > 120) {
			return NextResponse.json(
				{ error: 'Age must be a number between 1 and 120' },
				{ status: 400 }
			);
		}

		// Call the FastAPI backend
		const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
		const response = await fetch(`${backendUrl}/triage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				symptoms,
				age,
				goal,
				duration,
			}),
		});

		if (!response.ok) {
			const errorData = await response.text();
			return NextResponse.json(
				{ error: `Backend error: ${errorData}` },
				{ status: response.status }
			);
		}

		const data = await response.json();

		// Parse the JSON content from the OpenAI response
		// The backend returns: { content: "..." } where content is a JSON string
		let parsedContent;
		try {
			parsedContent = JSON.parse(data.content || data);
		} catch {
			// If parsing fails, return the content as-is
			parsedContent = data.content || data;
		}

		return NextResponse.json(parsedContent);
	} catch (error) {
		console.error('Error calling backend:', error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : 'Internal server error',
			},
			{ status: 500 }
		);
	}
}
