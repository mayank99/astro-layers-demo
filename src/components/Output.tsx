/** @jsxImportSource solid-js */
import { createEffect, splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";
import { formResponse } from "~/utils/formResponse";

type Props = ComponentProps<"output"> & {
	successText: string;
	isSuccessful?: boolean;
};

export default (props: Props) => {
	const [local, rest] = splitProps(props, ["successText", "isSuccessful"]);

	const isSuccessful = () => {
		if (formResponse.error || formResponse.loading) {
			return false;
		}
		if (formResponse() || local.isSuccessful) {
			return true;
		}
		return false;
	};

	return (
		<output aria-busy={formResponse.loading} {...rest}>
			{isSuccessful() ? local.successText : ""}
		</output>
	);
};
