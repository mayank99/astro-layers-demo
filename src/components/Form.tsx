/** @jsxImportSource solid-js */
import { ComponentProps, createEffect, createResource, createSignal, splitProps } from "solid-js";

type Props = ComponentProps<"form">;

const [formData, setFormData] = createSignal<Record<string, unknown>>();

const [response, { mutate, refetch }] = createResource(formData, async () => {
	const fetchResponse = await fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData()),
	});

	if (fetchResponse.ok) {
		return await fetchResponse.text();
	} else {
		throw new Error("Something went wrong");
	}
});

export { response as formResponse };

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
				if (response.loading) {
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
