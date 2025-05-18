const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000',
    'https://care-loop-mu.vercel.app/login'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = { allowedOrigins, corsOptions };
