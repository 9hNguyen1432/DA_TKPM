class DataHelper {

    // Helper function to convert data to CSV format
    convertToCsv(data) {
        const header = Object.keys(data[0]).join(',') + '\n';
        const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
        return header + rows;
    }
}

module.exports = new DataHelper;