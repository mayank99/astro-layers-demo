import { createResource, createSignal } from "solid-js";

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

export { setFormData, response as formResponse };
