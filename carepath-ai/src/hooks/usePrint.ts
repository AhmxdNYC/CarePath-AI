import { useCallback, useEffect } from 'react';

interface UsePrintOptions {
	onBeforePrint?: () => void;
	onAfterPrint?: () => void;
	pageTitle?: string;
	restoreTitle?: string;
}

export function usePrint(options: UsePrintOptions = {}) {
	const {
		onBeforePrint,
		onAfterPrint,
		pageTitle,
		restoreTitle = 'CarePath-AI',
	} = options;

	const print = useCallback(() => {
		if (onBeforePrint) {
			onBeforePrint();
		}
		window.print();
		if (onAfterPrint) {
			requestAnimationFrame(() => {
				onAfterPrint();
			});
		}
	}, [onBeforePrint, onAfterPrint]);

	useEffect(() => {
		if (pageTitle) {
			const originalTitle = document.title;
			document.title = pageTitle;

			return () => {
				document.title = restoreTitle || originalTitle;
			};
		}
	}, [pageTitle, restoreTitle]);

	return { print };
}

