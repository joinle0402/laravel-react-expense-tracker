import type { Control, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

export type OptionToggleItem<TValue extends string | number = string> = {
	label: string;
	value: TValue;
	icon?: ReactNode;
};

type OptionToggleFieldProps<TFieldValues extends FieldValues, TValue extends string | number = string> = {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	label?: string;
	options: OptionToggleItem<TValue>[];
	disabled?: boolean;
	fullWidth?: boolean;
};

export default function OptionToggleField<TFieldValues extends FieldValues, TValue extends string | number = string>({
	name,
	control,
	label,
	options,
	disabled = false,
	fullWidth = true,
}: OptionToggleFieldProps<TFieldValues, TValue>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl fullWidth={fullWidth} error={!!fieldState.error}>
					{label && (
						<Typography
							variant="caption"
							sx={{
								mb: 0.75,
								fontWeight: 700,
								letterSpacing: 1,
								textTransform: 'uppercase',
								color: 'text.secondary',
							}}
						>
							{label}
						</Typography>
					)}

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: `repeat(${options.length}, 1fr)`,
							border: '1px solid',
							borderColor: fieldState.error ? 'error.main' : 'divider',
							borderRadius: 2,
							overflow: 'hidden',
							bgcolor: 'background.paper',
						}}
					>
						{options.map((option, index) => {
							const selected = field.value === option.value;

							return (
								<ButtonBase
									key={option.value}
									disabled={disabled}
									onClick={() => field.onChange(option.value)}
									sx={{
										minHeight: 44,
										px: 2,
										gap: 1,
										fontSize: 14,
										fontWeight: selected ? 700 : 500,
										color: selected ? 'primary.main' : 'text.secondary',
										bgcolor: selected ? 'primary.50' : 'transparent',
										borderRight: index < options.length - 1 ? '1px solid' : 'none',
										borderColor: fieldState.error ? 'error.main' : 'divider',
										transition: 'all 0.15s ease',
										opacity: disabled ? 0.6 : 1,

										'&:hover': {
											bgcolor: disabled ? undefined : selected ? 'primary.50' : 'action.hover',
										},

										...(selected && {
											boxShadow: 'inset 0 0 0 1px',
											boxShadowColor: 'primary.main',
										}),
									}}
								>
									{option.icon}

									<Box component="span">{option.label}</Box>
								</ButtonBase>
							);
						})}
					</Box>

					{fieldState.error?.message && <FormHelperText>{fieldState.error.message}</FormHelperText>}
				</FormControl>
			)}
		/>
	);
}
