import React from 'react';

export default function TimePickers() {

    return (
        <form noValidate>
            <input
                id="time"
                label="Time"
                type="time"
                defaultValue="19:30"
                inputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
        </form>
    );
}
