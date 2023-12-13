import { useId, useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import cx from 'classnames';
import useClickOutside from '@/hooks/useClickOutside';

interface Props extends FieldRenderProps<string, HTMLElement> {
	className?: string;
	icon?: React.ReactNode;
	label?: string;
	options?: { label: string; value: string }[];
}

const SelectForm: React.FC<Props> = ({ className, icon, label, options = [], input, meta }) => {
	const id = useId();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useClickOutside(() => setIsOpen(false));

	const handleClick = (value: any) => {
		input.onChange(value);
		setIsOpen(false);
	};

	return (
		<div className={cx(className, 'relative')} ref={ref}>
			{label && <label htmlFor={id}>{label}</label>}
			<div
				className={cx(
					'flex w-full cursor-pointer items-center gap-2 p-3 ring-inset',
					isOpen ? 'ring-2 ring-primary-600' : 'ring-1 ring-inactive'
				)}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{icon && icon}
				<p
					className={cx(
						'flex-grow whitespace-nowrap text-sm',
						input.value ? 'text-white' : 'text-inactive'
					)}
				>
					{input.value || 'Please select'}
				</p>
			</div>
			<div
				className={cx(
					'absolute -bottom-1 left-0 z-10 w-full translate-y-full bg-white py-1 shadow transition',
					isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
				)}
			>
				{options.map((option) => (
					<div
						className='cursor-pointer truncate px-3 py-2 text-sm hover:bg-primary-300 hover:text-white'
						key={option.value}
						onClick={() => handleClick(option.value)}
					>
						{option.label}
					</div>
				))}
			</div>
			{meta.error && meta.touched && <p className='mt-1 px-3 text-xs text-error'>{meta.error}</p>}
		</div>
	);
};

export default SelectForm;
