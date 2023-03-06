const textValidation = (value) => {
  if (value === "")
    return "This field is required."
  else if (value.length > 150)
    return "Name cannot be longer than 150 characters."
  else
    return ""
}

const emailValidation = (value) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/).test(value) ? "" : "Email is not valid."
}

const isRequired = (value) => {
  return value === "" ? "This field is required." : ""
}

const isEqual = (value1, value2) => {
  return value1 !== value2 ? "The passwords do not match." : ""
}

export {
  textValidation,
  emailValidation,
  isRequired,
  isEqual,
}
