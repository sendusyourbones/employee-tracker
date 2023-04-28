const validateDepartment = (input) => {
    return input ? true : 'Department name must be provided';
};

module.exports = {
    validateDepartment,
}
