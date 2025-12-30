class Logger {
    static info(message, data = null) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ℹ️  ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }

    static error(message, error = null) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ❌ ${message}`, error ? error.message : '');
        if (error && error.stack) {
            console.error(error.stack);
        }
    }

    static success(message, data = null) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ✅ ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }

    static warning(message, data = null) {
        const timestamp = new Date().toISOString();
        console.warn(`[${timestamp}] ⚠️  ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }

    static debug(message, data = null) {
        if (process.env.NODE_ENV === 'development') {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] 🐛 ${message}`, data ? JSON.stringify(data, null, 2) : '');
        }
    }
}

module.exports = Logger;