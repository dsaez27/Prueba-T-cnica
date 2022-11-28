import React from "react";
import { formatRut } from "rutlib/lib";

interface Props {
    label: string;
    value: string;
    placeholder: string;
    register: any;
    errors: any;
    pattern?: string;
}

export const Input: React.FC<Props> = ({
    label,
    value,
    placeholder,
    register,
    errors,
    pattern,
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
            <input
                type="text"
                id={value}
                placeholder={placeholder}
                {...register(value, {
                    onChange: (e: any) => {
                        if (value === "rut") {
                            e.target.value = formatRut(e.target.value);
                            e.target.value === "-" && (e.target.value = "");
                        } else if (value === "codigo_postal") {
                            e.target.value === NaN
                                ? ""
                                : parseInt(e.target.value);
                        }
                    },
                })}
                pattern={pattern}
                className="w-9/12 md:w-full font-semibold rounded-lg dark:bg-vibrantDark outline outline-1 outline-muted text-muted dark:text-white placeholder:text-mutedLight placeholder:font-semibold placeholder:italic text-xs p-2"
            />
            {errors && (
                <span className="text-xs font-normal text-redAlert">
                    {errors.message}
                </span>
            )}
        </div>
    );
};
