const FormattedTime = ()=>{
    const time = new Date();
    const requirements = {
        timeZone:"Asia/Kolkata",
        timeStyle:"short"
    }

    const formattedTime = time.toLocaleString("en-IN",requirements)
    return formattedTime
}

export default FormattedTime
