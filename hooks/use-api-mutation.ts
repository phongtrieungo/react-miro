import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";

export const useApiMutation = (mutationFunc: FunctionReference<any>) => {
	const [pending, setPending] = useState(false);
	const apiMutation = useMutation(mutationFunc);

	const mutate = (payload: any) => {
		setPending(true);
		return apiMutation(payload)
			.then((result) => result)
			.finally(() => setPending(false))
			.catch((error) => { throw error })
	};

	return {
		mutate,
		pending
	}
};