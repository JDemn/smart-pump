import { BTN } from "@/interfaces/interface"
import { Button } from "@mui/material"

export const Buton = ({ method , icon , text } : BTN) => {
    return (
        <Button
            variant="outlined"
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={method}
        >
            {icon}
            { text }
        </Button>
    )
}