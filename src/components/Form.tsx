/** @jsxImportSource solid-js */
import { ComponentProps, createEffect, splitProps } from "solid-js";
import { formResponse, setFormData } from "~/utils/formResponse";

type Props = ComponentProps<"form">;

export default (props: Props) => {
	const [local, rest] = splitProps(props, ["children"]);
	let formRef: HTMLFormElement | undefined;

	createEffect(() => {
		if (!formRef) {
			return;
		}

		// disable all form elements when loading
		Object.values(formRef.elements)
			.filter((field) => field instanceof Element)
			.forEach((field) => {
				if (formResponse.loading) {
					field.setAttribute("disabled", "true");
				} else {
					field.removeAttribute("disabled");
				}
			});
	});

	return (
		<form
			ref={formRef}
			onSubmit={(e) => {
				e.preventDefault();
				setFormData(Object.fromEntries(new FormData(e.currentTarget)));
			}}
			{...rest}
		>
			{local.children}
		</form>
	);
};
