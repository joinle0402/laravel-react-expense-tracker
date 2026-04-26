import { useEffect, useRef, useState } from 'react';

type UseCountdownReturn = {
	countdown: number;
	isCounting: boolean;
	isFinished: boolean;
	start: (seconds?: number) => void;
	stop: () => void;
	reset: (seconds?: number) => void;
};

export default function useCountdown(initialVal = 60): UseCountdownReturn {
	const [countdown, setCountdown] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

	const clearTimer = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const start = (value?: number) => {
		clearTimer();
		setCountdown(value ?? initialVal);
	};
	const stop = () => {
		clearTimer();
	};
	const reset = (value?: number) => {
		clearTimer();
		setCountdown(value ?? 0);
	};

	useEffect(() => {
		if (countdown <= 0) {
			clearTimer();
			return;
		}

		intervalRef.current = setInterval(() => {
			setCountdown((prevState) => {
				if (prevState <= 1) {
					clearTimer();
					return 0;
				}
				return prevState - 1;
			});
		}, 1000);

		return clearTimer;
	}, [countdown]);

	return { countdown, isCounting: countdown > 0, isFinished: countdown === 0, start, stop, reset };
}
