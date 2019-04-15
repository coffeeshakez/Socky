



export function handleSelection(number, min, max, modifier) {
    

    if (((number + modifier) < max) && (number + modifier >= min)) {
        console.log("Returning from handleSelection", (number + modifier))
        return (number + modifier);
    }
    return number;
}
