import { useId, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import cx from 'classnames';

interface Props
	extends React.InputHTMLAttributes<HTMLInputElement>,
		FieldRenderProps<string, HTMLElement> {
	className?: string;
	icon?: React.ReactNode;
	label?: string;
}

const InputForm: React.FC<Props> = ({ className, icon, label, input, meta, ...props }) => {
	const id = useId();
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<div className={cx(className)}>
			{label && <label htmlFor={id}>{label}</label>}
			<div
				className={cx(
					'flex items-center gap-2 p-3 ring-inset',
					isFocused ? 'ring-2 ring-primary-600' : 'ring-1 ring-inactive'
				)}
			>
				{icon && icon}
				<input
					{...input}
					className='flex-grow text-sm placeholder:text-inactive'
					id={id}
					onFocus={() => {
						setIsFocused(true);
						input.onFocus();
					}}
					onBlur={() => {
						setIsFocused(false);
						input.onBlur();
					}}
					{...props}
				/>
			</div>
			{meta.error && meta.touched && <p className='mt-1 px-3 text-xs text-error'>{meta.error}</p>}
		</div>
	);
};

export default InputForm;
