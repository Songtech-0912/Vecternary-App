module.exports = {
    purge: {
        // We only want to purge classes from app.js
        // to avoid mistakenly purging e.g. classes
        // from fabric.js and iro.js which would result
        // in long processing times and erroneous results
        content: ["*.html", "app.js", 'libs/appmenus.js'],
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
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
