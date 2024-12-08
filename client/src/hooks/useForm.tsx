'use client';
import { FormState } from "@/interfaces/interface";
import { ChangeEvent, useState } from "react"

export const useForm =( initialForm: FormState = {} )=>{
    const [ formState , setFormState ] = useState( initialForm );

    const onInputChange =( { target } : ChangeEvent<HTMLInputElement> )=>{
        const { name , value } = target;
        setFormState({
            ...formState,
            [ name ] : value
        })
    }

    return{
        onInputChange,
        formState
    }
}