const path = require('path')

// This is a workaround to solve issues regarding duplicate react versions on
// yarn link react-admin-base and react-admin-base-adminkit
// to be deleted when this two libraries becames table.

module.exports = {
    webpack: {
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'react-intl': path.resolve(__dirname, './node_modules/react-intl'),
            'react-admin-base': path.resolve(__dirname, './node_modules/react-admin-base'),
            'react-admin-base-adminkit': path.resolve(__dirname, './node_modules/react-admin-base-adminkit'),
            'react-admin-base-ckeditor': path.resolve(__dirname, './node_modules/react-admin-base-ckeditor')
        },
    },
};
