import React from "react";

interface Props {
    value: string;
    label: string;
    options: string[];
    register: any;
    errors: any;
}

export const Select: React.FC<Props> = ({
    value,
    label,
    options,
    register,
    errors,
}) => {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={value}
                className="text-mutedDark font-semibold text-xs p-1 dark:text-white"
            >
                {label}&nbsp;
                <span className="text-vibrant">*</span>
            </label>
            <select
                {...register(value, {
                    onChange: (e: any) => {
                        e.target.classList.add("text-muted", "dark:text-white");
                        e.target.classList.remove("italic", "text-mutedLight");
                    },
                })}
                autoComplete="off"
                defaultValue=""
                className="text-mutedLight italic w-full font-semibold rounded-lg dark:bg-vibrantDark outline outline-1 outline-muted text-xs p-2"
            >
                <option value="" disabled className="hidden">
                    {label}
                </option>
                {options.map((option) => (
                    <option
                        value={option}
                        key={option}
                        className="text-mutedDark not-italic dark:text-white"
                    >
                        {option}
                    </option>
                ))}
            </select>
            {errors && (
                <span className="text-xs font-normal text-redAlert">
                    {errors.message}
                </span>
            )}
        </div>
    );
};
