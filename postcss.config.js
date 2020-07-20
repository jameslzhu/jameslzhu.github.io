module.exports = {
    plugins: [
        require("postcss-import"),
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer")
        // require("postcss-custom-media"),
        // require("postcss-css-variables"),
        // require('postcss-extend-rule'),
        // require('postcss-conditionals'),
        // require('postcss-discard-comments'),
        // require('postcss-class-repeat'),
        // require("postcss-calc"),
        // require("postcss-rtl"),
    ]
};
