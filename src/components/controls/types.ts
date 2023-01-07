import type { Writable } from 'svelte/store';

export type ControlType = 'slider' | 'checkbox' | 'select' | 'radio';

export type ControlBase<T> = {
	type: ControlType;
	label: string;
	writable: Writable<T>;
};

export type CheckboxControlProps = ControlBase<boolean> & {
	type: 'checkbox';
};

export type SelectControlProps = ControlBase<string> & {
	type: 'select';
	options: { label: string; value: string }[];
};

export type RadioGroupControlProps = ControlBase<string> & {
	type: 'radio';
	options: { label: string; value: string }[];
};

export type SliderControlProps = ControlBase<number> & {
	type: 'slider';
	min?: number;
	max?: number;
	step?: number;
	throttle?: number;
};

export type Control =
	| CheckboxControlProps
	| SelectControlProps
	| RadioGroupControlProps
	| SliderControlProps;
