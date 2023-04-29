const validateNotNull = (input) => {
    return input ? true : 'Response must be provided';
};

const validateSalary = (input) => {
    return isNaN(parseFloat(input)) ? 'Please enter a number' : true;
}

module.exports = {
    validateNotNull,
    validateSalary,
}
