'use client';
import { FormState } from "@/interfaces/interface";
import { ChangeEvent, useState } from "react"

export const useForm = (initialForm: FormState = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormState({
                ...formState,
                [parent]: {
                    ...(formState[parent] as object),
                    [child]: value,
                },
            });
        } else {
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    }

    return {
        onInputChange,
        setFormState,
        formState
    }
}