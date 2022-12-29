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
                className="w-full font-semibold rounded-lg dark:bg-vibrantDark outline outline-1 outline-muted text-muted dark:text-white placeholder:text-mutedLight placeholder:font-semibold placeholder:italic text-xs p-2"
                type="text"
                id={value}
                autoComplete="off"
                placeholder={placeholder}
                {...register(value, {
                    onChange: (e: any) => {
                        const str = e.target.value;
                        switch (value) {
                            case "rut":
                                e.target.value = formatRut(str);
                                str === "-" && (e.target.value = "");
                                break;
                            case "codigo_postal":
                                e.target.value = str.replace(/\D/g, "");
                            case "nombres":
                            case "apellido_paterno":
                            case "apellido_materno":
                                const strArr = str.split(" ");
                                const newArr = strArr.map((word: string) => {
                                    return (
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    );
                                });
                                e.target.value = newArr.join(" ");
                                break;
                            default:
                                break;
                        }
                    },
                })}
                pattern={pattern}
            />
            {errors && (
                <span className="text-xs font-normal text-redAlert">
                    {errors.message}
                </span>
            )}
        </div>
    );
};
