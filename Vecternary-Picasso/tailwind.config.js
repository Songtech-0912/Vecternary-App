module.exports = {
    purge: {
        content: ["*.html", "*.js"],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                softgray: "#585858",
                deepgray: '#3c3b3b',
                palegray: '#464646',
                darkgray: '#373737',
                ultragray: '#282828'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};