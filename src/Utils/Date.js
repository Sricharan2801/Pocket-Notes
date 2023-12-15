const FormattedDate = () => {
    const date = new Date();
    const requirements = {
        day: "numeric",
        month: "short",
        year: "numeric",
    }
    const formattedDate = date.toLocaleString("en-IN", requirements);
    return formattedDate
}

export default FormattedDate