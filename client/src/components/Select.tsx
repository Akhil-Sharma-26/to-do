import React, { useId } from "react";

function Select({
    options = [],
    label = "",
    className = "",
    ...props
}: any, ref: React.LegacyRef<HTMLSelectElement> | undefined) {
    const id = useId()
    return (
        <>
            <div>
                {label && <label htmlFor={id} className=""></label>}
                <select name=""className={`px-3 py2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className}`} ref={ref} id={id} {...props}>
                    {options?.map((option:any)=>(
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
} 

export default React.forwardRef(Select)