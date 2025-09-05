const clint_contractModel = require("../schemas/clint_contract.model");
require('../schemas/clint.model')


const getclintContractDetails = async () => {
    try {
        const clintDetails = await clint_contractModel.find().select('agreementDate expiryDate').populate({
        path: 'client',
        select: 'name email'}).limit(50)
        const filteredData = clintDetails.map(item => ({
        agreementDate: item.agreementDate,
        expiryDate: item.expiryDate,
        clientName: item.client?.name || 'null',
        clientEmail: item.client?.email || 'null'
        }));
        return {heading:Object.keys(filteredData[0]),rows:Object.values(filteredData)};
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getclintContractDetails;
